import { CrosswordGrid } from "./CrosswordGrid";
import { useEffect, useState } from "react";

const CROSSWORD_PATH: string = "http://localhost:4567/crossword/new";

export default function App() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch(CROSSWORD_PATH)
        .then(res => res.json())
        .then(setEntries)
    }, []);

    return (
        <CrosswordGrid entries={entries} width={10} height={10} />
    );
}
