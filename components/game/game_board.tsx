"use client";

import { useGameStore } from "@/stores/gameStore";
import { getBoardSize, getCellStyle } from "@/lib/utils";
import { useEffect, useState } from "react";

export function GameBoard() {
    const {
        board,
        turn,
        gameSize,
        playerSymbol,
        socket,
        gameId,
        result
    } = useGameStore();

    const [boardSize, setBoardSize] = useState(3);
    const [cellStyle, setCellStyle] = useState({
        cellSizeClass: "game-cell-3x3",
        containerClass: "max-w-md"
    });

    // Update cell sizes based on board size
    useEffect(() => {
        const size = getBoardSize(gameSize);
        setBoardSize(size);
        const style = getCellStyle(size);
        setCellStyle(style);

        // Adjust container height to prevent scrolling
        const container = document.querySelector('.game-board-container');
        if (container) {
            // Reset any fixed height to adapt to content
            container.classList.remove('h-screen');
        }
    }, [gameSize]);

    const handleMove = (index: number) => {
        // Check if the move is valid
        if (
            !result &&
            board[index] === null &&
            turn === playerSymbol &&
            socket &&
            gameId
        ) {
            socket.emit("makeMove", { gameId, index });
        }
    };

    // Make sure board length matches expected size
    const expectedCellCount = boardSize * boardSize;
    const displayBoard = board.length === expectedCellCount
        ? board
        : Array(expectedCellCount).fill(null).map((_, i) => board[i] || null);

    return (
        <div className={`mx-auto ${cellStyle.containerClass} w-full game-board-container`}>
            <div
                className={`mt-4 rounded-lg border-2 border-border bg-card ${boardSize === 3 ? 'p-2' : boardSize === 6 ? 'p-1' : 'p-0.5'}`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                    gap: boardSize === 3 ? '2px' : boardSize === 6 ? '1px' : '0.5px',
                    aspectRatio: '1 / 1', // Make board a perfect square
                    width: '100%',
                    maxWidth: boardSize === 3 ? '500px' : boardSize === 6 ? '500px' : '500px',
                    margin: '0 auto', // Center the board
                }}
            >
                {displayBoard.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handleMove(index)}
                        disabled={cell !== null || turn !== playerSymbol || result !== null}
                        className={`game-cell ${cellStyle.cellSizeClass} ${
                            result?.winningLine?.includes(index) ? "winning-cell" : ""
                        } ${cell === "X" ? "player-x" : cell === "O" ? "player-o" : ""}`}
                        aria-label={`Cell ${index}`}
                    >
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    );
}