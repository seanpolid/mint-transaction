/* eslint-disable react/prop-types */

const TextAreaWithLabel = ({id, name, text, value, className, onChange, wrapped=false}) => {
    if (!value) {
        value = '';
    }

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