import React from 'react';
import styles from "./styles.module.scss";

import DotsIcon from "../../../../assets/icons/DotsIcon/DotsIcon";

interface TypingStatusProps {
    status: string,
}

const TypingStatus: React.FC<TypingStatusProps> = ({status}) => {

    return (
        <div className={styles.typingStatus}>
            {status && <p>{status} <DotsIcon/></p>}
        </div>

    )
};

export default TypingStatus;