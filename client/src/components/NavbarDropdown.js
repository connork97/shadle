import styles from './NavbarDropdown.module.css';

import { Link } from 'react-router-dom';

const NavbarDropdown = ({ setShowDropdown}) => {

    
    const handleCloseDropdown = () => {
        setShowDropdown(false)
    }

    return (
        <div className={styles.navbarDropdownDiv}>
            <ul className={styles.navbarDropdownUl}>
                {/* <li className={styles.navbarDropdownLi}> */}
                    <li className={styles.navbarDropdownLi}>
                    <Link to='/signup' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Signup</Link>
                    </li>
                    <li className={styles.navbarDropdownLi}>
                        <Link to='/login' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Login</Link>
                    </li>
                    <li className={styles.navbarDropdownLi} onClick={handleCloseDropdown}>
                        <Link to='/profile' className={styles.navbarDropdownLink} onClick={handleCloseDropdown}>Profile</Link>
                    </li>
                    <li className={styles.navbarDropdownLi} style={{borderBottom: 'none'}} onClick={handleCloseDropdown}>Stats</li>
                {/* </li> */}
            </ul>
        </div>
    )
}

export default NavbarDropdown;