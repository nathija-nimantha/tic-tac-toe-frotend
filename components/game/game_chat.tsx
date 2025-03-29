"use client";

import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useRef } from "react";

export function GameChat() {
    const {
        messages,
        chatInput,
        setChatInput,
        playerSymbol,
        socket,
        gameId,
        gameState
    } = useGameStore();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (chatInput.trim() && socket && gameId && playerSymbol) {
            socket.emit("chatMessage", {
                gameId,
                message: chatInput,
                sender: playerSymbol
            });
            setChatInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    if (gameState !== 'playing' && gameState !== 'over' && gameState !== 'waiting') {
        return null;
    }

    return (
        <div className="h-full flex flex-col rounded-lg border-2 border-border bg-card shadow-sm">
            <div className="flex items-center border-b-2 border-border p-3">
                <MessageCircle className="mr-2 h-5 w-5" />
                <h3 className="font-semibold">Game Chat</h3>
            </div>

            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-accent"
            >
                {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <MessageCircle className="mb-2 h-8 w-8 opacity-40" />
                        <p className="text-sm font-medium">No messages yet</p>
                        <p className="text-xs">Send a message to your opponent</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${
                                    msg.sender === playerSymbol
                                        ? "my-message"
                                        : "other-message"
                                }`}
                            >
                                <div className="mb-1 text-xs font-bold">
                                    {msg.sender === playerSymbol ? "You" : "Opponent"} ({msg.sender})
                                </div>
                                <div>{msg.message}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t-2 border-border p-3">
                <div className="flex">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 rounded-l-md border-2 border-r-0 border-input bg-background px-3 py-2 text-sm"
                    />
                    <Button
                        onClick={sendMessage}
                        className="rounded-l-none"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}