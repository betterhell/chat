import React from 'react';
import styles from "./styles.module.scss";

import DotsIcon from "../../../../assets/icons/DotsIcon/DotsIcon";
import {useChatStore} from "../../../../store/chat.store";

const TypingStatus = () => {
    const {typingStatus} = useChatStore()

    return <div className={styles.typingStatus}>
        {typingStatus && <p>{typingStatus} <DotsIcon/></p>}
    </div>
};

export default TypingStatus;