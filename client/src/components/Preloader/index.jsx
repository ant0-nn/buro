import  { useState, useEffect } from 'react';
import Logo from "../../img/black-logo.webp";
import "./style.scss"
import { useSelector } from "react-redux";
import { selectLoading } from "../../store/fuatures/ProjectSlice.js";

const PreLoader = () => {
    const loading = useSelector(selectLoading);
    const [showLoader, setShowLoader] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000); // Затримка в мілісекундах (1 секунда = 1000 мілісекунд)
        
        return () => clearTimeout(timer); // Очистити таймер при розмонтовуванні компонента
    }, []);
    
    if (loading && showLoader) {
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
