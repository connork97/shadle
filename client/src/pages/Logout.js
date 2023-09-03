import styles from './Logout.module.css';

import { useNavigate } from 'react-router-dom';

const Logout = ({ loggedInUser, setLoggedInUser }) => {

    const navigate = useNavigate();

    const handleUserLogout = () => {
        localStorage.removeItem('_id_hash');
        setLoggedInUser({});
        navigate('/');
    };

    return (
        <div className={styles.logoutWrapperDiv}>
            <h1 className={styles.logoutH1}>Hi {loggedInUser.first_name} {loggedInUser.last_name}.</h1>
            <h2 className={styles.logoutH2}>To logout, click below.</h2>
            <button className={styles.logoutButton} onClick={handleUserLogout}>Logout</button>
        </div>
    )
};

export default Logout;