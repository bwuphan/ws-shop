import React from 'react';

const loader = ({ color }) => {
  const colorClass = color ? `text-${color}` : '';
  return (
    <div className={`spinner-border ${colorClass}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default loader;