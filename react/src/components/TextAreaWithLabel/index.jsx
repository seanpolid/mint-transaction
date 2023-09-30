/* eslint-disable react/prop-types */

const TextAreaWithLabel = ({id, name, text, value, className, onChange, wrapped=false}) => {
    value = value === undefined ? '' : value;
    return (
        <>
            {wrapped ? (
                <label>
                    {text}
                    <textarea 
                        id={id}
                        name={name}
                        className={className}
                        value={value}
                        onChange={onChange}
                    />
                </label>
            ) : (
                <>
                    <label htmlFor={name}>{text}</label>
                    <textarea 
                        id={id}
                        name={name}
                        className={className}
                        value={value}
                        onChange={onChange}
                    />
                </>
            )}
        </>
    )
}

export default TextAreaWithLabel;