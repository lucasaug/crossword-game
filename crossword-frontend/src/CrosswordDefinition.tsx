export interface GridPosition {
    x: number | null,
    y: number | null,
};

export enum Direction {
    Vertical = 1,
    Horizontal
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

