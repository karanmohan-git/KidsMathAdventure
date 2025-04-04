import { cn } from "@/lib/utils";
import React from "react";

// Define card suits and values
export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Value =
  | "ace"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "jack"
  | "queen"
  | "king";

export interface CardType {
  id: string;
  suit: Suit;
  value: Value;
  faceUp: boolean;
  position?: { x: number; y: number };
}

// Get card color based on suit
export const getCardColor = (suit: Suit): "red" | "black" => {
  return suit === "hearts" || suit === "diamonds" ? "red" : "black";
};

// Get symbol for suit
export const getSuitSymbol = (suit: Suit): string => {
  switch (suit) {
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
    case "spades":
      return "♠";
    default:
      return "";
  }
};

// Get display value (A, 2-10, J, Q, K)
export const getDisplayValue = (value: Value): string => {
  switch (value) {
    case "ace":
      return "A";
    case "jack":
      return "J";
    case "queen":
      return "Q";
    case "king":
      return "K";
    default:
      return value;
  }
};

interface CardProps {
  card: CardType;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  card,
  onClick,
  draggable = false,
  onDragStart,
  className,
}) => {
  const { suit, value, faceUp } = card;
  const color = getCardColor(suit);
  const symbol = getSuitSymbol(suit);
  const displayValue = getDisplayValue(value);

  if (!faceUp) {
    return (
      <div
        className={cn(
          "relative w-[100px] h-[140px] rounded-md bg-gradient-to-br from-blue-700 to-blue-900 shadow-md cursor-pointer border-2 border-white/10",
          className
        )}
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
      >
        <div className="absolute inset-0 rounded-md bg-white/5 p-1">
          <div className="w-full h-full border-2 border-dashed border-white/20 rounded flex items-center justify-center">
            <div className="text-4xl text-white/50 rotate-45">♠</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-[100px] h-[140px] rounded-md bg-white shadow-md cursor-pointer border border-gray-300",
        className
      )}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      data-card-id={card.id}
    >
      <div
        className={`absolute top-1 left-2 text-${color === "red" ? "red-600" : "black"}`}
      >
        <div className="text-lg font-bold">{displayValue}</div>
        <div className="text-xl -mt-2">{symbol}</div>
      </div>

      <div
        className={`absolute bottom-1 right-2 text-${
          color === "red" ? "red-600" : "black"
        } rotate-180`}
      >
        <div className="text-lg font-bold">{displayValue}</div>
        <div className="text-xl -mt-2">{symbol}</div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center text-4xl text-${
          color === "red" ? "red-600" : "black"
        }`}
      >
        {symbol}
      </div>
    </div>
  );
};