"use client";

import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '@/stores/gameStore';

interface SocketProviderProps {
    children: React.ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
    const {
        setSocket,
        socket,
        gameId,
        setPlayerSymbol,
        setIsHost,
        setGameState,
        setBoard,
        setTurn,
        setResult,
        resetGame,
        addMessage,
        setShowRestartRequest,
        gameSize,
        setRestartRequestStatus
    } = useGameStore();

    // Initialize socket connection
    useEffect(() => {
        // Use environment variable for the socket URL
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
        const socketInstance = io(socketUrl);
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [setSocket]);

    // Set up socket event listeners
    useEffect(() => {
        if (!socket) return;

        // Player assignment
        socket.on('assignSymbol', ({ symbol, isHost }) => {
            console.log(`Assigned symbol: ${symbol}, Host: ${isHost}`);
            setPlayerSymbol(symbol as 'X' | 'O');
            setIsHost(isHost);
        });

        // Waiting for opponent
        socket.on('waitingForOpponent', () => {
            console.log('Waiting for opponent');
            setGameState('waiting');
        });

        // Game start
        socket.on('gameStart', (game) => {
            console.log('Game started:', game);
            // Make sure we have the correct board size
            if (game.board) {
                setBoard(game.board);
            }
            setTurn(game.turn);
            setResult(null);
            setGameState('playing');
            // Update game size if it changed
            if (game.gameSize && game.gameSize !== gameSize) {
                // Use the setter from our store
                useGameStore.getState().setGameSize(game.gameSize);
            }
        });

        // Game settings changed
        socket.on('gameSettingsChanged', (settings) => {
            console.log('Game settings changed:', settings);
            if (settings.gameSize && settings.gameSize !== gameSize) {
                useGameStore.getState().setGameSize(settings.gameSize);
            }
            // Update board size based on new settings
            if (settings.boardSize) {
                setBoard(Array(settings.boardSize).fill(null));
            }
        });

        // Board updates
        socket.on('updateBoard', (game) => {
            console.log('Board updated:', game);
            if (game.board) {
                setBoard(game.board);
            }
            setTurn(game.turn);
        });

        // Game over
        socket.on('gameOver', ({ winner, winningLine }) => {
            console.log(`Game over. Winner: ${winner}, Winning Line: ${winningLine}`);
            setResult({ winner, winningLine });
            setGameState('over');
        });

        // Game restart
        socket.on('gameRestarted', (game) => {
            console.log('Game restarted:', game);
            if (game.board) {
                setBoard(game.board);
            }
            setTurn(game.turn);
            setResult(null);
            setShowRestartRequest(false);
            setRestartRequestStatus('none');
            setGameState('playing');

            // Update game size if it changed
            if (game.gameSize && game.gameSize !== gameSize) {
                // Use the setter from our store
                useGameStore.getState().setGameSize(game.gameSize);
            }
        });

        // Restart request
        socket.on('restartRequest', () => {
            console.log('Received restart request');
            setShowRestartRequest(true);
        });

        // Handle restart declined
        socket.on('restartDeclined', () => {
            console.log('Restart request was declined');
            // We need to pass this info to the GameStatus component
            setRestartRequestStatus('declined');
        });

        // Chat messages
        socket.on('receiveMessage', ({ message, sender }) => {
            addMessage({ sender, message });
        });

        // Error handling
        socket.on('gameNotFound', () => {
            alert('Game not found. Please check the game ID.');
        });

        socket.on('gameFull', () => {
            alert('Game is full. Please join another game or create a new one.');
        });

        // Handle disconnections
        socket.on('hostLeft', () => {
            alert('The host has left the game. The game will be terminated.');
            resetGame();
        });

        socket.on('opponentLeft', () => {
            alert('Your opponent has left the game. Waiting for a new player to join.');
            setGameState('waiting');
        });

        // Cleanup event listeners
        return () => {
            socket.off('assignSymbol');
            socket.off('waitingForOpponent');
            socket.off('gameStart');
            socket.off('updateBoard');
            socket.off('gameOver');
            socket.off('gameRestarted');
            socket.off('restartRequest');
            socket.off('receiveMessage');
            socket.off('gameNotFound');
            socket.off('gameFull');
            socket.off('hostLeft');
            socket.off('opponentLeft');
            socket.off('gameSettingsChanged');
            socket.off('restartDeclined');
        };
    }, [
        socket,
        setPlayerSymbol,
        setIsHost,
        setGameState,
        setBoard,
        setTurn,
        setResult,
        addMessage,
        setShowRestartRequest,
        resetGame,
        gameId,
        gameSize,
        setRestartRequestStatus
    ]);

    return <>{children}</>;
}