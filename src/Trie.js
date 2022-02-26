class TrieNode {
	constructor() {
		this.children = new Map();
		this.isWord = false;
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode();
		this.count = 0;
	}

	getCount() {
		return this.count;
	}

	insert(word) {
		const insertNode = (current, word, index) => {
			if (index === word.length) {
				current.isWord = true;
				return null;
			}

			const char = word.charAt(index);
			let charNode = current.children.get(char);

			if (!charNode) {
				charNode = new TrieNode();
				current.children.set(char, charNode);
			}

			insertNode(charNode, word, index + 1);
		};

		if (!word.length) return null;
		insertNode(this.root, word.toLowerCase(), 0);
		this.count++;
	}

	search(query, validList, greenSet, yellowSet, invalidSet) {
		const results = [];

		const isInvalidCharacter = (char) => {
			return (
				(invalidSet.has(char) && !greenSet.has(char)) ||
				(invalidSet.has(char) && !yellowSet.has(char))
			);
		};

		const isSingleOccurring = (char) => {
			return (
				(invalidSet.has(char) && greenSet.has(char)) ||
				(invalidSet.has(char) && yellowSet.has(char))
			);
		};

		const searchNode = (current, path, index) => {
			if (index === query.length) {
				for (const list of validList) {
					for (let idx = 0; idx < list.length; idx++) {
						const validChar = list[idx];
						if (validChar === ".") continue;
						const indexOfValidChar = path.indexOf(validChar);
						// validChar should be found in path AND
						// it should not be in the same index as validList
						if (indexOfValidChar === -1 || indexOfValidChar === idx)
							return null;
					}
				}

				for (let i = 0; i < path.length; i++) {
					const char = path[i];
					const regex = new RegExp(`[${char}]`, "g");
					const matches = path.match(regex);
					
					if (matches.length > 1 && isSingleOccurring(char)) return null;
				}
				// if criteria is met, push path(or word) to the results array
				results.push(path);
				return null;
			}

			const char = query.charAt(index);
			// "." represents any character, so must vist every path
			if (char === ".") {
				const charKeys = current.children.keys();
				for (const charKey of charKeys) {
					// should not go down the path of an invalid char
					if (isInvalidCharacter(charKey)) continue;
					const charNode = current.children.get(charKey);
					searchNode(charNode, path + charKey, index + 1);
				}
			} else {
				if (isInvalidCharacter(char)) return null;
				const charNode = current.children.get(char);
				if (!charNode) return null;
				else searchNode(charNode, path + char, index + 1);
			}
		};

		searchNode(this.root, "", 0);
		return results;
	}

	remove(word) {
		const removeNode = (current, word, index) => {
			if (index === word.length) {
				current.isWord = false;
				return null;
			}

			const char = word.charAt(index);
			let charNode = current.children.get(char);

			if (!charNode) return null;
			else removeNode(charNode, word, index + 1);

			if (!charNode.isWord && !charNode.children.size)
				current.children.delete(char);
		};

		if (!word.length) return null;
		removeNode(this.root, word.toLowerCase(), 0);
		this.count--;
	}
}

export default Trie;
