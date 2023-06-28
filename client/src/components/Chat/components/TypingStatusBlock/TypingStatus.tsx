import React from 'react';
import styles from "./styles.module.scss";

import DotsIcon from "../../../../assets/icons/DotsIcon/DotsIcon";

interface TypingStatusProps {
    status: string,
}

const TypingStatus: React.FC<TypingStatusProps> = ({status}) => {

    return (
        <div className={styles.typingStatus}>
            {status
                ? <p className={styles.typingStatus_text}>{status} <DotsIcon/></p>
                : <p className={styles.typingStatus_text__null}></p>}
        </div>

    )
};

export default TypingStatus;