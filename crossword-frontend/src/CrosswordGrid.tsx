import { useState } from 'react';
import {
    CrosswordDefinition, GridPosition, Direction
} from './CrosswordDefinition.tsx'

interface CrosswordGridProps {
    definition: CrosswordDefinition,
}

export default function CrosswordGrid({ definition }: CrosswordGridProps) {
    const [filledWords, setFilledWords] = useState({
        "horizontal": [],
        "vertical": [],
    });

    const [selectedPosition, setSelectedPosition] = useState<GridPosition>({
        x: null,
        y: null,
    });

    const [direction, setDirection] = useState<Direction>(Direction.Vertical);

    return (
    <>
    </>
    );
}
