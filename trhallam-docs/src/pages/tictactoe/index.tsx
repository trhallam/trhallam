import { useState } from 'react';
import Layout from '@theme/Layout';
import { Column, Row, Page } from '@site/src/components/Common';
import styles from './index.module.css';

/** Follow along from https://react.dev/learn/tutorial-tic-tac-toe but using TypeScript*/

interface SquareProps {
    /** The text to display in the square */
    value: string;
    /** The event on a clicked Square */
    onSquareClick: () => void
}


export function Square({ value, onSquareClick }: SquareProps): JSX.Element {
    return (
        <button
            className={styles.square}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}

export function PopUp(
    msg: string,
    button_msg: string,
    onButtonClick: () => void
): JSX.Element {
    return (
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px" }}>
                {msg}
            </div>
            <button className={styles.button} onClick={onButtonClick}>{button_msg}</button>
        </div>
    )
}

export function Board(): JSX.Element {
    // State variables to keep track of the game
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [wins, _] = useState({ 'X': 0, 'O': 0 })

    // check if a winner and update the status or show popup to reset
    const winner: string = calculateWinner(squares);
    let status: string;
    let popup: JSX.Element = null;
    if (winner) {
        status = "Game over, " + winner + " wins!";
        wins[winner] = wins[winner] += 1;
        popup = PopUp(
            status,
            "Play again?",
            () => handleResetClick()
        )
    } else {
        status = "Next player is " + (xIsNext ? "X" : "O");
    }

    function handleSquareClick(i: number) {
        // not allowed to overwrite
        if (squares[i] || winner) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setXIsNext(!xIsNext);
        setSquares(nextSquares);
    }

    // Reset the game with null values.
    function handleResetClick(): void {
        // The loser goes first
        setSquares(Array(9).fill(null));
    }

    function RenderSquare({ n }: { n: number }) {
        return <Square value={squares[n]} onSquareClick={() => handleSquareClick(n)}></Square>
    }

    return (
        <>
            <div className={styles.board_status}>{status}</div>
            <div className={styles.board_row}>
                <RenderSquare n={0} />
                <RenderSquare n={1} />
                <RenderSquare n={2} />
            </div>
            <div className={styles.board_row}>
                <RenderSquare n={3} />
                <RenderSquare n={4} />
                <RenderSquare n={5} />
            </div>
            <div className={styles.board_row}>
                <RenderSquare n={6} />
                <RenderSquare n={7} />
                <RenderSquare n={8} />
            </div>
            <div style={{ fontSize: "xx-large" }}>
                Wins: X {wins['X']} | O {wins['O']}
            </div>
            {popup &&
                <div className={styles.popup}>{popup}</div>
            }
        </>
    )
}

function calculateWinner(squares: string[]): string {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Explanation(): JSX.Element {
    return (
        <div className={styles.instructions}>
            <h1>React Tic-tac-toe</h1>
            <p>A TypeScript recreation of the React tutorial. Additions include; the use of TypeScript
                a reset popup rather than a history and a win counter for each player.
                Styling is via CSS which also includes integration into the Docusaurus colour variables.</p>
            <p>Checkout the tutorial <a href="https://react.dev/learn/tutorial-tic-tac-toe">here</a>.</p>
        </div>
    )
}

export default function Game(): JSX.Element {
    return (
        <Layout
            title={`TicTacToe`}
            description="The React tutorial">
            {
                <Page>
                    <Row >
                        <Column >
                            <Explanation />
                        </Column>
                        <Column>
                            <Board />
                        </Column>
                    </Row>
                </Page>
            }
        </Layout >
    );
}
