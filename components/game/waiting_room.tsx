"use client";

import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { Copy, Clock, UserCheck } from "lucide-react";
import { useState } from "react";

export function WaitingRoom() {
    const {
        gameId,
        gameSize,
        hostStarts,
        playerSymbol
    } = useGameStore();

    const [copied, setCopied] = useState(false);

    const copyGameId = () => {
        navigator.clipboard.writeText(gameId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-lg border-2 border-border bg-card p-6 shadow-md">
            <div className="flex justify-center">
                <div className="mb-4 rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-200">
                    <Clock className="h-8 w-8" />
                </div>
            </div>

            <h2 className="mb-6 text-center text-2xl font-bold">
                Waiting for Opponent
            </h2>

            <p className="mb-4 text-center font-medium">
                Share this Game ID with your friend to play together
            </p>

            <div className="mb-6">
                <div className="flex overflow-hidden rounded-md">
                    <div className="flex-1 border-2 border-r-0 border-border bg-background px-3 py-2 font-mono">
                        {gameId}
                    </div>
                    <Button
                        onClick={copyGameId}
                        variant={copied ? "default" : "outline"}
                        className="rounded-l-none border-2"
                    >
                        {copied ? (
                            <UserCheck className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-2 rounded-md border-2 border-border bg-accent/50 p-4">
                <h3 className="font-semibold">Game Settings:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Board Size:</div>
                    <div className="font-semibold">{gameSize}</div>

                    <div className="font-medium">Starting Player:</div>
                    <div className="font-semibold">
                        {hostStarts ? (
                            <span>You (<span className="player-x">X</span>)</span>
                        ) : (
                            <span>Opponent (<span className="player-x">X</span>)</span>
                        )}
                    </div>

                    <div className="font-medium">Your Symbol:</div>
                    <div className={`font-semibold ${playerSymbol === 'X' ? 'player-x' : 'player-o'}`}>
                        {playerSymbol}
                    </div>
                </div>
            </div>
        </div>
    );
}