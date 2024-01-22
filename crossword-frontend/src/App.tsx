import CrosswordGrid from "./CrosswordGrid";
import { Direction } from './CrosswordDefinition.tsx'

export default function App() {
    return (
    <CrosswordGrid definition={{
        entries: [{
            value: "a",
            clue: "a",
            startPosition: {
                x: 2,
                y: 2
            },
            direction: Direction.VERTICAL,
        }],
        width: 10,
        height: 10,
        }}
    />
    );
}
