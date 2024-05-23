import { v4 } from "uuid"

export const DatalistWithItems = ({id, name, items, value, onChange}) => {
    const uuid = v4();
    const datalistId = `${id}-${uuid}`;

    let datalistValue = undefined;
    if (onChange) {
        datalistValue = value ? value : '';
    } 

    return (
        <div>
            <input list={datalistId} id={id} name={name} value={datalistValue} onChange={onChange}/>
            <datalist id={datalistId}>
                {items &&  items.map(item => (
                    <option key={item.name} value={item.name}></option> 
                ))}
            </datalist>
        </div>
    )
}
