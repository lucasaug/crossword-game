import { Direction } from './Cell'
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
            <ol> { entries.across.map((clue) => <li> {clue.clue} </li>) } </ol>
        </div>
        <div>
            <h2>Down</h2>
            <ol> { entries.down.map((clue) => <li> {clue.clue} </li>) } </ol>
        </div>
    </div>;
};
