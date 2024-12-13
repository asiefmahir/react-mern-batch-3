import { useTodo } from "./hooks/useTodo";

function App() {
	const {
		submitHandler,
		todoTitle,
		setTodoTitle,
		setFilter,
		filter,
		todos,
		updateHandler,
		removeHandler,
	} = useTodo();
	return (
		<div className="App">
			<form onSubmit={submitHandler}>
				<input
					type="text"
					value={todoTitle}
					onChange={(e) => setTodoTitle(e.target.value)}
				/>
				<button type="submit">Create Todo</button>
			</form>
			<div className="filter-options">
				<select
					name=""
					id=""
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="pending">Pending</option>
				</select>
			</div>
			<div className="todo-list">
				<h2>Todo List</h2>
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="checkbox"
								name=""
								id=""
								checked={todo.completed}
								onChange={() => updateHandler(todo)}
							/>
							<span>{todo.title}</span>
							<button onClick={() => removeHandler(todo.id)}>
								Remove
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
