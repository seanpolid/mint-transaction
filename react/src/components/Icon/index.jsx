/* eslint-disable react/prop-types */
import { iconType } from '../../enums';
import style from './style.module.css'

const Icon = ({type, active}) => {
    let icons = {
        [iconType.LOG]: {
            className: style.container,
            content: <Log />
        },
        [iconType.GRAPH]: {
            className: style.container,
            content: <Graph />
        },
        [iconType.TARGET]: {
            className: `${style.container} ${style.target}`,
            content: <Target />
        },
        [iconType.USER]: {
            className: `${style.container} ${style.user}`,
            content: <User />
        },
        [iconType.FILTER]: {
            className: style.filter,
            content: <Filter />
        },
        [iconType.SORT]: {
            className: style.sort,
            content: <Sort />
        },
        [iconType.SEARCH]: {
            className: style.search,
            content: <Search />
        }
    };

    return (
        <div role="button" className={`icon ${icons[type].className} ${active ? style.active : ""}`} data-type={type}>
            {icons[type].content}
        </div>
    )
}

const Log = () => {
    return (
        <>
            <div className={style.log} aria-label='transactions'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={style.logLabel}>
                LOG
            </div>
        </>
    )
}

const Graph = () => {
    return (
        <>
            <div className={style.bars} aria-label='dashboard'>
                <div></div> 
                <div></div>
                <div></div>
            </div>
            <div className={style.line}></div>
        </>
    )
}

const Target = () => {
    return (
        <>
            <div className={style.ring} aria-label='goals'>
                <div className={style.ring}>
                    <div className={style.ring}></div>
                </div>
            </div>
            <div className={style.arrow}></div>
            <div className={style.leftTail}></div>
            <div className={style.rightTail}></div>
        </>
    )
}

const User = () => {
    return (
        <>
            <div className={style.frame} aria-label='profile'>
                <div className={style.head}></div>
                <div className={style.body}></div>
            </div>
        </>
    )
}

const Filter = () => {
    return (
        <>
            <div></div>
        </>
    )
}

const Sort = () => {
    return (
        <>
            <div className={style.bars} aria-label='sort items'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={style.arrow}></div>
            <div className={style.arrowHead}></div>
        </>
    )
}

const Search = () => {
    return (
        <>
            <div className={style.handle} aria-label='search items'></div>
        </>
    )
}

export default Icon;