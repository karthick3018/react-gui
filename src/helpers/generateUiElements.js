import React from 'react';

export const returnRespectiveHtmlElement = (type) => {
  switch (type) {
    case "button":
      return <button>I'm button</button>
    case "input":
      return <input defaultValue="i'm input" />
    case "textarea":
      return <textarea defaultValue="i'm text area" />
    case "box":
      return <div className="box" />
    case "heading":
      return <h1>Heading1</h1>
    default:
      return <></>
  }
}

export const generateElement = (type, id) => {
  let uiElement = {};
  uiElement.id = `${id}`;
  uiElement.element = type;

  return uiElement;
}

