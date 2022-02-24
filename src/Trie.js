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

	getCount() { return this.count };

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

	search(query, validList, invalidSet) {
		// ensure expression is lowercase (all words are stored in lowercase form)
		if (query.length < 5) return null;
		// create a regexp from invalid chars
		const invalidRegExp = new RegExp(`[${invalidSet}]`);
		const results = [];

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
					if (invalidSet && invalidRegExp.test(charKey)) continue;
					const charNode = current.children.get(charKey);
					searchNode(charNode, path + charKey, index + 1);
				}
			} else {
				if (invalidSet && invalidRegExp.test(char)) return null;
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

module.exports = Trie;
