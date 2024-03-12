import  { useEffect } from 'react';
import First from './First/First.jsx';
import AboutUs from './AboutUs/index.jsx';
import Founders from './Founders/index.jsx';
import OurProjects from './Projects/index.jsx';
import Services from './Services/index.jsx';
import OurWork from './OurWork/index.jsx';
import FAQs from './FAQs/index.jsx';
import Reviews from './Reviews/index.jsx';
import PretLoader from "../../components/Preloader/index.jsx";

function Main() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <>
           <PretLoader/>
          <First />
          <AboutUs />
          <Founders />
          <OurProjects />
          <Services />
          <OurWork />
          <FAQs />
          <Reviews />
        </>
      );
}

export default Main;