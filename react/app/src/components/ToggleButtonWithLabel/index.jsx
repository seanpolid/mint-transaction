import style from './style.module.css'
import { useEffect, useState } from 'react';

export const ToggleButtonWithLabel = ({id, name, text, value, onChange, wrapped}) => {
    const [currentValue, setCurrentValue] = useState(value);

    const className = currentValue ? `${style.container} ${style.active}` : style.container;

    const handleOnClick = () => {
        setCurrentValue(prevCurrentValue => !prevCurrentValue);
    }

    useEffect(() => {
        onChange({target: {name, text, value: currentValue}});
    }, [currentValue]);
    
    return (
        <>
            {wrapped ? (
                <label onClick={handleOnClick}>
                    <div className={className}>
                        <div className={style.button}>
                        </div>
                    </div>
                    {text}
                </label>
            ) : (
                <> 
                    <label htmlFor={id}>{text}</label>
                    <div className={className} onClick={handleOnClick}>
                        <div className={style.button}>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}