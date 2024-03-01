import { Crossword } from "./Crossword";
import { useEffect, useState } from "react";

const CROSSWORD_PATH: string = "http://localhost:4567/crossword/new";

export default function App() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch(CROSSWORD_PATH)
        .then(res => res.json())
        .then(setEntries)
    }, []);

    const key = JSON.stringify(entries);
    return (
        <Crossword key={key} entries={entries} width={10} height={10} />
    );
}
