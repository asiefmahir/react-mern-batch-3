"use client";

import { useState } from "react";

const Counter = () => {
	console.log("Counter is Rendering");

	const [counter, setCounter] = useState(10);

	return (
		<div>
			<p>The value of the counter is {counter}</p>
			<button onClick={() => setCounter(counter + 1)}>
				Increase By 1
			</button>
		</div>
	);
};

export default Counter;
