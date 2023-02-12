import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { SelectPeriod } from './selectPeriod/SelectPeriod';
import SignIn from './SignIn';

import { HiMenu } from 'react-icons/hi';


const Menu = ({ ROUTES }) => {
    const [dropdown, setDropdown] = useState(false);

    const showDropdown = () => {
        return dropdown ? 'dropdown-content-on' : 'dropdown-content-off';
    }

    return (
        <div>
            <button id='menu'
                    onClick={() => setDropdown(!dropdown)}><HiMenu size='35px'/></button>
            <ul className={showDropdown()}>
                <li>
                    <Link to={ROUTES.HOME} onClick={() => setDropdown(false)}>Home</Link>
                </li>
                <li>
                    <SignIn onClick={() => setDropdown(false)} />
                </li>
                <li>
                    <SelectPeriod onClick={() => setDropdown(false)}/>
                </li>                  
                <li>
                    <Link to={ROUTES.STATS} onClick={() => setDropdown(false)}>Stats</Link>
                </li>
                <li>
                    <Link to={ROUTES.MYSTATS} onClick={() => setDropdown(false)}>My Stats</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu