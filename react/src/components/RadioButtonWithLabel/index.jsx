/* eslint-disable react/prop-types */

const RadioButtonWithLabel = ({id, name, text, value, onChange, wrapped=true, checked=false}) => {
    return (
        <>
            {wrapped ? (
                <label>
                    <input
                        id={id}
                        name={name} 
                        type='radio' 
                        value={value} 
                        onChange={onChange}
                        checked={checked} 
                    />
                    {text}
                </label>
            ) : (
                <>
                    <input 
                        id={id}
                        name={name}
                        type='radio' 
                        value={value} 
                        onChange={onChange}
                        checked={checked} 
                    />
                    <label htmlFor={id}>{text}</label> 
                </>
            )}
        </>
    )
}

export default RadioButtonWithLabel