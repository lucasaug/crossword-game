import { useReducer, useState } from 'react';


import {
    CellData,
    isClueCell,
    isLetterCell,
    ClueCell,
    EmptyCell,
    LetterCell
} from './Cell';

export enum Direction {
    VERTICAL = 1,
    HORIZONTAL
}


interface GridPosition {
    x: number,
    y: number,
};

interface CrosswordEntry {
    value: string,
    clue: string,
    startPosition: GridPosition,
    direction: Direction,
};

interface CrosswordGridProps {
    entries: CrosswordEntry[],
    width: number,
    height: number,
}

function fillWord(gridArray: CellData[][], entry: CrosswordEntry) {
    let x = entry.startPosition.x;
    let y = entry.startPosition.y;

    for (let i = 0; i < entry.value.length; i++) {
        if (entry.direction == Direction.VERTICAL) {
            x++;
        } else {
            y++;
        }

        gridArray[x][y] = {
            ...gridArray[x][y],
            value: ' '
        }
    }
}

function createInitialGrid(props: CrosswordGridProps): CellData[][] {
    let gridArray: CellData[][] = [];
    for (let i = 0; i < props.height; i++) {
        gridArray.push(Array(props.width));
        for (let j = 0; j < props.width; j++) {
            gridArray[i][j] = {};
        }
    }

    let horizontalCount = 0, verticalCount = 0;
    for (const entry of props.entries) {
        let x = entry.startPosition.x;
        let y = entry.startPosition.y;

        if (entry.direction == Direction.VERTICAL) {
            gridArray[x][y] = {
                ...gridArray[x][y],
                vertical: verticalCount
            }
            verticalCount++;
        } else {
            gridArray[x][y] = {
                ...gridArray[x][y],
                horizontal: horizontalCount
            }
            horizontalCount++;
        }

        fillWord(gridArray, entry);
    }

    return gridArray;
}

function updateGrid(state: CellData[][], action): CellData[][] {
    let result = [];
    for (let row of state) {
        result.push([...row]);
    }

    return result
}


export function CrosswordGrid({ entries, width, height }: CrosswordGridProps) {
    const [gridArray, dispatch] = useReducer(
        updateGrid, { entries, width, height }, createInitialGrid
    );

    const [direction, setDirection] = useState<Direction>(Direction.VERTICAL);

    const GridStyle = {
        backgroundColor: "black",
        display: "inline-grid",
        gridTemplateRows: "40px ".repeat(width),
        gridTemplateColumns: "40px ".repeat(height),
        gap:"1px"
    }

    return (
    <div style={GridStyle}>
        {
        gridArray.map((row, i) => (
                row.map((cellData, j) => {
                    const key = `${i} ${j}`
                    if (isClueCell(cellData)) {
                        return <ClueCell key={key}
                            horizontal={cellData.horizontal}
                            vertical={cellData.vertical}
                            style={{ gridRow: i+1, gridColumn: j+1 }}
                        />
                    } else if (isLetterCell(cellData)) {
                        return <LetterCell key={key}
                            value={cellData.value}
                            style={{ gridRow: i+1, gridColumn: j+1 }}
                        />
                    } else {
                        return <EmptyCell key={key}
                            style={{ gridRow: i+1, gridColumn: j+1 }}
                        />
                    }
                })
        ))
        }
    </div>
    );
}
