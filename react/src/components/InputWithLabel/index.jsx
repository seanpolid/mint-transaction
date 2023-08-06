/* eslint-disable react/prop-types */

const InputWithLabel = ({id, type, text, wrapped=false}) => {
    return (
        <>
            {wrapped ? (
                <label>
                    {text}
                    <input type={type} />
                </label>
            ) : (
                <>
                    <label htmlFor={id}>{text}</label> 
                    <input type={type} id={id} />
                </>
            )}
        </>
    )
}

export default InputWithLabel