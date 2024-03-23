import Logo from "../../img/black-logo.png";
import "./style.scss"
import { useSelector } from "react-redux";
import {selectLoading} from "../../store/fuatures/ProjectSlice.js";

const PreLoader = () => {
    const loading = useSelector(selectLoading);
    
    if (loading) {
        return (
            <div className="preloader">
                <div className="preloader-container">
                    <div className="preloader__logo-container">
                        <img src={Logo} alt="Logo" className="preloader__logo"/>
                    </div>
                </div>
            </div>
        );
    }
    
    return null;
};

export default PreLoader;
