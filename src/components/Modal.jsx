import { CloseIcon } from "../icons";

const Modal = ({ children, visible, setVisible }) => {
	return (
		<div
			className="absolute top-0 left-0 h-screen w-screen"
			style={{
				backgroundColor: "#121213",
				display: visible ? "block" : "none",
			}}
		>
			<button
				className="absolute top-0 right-0"
				onClick={() => setVisible(false)}
			>
				<CloseIcon color="text-white" />
			</button>
			{children}
		</div>
	);
};

export default Modal;
