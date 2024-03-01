import { Direction, GridPosition } from './Cell.tsx';
import { CrosswordGridProps, CrosswordGrid } from './CrosswordGrid.tsx'

export interface CrosswordEntry {
    value: string,
    clue: string,
    startPosition: GridPosition,
    direction: Direction,
};

interface CrosswordProps extends CrosswordGridProps {}

export function Crossword({
    entries,
    width,
    height,
    cellSize,
    gapSize,
    fontSize,
    backgroundColor,
    emptyCellColor,
    clueCellColor,
    letterCellColor,
    highlightColor,
}: CrosswordProps) {
    return <CrosswordGrid
        entries={entries}
        width={width}
        height={height}
        cellSize={cellSize}
        gapSize={gapSize}
        fontSize={fontSize}
        backgroundColor={backgroundColor}
        emptyCellColor={emptyCellColor}
        clueCellColor={clueCellColor}
        letterCellColor={letterCellColor}
        highlightColor={highlightColor}
    />
}

Crossword.defaultProps = {
    ...CrosswordGrid.defaultProps
};
