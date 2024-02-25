import { MouseEventHandler } from "react";

export interface GridPosition {
    x: number,
    y: number,
};

export interface EmptyCellData {
    style?: Object,
    onClick?: MouseEventHandler,
}

export interface ClueCellData {
    horizontal?: number,
    vertical?: number,
    style?: Object,
    onClick?: MouseEventHandler,
}

export interface LetterCellData {
    value: string,
    isVertical: boolean,
    isHorizontal: boolean,
    style?: Object,
    highlighted?: boolean,
    onClick?: MouseEventHandler,
}

export type CellData = EmptyCellData | ClueCellData | LetterCellData;

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

const ClueCellStyle = {
    backgroundColor: "white",
}

const EmptyCellStyle = {
    backgroundColor: "black",
}

const LetterCellStyle = {
    backgroundColor: "white",
}

const HighlightedCellStyle = {
    backgroundColor: "yellow",
}


export function ClueCell({
    horizontal,
    vertical,
    style,
    onClick,
}: ClueCellData) {
    return (
    <div style={{...style, ...ClueCellStyle }} onClick={ onClick }>
        h: {horizontal}, v: {vertical}
    </div>
    )
}

export function EmptyCell({ style, onClick }: EmptyCellData) {
    return (
    <div style={{...style, ...EmptyCellStyle}} onClick={ onClick }>
    </div>
    )
}

export function LetterCell({
    value,
    style,
    highlighted,
    onClick,
}: LetterCellData) {
    let cellStyle = {...style, ...LetterCellStyle};
    if (highlighted) {
        cellStyle = {...style, ...HighlightedCellStyle}
    }

    return (
    <div style={cellStyle} onClick={ onClick }>
        { value }
    </div>
    )
}
