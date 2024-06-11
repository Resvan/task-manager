/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline, Pencil, Trash } from "react-ionicons";
import { TaskT } from "../../types";
import AddModal from "../Modals/AddModal";
import { useState } from "react";
import { uploadFilePost } from "../../services/api";

interface TaskProps {
	task: TaskT;
	provided: any;
	socket:any
}

const Task = ({ task, provided, socket }: TaskProps) => {


	const { title, description, priority, deadline, image, alt, tags } = task;
	
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleEditTask = async (taskData: TaskT) => {

		let taskObj = {
			...taskData,
			taskId: task._id,
			state: task.state,
		}

		if (taskData.image !== undefined) {
			let url = await uploadFilePost(taskData.image, 'Task-Images');
			taskObj["image"] = url;
		}

		socket.emit('task:update', taskObj);
	};

	const handleDeleteTask = async () => {
		socket.emit('task:delete', {taskId: task._id, projectId: task.projectId});
	}



	return (
		<>
		<div
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			className="relative w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4 group"
		>
			<div className="absolute flex gap-2 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<Pencil
					color={'#2478ff'}
					title={'edit'}
					height="30px"
					width="20px"
					onClick={openModal}
				/>
				<Trash
					color={'#ff0015'}
					title={'Delete'}
					height="30px"
					width="20px"
					onClick={handleDeleteTask}
				/>

			</div>

			{image && alt && (
				<img
					src={image as string}
					alt={alt}
					className="w-full h-[170px] rounded-lg"
				/>
			)}
			<div className="flex items-center gap-2">
				{tags.map((tag) => (
					<span
						key={tag.title}
						className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
						style={{ backgroundColor: tag.bg, color: tag.text }}
					>
						{tag.title}
					</span>
				))}
			</div>
			<div className="w-full flex items-start flex-col gap-0">
				<span className="text-[15.5px] font-medium text-[#555]">{title}</span>
				<span className="text-[13.5px] text-gray-500">{description}</span>
			</div>
			<div className="w-full border border-dashed"></div>
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-1">
					<TimeOutline
						color={"#666"}
						width="19px"
						height="19px"
					/>
					<span className="text-[13px] text-gray-700">{deadline} mins</span>
				</div>
				<div
					className={`w-[60px] rounded-full h-[5px] ${
						priority === "HIGH"
							? "bg-red-500"
							: priority === "MEDIUM"
							? "bg-orange-500"
							: "bg-blue-500"
					}`}
				></div>
			</div>
			</div>
			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleEditTask}
				editData={task}
			/>
		</>
	);
};

export default Task;
