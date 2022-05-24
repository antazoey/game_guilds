import Header from '../components/header';
import styles from '../styles/Explore.module.css'
import { useState, useRef } from "react";
import ShortTextInput from "../components/input";
import Spinner from "../components/spinner";
import Link from 'next/link'
import { useStarknet } from '@starknet-react/core'
import { Main } from '../features/Main'

export default function Explore() {

    const { supportedGuilds } = Main()
    const { account } = useStarknet();
    // const { data } = useGuildsManaged(account);
    const [searchTerm, setSearchTerm] = useState()

    const searchIcon = 
        <>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                </path>
            </svg>
        </>

    return(
        <div className="background">
            <Header highlighted={"explore"} />
            <div className={styles.box}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Explore</h1>
                    <ShortTextInput content={searchTerm} setContent={setSearchTerm} label="Search" icon={searchIcon}/>
                </div>
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Guild</th>
                                <th>Games</th>
                                <th>Members</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {supportedGuilds? supportedGuilds.map((guild, index) => 
                            <tr key={index}>
                                <td>{guild.name}</td>
                                <td>{guild.games}</td>
                                <td>{guild.members.toString()} <Link href={"/members/"+guild.slug}>(List)</Link></td>
                                <td>
                                    <button className={styles.button_normal}>See More</button>
                                </td>
                            </tr>
                            ) 
                            : undefined}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}