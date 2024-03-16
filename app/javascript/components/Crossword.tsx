import React from "react";
import { useState } from 'react';

import { GridPosition } from './Cell';
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
    down: CrosswordEntry[] }

interface CrosswordProps extends CrosswordGridProps {}

const ClueListStyle = {
    display: "inline",
};

export function Crossword({
    entries,
    width,
    height,
    cellSize,
    gapSize,
    fontSize,
    backgroundColor,
    emptyCellColor,
    letterCellColor,
    highlightColor,
}: CrosswordProps) {
    const [selectedClue , setSelectedClue] = useState(1);

    return <div style={{ display: "flex", gap: "20px" }}>
        <CrosswordGrid
            entries={entries}
            width={width}
            height={height}
            cellSize={cellSize}
            gapSize={gapSize}
            fontSize={fontSize}
            backgroundColor={backgroundColor}
            emptyCellColor={emptyCellColor}
            letterCellColor={letterCellColor}
            highlightColor={highlightColor}
            onCellChange={(_, __, clueNumber) => setSelectedClue(clueNumber)}
        />
        <ClueList
            entries={entries}
            style={ClueListStyle}
            selectedClue={selectedClue}
        />
    </div>
}

Crossword.defaultProps = {
    ...CrosswordGrid.defaultProps
};
