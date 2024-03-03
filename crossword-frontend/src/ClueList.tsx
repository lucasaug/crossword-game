import { Direction } from './Cell'
import { CrosswordEntry } from './Crossword'

interface ClueListProps extends React.HTMLAttributes<HTMLDivElement> {
    entries: CrosswordEntry[],
};

export function ClueList({
    entries,
    style,
}: ClueListProps) {
    const horizontalEntries = entries.filter(
        (entry) => entry.direction == Direction.HORIZONTAL
    ).map((entry) => entry.clue);
    const verticalEntries = entries.filter(
        (entry) => entry.direction == Direction.VERTICAL
    ).map((entry) => entry.clue);;

    return <div style={style}>
        <h2>Across</h2>
        <ol> { horizontalEntries.map((clue) => <li> {clue} </li>) } </ol>
        <h2>Down</h2>
        <ol> { verticalEntries.map((clue) => <li> {clue} </li>) } </ol>
    </div>;
};
