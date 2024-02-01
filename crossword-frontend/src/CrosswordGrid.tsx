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
    }

    gridArray[5][5] = { value: 'L' }

    return gridArray;
}

function updateGrid(state: CellData[][], action): CellData[][] {
    let result = [];
    for (let row of state) {
        result.push([...row]);
    }

    return result
}

const GridStyle = {
    border: "solid",
    display: "inline",
}


export function CrosswordGrid({ entries, width, height }: CrosswordGridProps) {
    const [gridArray, dispatch] = useReducer(
        updateGrid, { entries, width, height }, createInitialGrid
    );

    const [direction, setDirection] = useState<Direction>(Direction.VERTICAL);

    return (
    <div style={GridStyle}>
        {
        gridArray.map((row, i) => (
            <div key={i}>
            {
                row.map((cellData, j) => {
                    if (isClueCell(cellData)) {
                        return <ClueCell key={j}
                            horizontal={cellData.horizontal}
                            vertical={cellData.vertical}
                        />
                    } else if (isLetterCell(cellData)) {
                        return <LetterCell key={j}
                            value={cellData.value}
                        />
                    } else {
                        return <EmptyCell key={j} />
                    }
                })
            }
               <br />
            </div>
        ))
        }
    </div>
    );
}
