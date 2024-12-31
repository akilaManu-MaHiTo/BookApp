// Loader.js
import React from 'react';

const Loader = ({ className }) => {
  return (
    <div className={`spinner-border ${className}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
