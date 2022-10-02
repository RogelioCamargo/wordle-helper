export const prepareInput = (values) => {
	const row = Math.floor(values.length / 5);
	// colored character sets
	const grays = new Set();
	const yellows = new Set();
	const greens = new Set();
	// query of characters in the correct place
	const correctQuery = [".", ".", ".", ".", "."];
	// queries which have characters but not in the right place
	const validQueries = [];

	for (let gridRow = 0; gridRow < row; gridRow++) {
		const start = gridRow * 5;
		let validQuery = "";
		for (let gridCol = start; gridCol < start + 5; gridCol++) {
			const character = values[gridCol];
			switch (character.color) {
				case 0:
					grays.add(character.value);
					validQuery += ".";
					break;
				case 1:
					yellows.add(character.value);
					validQuery += character.value;
					break;
				case 2:
					greens.add(character.value);
					correctQuery[gridCol % 5] = character.value;
					validQuery += ".";
					break;
				default:
					return null;
			}
		}
		validQueries.push(validQuery);
	}

	return {
		correctQuery: correctQuery.join(""),
		validQueries,
		grays,
		yellows,
		greens,
	};
};
