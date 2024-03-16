import React from "react";
import { CrosswordEntrySet } from './Crossword'

interface ClueListProps extends React.HTMLAttributes<HTMLDivElement> {
    entries: CrosswordEntrySet,
    highlightColor: string,
    selectedClue: number,
};

export function ClueList({
    entries,
    highlightColor="#EEEE77",
    selectedClue,
    style,
}: ClueListProps) {
    const containerStyle = {
        ...style,
        display: "flex",
        gap: "30px"
    };

    return <div style={containerStyle}>
        <div>
            <h2>Across</h2>
            <ul style={{ listStyleType: "none", padding: "0px" }}> {
                entries.across
                    .sort((a, b) => a.clueNumber - b.clueNumber)
                    .map((clue) =>
                        <li style={{
                            backgroundColor:
                                clue.clueNumber === selectedClue &&
                                highlightColor,
                            borderRadius: "5px",
                        }}>
                            {clue.clueNumber}. {clue.clue}
                        </li>
                    )
            } </ul>
        </div>
        <div>
            <h2>Down</h2>
            <ul style={{ listStyleType: "none", padding: "0px" }}> {
                entries.down
                    .sort((a, b) => a.clueNumber - b.clueNumber)
                    .map((clue) =>
                        <li style={{
                            backgroundColor:
                                clue.clueNumber === selectedClue &&
                                highlightColor,
                            borderRadius: "5px",
                        }}>
                            {clue.clueNumber}. {clue.clue}
                        </li>
                    )
            } </ul>
        </div>
    </div>;
};
