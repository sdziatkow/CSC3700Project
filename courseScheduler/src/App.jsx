import {Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NavBar from './components/NavBar.jsx';

function App() {
  return (
    <div className="container-lg">
        <div className="mb-3">
            <NavBar/>
        </div>
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default App
