import { ResultIcon, HelpIcon } from "../icons";

const Header = ({ openResultsModal, openHelpModal }) => {
	return (
		<header className="flex items-center justify-between px-5 py-1 border-b border-tile h-50px">
			<button
				onClick={openResultsModal}
			>
				<ResultIcon color="text-white" />
			</button>
			<h1 className="text-white text-center font-serif text-2xl font-extrabold">
				Wordle Helper
			</h1>
			<button
				onClick={openHelpModal}
			>
				<HelpIcon color="text-white" />
			</button>
		</header>
	);
};

export default Header;
