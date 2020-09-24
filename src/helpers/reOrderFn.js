
export const reOrderWithInSameArea = (state,sourceId,destinationId) => {
  let updatedValue = [...state];
  const [movedElement] = updatedValue.splice(sourceId,1)
  updatedValue.splice(destinationId, 0, movedElement);
  return updatedValue;
}

export const reOrderWithOtherArea = (state,destinationId,generatedElement) => {
  let updatedValue = [...state];
  updatedValue.splice(destinationId, 0, generatedElement);
  return updatedValue;
}
