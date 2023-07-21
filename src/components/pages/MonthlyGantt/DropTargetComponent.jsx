import React from 'react';
import { useDrop } from 'react-dnd';

const DropTargetComponent = () => {
  const [{ isOver }, drop] = useDrop({
    accept: 'highcharts-bar',
    drop: (item) => {
      // ドロップ時の処理
      console.log('Dropped:', item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
      {/* ドロップ先のコンポーネントの内容 */}
    </div>
  );
};

export default DropTargetComponent;