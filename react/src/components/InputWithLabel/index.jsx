/* eslint-disable react/prop-types */

const InputWithLabel = ({id, type, text, value, onChange, wrapped=false}) => {
    value = value === undefined ? '' : value;
    return (
        <>
            {wrapped ? (
                <label>
                    {text}
                    <input 
                        id={id}
                        type={type} 
                        value={value}
                        onChange={onChange}
                    />
                </label>
            ) : (
                <>
                    <label htmlFor={id}>{text}</label> 
                    <input 
                        id={id}
                        type={type}
                        value={value}
                        onChange={onChange} 
                    />
                </>
            )}
        </>
    )
}

export default InputWithLabel