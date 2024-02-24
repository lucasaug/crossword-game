import { useEffect, useReducer, useState } from 'react';

import {
    CellData,
    isClueCell,
    isLetterCell,
    ClueCell,
    EmptyCell,
    LetterCell,
    LetterCellData
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
};

enum GridActionType {
    KEY_PRESS = "KEY_PRESS",
};

type GridKeyAction = {
    type: typeof GridActionType.KEY_PRESS,
    key: string,
    x: number,
    y: number,
};

type GridAction = GridKeyAction;

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

function updateGrid(state: CellData[][], action: GridAction): CellData[][] {
    let result = [];
    for (let row of state) {
        result.push([...row]);
    }

    let cell = result[action.x][action.y];
    if (isLetterCell(cell)) {
        let letterCell = cell as LetterCellData;
        letterCell.value = action.key;
    }

    return result
}


export function CrosswordGrid({ entries, width, height }: CrosswordGridProps) {
    const [gridArray, dispatch] = useReducer(
        updateGrid, { entries, width, height }, createInitialGrid
    );

    const [direction, setDirection] = useState<Direction>(Direction.VERTICAL);
    const [position, setPosition] = useState<GridPosition>({ x: 4, y: 4 });

    const GridStyle = {
        backgroundColor: "black",
        display: "inline-grid",
        gridTemplateRows: "40px ".repeat(width),
        gridTemplateColumns: "40px ".repeat(height),
        gap:"1px"
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            const isLetter = (64 < event.keyCode && event.keyCode < 91) ||
                (96 < event.keyCode && event.keyCode < 123);

            if (isLetter) {
                const action = {
                    key: event.key,
                    type: GridActionType.KEY_PRESS,
                    x: position.x,
                    y: position.y,
                };
                dispatch(action);
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

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
