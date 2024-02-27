import { CSSProperties, MouseEventHandler } from "react";

export interface GridPosition {
    x: number,
    y: number,
};

export enum Direction {
    VERTICAL = 1,
    HORIZONTAL
}

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
    isVertical?: boolean,
    isHorizontal?: boolean,
    currentDirection?: Direction,
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
    border: "solid 1px black",
    position: "relative",
    borderRadius: "10px",
}

const EmptyCellStyle = {
    backgroundColor: "#7755CC",
    borderRadius: "10px"
}

const LetterCellStyle = {
    backgroundColor: "#EEEEFF",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif",
}

const HighlightedCellStyle = {
    backgroundColor: "#EEEE77",
}

const DirectionArrowStyle = {
    position: "relative",
    fontSize: "0.5em",
}


export function ClueCell({
    horizontal,
    vertical,
    style,
    onClick,
}: ClueCellData) {
    let horizontalIndicator = <span style={{
        ...DirectionArrowStyle,
        position: "absolute",
        right: "5px",
    }}>
        { horizontal !== undefined ? `${horizontal} ▸` : "" }
    </span>;
    let verticalIndicator = <span style={{
        ...DirectionArrowStyle,
        position: "absolute",
        bottom: "0px",
        right: "5px",
    }}>
        { vertical !== undefined ? `${vertical} ▾` : "" }
    </span>;

    return (
    <div style={{...style, ...ClueCellStyle }} onClick={ onClick }>
        {horizontalIndicator}
        {verticalIndicator}
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
    currentDirection,
    onClick,
}: LetterCellData) {
    let cellStyle: CSSProperties = {...style, ...LetterCellStyle};
    let arrowStyle: CSSProperties = {...DirectionArrowStyle};

    if (highlighted) {
        cellStyle = {...cellStyle, ...HighlightedCellStyle}
        if (currentDirection == Direction.HORIZONTAL)
            arrowStyle["left"] = "20%";
        else
            arrowStyle["top"] = "20%";
    }

    return (
    <div style={cellStyle} onClick={ onClick }>
        { value }
        <span style={arrowStyle}>
            { highlighted ?
                    (currentDirection == Direction.HORIZONTAL ? "▸" : "▾") :
                ""
            }
        </span>
    </div>
    )
}
