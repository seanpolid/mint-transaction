/* eslint-disable react/prop-types */
/**
 * Creates a select box with a set of options specified through the provided items. 
 * 
 * @param param0 
 * @returns 
 */
const SelectWithItems = ({id, name, items, value, onChange, selectRef}) => {
    let selectValue = undefined;
    if (onChange) {
        selectValue = value ? value : '';
    } 
    
    return (
        <select id={id} name={name} onChange={onChange} value={selectValue} ref={selectRef} defaultValue={selectValue}>
            <option hidden>-- Choose option --</option>
            {items && items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>)
            )}
        </select>
    )
}

export default SelectWithItems;