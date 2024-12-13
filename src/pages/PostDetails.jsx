import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router";

const PostDetails = () => {
	const { id } = useParams();
	const { data: post } = useFetch(
		null,
		`https://jsonplaceholder.typicode.com/posts/${id}`,
	);

	console.log(id, "data");

	return (
		<div>
			<h2>Post Title - {post?.title}</h2>
			<h3>Post Description - {post?.body}</h3>
		</div>
	);
};

export default PostDetails;
