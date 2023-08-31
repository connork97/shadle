import styles from './Navbar.module.css';

const Navbar = ({ openInstructionsModal }) => {
    return (
        <div className={styles.navbarWrapperDiv}>
            <h1 className={styles.shadleH1}>
                <span style={{color: 'red'}}>S</span>
                <span style={{color: 'orange'}}>h</span>
                <span style={{color: 'gold'}}>a</span>
                <span style={{color: 'green'}}>d</span>
                <span style={{color: 'blue'}}>l</span>
                <span style={{color: 'indigo'}}>e</span>
            </h1>
        </div>
    );
};

export default Navbar;