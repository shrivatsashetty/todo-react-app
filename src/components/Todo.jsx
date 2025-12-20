import { useEffect, useState } from "react";

function Todo({ id, content, isCompleted, onToggle, onDelete, onEdit, showCompleted }) {

	const [isTodoHidden, setIsTodoHidden] = useState(false);

	useEffect(
		() => {
			console.log("First Render");
		},
		[]
	);

	useEffect(
		() => {
			console.log("Todo component rendered");
		}
	);

	return (
		<div
			className={`
				todo-holder
				flex
				justify-between
				items-start
				gap-3
				max-sm:flex-col

				{ ${ (showCompleted && !isCompleted) ? "hidden": ""} }
			`}
		>
			{/* Todo text */}
			<div className={`todo flex gap-3 items-start `}
			
			>
				<input
					type="checkbox"
					name="chk-done"
					className="mt-1"
					checked={isCompleted}
					onChange={() => onToggle(id)}
				/>
				<p
					className={`text-base max-sm:text-sm 
							${isCompleted ? "line-through text-gray-500" : ""}
						`}
				>
					{content}
				</p>
			</div>

			{/* Controls */}
			<div
				className="
					todo-controls
					flex
					gap-2
					sm:mx-2
					max-sm:flex-col
					max-sm:w-full
				"
			>
				<button
					type="button"
					onClick={(e) => {
							setIsTodoHidden(!isTodoHidden);
							onEdit(e, id);
						}
					}
					className="
						btn-edit-todo
						bg-purple-500
						text-white
						px-3
						py-0.5
						rounded-full
						flex
						items-center
						justify-center
						cursor-pointer
						whitespace-nowrap
						text-sm
						font-medium
						max-sm:px-2
						max-sm:py-0.5
						max-sm:text-xs
						max-sm:font-normal
						max-sm:w-full
					"
				>
					Edit
				</button>

				<button
					type="button"
					onClick={() => {onDelete(id)}}
					className="
						btn-delete-todo
						bg-purple-500
						text-white
						px-3
						py-0.5
						rounded-full
						flex
						items-center
						justify-center
						cursor-pointer
						whitespace-nowrap
						text-sm
						font-medium
						max-sm:px-2
						max-sm:py-0.5
						max-sm:text-xs
						max-sm:font-normal
						max-sm:w-full
					"
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default Todo;
