import { Toaster } from 'react-hot-toast'
import Application from './Application'
import Loader from './components/common/Loader/Loader'

function App() {
    return (
        <>
            {false && <Loader />}
            <Toaster />
            <Application />
        </>
    )
}

export default App
