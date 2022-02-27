import { CloseIcon } from "../icons";

const Modal = ({ children, title, visible, setVisible }) => {
	return (
		<div
			className="absolute top-0 left-0 h-screen w-full"
			style={{
				backgroundColor: "#121213",
				display: visible ? "block" : "hidden",
			}}
		>
			<header className="max-w-lg mx-auto relative mt-3">
				<button
					className="absolute top-0 right-2"
					onClick={() => setVisible(false)}
				>
					<CloseIcon color="text-white" />
				</button>
				<h1 className="uppercase text-xl text-white text-center font-bold">
					{title}
				</h1>
			</header>
			{children}
		</div>
	);
};

export default Modal;
