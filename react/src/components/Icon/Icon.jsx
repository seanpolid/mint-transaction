/* eslint-disable react/prop-types */
import { tabType } from "../../enums/tabType"
import style from './style.module.css'

const Icon = ({type}) => {
    switch (type) {
        case tabType.TRANSACTIONS:
            return <TransactionIcon />
        case tabType.DASHBOARD:
            return <DashboardIcon />
        case tabType.GOALS:
            return <GoalIcon />
        case tabType.PROFILE:
            return <ProfileIcon />
    }
}

const TransactionIcon = () => {
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

const DashboardIcon = () => {
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

const GoalIcon = () => {
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

const ProfileIcon = () => {
    return (
        <div className={`${style.container} ${style.profileIcon}`}>
            <div className={style.head}></div>
            <div className={style.body}></div>
        </div>
    )
}

export default Icon;