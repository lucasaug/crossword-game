import { useState } from "react";
import { ClueCellData, LetterCellData } from "./CellData";

const CellStyle = {
    border: "solid",
    padding: 20,
    display: "inline-block",
}


export function ClueCell({ horizontal, vertical }: ClueCellData) {
    return (
    <div style={CellStyle}>
        C
    </div>
    )
}

export function EmptyCell() {
    return (
    <div style={CellStyle}>
        E
    </div>
    )
}

export function LetterCell({ value }: LetterCellData) {
    return (
    <div style={CellStyle}>
        L
    </div>
    )
}
