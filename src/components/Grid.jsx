import Cell from "./Cell";

const Grid = ({ values, colors, changeColor }) => {
	const cells = [];
	for (let i = 0; i < 30; i++) {
		cells.push(
			<Cell
				changeColor={changeColor}
				colorValue={colors[i]}
				index={i}
				key={i}
				value={values[i]}
			/>
		);
	}
	return (
		<div className="flex justify-center items-center flex-grow">
			<div className="h-board w-board grid grid-cols-5 gap-1">{cells}</div>
		</div>
	);
};

export default Grid;
