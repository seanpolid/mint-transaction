/* eslint-disable react/prop-types */
import style from './style.module.css'

const Scrollpane = ({className, children}) => {
    return (
        <div className={`${className} ${style.scrollpane}`}>
            {children}
        </div>
    )
}

export default Scrollpane