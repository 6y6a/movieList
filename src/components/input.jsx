import React from 'react';

function Input({name, label, value, error, onChange}) {
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
            { error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
}

export default Input;
