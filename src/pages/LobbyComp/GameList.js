import React, { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { lang } from '../../Languages';

export default function PlayerList(props) {

    let [gameList, setGList] = useState([]);
    let [clickedGame, setClicked] = useState([]);
    let [playerList, setPlayers] = useState([]);
    let [packList, setPacks] = useState([]);
    let [curGoal, setGoal] = useState([]);

    var arr = [];

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    useEffect(() => {
        const interval = setInterval(() => {

            // console.log('Players: ' + JSON.stringify(playerList));
            // console.log('Pakcs: ' + JSON.stringify(packList));
            // console.log('Goal: ' + JSON.stringify(curGoal));

            getGamesList();
            if(clickedGame.length === 0){
                setClicked(content.noGameClicked);
                setPlayers([]);
                setPacks([]);
                setGoal(null);
            }

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

    function updateInfo(clickedID){
        setClicked(clickedID);

        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++){
                if(data.games[i].id === clickedID){
                    setPlayers(data.games[i].players)
                    packDetails(data.games[i].packs)
                    setGoal(data.games[i].goal)
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function packDetails(allPacks){


            fetch(serviceendpoint + '/packs/')
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.packs.length; i++){
                    for(var j = 0; j < allPacks.length; j++){
                        if(data.packs[i].id === allPacks[j]){
                            arr[j]={'name': data.packs[i].name, 'id': data.packs[i].id};
                        }
                    }
                }
                setPacks(arr)
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
                <div className='list'>
                    <h2>{content.headerG} {clickedGame}</h2>
                    <p>{content.infoPlayer}</p>
                    <div className='list'>
                        {playerList.map((player) =>(
                            <p key={player.id}>{player.name} ({player.id})</p>
                        ))}
                    </div>
                    <p>{content.infoPacks}</p>
                    <div className='list'>
                        {packList.map((pack) =>(
                            <p key={pack.id}>{pack.name}</p>
                        ))}
                    </div>
                    <p>{content.infoGoal} {curGoal}</p>
                </div>
            </>
        );
    } else {

        return (
            <>
                <h1>CAH Lobby</h1>
                <div className='list'>
                    {gameList.map((game) => (
                        <button id={game.id} onClick={updateInfo(game.id)}>
                            {content.headerG} {game.id} [running?: {game.running}]
                        </button>
                    ))}
                </div>
                <div className='list'>
                    <h2>{content.headerG} {clickedGame}</h2>
                    <p>{content.infoPlayer}</p>
                    <div className='list'>
                        {playerList.map((player) =>(
                            <p key={player.id}>{player.name}  ({player.id})</p>
                        ))}
                    </div>
                    <p>{content.infoPacks}</p>
                    <div className='list'>
                        {packList.map((pack) =>(
                            <p key={pack.id}>{pack.name}</p>
                        ))}
                    </div>
                    <p>{content.infoGoal} {curGoal}</p>
                </div>
            </>
        );
    }
}