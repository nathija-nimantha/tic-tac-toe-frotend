"use client";

import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { generateGameId } from "@/lib/utils";
import { useState } from "react";
import {
    Copy,
    UserPlus,
    Gamepad2,
    HelpCircle,
    Info,
    BookOpen
} from "lucide-react";
import { InfoModal } from "../home/info-modal";
import {
    GameRulesContent,
    AboutProjectContent,
    GameHintsContent
} from "../home/modals-content";

export function GameLobby() {
    const {
        setGameId,
        gameId,
        socket,
        gameSize,
        setGameSize,
        hostStarts,
        setHostStarts
    } = useGameStore();

    const [inputGameId, setInputGameId] = useState("");
    const [joinMode, setJoinMode] = useState(false);
    const [copied, setCopied] = useState(false);

    // Modal states
    const [showRules, setShowRules] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showHints, setShowHints] = useState(false);

    const createGame = () => {
        const id = generateGameId();
        setGameId(id);

        if (socket) {
            socket.emit("createGame", {
                gameId: id,
                gameSize,
                hostStarts
            });
        }
    };

    const joinGame = () => {
        const id = inputGameId.trim();
        if (id) {
            setGameId(id);
            if (socket) {
                socket.emit("joinGame", id);
            }
        }
    };

    const copyGameId = () => {
        navigator.clipboard.writeText(gameId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-md">
            <h2 className="mb-6 text-center text-2xl font-bold">
                {joinMode ? "Join a Game" : "Create New Game"}
            </h2>

            {!joinMode ? (
                <>
                    <div className="mb-6 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Board Size:
                            </label>
                            <select
                                value={gameSize}
                                onChange={(e) => setGameSize(e.target.value as "3x3" | "6x6" | "9x9")}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="3x3">3x3</option>
                                <option value="6x6">6x6</option>
                                <option value="9x9">9x9</option>
                            </select>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Note: Players need 3 in a row to win on all board sizes
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Who starts (X):
                            </label>
                            <select
                                value={hostStarts ? "host" : "guest"}
                                onChange={(e) => setHostStarts(e.target.value === "host")}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="host">You (Host)</option>
                                <option value="guest">Guest (Opponent)</option>
                            </select>
                        </div>
                    </div>

                    <Button
                        onClick={createGame}
                        className="mb-4 w-full"
                        size="lg"
                    >
                        <Gamepad2 className="mr-2 h-5 w-5" />
                        Create Game
                    </Button>

                    <div className="text-center">
                        <button
                            onClick={() => setJoinMode(true)}
                            className="text-sm text-primary hover:underline"
                        >
                            Join an existing game instead
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium">
                            Game ID:
                        </label>
                        <input
                            type="text"
                            value={inputGameId}
                            onChange={(e) => setInputGameId(e.target.value)}
                            placeholder="Enter game ID"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>

                    <Button
                        onClick={joinGame}
                        className="mb-4 w-full"
                        size="lg"
                    >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Join Game
                    </Button>

                    <div className="text-center">
                        <button
                            onClick={() => setJoinMode(false)}
                            className="text-sm text-primary hover:underline"
                        >
                            Create a new game instead
                        </button>
                    </div>
                </>
            )}

            {/* Info buttons */}
            <div className="mt-8 pt-4 border-t border-border flex justify-center space-x-4">
                <button
                    onClick={() => setShowRules(true)}
                    className="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground"
                >
                    <BookOpen className="mb-1 h-5 w-5" />
                    Rules
                </button>

                <button
                    onClick={() => setShowHints(true)}
                    className="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground"
                >
                    <HelpCircle className="mb-1 h-5 w-5" />
                    Hints
                </button>

                <button
                    onClick={() => setShowAbout(true)}
                    className="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground"
                >
                    <Info className="mb-1 h-5 w-5" />
                    About
                </button>
            </div>

            {/* Info modals */}
            <InfoModal
                isOpen={showRules}
                onClose={() => setShowRules(false)}
                title="Game Rules"
            >
                <GameRulesContent />
            </InfoModal>

            <InfoModal
                isOpen={showHints}
                onClose={() => setShowHints(false)}
                title="Game Hints & Strategies"
            >
                <GameHintsContent />
            </InfoModal>

            <InfoModal
                isOpen={showAbout}
                onClose={() => setShowAbout(false)}
                title="About This Project"
            >
                <AboutProjectContent />
            </InfoModal>
        </div>
    );
}