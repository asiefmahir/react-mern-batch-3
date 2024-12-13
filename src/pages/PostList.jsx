import { Link } from "react-router";
import { useFetch } from "../hooks/useFetch";

const PostList = () => {
	const {
		data: posts,
		loading,
		error,
	} = useFetch([], `https://jsonplaceholder.typicode.com/posts?_limit=5`);
	if (loading) {
		return <div>Loading........</div>;
	}
	if (error) {
		return <div>{error}</div>;
	}
	return (
		<div>
			<h2>All Posts</h2>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link to={`/posts/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostList;
