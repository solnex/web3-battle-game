import React from 'react'
import { useNavigate } from 'react-router-dom';
import { heroImg, logo } from "../assets"
import styles from '../styles';
import Alert from './Alert';
import { useGlobalContext } from '../context';
const PageHOC = (Component, title, description) => () => {
    const { alertInfo, setAlertInfo } = useGlobalContext();
    const navigate = useNavigate();
    return (

        <div className={styles.hocContainer}>
            {alertInfo?.status && <Alert type={alertInfo.type} message={alertInfo.message} />}
            <div className={styles.hocContentBox}>
                <img src={logo} alt='logo' className={styles.hocLogo}
                    onClick={() => navigate('/')} />
                <div className={styles.hocBodyWrapper}>
                    <div className='flex flex-row w-full'>
                        <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
                    </div>

                    <p className={`${styles.normalText} my-10`}>{description}</p>
                    <Component />
                </div>
                <p className={styles.footerText}>Made with 💜 by solnex</p>

            </div>
        </div>
    )
}

export default PageHOC