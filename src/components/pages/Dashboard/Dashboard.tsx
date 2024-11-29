import MyStakes from "./MyStakes/MyStakes"
import StakingStatement from "./StakingStatement/StakingStatement"
import StartEarning from "./StartEarning/StartEarning"

const Dashboard = () => {
    return (
        <>
            <StartEarning />
            <MyStakes />
            <StakingStatement />
        </>
    )
}

export default Dashboard
