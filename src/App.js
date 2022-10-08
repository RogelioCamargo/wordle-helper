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

	// open help modal on mount
	useEffect(() => {
		helpModalRef.current.openModal(); 
	}, []); 

	// destory trie on unmount
	useEffect(() => {
		return () => {
			for (const word of words) trie.remove(word);
		};
	}, [trie]);

	const changeColor = (selectedIndex) => {
		const cell = values.length - 1;
		if (selectedIndex > cell) return null;

		// get character's color
		const { color } = values[selectedIndex];
		let newColor; 
		if (color === 2) newColor = 0;
		else newColor = color + 1;

		// update color
		setValues((previousState) => {
			return previousState.map((character, index) => {
				if (selectedIndex === index)
					character.color = newColor; 
				
				return character;
			});
		});
	};

	const onClickEnter = () => {
		// ensure entire row is filled
		if (values.length > 0 && values.length % 5 !== 0) return null;

		const trieResults = trie.search(values);
		setResults(trieResults);
		resultsModalRef.current.openModal();
	};

	const onClickBack = () => {
		if (values.length <= 0) return null;

		setValues((previousState) =>
			previousState.slice(0, previousState.length - 1)
		);
	};

	const onClickKey = (keyValue) => {
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
