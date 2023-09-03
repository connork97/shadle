import { useRef, useEffect, useState } from 'react';
import styles from './MenuDropdown.module.css';

import { Link } from 'react-router-dom';

const MenuDropdown = ({ openInstructionsModal, toggleMenuDropdown}) => {
    
    const handleCloseDropdown = () => {
        toggleMenuDropdown();
    }

    return (
        <div className={styles.menuDropdownDiv}>
            <ul className={styles.menuDropdownUl}>
                    <li className={styles.menuDropdownLi} onClick={handleCloseDropdown}>
                        <span className={styles.menuDropdownLink} onClick={openInstructionsModal}>Instructions</span>
                    </li>
                    <li className={styles.menuDropdownLi} style={{borderBottom: 'none'}} onClick={handleCloseDropdown}>
                        <Link to='/stats' className={styles.menuDropdownLink} onClick={handleCloseDropdown}>Site Stats</Link>
                    </li>
            </ul>
        </div>
    )
}

export default MenuDropdown;