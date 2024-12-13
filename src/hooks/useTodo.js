import { useState, useEffect } from "react";

export const useTodo = () => {
	const [todoTitle, setTodoTitle] = useState("");
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState("all");

	const filterOption = () => {
		if (filter === "completed") {
			return "completed=true";
		} else if (filter === "pending") {
			return "completed=false";
		} else {
			return "";
		}
	};

	const getAllTodos = async () => {
		const res = await fetch(
			`http://localhost:4000/todos?${filterOption()}`,
		);
		const data = await res.json();
		setTodos(data);
	};

	useEffect(() => {
		getAllTodos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const newTodo = {
			title: todoTitle,
			completed: false,
		};

		// data changes in API
		await fetch(`http://localhost:4000/todos`, {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				"Content-type": "application/json",
			},
		});
		setFilter("all");
		await getAllTodos();
		// setTodos([...todos, newTodo])

		setTodoTitle("");
	};

	const removeHandler = async (todoId) => {
		await fetch(`http://localhost:4000/todos/${todoId}`, {
			method: "DELETE",
		});
		await getAllTodos();
		// setTodos(todos.filter((todo) => todo.id !== todoId));
	};

	const updateHandler = async (todo) => {
		await fetch(`http://localhost:4000/todos/${todo.id}`, {
			method: "PUT",
			body: JSON.stringify({ ...todo, completed: !todo.completed }),
			headers: {
				"Content-type": "application/json",
			},
		});
		await getAllTodos();
	};
	return {
		todos,
		filter,
		setFilter,
		todoTitle,
		setTodoTitle,
		submitHandler,
		removeHandler,
		updateHandler,
	};
};
