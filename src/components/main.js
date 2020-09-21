import React from 'react';
import './main.css'

const Main = () => {
   

  const  onDragOver = (ev) => {
    ev.preventDefault();
}
  return(
    <div className="aside-wrapper">
      <div className="left"  onDragOver={onDragOver}>
        <div  draggable="true" >
        <button> button1</button>
        </div>

        <div draggable="true"  >
          <input/>
        </div>

      </div>
      <div className="right" onDragOver={onDragOver}>

      </div>
    </div>
  )
}

export default Main;