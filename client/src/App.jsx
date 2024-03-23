import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import Preloader from './components/Preloader/index.jsx';
import { ToastContainer } from 'react-toastify';
import Cursor from './components/Cursor/index';
import Header from "./components/Header/index.jsx";
import Footer from "./components/Footer/index.jsx";
import PopUp from "./components/PopUp/index.jsx";
import PhonePopUp from "./components/PhonePopUp/index.jsx";
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.scss';

const Main = lazy(() => import('./pages/Main/index.jsx'))
const MoreOurProjects = lazy(() => import('./pages/MoreOurProjects/index.jsx'));
const ProjectsInfo = lazy(() => import('./pages/ProjectsInfoPage/index.jsx'));

function App() {
    return (
        <Suspense fallback={<Preloader/>}>
            <Router>
                <Cursor />
                <Header />
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route path="/projects" element={<MoreOurProjects />} />
                    <Route path="/projects/info/:id" element={<ProjectsInfo />} />
                </Routes>
                <PopUp />
                <PhonePopUp />
                <Footer />
                <ToastContainer />
            </Router>
        </Suspense>
    
    );
}

inject();
export default App;
