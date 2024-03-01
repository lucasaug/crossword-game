import { CSSProperties } from "react";

export interface GridPosition {
    x: number,
    y: number,
};

export enum Direction {
    VERTICAL = 1,
    HORIZONTAL
}

export interface EmptyCellData {
}

export interface ClueCellData {
    horizontal?: number,
    vertical?: number,
}

export interface LetterCellData {
    value: string,
    isVertical?: boolean,
    isHorizontal?: boolean,
}

export interface EmptyCellProps extends React.HTMLAttributes<HTMLDivElement> {
    data: EmptyCellData,
    cellColor?: string,
}

export interface ClueCellProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ClueCellData,
    cellColor?: string,
}

export interface LetterCellProps extends React.HTMLAttributes<HTMLDivElement> {
    data: LetterCellData,
    currentDirection?: Direction,
    highlighted?: boolean,
    cellColor?: string,
    highlightColor?: string,
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
    border: "solid 1px black",
    position: "relative",
    borderRadius: "10px",
}

const EmptyCellStyle = {
    borderRadius: "10px"
}

const LetterCellStyle = {
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif",
}

const DirectionArrowStyle = {
    position: "relative",
    fontSize: "0.5em",
}


export function ClueCell({
    data,
    style,
    onClick,
    cellColor,
}: ClueCellProps) {
    let horizontalIndicator = <span style={{
        ...DirectionArrowStyle,
        position: "absolute",
        right: "5px",
        bottom: "35%",
    }}>
        { data.horizontal !== undefined ? `${data.horizontal} ▸` : "" }
    </span>;
    let verticalIndicator = <span style={{
        ...DirectionArrowStyle,
        position: "absolute",
        bottom: "0px",
        right: "5px",
    }}>
        { data.vertical !== undefined ? `${data.vertical} ▾` : "" }
    </span>;

    let clueCellStyle = {
        ...ClueCellStyle,
        ...style,
        backgroundColor: cellColor,
    };

    return (
    <div style={clueCellStyle} onClick={ onClick }>
        {horizontalIndicator}
        {verticalIndicator}
    </div>
    )
}

ClueCell.defaultProps = {
    cellColor: "white",
};

export function EmptyCell({ style, onClick, cellColor }: EmptyCellProps) {
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

EmptyCell.defaultProps = {
    cellColor: "#7755CC",
};

export function LetterCell({
    data,
    style,
    highlighted,
    currentDirection,
    onClick,
    cellColor,
    highlightColor,
}: LetterCellProps) {
    let cellStyle: CSSProperties = {
        ...LetterCellStyle,
        ...style,
        backgroundColor: cellColor,
    };
    let arrowStyle: CSSProperties = {...DirectionArrowStyle};

    if (highlighted) {
        cellStyle = {
            ...cellStyle,
            backgroundColor: highlightColor,
        };

        if (currentDirection == Direction.HORIZONTAL)
            arrowStyle["left"] = "20%";
        else
            arrowStyle["top"] = "20%";
    }

    return (
    <div style={cellStyle} onClick={ onClick }>
        { data.value }
        <span style={arrowStyle}>
            { highlighted ?
                    (currentDirection == Direction.HORIZONTAL ? "▸" : "▾") :
                ""
            }
        </span>
    </div>
    )
}

LetterCell.defaultProps = {
    cellColor: "#EEEEFF",
    highlightColor: "#EEEE77",
};
