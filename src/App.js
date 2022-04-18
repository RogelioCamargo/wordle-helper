import "./App.css";
import { useEffect, useMemo, useState, useRef } from "react";
import Trie from "./Trie";
import { words } from "./data";
import { Header, Keyboard, Modal, Grid } from "./components";
import { Help, Results } from "./pages";
import { prepareInput } from "./util";

function App() {
	const [values, setValues] = useState(new Array(30).fill(""));
	const [colors, setColors] = useState(new Array(30).fill(-1));
	const [currentRow, setCurrentRow] = useState(0);
	const [currentCell, setCurrentCell] = useState(0);
	const [results, setResults] = useState([]);
	const resultsModalRef = useRef();
	const helpModalRef = useRef();

	// create trie
	const trie = useMemo(() => {
		const newTrie = new Trie();
		for (const word of words) newTrie.insert(word);
		return newTrie;
	}, []);

	// destory trie upon unmount
	useEffect(() => {
		return () => {
			for (const word of words) trie.remove(word);
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
		const word = values.slice(currentRow * 5, currentRow * 5 + 5).join("");
		if (word.length !== 5) return null;

		const input = prepareInput(currentRow, colors, values);
		const trieResults = trie.search(
			input.correctQuery,
			input.validQueryList,
			input.greenSet,
			input.yellowSet,
			input.graySet
		);
		setResults(trieResults);
		resultsModalRef.current.openModal();

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

	const onClickKey = (keyValue) => {
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

	return (
		<div className="text-white App" style={{ backgroundColor: "#121213" }}>
			<Header
				openResultsModal={() => resultsModalRef.current.openModal()}
				openHelpModal={() => helpModalRef.current.openModal()}
			/>
			<main className="h-game max-w-game mx-auto flex flex-col">
				<Grid values={values} colors={colors} changeColor={changeColor} />
				<Keyboard
					onClickBack={onClickBack}
					onClickEnter={onClickEnter}
					onClickKey={onClickKey}
				/>
			</main>
			{/* Results Modals */}
			<Modal ref={resultsModalRef} title="Results">
				<Results results={results} />
			</Modal>
			{/* Help Modals */}
			<Modal ref={helpModalRef} title="Help">
				<Help />
			</Modal>
		</div>
	);
}

export default App;
