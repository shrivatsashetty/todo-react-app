import { useState, useEffect } from "react";

import "./App.css";

// importing components
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
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
				"
			>
				<h1 className="font-bold text-2xl max-sm:text-base text-center">
					iTasks - Manage your tasks in one place
				</h1>

				<form
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
						Add a Todo
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
							maxlength="40"
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
					</div>
				</form>

				<div className="show-finished flex items-center gap-2 max-sm:text-sm">
					<input
						type="checkbox"
						name="chk-show-finished"
						id="chk-show-finished"
					/>
					<label htmlFor="chk-show-finished">Show Finished</label>
				</div>

				<hr className="w-full border-gray-400" />

				<h2 className="max-sm:text-sm text-xl font-semibold max-sm:font-medium">Your Todos</h2>

				<Todo/>
				<Todo/>
				<Todo/>
			</main>
		</>
	);
}

export default App;
