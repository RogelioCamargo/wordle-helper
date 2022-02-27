import { ResultIcon, HelpIcon } from "../icons";

const Header = ({ setResultsModalVisible, setHelpModalVisible }) => {
	return (
		<header className="flex items-center justify-between px-5 py-1 border-b border-tile h-50px">
			<button
				onClick={() => {
					setResultsModalVisible(true);
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
	);
};

export default Header;
