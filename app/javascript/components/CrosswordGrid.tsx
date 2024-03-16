import React from 'react';

import { useEffect, useReducer, useState } from 'react';

import { ClueData, Direction, GridPosition } from './Cell';
import { CrosswordEntrySet, CrosswordEntry } from './Crossword';

import {
    CellData,
    isLetterCell,
    EmptyCell,
    LetterCell,
    LetterCellData
} from './Cell';

export interface CrosswordGridProps {
    entries: CrosswordEntrySet,
    width: number,
    height: number,
    cellSize: string,
    gapSize: string,
    fontSize: string,
    backgroundColor: string,
    emptyCellColor: string,
    letterCellColor: string,
    highlightColor: string,
    onCellChange: React.ChangeEvent<HTMLInputElement>,
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

function fillWord(
    gridArray: CellData[][],
    entry: CrosswordEntry,
    direction: Direction
) {
    let x = entry.startPosition.x;
    let y = entry.startPosition.y;

    let directionInfo: ClueData = {
        showClue: false,
        clueNumber: entry.clueNumber,
    };

    for (let i = 0; i < entry.value.length; i++) {
        gridArray[x][y] = {
            ...gridArray[x][y],
            value: ' ',
        };

        if (direction == Direction.VERTICAL) {
            gridArray[x][y]["verticalClue"] = {...directionInfo};
            x++
        } else {
            gridArray[x][y]["horizontalClue"] = {...directionInfo};
            y++
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

    props.entries.across.forEach((entry) => {
        let x = entry.startPosition.x;
        let y = entry.startPosition.y;

        fillWord(gridArray, entry, Direction.HORIZONTAL);

        gridArray[x][y].horizontalClue.showClue = true;
    });

    props.entries.down.forEach((entry) => {
        let x = entry.startPosition.x;
        let y = entry.startPosition.y;

        fillWord(gridArray, entry, Direction.VERTICAL);

        gridArray[x][y].verticalClue.showClue = true;
    });

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

export function CrosswordGrid({
    entries,
    width,
    height,
    cellSize="60px",
    gapSize="5px",
    fontSize="32px",
    backgroundColor="white",
    emptyCellColor="#7755CC",
    letterCellColor="#EEEEFF",
    highlightColor="#EEEE77",
    onCellChange
}: CrosswordGridProps) {
    let firstDirection = Direction.HORIZONTAL;
    let firstCell = entries.across.find((entry) => entry.clueNumber === 1);
    if (!firstCell) {
        firstDirection = Direction.VERTICAL;
        firstCell = entries.down.find((entry) => entry.clueNumber === 1);
    }

    const [gridArray, dispatch] = useReducer(
        updateGrid, { entries, width, height }, createInitialGrid
    );

    const [direction, setDirection] = useState<Direction>(firstDirection);
    const [position, setPosition] = useState<GridPosition>(firstCell?.startPosition);

    const GridStyle = {
        padding: gapSize,
        backgroundColor: backgroundColor,
        display: "inline-grid",
        gridTemplateRows: `${cellSize} `.repeat(width),
        gridTemplateColumns: `${cellSize} `.repeat(height),
        gap: gapSize,
        fontSize: fontSize,
    };

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            const isLetter = event.key.length == 1 &&
                event.key[0].match(/[a-z]/i);
            const isBackspace = event.key == "Backspace";
            const isDelete = event.key == "Delete";
            const isArrowKey = event.key.substring(0, 5) === "Arrow";
            const isTab = event.key === "Tab";

            const {x, y} = position;
            let newPosition = {...position};
            let newDirection = direction;

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
                        direction == Direction.VERTICAL && x < width - 1 &&
                        isLetterCell(gridArray[x + 1][y])
                    ) {
                        newPosition = { x: x + 1, y: y };
                    }
                    if (
                        direction == Direction.HORIZONTAL && y < height - 1 &&
                        isLetterCell(gridArray[x][y + 1])
                    ) {
                        newPosition = { x: x, y: y + 1 };
                    }
                } else if (isBackspace) {
                    if (
                        direction == Direction.VERTICAL && x > 0 &&
                        isLetterCell(gridArray[x - 1][y])
                    ) {
                        newPosition = { x: x - 1, y: y };
                    }
                    if (
                        direction == Direction.HORIZONTAL && y > 0 &&
                        isLetterCell(gridArray[x][y - 1])
                    ) {
                        newPosition = { x: x, y: y - 1 };
                    }
                }
            } else if (isArrowKey) {
                if (event.key == "ArrowUp" && x > 0 &&
                    isLetterCell(gridArray[x - 1][y])
                ) {
                    newPosition = { x: x - 1, y: y };
                    newDirection = Direction.VERTICAL;
                } else if (
                    event.key == "ArrowDown" && x < height &&
                    isLetterCell(gridArray[x + 1][y])
                ) {
                    newPosition = { x: x + 1, y: y };
                    newDirection = Direction.VERTICAL;
                } else if (
                    event.key == "ArrowLeft" && y > 0 &&
                    isLetterCell(gridArray[x][y - 1])
                ) {
                    newPosition = { x: x, y: y - 1 };
                    newDirection = Direction.HORIZONTAL;
                } else if (
                    event.key == "ArrowRight" && y < width &&
                    isLetterCell(gridArray[x][y + 1])
                ) {
                    newPosition = { x: x, y: y + 1 };
                    newDirection = Direction.HORIZONTAL;
                }
            } else if (isTab) {
                event.preventDefault();

                const numClues = entries.across.length + entries.down.length;

                const currentIndex = direction === Direction.VERTICAL ?
                    gridArray[x][y].verticalClue.clueNumber :
                    gridArray[x][y].horizontalClue.clueNumber;

                let nextIndex = currentIndex + 1;
                if (nextIndex > numClues) nextIndex = 1;

                let nextDirection = Direction.HORIZONTAL;
                let nextCell = entries.across.find(
                    (entry) => entry.clueNumber === nextIndex
                );
                if (!nextCell) {
                    nextDirection = Direction.VERTICAL;
                    nextCell = entries.down.find(
                        (entry) => entry.clueNumber === nextIndex
                    );
                }

                if (nextCell) {
                    newPosition = nextCell.startPosition;
                    newDirection = nextDirection;
                }
            }

            if (newPosition !== position || newDirection !== direction) {
                setPosition(newPosition);
                setDirection(newDirection);

                const { newX, newY } = newPosition;
                onCellChange(
                    newPosition,
                    newDirection,
                    gridArray[newX][newY].clueNumber
                );
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
                    if (cell.horizontalClue) setDirection(Direction.HORIZONTAL);
                    else if (cell.verticalClue) setDirection(Direction.VERTICAL);
                } else {
                    if (cell.horizontalClue && cell.verticalClue) {
                        if (direction == Direction.HORIZONTAL)
                            setDirection(Direction.VERTICAL);
                        else
                            setDirection(Direction.HORIZONTAL);
                    }
                }
            }
        };
    }

    return <div style={GridStyle}>
        {
        gridArray.map((row, i) => (
            row.map((cellData, j) => {
                const key = `${i} ${j}`
                if (isLetterCell(cellData)) {
                    return <LetterCell key={key}
                        data={cellData}
                        style={{ gridRow: i+1, gridColumn: j+1 }}
                        highlighted={ i == position.x && j == position.y }
                        currentDirection={
                            (i == position.x && j == position.y) ?
                                direction : undefined
                        }
                        onClick={ clickCallback({ x: i, y: j}) }
                        cellColor={letterCellColor}
                        highlightColor={highlightColor}
                    />
                } else {
                    return <EmptyCell key={key}
                        data={cellData}
                        style={{ gridRow: i+1, gridColumn: j+1 }}
                        onClick={ clickCallback({ x: i, y: j}) }
                        cellColor={emptyCellColor}
                    />
                }
            })
        ))
        }
    </div>;
}

