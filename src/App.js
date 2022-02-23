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
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentCell, setCurrentCell] = useState(0);
	const [absentSet, setAbsentSet] = useState(new Set());
	const [presentSet, setPresentSet] = useState(new Set());
	const [correctSet, setCorrectSet] = useState(new Set());

	// const onClickTab = () => {
	// 	setCurrentCell((previousState) => {
	// 		if (previousState === 29) return 29;
	// 		return previousState + 1;
	// 	});
	// };

	const changeColor = () => {};

	const onClickBack = () => {
		if ((currentCell + 1) % 5 === 0 && values[currentCell])
			setValues((previousState) => {
				return previousState.map((value, idx) =>
					idx === currentCell ? "" : value
				);
			});
		else {
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
		setValues((previousState) => {
			return previousState.map((value, idx) =>
				idx === currentCell ? keyValue : value
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
	const Cell = ({ value, cell }) => (
		<div
			className={`h-16 w-16 h border ${
				currentCell === cell ? "border-red-600" : "border-gray-600"
			} text-white text-2xl font-bold align-middle flex items-center justify-center uppercase`}
		>
			{value}
		</div>
	);

	const Grid = () => {
		const cells = [];
		for (let i = 0; i < 30; i++) {
			cells.push(<Cell value={values[i]} cell={i} />);
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
				<div class="flex">
					{keys[0].map((key) => (
						<KeyButton key={key} value={key} />
					))}
				</div>
				<div class="flex">
					{keys[1].map((key) => (
						<KeyButton key={key} value={key} />
					))}
				</div>
				<div class="flex">
					<button
						className="py-4 w-12 m-0.5 text-xs bg-gray-600 rounded uppercase font-bold"
						// onClick={onClickTab}
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
