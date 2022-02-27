const Results = ({ results }) => {
	return (
		<>
			{!results.length ? (
				<div className="text-center text-lg mt-5">Enter a word first!</div>
			) : (
				<div className="grid grid-cols-5 gap-1 text-white mt-5 max-w-lg mx-auto">
					{results.slice(0, 100).map((item, idx) => {
						return (
							<div key={idx} className="uppercase text-sm text-center">
								{item}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default Results;
