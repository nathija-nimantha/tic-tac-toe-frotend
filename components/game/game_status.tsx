"use client";

import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function GameStatus() {
    const {
        turn,
        result,
        isHost,
        socket,
        gameId,
        gameState,
        restartRequestStatus,
        setRestartRequestStatus,
        playerSymbol
    } = useGameStore();

    const [waitingForRestart, setWaitingForRestart] = useState(false);

    const restartGame = () => {
        if (isHost && socket && gameId) {
            setWaitingForRestart(true);
            setRestartRequestStatus('pending');
            socket.emit("restartGame", gameId);
        }
    };

    // Handle restart status changes
    useEffect(() => {
        if (restartRequestStatus === 'declined') {
            setWaitingForRestart(false);
            // Reset after showing the declined message
            setTimeout(() => {
                setRestartRequestStatus('none');
            }, 3000);
        } else if (restartRequestStatus === 'accepted') {
            setWaitingForRestart(false);
            setRestartRequestStatus('none');
        }
    }, [restartRequestStatus, setRestartRequestStatus]);

    // Reset waiting state when game is restarted
    useEffect(() => {
        if (!result) {
            setWaitingForRestart(false);
            setRestartRequestStatus('none');
        }
    }, [result, setRestartRequestStatus]);

    if (gameState !== 'playing' && gameState !== 'over') {
        return null;
    }

    return (
        <div className="mt-6 text-center">
            {!result ? (
                <div className="flex flex-col items-center space-y-2">
                    <p className="text-sm font-medium text-foreground/80">Current turn</p>
                    <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${turn === 'X' ? 'player-x' : 'player-o'}`}>
              {turn}
            </span>
                        <ArrowRight className="h-5 w-5 text-foreground" />
                        <span className={`text-sm font-medium ${turn === playerSymbol ? 'text-green-500' : 'text-muted-foreground'}`}>
              {turn === playerSymbol ? "Your turn" : "Opponent&apos;s turn"}
            </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                        You are playing as <span className={`font-bold ${playerSymbol === 'X' ? 'player-x' : 'player-o'}`}>{playerSymbol}</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    {result.winner === 'draw' ? (
                        <p className="text-xl font-bold">It&apos;s a draw! 🤝</p>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Trophy className="mb-2 h-8 w-8 text-yellow-500" />
                            <p className="text-xl font-bold">
                                Player <span className={`${result.winner === 'X' ? 'player-x' : 'player-o'}`}>{result.winner}</span> wins!
                            </p>
                        </div>
                    )}

                    {isHost && (
                        waitingForRestart ? (
                            <div className="flex flex-col items-center">
                                {restartRequestStatus === 'declined' ? (
                                    <div className="flex flex-col items-center">
                                        <Button
                                            variant="destructive"
                                            disabled
                                            className="mt-2"
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Request Declined
                                        </Button>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            The other player declined your restart request
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Button
                                            disabled
                                            className="mt-2 opacity-70"
                                        >
                                            <Clock className="mr-2 h-4 w-4 animate-pulse" />
                                            Waiting for opponent...
                                        </Button>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Please wait for the other player to accept
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button
                                onClick={restartGame}
                                className="mt-2"
                            >
                                Restart Game
                            </Button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}