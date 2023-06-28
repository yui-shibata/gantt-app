import React, { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';




const GanttChart = () => {
  const ganttContainerRef = useRef(null);

  useEffect(() => {
    const yourData = {
      data: [
        { id: 1, text: 'Task 1', start_date: '2023-06-01', duration: 5, progress: 0.6 },
        { id: 2, text: 'Task 2', start_date: '2023-06-06', duration: 4, progress: 0.4, parent: 1 },
        { id: 3, text: 'Task 3', start_date: '2023-06-10', duration: 3, progress: 0.2, parent: 1 },
      ],
      links: [],
    };
    if (ganttContainerRef.current) {
      gantt.init(ganttContainerRef.current);
      gantt.parse(yourData);
    }
  
    return () => {
      gantt.clearAll();
    };
  }, []);

  return <div ref={ganttContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default GanttChart;
