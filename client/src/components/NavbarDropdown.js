import styles from './NavbarDropdown.module.css';

import { Link } from 'react-router-dom';

const NavbarDropdown = () => {
    return (
        <div className={styles.navbarDropdownDiv}>
            <ul className={styles.navbarDropdownUl}>
                {/* <li className={styles.navbarDropdownLi}> */}
                    <li className={styles.navbarDropdownLi}>
                    <Link to='/signup' className={styles.navbarDropdownLink}>Signup</Link>
                    </li>
                    <li className={styles.navbarDropdownLi}>
                        <Link to='/login' className={styles.navbarDropdownLink}>Login</Link>
                    </li>
                    <li className={styles.navbarDropdownLi}>Profile</li>
                    <li className={styles.navbarDropdownLi} style={{borderBottom: 'none'}}>Stats</li>
                {/* </li> */}
            </ul>
        </div>
    )
}

export default NavbarDropdown;