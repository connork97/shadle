import styles from './Logout.module.css';

import { useNavigate } from 'react-router-dom';

const Logout = ({ setLoggedInUser }) => {

    const navigate = useNavigate();

    const handleUserLogout = () => {
        localStorage.removeItem('_id_hash');
        setLoggedInUser({});
        navigate('/');
    };

    return (
        <div className={styles.logoutWrapperDiv}>
            <button className={styles.logoutButton} onClick={handleUserLogout}>Logout</button>
        </div>
    )
};

export default Logout;