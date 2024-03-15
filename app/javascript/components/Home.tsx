import React from "react";
import { Crossword } from "./Crossword";
import { useEffect, useState } from "react";

const CROSSWORD_PATH: string = "http://localhost:4567/crossword/new";

export default function Home() {
    const [entries, setEntries] = useState({across: [], down: []});

    useEffect(() => {
        setEntries({
        across: [
            {
                value: "lucas",
                clue: "quem fez iss",
                startPosition: {
                    x: 2,
                    y: 4
                },
                clueNumber: 2,
            },
            {
                value: "sopa",
                clue: "molhim de toma hmm",
                startPosition: {
                    x: 0,
                    y: 5
                },
                clueNumber: 1,
            },
            {
                value: "ciencia",
                clue: "negoç de estuda os negoç",
                startPosition: {
                    x: 7,
                    y: 0
                },
                clueNumber: 4,
            }
        ],
        down: [
            {
                value: "lupa",
                clue: "negoç de aumentar a vista",
                startPosition: {
                    x: 2,
                    y: 4
                },
                clueNumber: 3,
            }
        ]
    });
        /*
        fetch(CROSSWORD_PATH)
        .then(res => res.json())
        .then(setEntries)
        */
    }, []);

    const key = JSON.stringify(entries);

    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
                <div className="container secondary-color">
                    <Crossword key={key}
                        entries={entries} 
                        width={10} 
                        height={10}
                    />
                </div>
            </div>
        </div>
    );
};
