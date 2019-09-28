import React from 'react';

function Input({name, label, value, onChange}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type="text"
                name={name}
                className="form-control"
                id={name}
                placeholder="Enter a name"
            />
        </div>
    );
}

export default Input;
