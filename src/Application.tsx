import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layouts/Layout/Layout'
import Dashboard from './components/pages/Dashboard/Dashboard.tsx'
import Errorpage from './components/pages/ErrorPage/Errorpage'
import Homepage from './components/pages/Homepage/Homepage.tsx'
import Leaderboard from './components/pages/Leaderboard/Leaderboard.tsx'
import PageNotFound from './components/pages/PageNotFound/PageNotFound'
import { ROUTES } from './utils/constants.ts'
import Profile from './components/pages/Profile/Profile.tsx'

const Application = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            ErrorBoundary: Errorpage,
            children: [
                {
                    index: true,
                    element: <Homepage />,
                },
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