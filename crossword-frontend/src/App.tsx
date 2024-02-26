import { CrosswordGrid } from "./CrosswordGrid";
import { Direction } from "./Cell";

export default function App() {
    return (
        <CrosswordGrid entries={
        [
            {
                value: "lucas",
                clue: "quem fez iss",
                startPosition: {
                    x: 2,
                    y: 2
                },
                direction: Direction.HORIZONTAL,
            },
            {
                value: "lupa",
                clue: "negoç de aumentar a vista",
                startPosition: {
                    x: 0,
                    y: 4
                },
                direction: Direction.VERTICAL,
            },
            {
                value: "sopa",
                clue: "molhim de toma hmm",
                startPosition: {
                    x: 0,
                    y: 4
                },
                direction: Direction.HORIZONTAL,
            },
            {
                value: "ciencia",
                clue: "negoç de estuda os negoç",
                startPosition: {
                    x: 6,
                    y: 0
                },
                direction: Direction.HORIZONTAL,
            },
        ]}
        width={10}
        height={10}
        />
    );
}
