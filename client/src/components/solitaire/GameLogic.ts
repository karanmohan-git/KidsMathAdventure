import { CardType, Suit, Value } from "./Card";

// Generate a unique ID for each card
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Create a full deck of 52 cards
export const createDeck = (): CardType[] => {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const values: Value[] = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];
  
  const deck: CardType[] = [];
  
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        id: generateId(),
        suit,
        value,
        faceUp: false,
      });
    });
  });
  
  return deck;
};

// Shuffle a deck of cards
export const shuffleDeck = (deck: CardType[]): CardType[] => {
  const shuffled = [...deck];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// Get card value as number for comparison
export const getCardValueNumber = (value: Value): number => {
  switch (value) {
    case "ace":
      return 1;
    case "jack":
      return 11;
    case "queen":
      return 12;
    case "king":
      return 13;
    default:
      return parseInt(value);
  }
};

// Check if a card can be placed on a foundation pile
export const canAddToFoundation = (
  card: CardType,
  topCard: CardType | null
): boolean => {
  if (!topCard) {
    // Only Aces can be placed on empty foundation piles
    return card.value === "ace";
  }
  
  // Cards must be of the same suit and in ascending order
  return (
    card.suit === topCard.suit &&
    getCardValueNumber(card.value) === getCardValueNumber(topCard.value) + 1
  );
};

// Check if a card can be placed on a tableau pile
export const canAddToTableau = (
  card: CardType,
  topCard: CardType | null
): boolean => {
  if (!topCard) {
    // Only Kings can be placed on empty tableau piles
    return card.value === "king";
  }
  
  // Cards must be of alternating colors and in descending order
  const isAlternatingColor =
    (topCard.suit === "hearts" || topCard.suit === "diamonds") ===
    !(card.suit === "hearts" || card.suit === "diamonds");
  
  return (
    isAlternatingColor &&
    getCardValueNumber(card.value) === getCardValueNumber(topCard.value) - 1
  );
};

// Deal initial cards for a new game
export const dealInitialCards = (deck: CardType[]): {
  stockPile: CardType[];
  tableauPiles: CardType[][];
  foundationPiles: CardType[][];
  wastePile: CardType[];
} => {
  const tableauPiles: CardType[][] = [[], [], [], [], [], [], []];
  let currentDeck = [...deck];
  
  // Deal cards to tableau piles
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = currentDeck.pop();
      if (card) {
        // Only the top card in each pile is face up initially
        if (j === i) {
          card.faceUp = true;
        }
        tableauPiles[j].push(card);
      }
    }
  }
  
  // Initialize foundation piles (4 empty piles for each suit)
  const foundationPiles: CardType[][] = [[], [], [], []];
  
  // Remaining cards go to the stock pile
  const stockPile = currentDeck;
  
  // Waste pile starts empty
  const wastePile: CardType[] = [];
  
  return {
    stockPile,
    tableauPiles,
    foundationPiles,
    wastePile,
  };
};

// Check if the game is won
export const checkWinCondition = (foundationPiles: CardType[][]): boolean => {
  // Game is won when all foundation piles have 13 cards (A-K for each suit)
  return foundationPiles.every((pile) => pile.length === 13);
};

// Get moves available (for hints)
export const getAvailableMoves = (
  tableauPiles: CardType[][],
  foundationPiles: CardType[][],
  wastePile: CardType[]
): { from: string; to: string; card: CardType }[] => {
  const moves: { from: string; to: string; card: CardType }[] = [];
  
  // Check moves from tableau piles to foundation piles
  tableauPiles.forEach((pile, pileIndex) => {
    if (pile.length > 0) {
      const topCard = pile[pile.length - 1];
      if (topCard.faceUp) {
        foundationPiles.forEach((foundation, foundationIndex) => {
          if (canAddToFoundation(topCard, foundation[foundation.length - 1] || null)) {
            moves.push({
              from: `tableau-${pileIndex}`,
              to: `foundation-${foundationIndex}`,
              card: topCard,
            });
          }
        });
      }
    }
  });
  
  // Check moves from waste pile to foundation piles
  if (wastePile.length > 0) {
    const topWasteCard = wastePile[wastePile.length - 1];
    foundationPiles.forEach((foundation, foundationIndex) => {
      if (canAddToFoundation(topWasteCard, foundation[foundation.length - 1] || null)) {
        moves.push({
          from: "waste",
          to: `foundation-${foundationIndex}`,
          card: topWasteCard,
        });
      }
    });
  }
  
  // Check moves from waste pile to tableau piles
  if (wastePile.length > 0) {
    const topWasteCard = wastePile[wastePile.length - 1];
    tableauPiles.forEach((pile, pileIndex) => {
      const topTableauCard = pile.length > 0 ? pile[pile.length - 1] : null;
      if (canAddToTableau(topWasteCard, topTableauCard)) {
        moves.push({
          from: "waste",
          to: `tableau-${pileIndex}`,
          card: topWasteCard,
        });
      }
    });
  }
  
  // Check moves between tableau piles
  tableauPiles.forEach((fromPile, fromIndex) => {
    // Find face-up sequences that can be moved
    let faceUpIndex = fromPile.findIndex((card) => card.faceUp);
    if (faceUpIndex !== -1) {
      for (let i = faceUpIndex; i < fromPile.length; i++) {
        const movingCard = fromPile[i];
        
        // Check if this card (and cards below it) can move to other tableau piles
        tableauPiles.forEach((toPile, toIndex) => {
          if (fromIndex !== toIndex) {
            const topCard = toPile.length > 0 ? toPile[toPile.length - 1] : null;
            if (canAddToTableau(movingCard, topCard)) {
              moves.push({
                from: `tableau-${fromIndex}-${i}`,
                to: `tableau-${toIndex}`,
                card: movingCard,
              });
            }
          }
        });
      }
    }
  });
  
  return moves;
};