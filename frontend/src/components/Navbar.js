import React from 'react'
import { BiPlus, BiSearch, BiLocationPlus } from "react-icons/bi";

import './Navbar.css'


const Navbar = (props) => {
    const {showModalForm, setShowModalForm} = props;
    // setShowModalForm(true)

    const handeClick = (e) => {
        console.log("yo");
        setShowModalForm(true)
    }
    return (
        <div className="navbar">
            <div className="navbar-items">
                <li><BiSearch /></li>
                <li><BiLocationPlus onClick={handeClick}/></li>
            </div>
            

        </div>
    )
}



export default Navbar