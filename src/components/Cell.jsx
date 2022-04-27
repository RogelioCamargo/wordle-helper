const Cell = ({ changeColor, index, character }) => {
	let color;
	switch (character.color) {
		case 1:
			color = "bg-present border-present";
			break;
		case 2:
			color = "bg-correct border-correct";
			break;
		default:
			color = "bg-absent border-absent";
	}

	return (
		<div
			className={`h-16 w-16 border-2 flex justify-center items-center ${color}`}
			onClick={() => changeColor(index)}
		>
			<span className="text-3xl font-bold uppercase text-white">
				{character.value}
			</span>
		</div>
	);
};

export default Cell;
