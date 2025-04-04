import React, { useState, useEffect, useCallback } from "react";
import { Card, CardType } from "./Card";
import {
  createDeck,
  shuffleDeck,
  dealInitialCards,
  canAddToFoundation,
  canAddToTableau,
  checkWinCondition,
  getAvailableMoves,
} from "./GameLogic";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export const SolitaireGame: React.FC = () => {
  // Game state
  const [stockPile, setStockPile] = useState<CardType[]>([]);
  const [wastePile, setWastePile] = useState<CardType[]>([]);
  const [tableauPiles, setTableauPiles] = useState<CardType[][]>([[], [], [], [], [], [], []]);
  const [foundationPiles, setFoundationPiles] = useState<CardType[][]>([[], [], [], []]);
  const [draggedCard, setDraggedCard] = useState<{
    card: CardType;
    source: string;
    index: number;
    cards: CardType[];
  } | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState<{
    from: string;
    to: string;
    card: CardType;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  // Start a new game
  const startNewGame = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    const { stockPile, tableauPiles, foundationPiles, wastePile } = dealInitialCards(deck);
    
    setStockPile(stockPile);
    setTableauPiles(tableauPiles);
    setFoundationPiles(foundationPiles);
    setWastePile(wastePile);
    setGameWon(false);
    setMoves(0);
    setScore(0);
    setHint(null);
    setShowHint(false);
  }, []);

  // Initialize game on component mount
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Check for win condition after every move
  useEffect(() => {
    if (checkWinCondition(foundationPiles)) {
      setGameWon(true);
      toast({
        title: "Congratulations!",
        description: "You have won the game! 🎉",
        duration: 5000,
      });
    }
  }, [foundationPiles, toast]);

  // Generate a hint
  const generateHint = useCallback(() => {
    const availableMoves = getAvailableMoves(tableauPiles, foundationPiles, wastePile);
    
    if (availableMoves.length > 0) {
      // Prioritize moves to foundation piles
      const foundationMoves = availableMoves.filter((move) => move.to.includes("foundation"));
      
      if (foundationMoves.length > 0) {
        setHint(foundationMoves[0]);
      } else {
        setHint(availableMoves[0]);
      }
      
      setShowHint(true);
      
      // Hide hint after 3 seconds
      setTimeout(() => {
        setShowHint(false);
      }, 3000);
    } else {
      toast({
        title: "No moves available",
        description: "Try drawing from the stock pile",
        duration: 3000,
      });
    }
  }, [tableauPiles, foundationPiles, wastePile, toast]);

  // Handle drawing cards from stock pile
  const handleDrawCard = () => {
    if (stockPile.length === 0) {
      // Reshuffle waste pile into stock pile
      if (wastePile.length > 0) {
        setStockPile(
          wastePile.map((card) => ({ ...card, faceUp: false })).reverse()
        );
        setWastePile([]);
      }
      return;
    }

    // Draw 1 card from stock to waste
    const numToDraw = 1;
    const cardsToDraw = stockPile.slice(-numToDraw);
    const newStockPile = stockPile.slice(0, -numToDraw);

    // Make the cards face up in the waste pile
    setWastePile([
      ...wastePile,
      ...cardsToDraw.map((card) => ({ ...card, faceUp: true })),
    ]);
    setStockPile(newStockPile);
    setMoves((prev) => prev + 1);
  };

  // Handle drag start
  const handleDragStart = (
    e: React.DragEvent,
    card: CardType,
    source: string,
    index: number,
    cards: CardType[] = [card]
  ) => {
    e.dataTransfer.setData("text/plain", card.id);
    setDraggedCard({ card, source, index, cards });
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Get pile and index from a drop target ID
  const parsePileId = (pileId: string) => {
    const parts = pileId.split("-");
    const type = parts[0];
    const index = parseInt(parts[1], 10);
    
    return { type, index };
  };

  // Handle drop on tableau pile
  const handleDropOnTableau = (e: React.DragEvent, pileIndex: number) => {
    e.preventDefault();
    
    if (!draggedCard) return;
    
    const { card, source, index, cards } = draggedCard;
    const targetPile = tableauPiles[pileIndex];
    const topCard = targetPile.length > 0 ? targetPile[targetPile.length - 1] : null;
    
    // Check if the cards can be added to this tableau pile
    if (canAddToTableau(card, topCard)) {
      // Create new tableau piles array
      const newTableauPiles = [...tableauPiles];
      
      // Remove the cards from the source
      if (source === "waste") {
        setWastePile(wastePile.slice(0, -1));
      } else if (source.startsWith("tableau")) {
        const { index: sourcePileIndex } = parsePileId(source);
        const sourcePile = tableauPiles[sourcePileIndex];
        
        // Remove cards from source pile
        newTableauPiles[sourcePileIndex] = sourcePile.slice(0, index);
        
        // Flip the new top card if needed
        if (
          newTableauPiles[sourcePileIndex].length > 0 &&
          !newTableauPiles[sourcePileIndex][newTableauPiles[sourcePileIndex].length - 1].faceUp
        ) {
          newTableauPiles[sourcePileIndex][newTableauPiles[sourcePileIndex].length - 1].faceUp = true;
        }
      } else if (source.startsWith("foundation")) {
        const { index: foundationIndex } = parsePileId(source);
        const newFoundationPiles = [...foundationPiles];
        newFoundationPiles[foundationIndex] = newFoundationPiles[foundationIndex].slice(0, -1);
        setFoundationPiles(newFoundationPiles);
      }
      
      // Add the cards to the target pile
      newTableauPiles[pileIndex] = [...targetPile, ...cards];
      
      // Update the tableau piles
      setTableauPiles(newTableauPiles);
      setMoves((prev) => prev + 1);
      setScore((prev) => prev + 5); // Award points for a successful move
    }
    
    setDraggedCard(null);
  };

  // Handle drop on foundation pile
  const handleDropOnFoundation = (e: React.DragEvent, pileIndex: number) => {
    e.preventDefault();
    
    if (!draggedCard) return;
    
    const { card, source, index } = draggedCard;
    const targetPile = foundationPiles[pileIndex];
    const topCard = targetPile.length > 0 ? targetPile[targetPile.length - 1] : null;
    
    // Check if only one card is being moved (can't move multiple cards to foundation)
    if (draggedCard.cards.length > 1) return;
    
    // Check if the card can be added to this foundation pile
    if (canAddToFoundation(card, topCard)) {
      // Create new foundation piles array
      const newFoundationPiles = [...foundationPiles];
      
      // Remove the card from the source
      if (source === "waste") {
        setWastePile(wastePile.slice(0, -1));
      } else if (source.startsWith("tableau")) {
        const { index: sourcePileIndex } = parsePileId(source);
        const newTableauPiles = [...tableauPiles];
        const sourcePile = newTableauPiles[sourcePileIndex];
        
        // Remove card from source pile
        newTableauPiles[sourcePileIndex] = sourcePile.slice(0, -1);
        
        // Flip the new top card if needed
        if (
          newTableauPiles[sourcePileIndex].length > 0 &&
          !newTableauPiles[sourcePileIndex][newTableauPiles[sourcePileIndex].length - 1].faceUp
        ) {
          newTableauPiles[sourcePileIndex][newTableauPiles[sourcePileIndex].length - 1].faceUp = true;
        }
        
        setTableauPiles(newTableauPiles);
      }
      
      // Add the card to the target pile
      newFoundationPiles[pileIndex] = [...targetPile, card];
      
      // Update the foundation piles
      setFoundationPiles(newFoundationPiles);
      setMoves((prev) => prev + 1);
      setScore((prev) => prev + 10); // Award more points for a foundation move
    }
    
    setDraggedCard(null);
  };

  // Handle clicking on a card in the waste pile to move it
  const handleWasteCardClick = () => {
    if (wastePile.length === 0) return;
    
    const card = wastePile[wastePile.length - 1];
    
    // Try to move to a foundation pile first
    for (let i = 0; i < foundationPiles.length; i++) {
      const foundationPile = foundationPiles[i];
      const topCard = foundationPile.length > 0 ? foundationPile[foundationPile.length - 1] : null;
      
      if (canAddToFoundation(card, topCard)) {
        // Create new foundation piles array
        const newFoundationPiles = [...foundationPiles];
        
        // Add the card to the foundation pile
        newFoundationPiles[i] = [...foundationPile, card];
        
        // Remove the card from the waste pile
        setWastePile(wastePile.slice(0, -1));
        
        // Update the foundation piles
        setFoundationPiles(newFoundationPiles);
        setMoves((prev) => prev + 1);
        setScore((prev) => prev + 10);
        return;
      }
    }
    
    // If no foundation move is possible, try tableau piles
    for (let i = 0; i < tableauPiles.length; i++) {
      const tableauPile = tableauPiles[i];
      const topCard = tableauPile.length > 0 ? tableauPile[tableauPile.length - 1] : null;
      
      if (canAddToTableau(card, topCard)) {
        // Create new tableau piles array
        const newTableauPiles = [...tableauPiles];
        
        // Add the card to the tableau pile
        newTableauPiles[i] = [...tableauPile, card];
        
        // Remove the card from the waste pile
        setWastePile(wastePile.slice(0, -1));
        
        // Update the tableau piles
        setTableauPiles(newTableauPiles);
        setMoves((prev) => prev + 1);
        setScore((prev) => prev + 5);
        return;
      }
    }
  };

  // Handle clicking on a card in the tableau to select or move it
  const handleTableauCardClick = (pileIndex: number, cardIndex: number) => {
    const pile = tableauPiles[pileIndex];
    
    // Can only interact with face-up cards
    if (!pile[cardIndex].faceUp) return;
    
    // If it's the top card, try to move it to a foundation
    if (cardIndex === pile.length - 1) {
      const card = pile[cardIndex];
      
      // Try to move to a foundation pile
      for (let i = 0; i < foundationPiles.length; i++) {
        const foundationPile = foundationPiles[i];
        const topCard = foundationPile.length > 0 ? foundationPile[foundationPile.length - 1] : null;
        
        if (canAddToFoundation(card, topCard)) {
          // Create new foundation piles array
          const newFoundationPiles = [...foundationPiles];
          
          // Add the card to the foundation pile
          newFoundationPiles[i] = [...foundationPile, card];
          
          // Create new tableau piles array
          const newTableauPiles = [...tableauPiles];
          
          // Remove the card from the tableau pile
          newTableauPiles[pileIndex] = pile.slice(0, -1);
          
          // Flip the new top card if needed
          if (
            newTableauPiles[pileIndex].length > 0 &&
            !newTableauPiles[pileIndex][newTableauPiles[pileIndex].length - 1].faceUp
          ) {
            newTableauPiles[pileIndex][newTableauPiles[pileIndex].length - 1].faceUp = true;
          }
          
          // Update the piles
          setFoundationPiles(newFoundationPiles);
          setTableauPiles(newTableauPiles);
          setMoves((prev) => prev + 1);
          setScore((prev) => prev + 10);
          return;
        }
      }
    }
  };

  // Render a tableau pile
  const renderTableauPile = (pile: CardType[], pileIndex: number) => {
    if (pile.length === 0) {
      return (
        <div
          className="w-[100px] h-[140px] rounded-md border-2 border-dashed border-gray-300 bg-gray-100/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropOnTableau(e, pileIndex)}
          data-pile-id={`tableau-${pileIndex}`}
        />
      );
    }
    
    return (
      <div
        className="relative"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDropOnTableau(e, pileIndex)}
        data-pile-id={`tableau-${pileIndex}`}
      >
        {pile.map((card, cardIndex) => {
          const isHighlighted =
            showHint &&
            hint?.card.id === card.id &&
            hint?.from.includes(`tableau-${pileIndex}`);
            
          return (
            <div
              key={card.id}
              className={`absolute ${
                cardIndex > 0 ? "cursor-pointer" : ""
              } transition-all duration-200 ${
                isHighlighted ? "ring-2 ring-yellow-400 shadow-lg" : ""
              }`}
              style={{
                top: `${cardIndex * 25}px`,
                zIndex: cardIndex,
              }}
              onClick={() => handleTableauCardClick(pileIndex, cardIndex)}
            >
              <Card
                card={card}
                draggable={card.faceUp}
                onDragStart={(e) => {
                  if (card.faceUp) {
                    // When dragging a card from tableau, we might drag multiple cards
                    const cardsToMove = pile.slice(cardIndex);
                    handleDragStart(
                      e,
                      card,
                      `tableau-${pileIndex}`,
                      cardIndex,
                      cardsToMove
                    );
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Render a foundation pile
  const renderFoundationPile = (pile: CardType[], pileIndex: number) => {
    if (pile.length === 0) {
      return (
        <div
          className="w-[100px] h-[140px] rounded-md border-2 border-dashed border-gray-300 bg-gray-100/50"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropOnFoundation(e, pileIndex)}
          data-pile-id={`foundation-${pileIndex}`}
        />
      );
    }
    
    // Show only the top card of the foundation pile
    const topCard = pile[pile.length - 1];
    const isHighlighted =
      showHint &&
      hint?.to === `foundation-${pileIndex}`;
      
    return (
      <div
        className={`${isHighlighted ? "ring-2 ring-yellow-400 shadow-lg" : ""}`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDropOnFoundation(e, pileIndex)}
        data-pile-id={`foundation-${pileIndex}`}
      >
        <Card 
          card={topCard} 
          draggable
          onDragStart={(e) => 
            handleDragStart(e, topCard, `foundation-${pileIndex}`, pile.length - 1)
          }
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-4 pt-8 bg-gradient-to-b from-green-800 to-green-900 min-h-screen">
      <div className="w-full max-w-7xl">
        {/* Game header and controls */}
        <div className="flex justify-between items-center mb-6 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
          <div className="text-white">
            <h1 className="text-2xl font-bold">Solitaire</h1>
            <div className="flex mt-2 space-x-4">
              <div>Moves: {moves}</div>
              <div>Score: {score}</div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={startNewGame} 
              variant="secondary"
            >
              New Game
            </Button>
            
            <Button 
              onClick={generateHint} 
              variant="outline"
              disabled={gameWon}
            >
              Hint
            </Button>
          </div>
        </div>
        
        {/* Stock and Foundation piles */}
        <div className="flex justify-between mb-8">
          <div className="flex space-x-4">
            {/* Stock pile */}
            <div className="relative" onClick={handleDrawCard}>
              {stockPile.length > 0 ? (
                <Card card={stockPile[stockPile.length - 1]} />
              ) : (
                <div className="w-[100px] h-[140px] rounded-md border-2 border-dashed border-gray-300 bg-gray-100/50" />
              )}
              
              {stockPile.length > 0 && (
                <div className="absolute top-1 right-1 bg-white rounded-full px-2 py-1 text-xs font-bold">
                  {stockPile.length}
                </div>
              )}
            </div>
            
            {/* Waste pile */}
            <div className="relative">
              {wastePile.length > 0 ? (
                <div className={`
                  ${showHint && hint?.from === "waste" ? "ring-2 ring-yellow-400 shadow-lg" : ""}
                `}>
                  <Card 
                    card={wastePile[wastePile.length - 1]}
                    onClick={handleWasteCardClick}
                    draggable
                    onDragStart={(e) => 
                      handleDragStart(
                        e, 
                        wastePile[wastePile.length - 1], 
                        "waste", 
                        wastePile.length - 1
                      )
                    }
                  />
                </div>
              ) : (
                <div className="w-[100px] h-[140px] rounded-md border-2 border-dashed border-gray-300 bg-gray-100/50" />
              )}
              
              {wastePile.length > 0 && (
                <div className="absolute top-1 right-1 bg-white rounded-full px-2 py-1 text-xs font-bold">
                  {wastePile.length}
                </div>
              )}
            </div>
          </div>
          
          {/* Foundation piles */}
          <div className="flex space-x-4">
            {foundationPiles.map((pile, index) => (
              <div key={`foundation-${index}`}>
                {renderFoundationPile(pile, index)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Tableau piles */}
        <div className="flex justify-between space-x-2 md:space-x-4">
          {tableauPiles.map((pile, index) => (
            <div 
              key={`tableau-${index}`} 
              className="relative"
              style={{ minHeight: "300px" }}
            >
              {renderTableauPile(pile, index)}
            </div>
          ))}
        </div>
        
        {/* Win message */}
        {gameWon && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
              <p className="mb-4">You won the game in {moves} moves with a score of {score}!</p>
              <Button onClick={startNewGame}>Play Again</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};