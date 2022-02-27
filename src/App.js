import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Trie from "./Trie";
import { characters, words } from "./data";
import { HelpIcon, ResultIcon } from "./icons";
import Modal from "./components/Modal";

function App() {
	const [values, setValues] = useState(new Array(30).fill(""));
	const [colors, setColors] = useState(new Array(30).fill(-1));
	const [currentRow, setCurrentRow] = useState(0);
	const [currentCell, setCurrentCell] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [helpModalVisible, setHelpModalVisible] = useState(false);
	const [results, setResults] = useState([]);
	const trie = useMemo(() => {
		const newTrie = new Trie();
		for (const word of words) newTrie.insert(word);

		// console.log("CONSTRUCT TRIE");

		return newTrie;
	}, []);

	useEffect(() => {
		return () => {
			for (const word of words) trie.remove(word);
			// console.log("DECONSTRUCT TRIE");
		};
	}, [trie]);

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
		const trieResults = trie.search(
			query,
			validList,
			greenSet,
			yellowSet,
			graySet
		);
		console.log(trieResults);
		setResults(trieResults);
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
				className="mr-1.5 last:mr-0 w-8 h-58px bg-key rounded uppercase font-bold"
				onClick={() => onClickKeyButton(value)}
			>
				{value}
			</button>
		);
	};
	const Cell = ({ value, colorValue, index }) => {
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

	const Grid = () => {
		const cells = [];
		for (let i = 0; i < 30; i++) {
			cells.push(
				<Cell key={i} value={values[i]} colorValue={colors[i]} index={i} />
			);
		}
		return (
			<div className="flex justify-center items-center mt-10">
				<div className="h-board w-board grid grid-cols-5 gap-1">{cells}</div>
			</div>
		);
	};
	return (
		<div
			className="text-white"
			style={{ backgroundColor: "#121213" }}
		>
			<header className="flex items-center justify-between px-5 py-1 border-b border-tile h-50px">
				<button
					onClick={() => {
						setModalVisible(true);
					}}
				>
					<ResultIcon color="text-white" />
				</button>
				<h1 className="text-white text-center font-serif text-2xl font-extrabold">
					Wordle Helper
				</h1>
				<button
					onClick={() => {
						setHelpModalVisible(true);
					}}
				>
					<HelpIcon color="text-white" />
				</button>
			</header>
			<main className="h-game max-w-game mx-auto flex flex-col">
				<Grid />
				<div className="text-white h-keyboard mt-10">
					<div className="flex justify-center mb-2 w-full">
						{characters.top.map((key) => (
							<KeyButton key={key} value={key} />
						))}
					</div>
					<div className="flex justify-center mb-2 w-full">
						{characters.middle.map((key) => (
							<KeyButton key={key} value={key} />
						))}
					</div>
					<div className="flex justify-center mb-2 w-full">
						<button
							className="py-4 w-12 mr-1.5 text-xs bg-key rounded uppercase font-bold"
							onClick={onClickEnter}
						>
							Enter
						</button>
						{characters.bottom.map((key) => (
							<KeyButton key={key} value={key} />
						))}
						<button
							className="py-4 w-12 h-58px text-xs bg-key rounded uppercase font-bold"
							onClick={onClickBack}
						>
							Back
						</button>
					</div>
				</div>
			</main>
			{/* Results Modals */}
			<Modal
				visible={modalVisible}
				setVisible={setModalVisible}
				title="Results"
			>
				{!results.length ? (
					<div className="text-center text-lg mt-5">Enter a word first!</div>
				) : (
					<div className="grid grid-cols-5 gap-1 text-white mt-5 max-w-lg mx-auto">
						{results.slice(0, 100).map((item, idx) => {
							return (
								<div key={idx} className="uppercase text-sm text-center">
									{item}
								</div>
							);
						})}
					</div>
				)}
			</Modal>
			{/* Help Modals */}
			<Modal
				visible={helpModalVisible}
				setVisible={setHelpModalVisible}
				title="Help"
			>
				<div className="text-white px-5 max-w-lg mx-auto">
					<ol className="w-full border-b border-tile py-5">
						<li>1. Tap tile to change the color.</li>
						<li>2. Replicate your guess results.</li>
						<li>3. Click enter when finished.</li>
						<li>4. BAM. RESULTS DISPLAYED.</li>
					</ol>
					<div className="mt-5">
						<span>Examples</span>
						<div className="flex mt-5">
							<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase bg-correct border-correct mr-1.5">
								W
							</div>
							<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent mr-1.5">
								E
							</div>
							<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent mr-1.5">
								A
							</div>
							<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent mr-1.5">
								R
							</div>
							<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent">
								Y
							</div>
						</div>
						<p className="mt-3">
							If you got the result above, replicate this by typing the same
							characters and changing the color by tapping the tile. <br />
							Hit enter and repeat until you get the same word! <br />
							By default, each character is gray.
						</p>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default App;
