import { useEffect, useReducer, useState } from 'react';

import { Direction, GridPosition } from './Cell.tsx';

import {
    CellData,
    isClueCell,
    isLetterCell,
    ClueCell,
    EmptyCell,
    LetterCell,
    LetterCellData
} from './Cell';

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
        let directionInfo: { isHorizontal?: boolean, isVertical?: boolean } =
            {};
        if (entry.direction == Direction.VERTICAL) {
            x++;
            directionInfo["isVertical"] = true;
        } else {
            y++;
            directionInfo["isHorizontal"] = true;
        }

        gridArray[x][y] = {
            ...gridArray[x][y],
            ...directionInfo,
            value: ' ',
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
    const isLetter = action.key.length == 1 && action.key[0].match(/[a-z]/i);
    if (isLetterCell(cell)) {
        let letterCell = cell as LetterCellData;
        if (isLetter) letterCell.value = action.key.toUpperCase();
        else letterCell.value = " ";
    }

    return result
}

export function CrosswordGrid({ entries, width, height }: CrosswordGridProps) {
    console.log(entries)
    const [gridArray, dispatch] = useReducer(
        updateGrid, { entries, width, height }, createInitialGrid
    );

    const [direction, setDirection] = useState<Direction>(Direction.VERTICAL);
    const [position, setPosition] = useState<GridPosition>({ x: 4, y: 4 });

    const GridStyle = {
        padding: "5px",
        backgroundColor: "white",
        display: "inline-grid",
        gridTemplateRows: "60px ".repeat(width),
        gridTemplateColumns: "60px ".repeat(height),
        gap:"5px",
        fontSize: "32px",
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            const isLetter = event.key.length == 1 &&
                event.key[0].match(/[a-z]/i);
            const isBackspace = event.key == "Backspace";
            const isDelete = event.key == "Delete";

            const {x, y} = position;

            if (isLetter || isBackspace || isDelete) {
                const action = {
                    key: event.key,
                    type: GridActionType.KEY_PRESS,
                    x: x,
                    y: y,
                };
                dispatch(action);

                if (isLetter) {
                    if (
                        direction == Direction.VERTICAL &&
                        position.x < width - 1 &&
                        isLetterCell(gridArray[x + 1][y])
                    ) {
                        setPosition({ x: position.x + 1, y: position.y })
                    }
                    if (
                        direction == Direction.HORIZONTAL &&
                        position.y < height - 1 &&
                        isLetterCell(gridArray[x][y + 1])
                    ) {
                        setPosition({ x: position.x, y: position.y + 1 })
                    }
                } else if (isBackspace) {
                    if (
                        direction == Direction.VERTICAL &&
                        position.x > 0 &&
                        isLetterCell(gridArray[x - 1][y])
                    ) {
                        setPosition({ x: position.x - 1, y: position.y })
                    }
                    if (
                        direction == Direction.HORIZONTAL &&
                        position.y > 0 &&
                        isLetterCell(gridArray[x][y - 1])
                    ) {
                        setPosition({ x: position.x, y: position.y - 1 })
                    }
                }
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [position, direction]);

    function clickCallback({ x, y }: GridPosition ) {
        return () => {
            let cell = gridArray[x][y];
            if (isLetterCell(cell)) {
                if (position.x != x || position.y != y) {
                    setPosition({ x: x, y: y })
                    if (cell.isHorizontal) setDirection(Direction.HORIZONTAL);
                    else if (cell.isVertical) setDirection(Direction.VERTICAL);
                } else {
                    if (cell.isHorizontal && cell.isVertical) {
                        if (direction == Direction.HORIZONTAL)
                            setDirection(Direction.VERTICAL);
                        else
                            setDirection(Direction.HORIZONTAL);
                    }
                }
            }
        };
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
                        onClick={ clickCallback({ x: i, y: j}) }
                    />
                } else if (isLetterCell(cellData)) {
                    return <LetterCell key={key}
                        value={cellData.value}
                        style={{ gridRow: i+1, gridColumn: j+1 }}
                        highlighted={ i == position.x && j == position.y }
                        currentDirection={
                            (i == position.x && j == position.y) ?
                                direction : undefined
                        }
                        onClick={ clickCallback({ x: i, y: j}) }
                    />
                } else {
                    return <EmptyCell key={key}
                        style={{ gridRow: i+1, gridColumn: j+1 }}
                        onClick={ clickCallback({ x: i, y: j}) }
                    />
                }
            })
        ))
        }
    </div>
    );
}
