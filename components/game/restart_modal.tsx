"use client";

import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function RestartModal() {
    const {
        showRestartRequest,
        setShowRestartRequest,
        socket,
        gameId,
        setRestartRequestStatus
    } = useGameStore();

    const handleRestartRequest = (accept: boolean) => {
        if (socket && gameId) {
            if (accept) {
                socket.emit("restartGame", gameId);
                setRestartRequestStatus('accepted');
            } else {
                // If declined, notify the host
                socket.emit("declineRestart", gameId);
            }
            setShowRestartRequest(false);
        }
    };

    if (!showRestartRequest) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
                <div className="mb-4 flex items-center">
                    <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Restart Request</h3>
                </div>

                <p className="mb-6">
                    The host wants to restart the game. Do you accept?
                </p>

                <div className="flex justify-end space-x-3">
                    <Button
                        variant="outline"
                        onClick={() => handleRestartRequest(false)}
                    >
                        Decline
                    </Button>
                    <Button
                        onClick={() => handleRestartRequest(true)}
                    >
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    );
}