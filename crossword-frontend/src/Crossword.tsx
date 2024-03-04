import { Direction, GridPosition } from './Cell';
import { ClueList } from './ClueList'
import { CrosswordGridProps, CrosswordGrid } from './CrosswordGrid'

export interface CrosswordEntry {
    value: string,
    clue: string,
    startPosition: GridPosition,
    direction: Direction,
};

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
        />
        <ClueList entries={entries} style={ClueListStyle} />
    </div>
}

Crossword.defaultProps = {
    ...CrosswordGrid.defaultProps
};
