import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Trie from "./Trie";
import { characters, words } from "./data";
import { CloseIcon, HelpIcon, ResultIcon } from "./icons";

function App() {
	const [values, setValues] = useState(new Array(30).fill(""));
	const [colors, setColors] = useState(new Array(30).fill(-1));
	const [currentRow, setCurrentRow] = useState(0);
	const [currentCell, setCurrentCell] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [results, setResults] = useState([]);
	// const trie = useMemo(() => {
	// 	const newTrie = new Trie();
	// 	for (const word of words) newTrie.insert(word);

	// 	console.log("CONSTRUCT TRIE");

	// 	return newTrie;
	// }, []);

	// useEffect(() => {
	// 	return () => {
	// 		for (const word of words) trie.remove(word);

	// 		console.log(trie || "TRIE IS EMPTY");
	// 		console.log("DECONSTRUCT TRIE");
	// 	};
	// }, [trie]);

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
		let query = [".", ".", ".", ".", "."];
		const validList = [];
		for (let row = 0; row <= currentRow; row++) {
			const start = row * 5;
			let validQuery = "";
			for (let j = start; j < start + 5; j++) {
				const color = colors[j];
				const value = values[j];
				// console.log(j);
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
						query[j % 5] = value;
						validQuery += ".";
						break;
					default:
						return null;
				}
			}
			validList.push(validQuery);
		}
		query = query.join("");
		// console.log(greenSet);
		// console.log(yellowSet);
		// console.log(graySet);
		// console.log(validList);
		// console.log(query);
		// const trieResults = trie.search(
		// 	query,
		// 	validList,
		// 	greenSet,
		// 	yellowSet,
		// 	graySet
		// );
		// console.log(trieResults);
		// setResults(trieResults);
		setModalVisible(true);

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
		if (currentRow && 0 === currentCell % 5)
			setCurrentRow((previousState) => previousState - 1);
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
				className="py-4 px-2.5 m-0.5 bg-gray-600 rounded uppercase font-bold"
				onClick={() => onClickKeyButton(value)}
			>
				{value}
			</button>
		);
	};
	const Cell = ({ value, cell, colorValue, index }) => {
		const color =
			colorValue === 0
				? "bg-absent border-absent"
				: colorValue === 1
				? "bg-present border-present"
				: colorValue === 2
				? "bg-correct border-correct"
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
			className="h-screen flex flex-col justify-between relative"
			style={{ backgroundColor: "#121213" }}
		>
			<div className="flex items-center justify-between px-5 py-3">
				<button
					onClick={() => {
						setModalVisible(true);
					}}
				>
					<ResultIcon color="text-white" />
				</button>
				<h1 className="text-white text-center text-3xl font-bold">
					Wordle Helper
				</h1>
				<button>
					<HelpIcon color="text-white" />
				</button>
			</div>
			<Grid />
			<div className="text-white flex flex-col w-full items-center mb-2">
				<div className="flex">
					{characters.top.map((key) => (
						<KeyButton key={key} value={key} />
					))}
				</div>
				<div className="flex">
					{characters.middle.map((key) => (
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
					{characters.bottom.map((key) => (
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
			{/* Modal */}
			<div
				className="absolute top-0 left-0 h-screen w-screen"
				style={{
					backgroundColor: "#121213",
					display: modalVisible ? "block" : "none",
				}}
			>
				<div className="w-full h-screen flex justify-center items-center">
					<div
						className="w-1/2 h-1/2 text-white text-center relative"
						style={{ backgroundColor: "#121213" }}
					>
						<button
							className="absolute top-0 right-0 m-2"
							onClick={() => setModalVisible(false)}
						>
							<CloseIcon color="text-white" />
						</button>
						<h1 className="text-3xl mt-2">Results</h1>
						<div>
							{results.slice(0, 20).map((item, idx) => {
								return <div key={idx}>{item}</div>;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
