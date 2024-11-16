import { useState, useRef, useEffect } from "react";
function App() {
	const [count, setCount] = useState(0);
	const inputRef = useRef(null);
	console.log(inputRef.current);
	function handleClick() {
		setCount((prev) => prev + 1);
		if (inputRef.current) {
			// inputRef.current.style.width = "500px";
			inputRef.current.focus();
		}
	}
	useEffect(() => {
		if (inputRef.current) {
			// inputRef.current.style.width = "500px";
			inputRef.current.focus();
		}
	}, []);
	console.log("Rendering Phase");

	return (
		<div className="App">
			<p>The value of the count is {count}</p>
			<button onClick={handleClick}>Increase</button>
			<hr />
			<input ref={inputRef} type="text" />
			<button>Submit Button</button>
		</div>
	);
}

/**
 * A component must fullfil 3 criteria
 *    1) Component must be a function
 *    2) A Component must return "something"
 *    3) That "something" must be some html-ish code (jsx)
 */

export default App;

/**
 * fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
		.then((res) => res.json())
		.then((data) => {
			//
			// if (posts.length > 0) {
			// 	return;
			// }
			setPosts(data);
			return;
			// posts = data
			// console.log(data);
		})
		.catch((err) => {
			console.log(err.message);
		});
 */
