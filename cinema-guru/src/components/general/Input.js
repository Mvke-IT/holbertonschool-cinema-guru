import React from 'react';
import './general.css';

export default function Input({ label, type, className, value, setValue, icon, inputAttributes }) {
    const handleInput = (event) => {
        setValue(event.target.value);
    }
    return( 
        <div className={`input-wrapper ${className}`}>
            {label && <label>{label}</label>}
            <div className="input-container">
                {icon && <span className="icon">{icon}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={handleInput}
                    {...inputAttributes}
                />
            </div>
        </div>
);
}