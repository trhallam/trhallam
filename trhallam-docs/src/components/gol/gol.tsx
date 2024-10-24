import { useRef, useLayoutEffect, Component, useEffect, useState } from 'react';

// gol modules
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

//     let require("@trhallam/gol/wasm_rust_gol_bg.wasm")
import { Universe, Cell } from "@trhallam/gol/wasm_rust_gol";
import { memory } from "@trhallam/gol/wasm_rust_gol_bg.wasm";

// require('@trhallam/gol');

import { drawGrid, drawCells } from "./draw";

// Styling
import styles from './styles.module.css';

// This helped a lot with the animation of the canvas using functions.
// https://github.com/dtkelch/react-canvas-animations/blob/main/src/OptionOne.tsx

export const GoL: React.FC = () => {

    const [animate, setAnimate] = useState(true);
    const [universe, setUniverse] = useState(Universe.new());
    const canvas = useRef<HTMLCanvasElement | null>(null);
    // const universe = Universe.new();
    const width = universe.width();
    const height = universe.height();
    const cell_size: number = 5;
    //         this.height = this.universe.height();
    let cellsPtr = universe.cells();
    let cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            setAnimate((v) => !v);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        universe.tick();
        drawGrid({ canvas, cell_size, universe, cells, width, height });
        drawCells({ canvas, cell_size, universe, cells, width, height });

    }, [animate]);

    return (
        <div className={styles.div_canvas}>
            <p className={styles.p_canvas}><canvas ref={canvas} width={500} height={400} /></p>
        </div>
    )
}
