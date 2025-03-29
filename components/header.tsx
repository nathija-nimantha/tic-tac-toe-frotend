"use client";

import { ThemeToggle} from "@/components/theme_toggle";
import { useGameStore } from "@/stores/gameStore";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
    const { gameId, playerSymbol, gameState } = useGameStore();

    return (
        <header className="w-full border-b border-border bg-card">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">Tic-Tac-Toe</div>
                    {gameState !== 'init' && (
                        <div className="hidden items-center space-x-4 md:flex">
                            <div className="rounded-full bg-accent/50 px-3 py-1 text-sm">
                                Game: <span className="font-mono font-bold">{gameId}</span>
                            </div>
                            {playerSymbol && (
                                <div className="rounded-full bg-accent/50 px-3 py-1 text-sm">
                                    You: <span className={`font-bold ${playerSymbol === 'X' ? 'player-x' : 'player-o'}`}>{playerSymbol}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        href="https://github.com/nathija-nimantha/tic-tac-toe-frotend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full p-2 hover:bg-accent/50"
                    >
                        <GithubIcon className="h-5 w-5" />
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}