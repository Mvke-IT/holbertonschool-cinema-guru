import React from 'react';
import './general.css';

export default function SelectInput({ label, options, className, value, setValue }){
    const handleSelect = (event) => {
        setValue(event.target.value);
    }
    return (
        <div className={`select-wrapper ${className}`}>
            {label && <label>{label}Sort:</label>}
            <select value={value} onChange={handleSelect}>
                {options.map((option, index) => (
                    <React.Fragment key={index}>
                        <option value={option.value}>
                            Default
                        </option>
                        <option value={option.value}>
                            Latest
                        </option>
                        <option value={option.value}>
                            Oldest
                        </option>
                        <option value={option.value}>
                            Highest Rated
                        </option>
                        <option value={option.value}>
                            Lowest Rated
                        </option>
                    </React.Fragment>
                ))}
            </select>
        </div>
    );
}