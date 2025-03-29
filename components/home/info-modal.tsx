"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function InfoModal({ isOpen, onClose, title, children }: InfoModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg border-2 border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-accent">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none">
                    {children}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
}