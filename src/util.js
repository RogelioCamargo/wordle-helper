export const prepareInput = (row, colors, values) => {
	const graySet = new Set();
	const yellowSet = new Set();
	const greenSet = new Set();
	const correctQuery = [".", ".", ".", ".", "."];
	const validQueryList = [];

	for (let gridRow = 0; gridRow <= row; gridRow++) {
		const start = gridRow * 5;
		let validQuery = "";
		for (let gridCol = start; gridCol < start + 5; gridCol++) {
			const value = values[gridCol];
			const color = colors[gridCol];
			switch (color) {
				case 0:
					graySet.add(value);
					validQuery += ".";
					break;
				case 1:
					yellowSet.add(value);
					validQuery += value;
					break;
				case 2:
					greenSet.add(value);
					correctQuery[gridCol % 5] = value;
					validQuery += ".";
					break;
				default:
					return null;
			}
		}
		validQueryList.push(validQuery);
	}

	return {
		correctQuery: correctQuery.join(""),
		validQueryList,
		graySet,
		yellowSet,
		greenSet,
	};
};
