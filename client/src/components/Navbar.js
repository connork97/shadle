import styles from './Navbar.module.css';

import React, { Fragment, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { MdAccountCircle } from 'react-icons/md';
import { LuMenu } from 'react-icons/lu';

import AccountDropdown from './AccountDropdown';
import MenuDropdown from './MenuDropdown';

const Navbar = ({ loggedInUser, openInstructionsModal }) => {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);

    const toggleAccountDropdown = () => {
        if (showMenuDropdown) setShowMenuDropdown(false)
        setShowAccountDropdown(!showAccountDropdown);
    };

    const toggleMenuDropdown = () => {
        if (showAccountDropdown) setShowAccountDropdown(false)
        setShowMenuDropdown(!showMenuDropdown);
    }
  
    return (
        <Fragment>
            <div className={styles.navbarWrapperDiv}>
                {showAccountDropdown && <AccountDropdown loggedInUser={loggedInUser} toggleAccountDropdown={toggleAccountDropdown} />}
                {showMenuDropdown && <MenuDropdown openInstructionsModal={openInstructionsModal} toggleMenuDropdown={toggleMenuDropdown} />}
                <div className={styles.mainNavbarDiv}>
                <LuMenu className={styles.menuIcon} onClick={toggleMenuDropdown} />
                    <h1 className={styles.shadleH1}>
                <Link to='/' className={styles.navbarLink}>
                        <span style={{color: 'red'}}>S</span>
                        <span style={{color: 'orange'}}>h</span>
                        <span style={{color: 'gold'}}>a</span>
                        <span style={{color: 'green'}}>d</span>
                        <span style={{color: 'blue'}}>l</span>
                        <span style={{color: 'indigo'}}>e</span>
                </Link>
                    </h1>
                <MdAccountCircle className={styles.accountIcon} onClick={toggleAccountDropdown} />
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navbar;