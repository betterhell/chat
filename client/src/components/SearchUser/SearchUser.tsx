import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss"

import Input from "../../UI/Input/Input";
import FilterIcon from "../../assets/icons/FilterIcon";

import UserService from "../../services/UserService";
import {User} from "../../models/user.model";

import FoundUser from "./components/FoundUser/FoundUser";
import NotFoundUser from "./components/NotFoundUser/NotFoundUser";
import DotsIcon from "../../assets/icons/DotsIcon/DotsIcon";

const SearchUser = () => {
    const [username, setUsername] = useState<string>("")
    const [searchingUser, setSearchingUser] = useState<User | null>(null)
    const [isError, setIsError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const fetchUser = async () => {
        setSearchingUser(null)
        setIsLoading(false)
        try {
            const {data} = await UserService.fetchUser(username.trim())
            setSearchingUser(data)
            setIsLoading(true)
        } catch (error) {
            setIsError("User not found")
        } finally {
            setIsLoading(true)
        }
    }

    console.log(searchingUser)

    useEffect(() => {
        if (username.length >= 1) {
            fetchUser().then()
        }
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
                        {searchingUser
                            ? <FoundUser user={searchingUser}/>
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