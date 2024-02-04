import { useState } from "react";

export interface EmptyCellData {
    style?: Object
}

export interface ClueCellData {
    horizontal?: number,
    vertical?: number,
    style?: Object
}

export interface LetterCellData {
    value: string,
    style?: Object
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

const ClueCellStyle = {
    backgroundColor: "white",
}

const EmptyCellStyle = {
    backgroundColor: "black",
}

const LetterCellStyle = {
    backgroundColor: "white",
}


export function ClueCell({ horizontal, vertical, style }: ClueCellData) {
    return (
    <div style={{...style, ...ClueCellStyle}}>
        h: {horizontal}, v: {vertical}
    </div>
    )
}

export function EmptyCell({ style }: EmptyCellData) {
    return (
    <div style={{...style, ...EmptyCellStyle}}>
    </div>
    )
}

export function LetterCell({ value, style }: LetterCellData) {
    return (
    <div style={{...style, ...LetterCellStyle}}>
        { value }
    </div>
    )
}
