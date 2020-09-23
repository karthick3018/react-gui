
export const reOrderWithInSampleArea = (state,sourceId,destinationId) => {

  let updatedValue = [...state];
  const [movedElement] = updatedValue.splice(sourceId,1)
  updatedValue.splice(destinationId, 0, movedElement);
  return updatedValue;
}