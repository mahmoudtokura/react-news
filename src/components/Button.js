import React from 'react';

const Button = ({ children, removeItem, className="" }) => {
    return (
      <div>
        <button
            className={ className }
            onClick={removeItem} 
            type="button">{children}
        </button>
      </div>
    )
}

export default Button;
