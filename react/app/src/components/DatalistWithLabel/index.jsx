import { DatalistWithItems } from "../DatalistWithItems";

export const DatalistWithLabel = ({id, name, text, items, value, onChange, wrapped=false}) => {
    let selectValue = undefined;
    if (onChange) {
        selectValue = value ? value : '';
    } 

    return (
        <>
            {wrapped ? (
                <label>
                    {text}
                    <DatalistWithItems 
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
                    <DatalistWithItems 
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