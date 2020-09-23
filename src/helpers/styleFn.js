
const grid = 8

export const getSidebarListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#2E3648',
    padding: grid,
    width: 250
});

export const getSidebarItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});


export const getDraggableItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging && 'lightgreen' ,

    // styles we need to apply on draggables
    ...draggableStyle
});

