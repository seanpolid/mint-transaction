import apiService from "../services/ApiService";
import GoalContext from "./GoalContext";
import { useContext, useState } from "react";

const GoalContextProvider = ({children}) => {
    const [goals, setGoals] = useState([]);

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