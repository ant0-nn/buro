import { useState, useEffect } from 'react';
import Logo from "../../img/black-logo.webp";
import "./style.scss";

const PreLoader = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        
        if (document.readyState === 'complete') {
            setLoaded(true);
        } else {
            const handleLoad = () => setLoaded(true);
            window.addEventListener('load', handleLoad);

            return () => window.removeEventListener('load', handleLoad);
        }
    }, []); 

    if (!loaded) {
        return (
            <div className="preloader">
                <div className="preloader-container">
                    <div className="preloader__logo-container">
                        <img src={Logo} alt="Logo" className="preloader__logo" />
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default PreLoader;
