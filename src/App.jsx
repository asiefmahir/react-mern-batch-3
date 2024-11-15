import { useState, useEffect } from "react";
function App() {
	const [count, setCount] = useState(0);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		console.log("I am inside useEffect");
		fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
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
		// setInterval()
		const someInterval = setInterval(() => {
			console.log("I am inside interval");
		}, 1000);
		return () => {
			console.log("I am weird function");
			clearInterval(someInterval);
		};
	}, []);

	console.log("I am outside effect");

	return (
		<div className="App">
			<p>The value of the counter is {count}</p>
			<button onClick={() => setCount(count + 1)}>Increase By 1</button>
			<hr />
			<div className="posts">
				<h2>All Posts</h2>
				<ul>
					{posts?.map((post) => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			</div>
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
