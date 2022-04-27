import Cell from "./Cell";
import EmptyCell from "./EmptyCell";

const Grid = ({ values, changeColor }) => {
	const MAX_CELLS = 30;
	const VALUE_LENGTH = values.length;
	const cells = [];

	// create value cells 
	for (let i = 0; i < VALUE_LENGTH; i++) {
		cells.push(
			<Cell changeColor={changeColor} index={i} key={i} character={values[i]} />
		);
	}

	// create empty cells  
	for (let i = VALUE_LENGTH; i < MAX_CELLS; i++) {
		cells.push(<EmptyCell key={i} />);
	}

	return (
		<div className="flex justify-center items-center flex-grow">
			<div className="h-board w-board grid grid-cols-5 gap-1">{cells}</div>
		</div>
	);
};

export default Grid;
