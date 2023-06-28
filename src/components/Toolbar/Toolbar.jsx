import React from 'react';

const Toolbar = ({ zoom, onZoomChange }) => {
  const handleZoomChange = (e) => {
    if (onZoomChange) {
      onZoomChange(e.target.value);
    }
  };

  const zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
    const isActive = zoom === value;
    return (
      <label key={value} className={`radio-label ${isActive ? 'radio-label-active' : ''}`}>
        <input type="radio" checked={isActive} onChange={handleZoomChange} value={value} />
        {value}
      </label>
    );
  });

  return (
    <div className="tool-bar">
      <b>Zoom: </b>
      {zoomRadios}
    </div>
  );
};

export default Toolbar;
