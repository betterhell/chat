import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss"

import Input from "../../UI/Input/Input";
import FilterIcon from "../../assets/icons/FilterIcon";

import UserService from "../../services/UserService";
import {User} from "../../models/user.model";

import FoundUser from "./components/FoundUser/FoundUser";
import NotFoundUser from "./components/NotFoundUser/NotFoundUser";
import DotsIcon from "../../assets/icons/DotsIcon/DotsIcon";
import {useUserStore} from "../../store/user.store";


interface SearchUserProps {
    toggleChat: () => void
}

const SearchUser: React.FC<SearchUserProps> = ({toggleChat}) => {
    const [username, setUsername] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const {user, foundUser, findUser, isError} = useUserStore()

    useEffect(() => {
        setIsLoading(false)
        setTimeout(() => {
            if (username.length >= 1) {
                findUser(username)
            }
        }, 1000)
        setIsLoading(true)
    }, [username])

    return (
        <div>
            <div className={styles.searchInput}>
                <Input value={username} onChange={(e) => setUsername(e.target.value)}
                       placeholder="who are we looking for?"
                       type="text"/>
                <button><FilterIcon/></button>
            </div>
            <div>
                {isLoading
                    ? <>
                        {foundUser?.username && foundUser.username !== user?.username
                            ? <FoundUser toggleChat={toggleChat} user={foundUser}/>
                            : <NotFoundUser username={username} error={isError}/>
                        }
                    </>
                    : <div style={{width: "20px", height: "20px"}}><DotsIcon/></div>
                }
            </div>
        </div>
    )
};

export default SearchUser;