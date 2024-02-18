import ApiContext from "./ApiContext";
import GoalContext from "./GoalContext";
import { useContext, useState } from "react";

const GoalContextProvider = ({children}) => {
    const [goals, setGoals] = useState([]);
    const ac = useContext(ApiContext);

    const data = {
        goals: goals
    }

    return (
        <GoalContext.Provider value={data}>
            {children}
        </GoalContext.Provider>
    )
}

export default GoalContextProvider