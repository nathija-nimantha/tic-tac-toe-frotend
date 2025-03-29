"use client";

import { useGameStore } from "@/stores/gameStore";
import { GameBoard} from "@/components/game/game_board";
import { GameStatus} from "@/components/game/game_status";
import { GameChat} from "@/components/game/game_chat";
import { RestartModal} from "@/components/game/restart_modal";
import { SettingsModal} from "@/components/game/game_settings";
import { Settings } from "lucide-react";
import { useState } from "react";

export function GameContainer() {
    const { gameState } = useGameStore();
    const [showSettings, setShowSettings] = useState(false);

    if (gameState !== 'playing' && gameState !== 'over') {
        return null;
    }

    return (
        <div className="w-full py-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex justify-end mb-2">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </button>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <GameBoard />
                            <GameStatus />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <GameChat />
                </div>
            </div>

            {/* Modals */}
            <RestartModal />
            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </div>
    );
}