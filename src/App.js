import "./App.css";
import { useState } from "react";

const keys = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	// ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
	["z", "x", "c", "v", "b", "n", "m"],
];

// #538d4e - green
// #b59f3b - yellow
// #3a3a3c - gray
// #808384 - light gray key

function App() {
	const [values, setValues] = useState(new Array(30).fill(""));
	const [colors, setColors] = useState(new Array(30).fill(-1));
	const [currentRow, setCurrentRow] = useState(0);
	const [currentCell, setCurrentCell] = useState(0);
	const [absentSet, setAbsentSet] = useState(new Set());
	const [presentSet, setPresentSet] = useState(new Set());
	const [correctSet, setCorrectSet] = useState(new Set());

	const changeColor = (index) => {
		if (index === currentCell && !values[currentCell]) return null;
		if (index > currentCell) return null;
		let colorValue = colors[index];
		if (colorValue === 2) colorValue = 0;
		else colorValue++;
		setColors((previousState) => {
			return previousState.map((value, idx) =>
				idx === index ? colorValue : value
			);
		});
	};

	const onClickEnter = () => {
		const input = values.slice(currentRow * 5, currentRow * 5 + 5).join("");
		if (input.length !== 5) return null;
		const graySet = new Set();
		const yellowSet = new Set();
		const greenSet = new Set();
		for (let row = 0; row <= currentRow; row++) {
			const start = row * 5;
			for (let j = start; j < start + 5; j++) {
				const color = colors[j];
				const value = values[j];
				console.log(j);
				switch (color) {
					case 0:
						graySet.add(value);
						break;
					case 1:
						yellowSet.add(value);
						break;
					case 2:
						greenSet.add(value);
						break;
					default:
						return null;
				}
			}
		}
		setAbsentSet(graySet);
		setPresentSet(yellowSet);
		setCorrectSet(greenSet);
		setCurrentCell((previousState) => {
			if (previousState === 29) return 29;
			return previousState + 1;
		});
		setCurrentRow((previousState) => {
			if (previousState === 6) return 6;
			return previousState + 1;
		});
	};

	const onClickBack = () => {
		if (currentRow && (0 === currentCell % 5)) 
			setCurrentRow(previousState => previousState - 1);
		if ((currentCell + 1) % 5 === 0 && values[currentCell]) {
			setColors((previousState) => {
				return previousState.map((value, idx) =>
					idx === currentCell ? -1 : value
				);
			});
			setValues((previousState) => {
				return previousState.map((value, idx) =>
					idx === currentCell ? "" : value
				);
			});
		} else {
			setColors((previousState) => {
				return previousState.map((value, idx) =>
					idx === currentCell || idx === currentCell - 1 ? -1 : value
				);
			});
			setValues((previousState) => {
				return previousState.map((value, idx) =>
					idx === currentCell || idx === currentCell - 1 ? "" : value
				);
			});
			setCurrentCell((previousState) => {
				if (previousState <= 0) return 0;
				return previousState - 1;
			});
		}
	};

	const onClickKeyButton = (keyValue) => {
		if ((currentCell + 1) % 5 === 0 && values[currentCell]) return null;
		setValues((previousState) => {
			return previousState.map((value, idx) =>
				idx === currentCell ? keyValue : value
			);
		});
		setColors((previousState) => {
			return previousState.map((value, idx) =>
				idx === currentCell ? 0 : value
			);
		});
		setCurrentCell((previousState) => {
			if ((previousState + 1) % 5 === 0) return previousState;
			if (previousState === 29) return 29;
			return previousState + 1;
		});
	};
	const KeyButton = ({ value }) => {
		return (
			<button
				className="py-4 px-3 m-0.5 bg-gray-600 rounded uppercase font-bold"
				onClick={() => onClickKeyButton(value)}
			>
				{value}
			</button>
		);
	};
	const Cell = ({ value, cell, colorValue, index }) => {
		const color =
			colorValue === 0
				? "bg-gray-600 border-gray-600"
				: colorValue === 1
				? "bg-yellow-600 border-yellow-600"
				: colorValue === 2
				? "bg-green-600 border-green-600"
				: "";
		return (
			<div
				className={`border ${
					currentCell === cell ? "border-red-600" : "border-gray-500"
				}`}
			>
				<div
					className={`h-14 w-14 text-white text-2xl font-bold align-middle flex items-center justify-center uppercase ${color}`}
					onClick={() => changeColor(index)}
				>
					{value}
				</div>
			</div>
		);
	};

	const Grid = () => {
		const cells = [];
		for (let i = 0; i < 30; i++) {
			cells.push(
				<Cell
					key={i}
					value={values[i]}
					cell={i}
					colorValue={colors[i]}
					index={i}
				/>
			);
		}
		return (
			<div className="w-full flex items-center justify-center">
				<div className="grid grid-cols-5 gap-1">{cells}</div>
			</div>
		);
	};
	return (
		<div
			className="bg-gray-800 h-screen flex flex-col justify-between"
			style={{ backgroundColor: "#121213" }}
		>
			<h1 className="text-white text-center text-3xl font-bold">
				Wordle Helper
			</h1>
			<Grid />
			<div className="text-white flex flex-col w-full items-center">
				<div className="flex">
					{keys[0].map((key) => (
						<KeyButton key={key} value={key} />
					))}
				</div>
				<div className="flex">
					{keys[1].map((key) => (
						<KeyButton key={key} value={key} />
					))}
				</div>
				<div className="flex">
					<button
						className="py-4 w-12 m-0.5 text-xs bg-gray-600 rounded uppercase font-bold"
						onClick={onClickEnter}
					>
						Enter
					</button>
					{keys[2].map((key) => (
						<KeyButton key={key} value={key} />
					))}
					<button
						className="py-4 w-12 m-0.5 text-xs bg-gray-600 rounded uppercase font-bold"
						onClick={onClickBack}
					>
						Back
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
