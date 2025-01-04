export const dynamicParams = true;

export async function generateMetadata({ params }) {
	const { id } = await params;
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
	);
	const post = await response.json();
	return {
		title: post.title,
		description: post.body,
	};
}

export async function generateStaticParams() {
	const posts = await fetch(
		"https://jsonplaceholder.typicode.com/posts?_limit=5",
	).then((res) => res.json());

	return posts.map((post) => ({
		id: String(post.id),
	}));
}

const PostDetails = async ({ params }) => {
	console.log("I am re rendering");

	// console.log(params);
	const { id } = await params;
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
	);
	const post = await response.json();

	return (
		<div>
			<h2>Post Title- {post?.title}</h2>
			<p>Post Body- {post?.body}</p>
		</div>
	);
};

export default PostDetails;
