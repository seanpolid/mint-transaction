/* eslint-disable react/prop-types */
import SelectWithItems from "../SelectWithItems";

const SelectWithLabel = ({id, name, text, items, value, onChange, wrapped=false}) => {
    return (
        <>
            {wrapped ? (
                <label>
                    {text}
                    <SelectWithItems 
                        id={id} 
                        name={name} 
                        items={items}
                        value={value}
                        onChange={onChange} 
                    />
                </label>
            ) : (
                <>
                    <label htmlFor={id}>{text}</label> 
                    <SelectWithItems 
                        id={id}
                        name={name}
                        items={items}
                        value={value}
                        onChange={onChange}
                    />
                </>
            )}
        </>
    )
}

export default SelectWithLabel;