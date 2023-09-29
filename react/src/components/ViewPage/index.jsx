/* eslint-disable react/prop-types */
import GoalPage from './GoalPage'
import style from './style.module.css'
import { tabType } from '../../enums'
import TransactionPage from './TransactionPage'

const ViewPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.GOALS]: <GoalPage />
    }

    return (
        <section className={style.container}>
            {page[type]}
        </section>
    )
}

export default ViewPage