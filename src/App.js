import { useState, useEffect } from 'react';


const getNormalizePosition = (position, limit) => {
  const normalizePosition = {};
  Object.keys(position).forEach(key => {
    const value = position[key];
    const maxValue = limit[key];
    let normalizeValue = value;
    if (value < 0) normalizeValue = 0
    if (value > maxValue) normalizeValue = maxValue
    normalizePosition[key] = normalizeValue;
  })

  return normalizePosition;
}

function App() {
  const DRAGABLE_BLOCK_SIZE = window.innerHeight * .2;
  const CANVAS_HEIGHT = window.innerHeight * .8;
  const CANVAS_WIDTH = window.innerWidth * .8;
  const [position, setPosition] = useState({});
  const [limit, setLimit] = useState({});



  const onDragLeave = (event) => {
    const newPosition = {
      top: event.clientY - DRAGABLE_BLOCK_SIZE,
      left: event.clientX - DRAGABLE_BLOCK_SIZE
    }
    console.log(newPosition);
    const normalizePosition = getNormalizePosition(newPosition, limit);
    setPosition(normalizePosition)
  }


  useEffect(() => {
    document.addEventListener("dragstart", function (event) {
      event.dataTransfer.setDragImage(event.target, 0, window.innerHeight * 2,);
    }, false);
  }, [])

  useEffect(() => {
    setLimit({
      top: CANVAS_HEIGHT - DRAGABLE_BLOCK_SIZE,
      left: CANVAS_WIDTH - DRAGABLE_BLOCK_SIZE
    })
  }, [CANVAS_HEIGHT, CANVAS_WIDTH, DRAGABLE_BLOCK_SIZE])


  return (
    <div className="app">
      <div className="canvas"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT
        }}
      >
        <div
          onDrag={onDragLeave}
          onTouchMove={onDragLeave}
          style={{
            ...position,
            width: DRAGABLE_BLOCK_SIZE,
            height: DRAGABLE_BLOCK_SIZE
          }}
          className="dragable"
          draggable="true"
          onDragEnd={onDragLeave}
        >
          I`m dragable
        </div>
      </div>
    </div >
  );
}

export default App;
