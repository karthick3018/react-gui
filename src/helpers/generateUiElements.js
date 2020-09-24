import React from 'react';

export const returnRespectiveHtmlElement = (type) => {
  switch (type) {
    case "button":
      return <button>I'm button</button>
    case "input":
      return <input defaultValue="i'm input" />
    case "textarea":
      return <textarea defaultValue="i'm text area" />
    default:
      return <></>
  }
}

export const generatedElements = (type, id) => {
  const htmlElement = returnRespectiveHtmlElement(type);
  const uiElementArray = [];

  uiElementArray.push({
    id: `${200 + id}`,
    content: htmlElement
  })
  return uiElementArray;
}

