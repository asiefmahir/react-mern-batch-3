import { useFetch } from "../hooks/useFetch";

const UserList = () => {
	const {
		data: users,
		loading,
		error,
	} = useFetch([], `https://jsonplaceholder.typicode.com/users?_limit=5`);

	if (loading) {
		return <div>Data Ashtese......</div>;
	}
	if (error) {
		return <div> {error}</div>;
	}
	return (
		<div>
			<h2>All Users</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
