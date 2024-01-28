/* eslint-disable react/prop-types */

const InputWithLabel = ({id, name, type, text, value, onChange, step, onWheel, min, wrapped=false}) => {
    value = value === undefined ? '' : value;
    return (
        <>
            {wrapped ? (
                <label>
                    {text}
                    <input 
                        id={id}
                        name={name}
                        type={type} 
                        value={value}
                        onChange={onChange}
                        step={step}
                        onWheel={onWheel}
                        min={min}
                    />
                </label>
            ) : (
                <>
                    <label htmlFor={id}>{text}</label> 
                    <input 
                        id={id}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange} 
                        step={step}
                        onWheel={onWheel}
                        min={min}
                    />
                </>
            )}
        </>
    )
}

export default InputWithLabel