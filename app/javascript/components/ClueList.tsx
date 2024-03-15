import React from "react";
import { CrosswordEntrySet } from './Crossword'

interface ClueListProps extends React.HTMLAttributes<HTMLDivElement> {
    entries: CrosswordEntrySet,
};

export function ClueList({
    entries,
    style,
}: ClueListProps) {
    const containerStyle = {
        ...style,
        display: "flex",
    };
    return <div style={containerStyle}>
        <div>
            <h2>Across</h2>
            <ul> {
                entries.across
                    .sort((a, b) => a.clueNumber - b.clueNumber)
                    .map((clue) => <li>{clue.clueNumber}. {clue.clue} </li>)
            } </ul>
        </div>
        <div>
            <h2>Down</h2>
            <ul> {
                entries.down
                    .sort((a, b) => a.clueNumber - b.clueNumber)
                    .map((clue) => <li>{clue.clueNumber}. {clue.clue} </li>)
            } </ul>
        </div>
    </div>;
};
