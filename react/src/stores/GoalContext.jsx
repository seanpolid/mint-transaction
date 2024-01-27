import { createContext } from "react";

const GoalContext = createContext({
    goals: [],

    selectedGoal: {},
    setSelectedGoal: () => {}
})

export default GoalContext