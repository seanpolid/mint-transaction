/* eslint-disable react/prop-types */
import { tabType } from "../../enums/tabType";

const Log = ({type}) => {
    let header = '';
    switch (type) {
        case tabType.TRANSACTIONS:
            header = 'Transactions';
            break;
        case tabType.GOALS:
            header = 'Goals';
            break;
    }

    return (
        <div>{header}</div>
    )
}

export default Log;