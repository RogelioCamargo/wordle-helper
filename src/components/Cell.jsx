const Cell = ({ changeColor, colorValue, index, value }) => {
	const color =
		colorValue === 0
			? "bg-absent border-absent"
			: colorValue === 1
			? "bg-present border-present"
			: colorValue === 2
			? "bg-correct border-correct"
			: "border-tile";
	return (
		<div
			className={`h-16 w-16 border-2 text-white text-3xl font-bold align-middle flex items-center justify-center uppercase ${color}`}
			onClick={() => changeColor(index)}
		>
			{value}
		</div>
	);
};

export default Cell;
