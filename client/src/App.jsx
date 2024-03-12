import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import Preloader from './components/Preloader/index.jsx';
import { ToastContainer } from 'react-toastify';
import Cursor from './components/Cursor/index';
import Main from './pages/Main/index.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.scss';

const Footer = lazy(() => import('./components/Footer/index.jsx'));
const Header = lazy(() => import('./components/Header/index.jsx'));
const PopUp = lazy(() => import('./components/PopUp/index.jsx'));
const MoreOurProjects = lazy(() => import('./pages/MoreOurProjects/index.jsx'));
const ProjectsInfo = lazy(() => import('./pages/ProjectsInfoPage/index.jsx'));

function App() {
      return (
            <Router>
                    <Cursor />
                    <Header />
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route exact path="/" element={<Main />} />
                            <Route path="/projects" element={<MoreOurProjects />} />
                            <Route path="/projects/info/:id" element={<ProjectsInfo />} />
                        </Routes>
                    </Suspense>
                    <PopUp />
                    <Footer />
                    <ToastContainer />
            </Router>
      );
}

inject();
export default App;
