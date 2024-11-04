import { useRef, useEffect, useState } from 'react';

import { drawGrid, drawCells } from "./draw";
// Styling
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

// This helped a lot with the animation of the canvas using functions.
// https://github.com/dtkelch/react-canvas-animations/blob/main/src/OptionOne.tsx

export type ColourValueHex = `#${string}`;

function render(): JSX.Element {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const cell_size: number = 5;

    const [animate, setAnimate] = useState(true);
    const [universe, setUniverse] = useState(null);
    const [gol, setGol] = useState(null);
    const [wasm, setWasm] = useState(null);

    // https://github.com/facebook/docusaurus/discussions/9435
    useEffect(() => {
        import("@trhallam/gol").then(setGol);
        import("@trhallam/gol/wasm_rust_gol_bg.wasm").then(setWasm);
    }, [])

    // initialise after import
    useEffect(() => {
        if (!gol) { return };
        setUniverse(gol.Universe.new());
    }, [gol])

    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            setAnimate((v) => !v);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!gol && !wasm) { return };
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        const width = universe.width();
        const height = universe.height();
        let cellsPtr = universe.cells();
        let cells = new Uint8Array(wasm.memory.buffer, cellsPtr, width * height);

        universe.tick();
        drawGrid({ canvas, cell_size, width, height });
        drawCells({ canvas, cell_size, width, height }, cells, gol.Cell.Dead);

    }, [animate]);

    return (
        <div className={styles.div_canvas}>
            <p className={styles.p_canvas}><canvas ref={canvas} width={500} height={400} /></p>
        </div>
    );
}

export const GoL: React.FC = () => {
    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => { return render() }}
        </BrowserOnly>
    )
}
