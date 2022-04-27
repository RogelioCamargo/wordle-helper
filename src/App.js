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

	const changeColor = (selectedIndex) => {
		// ensure cell belongs isn't empty
		if (
			(selectedIndex === currentCell && !values[currentCell]) ||
			selectedIndex > currentCell
		)
			return null;
		let colorValue = colors[selectedIndex];
		if (colorValue === 2) colorValue = 0;
		else colorValue++;
		setColors((previousState) => {
			return previousState.map((value, index) =>
				index === selectedIndex ? colorValue : value
			);
		});
	};

	const isLastCell = (index) => index === 29;
	const isLastCellInRow = (index) => (index + 1) % 5 === 0;
	const isFirstCellInRow = (index) => index % 5 === 0;
	const isOccupiedCell = (index) => values[index];
	const isLastRow = (index) => index === 6;

	const onClickEnter = () => {
		// ensure entire row is filled
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
			if (isLastCell(previousState)) return 29;
			return previousState + 1;
		});
		setCurrentRow((previousState) => {
			if (isLastRow(previousState)) return 6;
			return previousState + 1;
		});
	};

	const onClickBack = () => {
		const CURRENT_CELL = currentCell;
		if (currentRow && isFirstCellInRow(CURRENT_CELL))
			setCurrentRow((previousState) => previousState - 1);
		if (isLastCellInRow(CURRENT_CELL) && isOccupiedCell(CURRENT_CELL)) {
			setColors((previousState) => {
				return previousState.map((value, index) =>
					index === CURRENT_CELL ? -1 : value
				);
			});
			setValues((previousState) => {
				return previousState.map((value, index) =>
					index === CURRENT_CELL ? "" : value
				);
			});
		} else {
			setColors((previousState) => {
				return previousState.map((value, index) =>
					index === CURRENT_CELL || index === CURRENT_CELL - 1 ? -1 : value
				);
			});
			setValues((previousState) => {
				return previousState.map((value, index) =>
					index === CURRENT_CELL || index === CURRENT_CELL - 1 ? "" : value
				);
			});
			setCurrentCell((previousState) => {
				if (previousState <= 0) return 0;
				return previousState - 1;
			});
		}
	};

	const onClickKey = (keyValue) => {
		// capture the current cell to ensure the correct cell is updated
		const CURRENT_CELL = currentCell;
		// can only go one row at a time
		if (isLastCellInRow(CURRENT_CELL) && values[CURRENT_CELL]) return null;

		setValues((previousState) => {
			return previousState.map((value, index) =>
				index === CURRENT_CELL ? keyValue : value
			);
		});
		setColors((previousState) => {
			return previousState.map((value, index) =>
				index === CURRENT_CELL ? 0 : value
			);
		});
		setCurrentCell((previousState) => {
			if (isLastCellInRow(previousState)) return previousState;
			if (isLastCell(previousState)) return 29;
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
