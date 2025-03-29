import { create } from 'zustand';
import { Socket } from 'socket.io-client';

export type GameSize = '3x3' | '6x6' | '9x9';
export type PlayerSymbol = 'X' | 'O' | null;
export type GameState = 'init' | 'waiting' | 'playing' | 'over';
export type RestartRequestStatus = 'none' | 'pending' | 'accepted' | 'declined';

interface ChatMessage {
    sender: string;
    message: string;
}

interface GameResult {
    winner: PlayerSymbol | 'draw';
    winningLine: number[];
}

interface GameStore {
    // Connection
    socket: Socket | null;
    setSocket: (socket: Socket) => void;

    // Game details
    gameId: string;
    setGameId: (id: string) => void;
    gameSize: GameSize;
    setGameSize: (size: GameSize) => void;
    hostStarts: boolean;
    setHostStarts: (starts: boolean) => void;

    // Player info
    isHost: boolean;
    setIsHost: (isHost: boolean) => void;
    playerSymbol: PlayerSymbol;
    setPlayerSymbol: (symbol: PlayerSymbol) => void;

    // Game state
    gameState: GameState;
    setGameState: (state: GameState) => void;
    board: (PlayerSymbol)[];
    setBoard: (board: (PlayerSymbol)[]) => void;
    turn: PlayerSymbol;
    setTurn: (turn: PlayerSymbol) => void;

    // Game result
    result: GameResult | null;
    setResult: (result: GameResult | null) => void;

    // Chat
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    chatInput: string;
    setChatInput: (input: string) => void;

    // UI state
    showRestartRequest: boolean;
    setShowRestartRequest: (show: boolean) => void;
    restartRequestStatus: RestartRequestStatus;
    setRestartRequestStatus: (status: RestartRequestStatus) => void;

    // Actions
    resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    // Connection
    socket: null,
    setSocket: (socket) => set({ socket }),

    // Game details
    gameId: '',
    setGameId: (id) => set({ gameId: id }),
    gameSize: '3x3',
    setGameSize: (size) => set({ gameSize: size }),
    hostStarts: true,
    setHostStarts: (starts) => set({ hostStarts: starts }),

    // Player info
    isHost: false,
    setIsHost: (isHost) => set({ isHost }),
    playerSymbol: null,
    setPlayerSymbol: (symbol) => set({ playerSymbol: symbol }),

    // Game state
    gameState: 'init',
    setGameState: (state) => set({ gameState: state }),
    board: Array(9).fill(null),
    setBoard: (board) => set({ board }),
    turn: 'X',
    setTurn: (turn) => set({ turn }),

    // Game result
    result: null,
    setResult: (result) => set({ result }),

    // Chat
    messages: [],
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    chatInput: '',
    setChatInput: (input) => set({ chatInput: input }),

    // UI state
    showRestartRequest: false,
    setShowRestartRequest: (show) => set({ showRestartRequest: show }),
    restartRequestStatus: 'none',
    setRestartRequestStatus: (status) => set({ restartRequestStatus: status }),

    // Actions
    resetGame: () => set({
        gameId: '',
        gameState: 'init',
        board: Array(9).fill(null),
        turn: 'X',
        playerSymbol: null,
        result: null,
        messages: [],
        showRestartRequest: false,
        restartRequestStatus: 'none'
    })
}));