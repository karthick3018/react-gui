
const grid = 8

export const getSidebarListStyle = isDraggingOver => ({
    background: '#2E3648',
    padding: grid,
    width: 250
});

export const getSidebarItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding:'10px',
    color: isDragging&&'grey',
    background: isDragging && '#B2F5EA',
    ...draggableStyle
});


export const getDraggableItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging && '#B2F5EA' ,
    ...draggableStyle
});

