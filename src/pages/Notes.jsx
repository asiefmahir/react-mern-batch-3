import { useLoaderData, Form } from "react-router";

const Notes = () => {
	const notes = useLoaderData();
	return (
		<div>
			<Form method="post">
				<input type="text" name="title" placeholder="Enter your note" />

				<button type="submit">Create Note</button>
			</Form>
			<div className="all-notes">
				<h2>All Notes</h2>
				<ul>
					{notes.map((note) => (
						<li key={note.id}>{note.title}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export const loader = async () => {
	const res = await fetch("http://localhost:4000/todos");
	const data = await res.json();
	return data;
};

export const action = async ({ request, params }) => {
	const formData = await request.formData();
	const title = formData.get("title");
	console.log(title);

	await fetch(`http://localhost:4000/todos`, {
		method: "POST",
		body: JSON.stringify({ title: title, completed: false }),
		headers: {
			"Content-type": "application/json",
		},
	});
};

export default Notes;
