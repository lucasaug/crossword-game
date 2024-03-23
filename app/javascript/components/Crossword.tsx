import React from "react";
import { useEffect, useMemo, useState } from 'react';

import { Direction, GridPosition } from './Cell';
import { ClueList } from './ClueList';
import { CrosswordGridProps, CrosswordGrid } from './CrosswordGrid';

export interface CrosswordEntry {
    value: string,
    clue: string,
    startPosition: GridPosition,
    clueNumber: number,
};

export interface CrosswordEntrySet {
    across: CrosswordEntry[],
    down: CrosswordEntry[]
}

interface CrosswordProps extends CrosswordGridProps {}

const ClueListStyle = {
    display: "inline",
};

const CROSSWORD_PATH: string = "/api/v1/random";

export function Crossword({
    cellSize,
    gapSize,
    fontSize,
    backgroundColor,
    emptyCellColor,
    letterCellColor,
    highlightColor,
}: CrosswordProps) {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [entries, setEntries] = useState({ across: [], down: [] });

    useEffect(() => {
        fetch(CROSSWORD_PATH)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => {
                const { across, down, width, height } = res;

                setWidth(width);
                setHeight(height);
                setEntries({ across, down });
            });
    }, [])

    let firstDirection = Direction.HORIZONTAL;
    let firstCell = entries.across.find((entry) => entry.clueNumber === 1);
    if (!firstCell) {
        firstDirection = Direction.VERTICAL;
        firstCell = entries.down.find((entry) => entry.clueNumber === 1);
    }

    const clueNumberToInitialPosition = useMemo(() => {
        let result = {};

        for (const entry of entries.across) {
            result[entry.clueNumber] = {
                startPosition: entry.startPosition,
                direction: Direction.HORIZONTAL,
            };
        }
        for (const entry of entries.down) {
            result[entry.clueNumber] = {
                startPosition: entry.startPosition,
                direction: Direction.VERTICAL,
            };
        }

        return result;
    }, [entries]);

    const [direction, setDirection] = useState<Direction>(firstDirection);
    const [position, setPosition] = useState<GridPosition>(
        firstCell?.startPosition ?? { x: 1, y: 1 }
    );
    const [selectedClue , setSelectedClue] = useState<number>(1);

    const key = JSON.stringify(entries);
    return <div style={{ display: "flex", gap: "20px" }}>
        <CrosswordGrid
            key={key}
            entries={entries}
            width={width}
            height={height}
            position={position}
            direction={direction}
            onCellChange={(newPosition, newDirection, clueNumber) => {
                setPosition(newPosition);
                setDirection(newDirection);
                setSelectedClue(clueNumber);
            }}
            cellSize={cellSize}
            gapSize={gapSize}
            fontSize={fontSize}
            backgroundColor={backgroundColor}
            emptyCellColor={emptyCellColor}
            letterCellColor={letterCellColor}
            highlightColor={highlightColor}
        />
        <ClueList
            entries={entries}
            style={ClueListStyle}
            selectedClue={selectedClue}
            onClueSelect={(clueNumber) => {
                const { startPosition: newPosition, direction: newDirection } =
                    clueNumberToInitialPosition[clueNumber];

                setPosition(newPosition);
                setDirection(newDirection);
                setSelectedClue(clueNumber)
            }}
        />
    </div>
}

Crossword.defaultProps = {
    ...CrosswordGrid.defaultProps
};
