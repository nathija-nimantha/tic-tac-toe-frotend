import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Generate a random game ID
export function generateGameId(): string {
    return Math.random().toString(36).substring(2, 8);
}

// Function to create a board based on size
export function createBoard(size: string): null[] {
    const boardSize = getBoardSize(size);
    return Array(boardSize * boardSize).fill(null);
}

// Get board size number from string representation
export function getBoardSize(size: string): number {
    switch (size) {
        case "3x3": return 3;
        case "6x6": return 6;
        case "9x9": return 9;
        default: return 3;
    }
}

// Get total cell count for a given board size
export function getTotalCells(size: string): number {
    const dimension = getBoardSize(size);
    return dimension * dimension;
}

// Get appropriate cell styling based on game size
export function getCellStyle(size: number) {
    switch (size) {
        case 3:
            return {
                cellSizeClass: "game-cell-3x3",
                containerClass: "w-full max-w-xl"  // Larger container for 3x3
            };
        case 6:
            return {
                cellSizeClass: "game-cell-6x6",
                containerClass: "w-full max-w-xl"  // Same size container for 6x6
            };
        case 9:
            return {
                cellSizeClass: "game-cell-9x9",
                containerClass: "w-full max-w-xl"  // Same size container for 9x9
            };
        default:
            return {
                cellSizeClass: "game-cell-3x3",
                containerClass: "w-full max-w-xl"
            };
    }
}