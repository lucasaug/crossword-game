export interface EmptyCellData {}

export interface ClueCellData {
    horizontal?: number,
    vertical?: number
}

export interface LetterCellData {
    value: string
}

export type CellData = EmptyCellData | ClueCellData | LetterCellData

export function isEmptyCell(cellData: CellData): cellData is EmptyCellData {
    return !isLetterCell(cellData) && !isClueCell(cellData);
}

export function isClueCell(cellData: CellData): cellData is ClueCellData {
    let castData = (cellData as ClueCellData);
    return castData.horizontal !== undefined || castData.vertical !== undefined;
}

export function isLetterCell(cellData: CellData): cellData is LetterCellData {
    let castData = (cellData as LetterCellData);
    return castData.value !== undefined;
}

