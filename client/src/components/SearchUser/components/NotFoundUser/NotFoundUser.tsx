import React from 'react';
import styles from "./styles.module.scss";

interface NotFoundUserProps {
    error: string
    username: string
}

const NotFoundUser: React.FC<NotFoundUserProps> = ({username, error}) => {
    return (
        <>
            {(error && username.length >= 1) ? <div className={styles.NotFoundUser}>
                    <p>{error} :(</p>
                </div>
                : null
            }
        </>
    );
};

export default NotFoundUser;