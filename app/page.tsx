"use client";

import { Header } from "@/components/header";
import { GameLobby} from "@/components/game/game_lobby";
import { WaitingRoom} from "@/components/game/waiting_room";
import { GameContainer} from "@/components/game/game_container";
import { useGameStore } from "@/stores/gameStore";
import { useEffect } from "react";

export default function Home() {
    const { gameState, resetGame } = useGameStore();

    // Reset game state when component mounts
    useEffect(() => {
        resetGame();
    }, [resetGame]);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            <main className="flex-1 w-full px-4 py-6 md:px-6">
                <div className="mx-auto w-full max-w-7xl">
                    {gameState === 'init' && <GameLobby />}
                    {gameState === 'waiting' && <WaitingRoom />}
                    {(gameState === 'playing' || gameState === 'over') && <GameContainer />}
                </div>
            </main>

            <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
                <div className="container mx-auto px-4">
                    © {new Date().getFullYear()} Tic-Tac-Toe Online • All rights reserved
                </div>
            </footer>
        </div>
    );
}