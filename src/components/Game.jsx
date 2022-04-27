import Grid from "./Grid";
import Keyboard from "./Keyboard";

const Game = ({
	values,
	changeColor,
	onClickBack,
	onClickEnter,
	onClickKey,
}) => (
	<main className="h-game max-w-game mx-auto flex flex-col">
		<Grid values={values} changeColor={changeColor} />
		<Keyboard
			onClickBack={onClickBack}
			onClickEnter={onClickEnter}
			onClickKey={onClickKey}
		/>
	</main>
);

export default Game;
