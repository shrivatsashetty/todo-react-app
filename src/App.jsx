import { useState, useEffect, useRef } from "react";

import "./App.css";

// importing components
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
	const [todos, setToDos] = useState([]);
	const [currentTodoId, setCurrentTodoId] = useState("");
	const [showFinishedTodos, setShowFinishedTodos] = useState(false);

	useEffect(() => {
		if (localStorage.todos) {
			let tasks = localStorage.getItem("todos");
			setToDos(JSON.parse(tasks));
		} else {
			localStorage.setItem("todos", JSON.stringify([]));
			setToDos([]);
		}
	}, []);

	const txtInputTodo = useRef();
	const chkShowFinished = useRef();

	function saveTodo(e) {
		e.preventDefault();

		const todoContent = txtInputTodo.current.value.trim();
		if (!todoContent) {
			alert("Please Enter Todo Content!!");
			return;
		}

		let updatedTodos = [];
		// logic to check whether to create a new todo or update an existing one
		if (currentTodoId) {
			updatedTodos = todos.map((todo) =>
				todo.id === currentTodoId
					? { ...todo, content: todoContent }
					: todo
			);

			setCurrentTodoId(""); // Clear the editing state after saving
		} else {
			const newTodo = {
				id: crypto.randomUUID(), // the window.crypto object can be used to generat cryptographically secure version 4 UUID
				content: todoContent,
				isCompleted: false,
			};

			updatedTodos = [...todos, newTodo];
		}

		setToDos(updatedTodos);

		localStorage.setItem("todos", JSON.stringify(updatedTodos)); // update the local storage accordingly

		txtInputTodo.current.value = "";
	}

	// function to handle checkbox to do completed status
	function todoCompletionChanged(id) {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
		);
		setToDos(updatedTodos);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	}

	function deleteTodo(id) {
		const filteredTodos = todos.filter((todo) => todo.id !== id);
		localStorage.setItem("todos", JSON.stringify(filteredTodos)); // set the new todo list to local storage
		setToDos(filteredTodos); // update the state variable
	}

	function editTodo(id) {
		const toBeEditedTodo = todos.find((todo) => todo.id === id);
		setCurrentTodoId(toBeEditedTodo.id); // Set this todo as being edited
		txtInputTodo.current.value = toBeEditedTodo.content;
		txtInputTodo.current.focus(); // Focus input for better UX
	}

	function cancelEdit() {
		setCurrentTodoId(""); // Clear editing state
		txtInputTodo.current.value = ""; // Clear input
	}

	function showFinishedTodosChanged() {
		const showFinished = chkShowFinished.current.checked;
		setShowFinishedTodos(showFinished);
	}

	// Filter todos based on editing state and show finished checkbox
	const displayedTodos = todos.filter((todo) => {
		// Hide todo being edited
		if (currentTodoId && todo.id === currentTodoId) {
			return false;
		}
		// If "Show Finished" is checked, show only completed todos
		if (showFinishedTodos && !todo.isCompleted) {
			return false;
		}
		return true;
	});

	return (
		<>
			<Navbar />

			<main
				className="
					content
					max-w-150 max-sm:max-w-75
					bg-violet-200
					rounded-md
					p-4
					mx-auto
					mt-6
					flex
					flex-col
					gap-4
					h-[80vh]
				"
			>
				<h1 className="font-bold text-2xl max-sm:text-base text-center">
					iTasks - Manage your tasks in one place
				</h1>

				<form
					onSubmit={saveTodo}
					className="
						font-bold
						text-lg
						max-sm:text-sm
						w-full
						flex
						flex-col
						gap-2
					"
				>
					<h2 className="max-sm:text-sm text-xl font-semibold max-sm:font-medium">
						{currentTodoId ? "Edit Todo" : "Add a Todo"}
					</h2>

					<div
						className="
							form-inputs
							flex
							w-full
							items-center
							gap-2
							max-sm:flex-col
							max-sm:items-stretch
						"
					>
						<input
							ref={txtInputTodo}
							className="
								bg-white
								rounded-full
								p-1
								pl-4
								flex-1
								text-base
								font-medium
								max-sm:text-sm
								max-sm:font-normal
								focus:outline-none
								focus:ring-0
								border
								border-gray-300
							"
							type="text"
							name="txt-todo"
							id="txt-todo"
							placeholder="Enter your task..."
							maxLength="35"
						/>

						<button
							type="submit"
							className="
								bg-purple-500
								text-white
								px-4
								py-1
								rounded-full
								flex
								items-center
								justify-center
								cursor-pointer
								whitespace-nowrap
								text-base
								font-semibold
								max-sm:text-sm
								max-sm:font-medium
							"
						>
							Save
						</button>

						<button
							type="button" // specifies, this is not a submit button
							onClick={cancelEdit}
							className="
									bg-purple-500
									text-white
									px-3
									py-1
									rounded-full
									flex
									items-center
									justify-center
									cursor-pointer
									whitespace-nowrap
									text-base
									font-semibold
									max-sm:text-sm
									max-sm:font-medium
									hover:bg-gray-600
									transition-colors
								"
						>
							Cancel
						</button>
					</div>
				</form>

				<div className="show-finished flex items-center gap-2 max-sm:text-sm">
					<input
						ref={chkShowFinished}
						onChange={showFinishedTodosChanged}
						type="checkbox"
						name="chk-show-finished"
						id="chk-show-finished"
					/>

					<label
						htmlFor="chk-show-finished"
						className="cursor-pointer"
					>
						Show Finished
					</label>
				</div>

				<hr className="w-full border-gray-400" />

				<h2 className="max-sm:text-sm text-xl font-semibold max-sm:font-medium">
					Your Todos
				</h2>

				<div className="todos max-h-[50%] overflow-y-scroll">
					{displayedTodos.length === 0 ? (
						<p className="text-center text-gray-600 mt-4 text-sm">
							{/* below we can see the chaining of two ternary operators */}
							{currentTodoId
								? "Editing todo above..."
								: (showFinishedTodos
								? "No completed todos yet!"
								: "No todos yet. Add one above!")}
						</p>
					) : (
						<ul className="flex flex-col gap-1.5">
							{displayedTodos.map((todo) => (
								<li key={todo.id}>
									<Todo
										id={todo.id}
										content={todo.content}
										isCompleted={todo.isCompleted}
										onToggle={todoCompletionChanged}
										onDelete={deleteTodo}
										onEdit={editTodo}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</main>
		</>
	);
}

export default App;
