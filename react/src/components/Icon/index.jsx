/* eslint-disable react/prop-types */
import iconType from '../../enums/iconType'
import style from './style.module.css'

const Icon = ({type}) => {
    console.log(type);
    switch (type) {
        case iconType.LOG:
            return <Log />
        case iconType.GRAPH:
            return <Graph />
        case iconType.TARGET:
            return <Target />
        case iconType.USER:
            return <User /> 
    }
}

const Log = () => {
    return (
        <div className={style.container}>
            <div className={style.transactionIcon}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={style.logLabel}>
                LOG
            </div>
        </div>
    )
}

const Graph = () => {
    return (
        <div className={`${style.container} ${style.dashboardIcon}`}>
            <div className={style.bars}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={style.line}></div>
        </div>
    )
}

const Target = () => {
    return (
        <div className={`${style.container} ${style.goalIcon}`}>
            <div className={style.ring}>
                <div className={style.ring}>
                    <div className={style.ring}></div>
                </div>
            </div>
            <div className={style.arrow}></div>
            <div className={style.leftTail}></div>
            <div className={style.rightTail}></div>
        </div>
    )
}

const User = () => {
    return (
        <div className={`${style.container} ${style.profileIcon}`}>
            <div className={style.head}></div>
            <div className={style.body}></div>
        </div>
    )
}

export default Icon;