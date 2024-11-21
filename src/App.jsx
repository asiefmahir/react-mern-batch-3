import { useState, useCallback, useMemo } from "react";
import OurAppTitle from "./components/OurAppTitle";
import Button from "./components/Button";
import Title from "./components/Title";
function App() {
	const [counter, setCounter] = useState(0);
	const [counter2, setCounter2] = useState(10);

	const increaseHandler = useCallback(() => {
		setCounter((prevCounterValue) => prevCounterValue + 1);
		// #00FFXXX // #jkhajkgsdjk
	}, []); // #00FFXXX

	const increaseHandler2 = useCallback(() => {
		setCounter2((prev) => prev + 5);
		// #454565456asdas // #hausduagdu
	}, []); // #454565456asdas

	const isEven = useMemo(() => {
		let i = 0;
		while (i < 1000000000) i++;
		return counter % 2 === 0 ? `Counter is Even` : `Counter is Odd`;
	}, [counter]);

	console.log("App is rendering");

	return (
		<div className="App">
			<OurAppTitle />
			<hr />
			<div className="counter-app-1">
				<Title value={counter} />
				<p>{isEven}</p>
				<Button clickHandler={increaseHandler} />
			</div>
			<div className="counter-app-1">
				<Title value={counter2} />
				<Button clickHandler={increaseHandler2} />
			</div>
		</div>
	);
}

export default App;
