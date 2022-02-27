const Help = () => {
	return (
		<div className="text-white px-5 max-w-lg mx-auto">
			<ol className="w-full border-b border-tile py-5">
				<li>1. Tap tile to change the color.</li>
				<li>2. Replicate your guess results.</li>
				<li>3. Click enter when finished.</li>
				<li>4. BAM. RESULTS DISPLAYED.</li>
			</ol>
			<div className="mt-5">
				<span>Examples</span>
				<div className="flex mt-5">
					<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase bg-correct border-correct mr-1.5">
						W
					</div>
					<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent mr-1.5">
						E
					</div>
					<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent mr-1.5">
						A
					</div>
					<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent mr-1.5">
						R
					</div>
					<div className="h-12 w-12 border text-white text-xl font-bold align-middle flex items-center justify-center uppercase border-absent bg-absent">
						Y
					</div>
				</div>
				<p className="mt-3">
					If you got the result above, replicate this by typing the same
					characters and changing the color by tapping the tile. <br />
					Hit enter and repeat until you get THE word! <br />
					By default, each character is gray.
				</p>
			</div>
		</div>
	);
};

export default Help;
