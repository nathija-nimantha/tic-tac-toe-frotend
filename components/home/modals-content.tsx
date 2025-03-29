export const GameRulesContent = () => (
    <>
        <h3>How to Play Tic-Tac-Toe</h3>
        <p>
            Tic-Tac-Toe is a classic two-player game where each player takes turns marking spaces on a grid.
            The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins the game.
        </p>

        <h4>Game Rules:</h4>
        <ul>
            <li>Players take turns placing their symbol (X or O) on the board</li>
            <li>X always goes first</li>
            <li>A player wins by getting 3 of their symbols in a row (horizontally, vertically, or diagonally)</li>
            <li>If the board fills up with no winner, the game ends in a draw</li>
        </ul>

        <h4>In This Game:</h4>
        <ul>
            <li><strong>Board Sizes:</strong> You can play on 3x3, 6x6, or 9x9 boards</li>
            <li><strong>Win Condition:</strong> Get 3 in a row to win (on all board sizes)</li>
            <li><strong>Host Controls:</strong> The host can choose who plays as X (and goes first)</li>
            <li><strong>Chat:</strong> You can chat with your opponent during the game</li>
        </ul>

        <h4>Getting Started:</h4>
        <ol>
            <li>Create a game and share the Game ID with a friend</li>
            <li>Or join an existing game by entering a Game ID</li>
            <li>Take turns making moves until someone wins or the game ends in a draw</li>
            <li>The host can restart the game after it ends</li>
        </ol>
    </>
);

export const AboutProjectContent = () => (
    <>
        <h3>About This Project</h3>
        <p>
            This Tic-Tac-Toe Online game was built as a modern web application showcasing real-time multiplayer
            functionality using WebSockets.
        </p>

        <h4>Technical Stack:</h4>
        <ul>
            <li><strong>Frontend:</strong> Next.js 14, TypeScript, Tailwind CSS</li>
            <li><strong>State Management:</strong> Zustand</li>
            <li><strong>Real-time Communication:</strong> Socket.IO</li>
            <li><strong>Backend:</strong> Node.js, Express</li>
            <li><strong>Styling:</strong> Custom theming with next-themes</li>
        </ul>

        <h4>Key Features:</h4>
        <ul>
            <li><strong>Real-time Gameplay:</strong> Play with friends instantly with no delay</li>
            <li><strong>Multiple Board Sizes:</strong> Choose between 3x3, 6x6, and 9x9 boards</li>
            <li><strong>Custom Game Settings:</strong> Host can control who starts and board size</li>
            <li><strong>In-game Chat:</strong> Communication with your opponent</li>
            <li><strong>Responsive Design:</strong> Works on mobile, tablet, and desktop</li>
            <li><strong>Multiple Themes:</strong> Light, Dark, GitHub, and Colorful themes</li>
        </ul>

        <h4>How It Works:</h4>
        <p>
            The game uses WebSockets via Socket.IO to enable real-time communication between players.
            When you make a move, the information is sent to the server, which validates it and broadcasts
            the updated game state to all connected players. This provides an instant, synchronized experience
            for both players.
        </p>

        <p>
            The server manages game rooms, player connections, and enforces game rules. The client-side
            code handles rendering the game board, processing user input, and managing the user interface.
        </p>
    </>
);

export const GameHintsContent = () => (
    <>
        <h3>Game Hints & Strategies</h3>

        <h4>Basic Strategies:</h4>
        <ul>
            <li><strong>Take the Center:</strong> On a 3x3 board, the center position is strategically valuable as it&#39;s part of 4 possible winning combinations</li>
            <li><strong>Go for Corners:</strong> Corners are the next best positions on a 3x3 board</li>
            <li><strong>Block Your Opponent:</strong> If your opponent has two in a row, block the third position</li>
            <li><strong>Create a Fork:</strong> Set up two possible winning moves in a single turn</li>
        </ul>

        <h4>For Larger Boards (6x6, 9x9):</h4>
        <ul>
            <li><strong>Focus on Sections:</strong> Think of the larger board as multiple smaller 3x3 areas</li>
            <li><strong>Plan Ahead:</strong> With more spaces, you need to think several moves ahead</li>
            <li><strong>Watch for Diagonals:</strong> With larger boards, diagonal wins can be harder to spot</li>
            <li><strong>Control the Center:</strong> The center area is still strategically important</li>
        </ul>

        <h4>Communication Tips:</h4>
        <ul>
            <li>Use the chat to coordinate game restarts</li>
            <li>Be a good sport - congratulate your opponent on good moves</li>
            <li>You can suggest changing board sizes between games</li>
        </ul>

        <h4>Perfect Play:</h4>
        <p>
            On a standard 3x3 board with perfect play from both players, the game will always end in a draw.
            This is why larger boards add more strategy and unpredictability to the game!
        </p>
    </>
);
