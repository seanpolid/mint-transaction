/* eslint-disable react/prop-types */

const RadioButtonWithLabel = ({id, text, value, wrapped=true, checked=false}) => {
    return (
        <>
            {wrapped ? (
                <label>
                    <input type='radio' value={value} checked={checked} />
                    {text}
                </label>
            ) : (
                <>
                    <input type='radio' id={id} value={value} checked={checked} />
                    <label htmlFor={id}>{text}</label> 
                </>
            )}
        </>
    )
}

export default RadioButtonWithLabel