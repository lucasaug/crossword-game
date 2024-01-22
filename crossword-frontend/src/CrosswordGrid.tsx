import { useReducer, useState } from 'react';
import {
    CrosswordDefinition, GridPosition, Direction, Cell
} from './CrosswordDefinition.tsx'

interface CrosswordGridProps {
    definition: CrosswordDefinition,
}

function createInitialGrid(definition: CrosswordDefinition): Cell[][] {
    let gridArray: Cell[][] = [];
    for (let i = 0; i < definition.height; i++) {
        gridArray.push(Array(definition.width));
        for (let j = 0; j < definition.width; j++) {
            gridArray[i][j] = {};
        }
    }

    let horizontalCount = 0, verticalCount = 0;
    for (const entry of definition.entries) {
        let x = entry.startPosition.x;
        let y = entry.startPosition.y;

        if (entry.direction == Direction.VERTICAL) {
            gridArray[x][y]["vertical"] = verticalCount;
            verticalCount++;
        } else {
            gridArray[x][y]["horizontal"] = horizontalCount;
            horizontalCount++;
        }
    }

    return gridArray;
}

function updateGrid(state: Cell[][], action): Cell[][] {
    let result = [];
    for (let row of state) {
        result.push([...row]);
    }

    return result
}

export default function CrosswordGrid({ definition }: CrosswordGridProps) {
    const [gridArray, dispatch] = useReducer(
        updateGrid, definition, createInitialGrid
    );

    const [selectedPosition, setSelectedPosition] = useState<GridPosition>({
        x: null,
        y: null,
    });

    const [direction, setDirection] = useState<Direction>(Direction.VERTICAL);

    return (
    <table><tbody>
        {
        gridArray.map((row, i) => (
            <tr key={i}>
            {
                row.map((cell, j) => {
                    if ("horizontal" in cell || "vertical" in cell) {
                        return <td key={i + ' ' + j}>{cell["horizontal"] + " & " + cell["vertical"]}</td>
                    } else if ("value" in cell) {
                        return <td key={i + ' ' + j}>{cell["value"]}</td>
                    } else {
                        return <td key={i + ' ' + j}>X</td>
                    }
                })
            }
            </tr>
        ))
        }
        </tbody>
    </table>
    );
}
