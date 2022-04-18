const Grid = ({ Cell, values, colors }) => {
	const cells = [];
	for (let i = 0; i < 30; i++) {
		cells.push(
			<Cell key={i} value={values[i]} colorValue={colors[i]} index={i} />
		);
	}
	return (
		<div className="flex justify-center items-center flex-grow">
			<div className="h-board w-board grid grid-cols-5 gap-1">{cells}</div>
		</div>
	);
};

export default Grid; 
