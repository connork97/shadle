import { useRef, useEffect, useState } from 'react';
import styles from './AccountDropdown.module.css';

import { Link } from 'react-router-dom';

const AccountDropdown = ({ loggedInUser, toggleAccountDropdown}) => {
    
    const handleCloseDropdown = () => {
        toggleAccountDropdown();
    }

    return (
        <div className={styles.navbarDropdownDiv}>
            <ul className={styles.navbarDropdownUl}>
                    {Object.keys(loggedInUser). length > 0  && 
                    <li className={styles.navbarDropdownLi} onClick={handleCloseDropdown}>
                        <Link to='/logout' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Logout</Link>
                    </li>
                    }
                    {!Object.keys(loggedInUser).length > 0 &&
                    <li className={styles.navbarDropdownLi}>
                        <Link to='/signup' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Signup</Link>
                    </li>
                    }
                    {!Object.keys(loggedInUser).length > 0 &&
                    <li className={styles.navbarDropdownLi} style={{borderBottom: 'none'}}>
                        <Link to='/login' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Login</Link>
                    </li>
                    }
                    {Object.keys(loggedInUser).length > 0 &&
                    <li className={styles.navbarDropdownLi} style={{borderBottom: 'none'}} onClick={handleCloseDropdown}>
                        <Link to='/profile' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Profile</Link>
                    </li>
                    }
            </ul>
        </div>
    )
}

export default AccountDropdown;