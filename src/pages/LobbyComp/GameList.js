import React, { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';

export default function PlayerList(props) {

    let [gameList, setGList] = useState([]);

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    useEffect(() => {
        const interval = setInterval(() => {

            getGamesList();

        }, 500);
        return () => clearInterval(interval);
    });

    function getGamesList() {

        fetch(serviceendpoint + '/games/')
            .then(response => response.json())
            .then(data => {
                setGList(data.games);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    if (gameList.length === 0) {
        return (
            <>
                <h1>CAH Lobby</h1>
                <div className='list'>
                    <p>{content.noGames}</p>
                </div>
            </>
        );
    } else {

        return (
            <>
                <h1>CAH Lobby</h1>
                <div className='list'>
                    {gameList.map((game) => (
                        <p key={game.id}>{content.headerG} {game.id} [running?: {game.running}]</p>
                    ))}
                </div>
            </>
        );
    }
}