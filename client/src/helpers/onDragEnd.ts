// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onDragEnd = (result: any, socket:any, proId:string) => {
	if (!result.destination) return;

	const { source, destination } = result;

	
	if (source.droppableId !== destination.droppableId) {
		const movedTask = {
			taskId: result.draggableId,
			from: source.droppableId,
			to: destination.droppableId,
			position: destination.index,
			projectId:proId,
		};

		socket.emit('task:move', movedTask);
	}
};
