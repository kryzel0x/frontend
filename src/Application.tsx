import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layouts/Layout/Layout'
import Dashboard from './components/pages/Dashboard/Dashboard.tsx'
import Errorpage from './components/pages/ErrorPage/Errorpage'
import Homepage from './components/pages/Homepage/Homepage.tsx'
import Leaderboard from './components/pages/Leaderboard/Leaderboard.tsx'
import PageNotFound from './components/pages/PageNotFound/PageNotFound'
import { ROUTES } from './utils/constants.ts'
import Profile from './components/pages/Profile/Profile.tsx'
import { WithoutAuth } from './Routes/Guard/NoGuard.tsx'
import { RequireAuth } from './Routes/Guard/AuthGuard.tsx'
import RegisterationProcess from './components/pages/RegisterationProcess/RegisterationProcess.tsx'
import { Game } from './components/pages/Game/Game.tsx'

const Application = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <WithoutAuth><Layout /></WithoutAuth>,
            ErrorBoundary: Errorpage,
            children: [
                {
                    index: true,
                    element: <Homepage />,
                },
                {
                    path: ROUTES.REGISTER_PROCESS,
                    element: <RegisterationProcess />,
                },
            ]
        },
        {
            path: "/auth",
            element: <RequireAuth><Layout /></RequireAuth>,
            ErrorBoundary: Errorpage,
            children: [
                
                {
                    path: ROUTES.DASHBOARD,
                    element: <Dashboard />,
                },
                {
                    path: ROUTES.LEADERBOARDS,
                    element: <Leaderboard />,
                },
                {
                    path: ROUTES.PROFILE,
                    element: <Profile />,
                },
                {
                    path: ROUTES.GAME,
                    element: <Game />,
                },
            ]
        },
        {
            path: "*",
            element: <PageNotFound />,
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}

export default Application