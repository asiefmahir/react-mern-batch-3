import Counter from "./components/Counter";

export default async function Home() {
	console.log("Home is rendering");

	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=5`,
	);
	const posts = await res.json();
	return (
		<div>
			<h2>Hello Next</h2>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
			<hr />
			<Counter />
		</div>
	);
}
