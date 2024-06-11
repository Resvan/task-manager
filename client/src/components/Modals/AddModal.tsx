/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { TaskT } from "../../types";

interface Tag {
	title: string;
	bg: string;
	text: string;
}

interface AddModalProps {
	isOpen: boolean;
	onClose: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleAddTask: (taskData: any) => void;
	editData?:TaskT
}

type TaskKeys = keyof TaskT;

const AddModal = ({ isOpen, onClose, setOpen, handleAddTask, editData }: AddModalProps) => {
	
	
	const initialTaskData = {
		title: editData?.title ?? '',
		description: editData?.description ?? "",
		priority: editData?.priority ?? "",
		deadline:editData?.deadline ?? 0,
		alt: editData?.alt ?? "",
		projectId: editData?.projectId ?? '',
		tags: editData?.tags ?? [] as Tag[],
	};

	const [taskData, setTaskData] = useState<TaskT>(initialTaskData);
	const [image, setImage] = useState<File>();
	const [tagTitle, setTagTitle] = useState("");
	const [error, setError] = useState<{ key: string; message: string }>({ key: '', message: '' });
	const [tagError, setTagError] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value }:{name:any, value:any} = e.target;
		let key: TaskKeys = name;
		let data = taskData[key]
		if (typeof data === "string" && data === '') {
			setError({key:name, message: `${name} is required`.toUpperCase()})
		} else if(typeof data === 'number' && data <= 0) {
			setError({key:name, message: `${name} is required`})
		}
		setError({key:"", message:""})
		setTaskData({ ...taskData, [name]: value });
	};

	const handleTagChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		if (e.target.value === '') {
			setTagError('Tag title is required')
		} else {
			setTagError('');
		}
		setTagTitle(e.target.value);
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleAddTag = () => {
		if (tagTitle.trim() !== "") {
			setTagError('')
			const { bg, text } = getRandomColors();
			const newTag: Tag = { title: tagTitle.trim(), bg, text };
			setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
			setTagTitle("");
			if (error.key === 'tags') {
				setError({key:'', message:''})
			}
		} else {
			setTagError('Tag title is required')
		}
	};

	const closeModal = () => {
		setError({ key: "", message: "" });
		setTagError('');
		setOpen(false);
		setTaskData(initialTaskData);
		onClose();
	};

	const handleSubmit = () => {
		if (taskData.title.trim() == '') {
			setError({ key: 'title', message: 'Title is required' });
		} else if (taskData.description.trim() == '') {
			setError({ key: 'description', message: 'Description is required' });
		} else if (taskData.priority.trim() == '') {
			setError({ key: 'priority', message: 'Priority is required' });
		} else if (taskData.deadline <= 0 ) {
			setError({ key: 'deadline', message: 'Deadline is required' });
		} else if (taskData.tags.length == 0) {
			setError({ key: 'tags', message: 'Tags required' });
		} else {
			setError({ key: '', message: '' });
			handleAddTask({...taskData, image: image});
			closeModal();
		}

	};

	return (
		<div
			className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
				isOpen ? "grid" : "hidden"
			}`}
		>
			<div
				className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
				onClick={closeModal}
			></div>
			<div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
				<input
					type="text"
					name="title"
					value={taskData.title}
					onChange={handleChange}
					placeholder="Title"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				{error.key == 'title' && <span className="text-red-600 text-start text-sm">{error.message}</span>}

				<input
					type="text"
					name="description"
					value={taskData.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				{error.key == 'description' && <span className="text-red-600 text-start text-sm">{error.message}</span>}

				<select
					name="priority"
					onChange={handleChange}
					value={taskData.priority}
					className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				>
					<option value="">Priority</option>
					<option value="LOW">Low</option>
					<option value="MEDIUM">Medium</option>
					<option value="HIGH">High</option>
				</select>
				{error.key == 'priority' && <span className="text-red-600 text-start text-sm">{error.message}</span>}

				<input
					type="number"
					name="deadline"
					value={taskData.deadline}
					onChange={handleChange}
					placeholder="Deadline"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/>
				{error.key == 'deadline' && <span className="text-red-600 text-start text-sm">{error.message}</span>}

				<input
					type="text"
					value={tagTitle}
					onChange={handleTagChange}
					placeholder="Tag Title"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/>
				{tagError && <span className="text-red-600 text-start text-sm">{tagError}</span>}

				<button
					className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
					onClick={handleAddTag}
				>
					Add Tag
				</button>
				{error.key == 'tags' && <span className="text-red-600 text-start text-sm">{error.message}</span>}

				<div className="w-full">
					{taskData.tags && <span>Tags:</span>}
					{taskData.tags.map((tag: Tag, index: number) => (
						<div
							key={index}
							className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
							style={{ backgroundColor: tag.bg, color: tag.text }}
						>
							{tag.title}
						</div>
					))}
				</div>
				<div className="w-full flex items-center gap-4 justify-between">
					<input
						type="text"
						name="alt"
						value={taskData.alt}
						onChange={handleChange}
						placeholder="Image Alt"
						className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
					/>
					<input
						type="file"
						name="image"
						onChange={handleImageChange}
						className="w-full"
					/>
				</div>
				<button
					className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
					onClick={handleSubmit}
				>
					Submit Task
				</button>
			</div>
		</div>
	);
};

export default AddModal;
