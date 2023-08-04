/* eslint-disable react/prop-types */
import { tabType } from "../../enums/tabType"
import style from './style.module.css'

const Log = ({type}) => {
    switch (type) {
        case tabType.TRANSACTIONS:
            break;
        case tabType.GOALS:
            break;
    }

    return (
        <section className={style.container}>
            <form>
                <input type='text' placeholder='Search'/>
            </form>
        </section>
    )
}

export default Log;