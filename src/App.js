import { useEffect, useMemo, useState, useRef } from "react";
import Trie from "./Trie";
import Character from "./Character";
import { words } from "./data";
import { Header, Modal, Game } from "./components";
import { Help, Results } from "./pages";

function App() {
	const [values, setValues] = useState([]);
	const [results, setResults] = useState([]);
	const resultsModalRef = useRef();
	const helpModalRef = useRef();

	// create trie on mount
	const trie = useMemo(() => {
		const newTrie = new Trie();
		for (const word of words) newTrie.insert(word);
		return newTrie;
	}, []);

	// destory trie on unmount
	useEffect(() => {
		return () => {
			for (const word of words) trie.remove(word);
		};
	}, [trie]);

	const changeColor = (selectedIndex) => {
		// can't change color of cell that is empty
		if (selectedIndex > values.length - 1) return null;

		// get current color of cell
		const { color } = values[selectedIndex];
		
		// update color of cell
		let newColor = (color + 1) % 3; 
		setValues((previousState) => {
			return previousState.map((character, index) => {
				if (selectedIndex === index)
					character.color = newColor; 
				
				return character;
			});
		});
	};

	const onClickEnter = () => {
		// disable if row is not filled
		if (values.length > 0 && values.length % 5 !== 0) return null;

		const trieResults = trie.search(values);
		setResults(trieResults);
		resultsModalRef.current.openModal();
	};

	const onClickBack = () => {
		// disable if no values are present
		if (values.length <= 0) return null;

		setValues((previousState) =>
			previousState.slice(0, previousState.length - 1)
		);
	};

	const onClickKey = (keyValue) => {
		// disable if thirty values are already present
		if (values.length >= 30) return null;

		const character = new Character(keyValue);
		setValues((previousState) => [...previousState, character]);
	};

	return (
		<div className="text-white App" style={{ backgroundColor: "#121213" }}>
			<Header
				openResultsModal={() => resultsModalRef.current.openModal()}
				openHelpModal={() => helpModalRef.current.openModal()}
			/>
			<Game
				values={values}
				changeColor={changeColor}
				onClickBack={onClickBack}
				onClickEnter={onClickEnter}
				onClickKey={onClickKey}
			/>
			{/* Results Modals */}
			<Modal ref={resultsModalRef} title="Results">
				<Results results={results} />
			</Modal>
			{/* Help Modals */}
			<Modal ref={helpModalRef} title="Instructions">
				<Help />
			</Modal>
		</div>
	);
}

export default App;
