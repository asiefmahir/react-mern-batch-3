import { useState, useEffect } from "react";

export const useFetch = (initData, url) => {
	const [data, setData] = useState(initData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				setLoading(false);
				setError("");
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
				setData([]);
			});
	});

	return {
		data,
		loading,
		error,
	};
};
