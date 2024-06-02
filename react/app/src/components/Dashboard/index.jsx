import DataContext from "../../stores/DataContext";
import { useContext } from "react"

const Dashboard = () => {
    const dc = useContext(DataContext);
    console.log(dc.transactions);

    return (
        <div>
            <label for="start">Start date:</label>
            <input type="date" id="start" name="start"
                min="2023-01-01" max="2023-12-31" />

            <label for="end">End date:</label>
            <input type="date" id="end" name="end"
                min="2023-01-01" max="2023-12-31" />
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard