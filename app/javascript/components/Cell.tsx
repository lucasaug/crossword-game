import React from "react";

import { CSSProperties } from "react";

export interface GridPosition {
    x: number,
    y: number,
};

export enum Direction {
    VERTICAL = 1,
    HORIZONTAL
}

export interface ClueData {
    showClue: boolean,
    clueNumber: number,
}

export interface EmptyCellData {
}

export interface LetterCellData {
    value: string,
    horizontalClue?: ClueData,
    verticalClue?: ClueData,
}

export interface EmptyCellProps extends React.HTMLAttributes<HTMLDivElement> {
    data: EmptyCellData,
    cellColor?: string,
}

export interface LetterCellProps extends React.HTMLAttributes<HTMLDivElement> {
    data: LetterCellData,
    currentDirection?: Direction,
    highlighted?: boolean,
    cellColor?: string,
    highlightColor?: string,
}

export type CellData = EmptyCellData | LetterCellData;

export function isEmptyCell(cellData: CellData): cellData is EmptyCellData {
    return !isLetterCell(cellData);
}

export function isLetterCell(cellData: CellData): cellData is LetterCellData {
    let castData = (cellData as LetterCellData);
    return castData.value !== undefined;
}

const EmptyCellStyle = {
    borderRadius: "10px"
}

const LetterCellStyle = {
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif",
}

const DirectionIndicatorStyle = {
    position: "absolute",
    fontSize: "0.5em",
}

export function EmptyCell({ style, onClick, cellColor="#7755CC" }: EmptyCellProps) {
    let emptyCellStyle = {
        ...EmptyCellStyle,
        ...style,
        backgroundColor: cellColor,
    };

    return (
    <div style={emptyCellStyle} onClick={ onClick }>
    </div>
    )
}


export function LetterCell({
    data,
    style,
    highlighted,
    currentDirection,
    onClick,
    cellColor="#EEEEFF",
    highlightColor="#EEEE77",
}: LetterCellProps) {
    let cellStyle: CSSProperties = {
        ...LetterCellStyle,
        ...style,
        backgroundColor: cellColor,
    };
    let arrowStyle: CSSProperties = {...DirectionIndicatorStyle};

    const horizontalIndicator = <span style={{
        ...DirectionIndicatorStyle,
        top: "0px",
        left: "0px",
    }}>
        { data.horizontalClue !== undefined ?
            `${data.horizontalClue.clueNumber} ▸` : "" }
    </span>;
    const verticalIndicator = <span style={{
        ...DirectionIndicatorStyle,
        top: "0px",
        right: "5px",
    }}>
        { data.verticalClue !== undefined ?
            `${data.verticalClue.clueNumber} ▾` : "" }
    </span>;

    if (highlighted) {
        cellStyle = {
            ...cellStyle,
            backgroundColor: highlightColor,
        };

        if (currentDirection == Direction.HORIZONTAL)
            arrowStyle["right"] = "5px";
        else
            arrowStyle["bottom"] = "5px";
    }

    return <div style={cellStyle} onClick={ onClick }>
        { data.horizontalClue?.showClue ? horizontalIndicator : ""}
        { data.verticalClue?.showClue ? verticalIndicator : ""}
        { data.value }
        <span style={arrowStyle}>
            { highlighted ?
                    (currentDirection == Direction.HORIZONTAL ? "▸" : "▾") :
                ""
            }
        </span>
    </div>
}

