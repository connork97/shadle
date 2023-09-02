import styles from './Navbar.module.css';

import React, { Fragment, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { MdAccountCircle } from 'react-icons/md';
import { LuMenu } from 'react-icons/lu';

import NavbarDropdown from './NavbarDropdown';

const Navbar = ({ showDropdown, setShowDropdown, openInstructionsModal }) => {

    return (
        <Fragment>
            <div className={styles.navbarWrapperDiv}>
                {showDropdown && <NavbarDropdown setShowDropdown={setShowDropdown} />}
                <div className={styles.mainNavbarDiv}>
                <LuMenu className={styles.menuIcon} onClick={() => openInstructionsModal()} />
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
                {/* <Link to='/signup' className={styles.navbarLink}> */}
                <MdAccountCircle className={styles.accountIcon} onClick={() => setShowDropdown(!showDropdown)} />
                {/* </Link> */}
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navbar;