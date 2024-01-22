export interface GridPosition {
    x: number,
    y: number,
};

export enum Direction {
    VERTICAL = 1,
    HORIZONTAL
}

export interface CrosswordEntry {
    value: string,
    clue: string,
    startPosition: GridPosition,
    direction: Direction,
};

export interface CrosswordDefinition {
    entries: CrosswordEntry[],
    width: number,
    height: number,
};

export type EmptyCell = {}

export type ClueCell = {
    horizontal?: number,
    vertical?: number
}

export type LetterCell = {
    value: string
}

export type Cell = EmptyCell | ClueCell | LetterCell

