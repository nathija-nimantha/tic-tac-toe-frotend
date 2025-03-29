"use client";

import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { Settings, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const {
        isHost,
        socket,
        gameId,
        gameSize: currentGameSize,
        hostStarts: currentHostStarts,
        setGameSize,
        setHostStarts,
        resetGame,
        result
    } = useGameStore();

    // Local state for the form
    const [gameSize, setLocalGameSize] = useState(currentGameSize);
    const [hostStarts, setLocalHostStarts] = useState(currentHostStarts);

    // Sync local state with store
    useEffect(() => {
        setLocalGameSize(currentGameSize);
        setLocalHostStarts(currentHostStarts);
    }, [currentGameSize, currentHostStarts]);

    const changeGameSettings = () => {
        if (isHost && socket && gameId) {
            // Update local store
            setGameSize(gameSize);
            setHostStarts(hostStarts);

            // Send to server
            socket.emit("changeGameSettings", {
                gameId,
                gameSize,
                hostStarts
            });

            // Close modal
            onClose();
        }
    };

    const leaveGame = () => {
        if (socket) {
            socket.disconnect();
            resetGame();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg border-2 border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Settings className="mr-2 h-5 w-5" />
                        <h2 className="text-xl font-semibold">
                            {isHost ? "Game Settings" : "Game Options"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-accent">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {isHost ? (
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Board Size:
                                </label>
                                <select
                                    value={gameSize}
                                    onChange={(e) => setLocalGameSize(e.target.value as "3x3" | "6x6" | "9x9")}
                                    className="w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="3x3">3x3</option>
                                    <option value="6x6">6x6</option>
                                    <option value="9x9">9x9</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Who starts (X):
                                </label>
                                <select
                                    value={hostStarts ? "host" : "guest"}
                                    onChange={(e) => setLocalHostStarts(e.target.value === "host")}
                                    className="w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="host">Host (You)</option>
                                    <option value="guest">Guest (Opponent)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                onClick={leaveGame}
                                className="w-full flex items-center justify-center"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Leave Game
                            </Button>

                            <Button
                                onClick={changeGameSettings}
                                className="w-full"
                            >
                                Apply Changes
                            </Button>
                        </div>

                        <p className="mt-4 text-center text-sm">
                            {result ? "Changes will apply immediately" : "Changes apply when the game restarts"}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="mb-6 text-center">
                            Only the host can change game settings.
                        </p>

                        <Button
                            onClick={leaveGame}
                            className="w-full flex items-center justify-center"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Leave Game
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}