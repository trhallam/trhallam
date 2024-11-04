export type ColourValueHex = `#${string}`;

interface DrawGoLProps {
    canvas: React.MutableRefObject<HTMLCanvasElement | null>;
    cell_size: number;
    height: number;
    width: number;
};

export const drawGrid = (props: DrawGoLProps) => {
    const GRID_COLOR: ColourValueHex = "#CCCCCC";

    const { canvas, cell_size, width, height } = props;
    const ctx = canvas?.current?.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (cell_size + 1) + 1, 0);
        ctx.lineTo(i * (cell_size + 1) + 1, (cell_size + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (cell_size + 1) + 1);
        ctx.lineTo((cell_size + 1) * width + 1, j * (cell_size + 1) + 1);
    }

    ctx.stroke();
};

export const drawCells = (props: DrawGoLProps, cells: Uint8Array<any>, dead: any) => {
    const DEAD_COLOR: ColourValueHex = "#FFFFFF";
    const ALIVE_COLOR: ColourValueHex = "#000000";
    const { canvas, cell_size, width, height } = props;
    const ctx = canvas?.current?.getContext('2d');
    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let idx = row * width + col;
            ctx.fillStyle = cells[idx] === dead
                ? DEAD_COLOR
                : ALIVE_COLOR;

            ctx.fillRect(
                col * (cell_size + 1) + 1,
                row * (cell_size + 1) + 1,
                cell_size,
                cell_size
            );
        }
    }

    ctx.stroke();
};
