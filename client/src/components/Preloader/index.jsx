/* eslint-disable react/prop-types */
import Logo from "../../img/black-logo.png";
import "./style.scss"
import { useSelector } from "react-redux";
import {selectLoading} from "../../store/fuatures/ProjectSlice.js";

const PretLoader = () => {
    const loading = useSelector(selectLoading);
    
    if (loading) {
        return (
            <div className="preloader">
                <div className='preloader-container'>
                    <img src={Logo} alt="Logo" className="preloader__logo"/>
                </div>
            </div>
        );
    }
};

export default PretLoader;