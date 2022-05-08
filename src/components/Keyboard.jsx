import { characters } from "../data";

const Keyboard = ({ onClickBack, onClickEnter, onClickKey, }) => {
	const KeyButton = ({ value }) => {
		return (
			<button
				className="mr-1.5 last:mr-0 flex-1 max-w-key h-58px bg-key rounded uppercase font-bold"
				onClick={() => onClickKey(value)}
			>
				{value}
			</button>
		);
	};

	return (
		<div className="text-white h-keyboard px-3">
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
	);
};

export default Keyboard;
