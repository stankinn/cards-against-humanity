import React, { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import {useNavigate} from 'react-router-dom';
import { lang } from '../../Languages';

export default function GameList(props) {

    let [gameList, setGList] = useState([]);
    let [clickedGame, setClicked] = useState([]);
    let [playerList, setPlayers] = useState([]);
    let [packList, setPacks] = useState([]);
    let [curGoal, setGoal] = useState([]);

    var arr = [];

    let navigate = useNavigate();

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    
    useEffect(() => {
        const interval = setInterval(() => {

            getGamesList();
            // clear details output if there are no games or no game is selected
            if(clickedGame === content.noGameClicked || gameList.length === 0){
                setClicked(content.noGameClicked);
                setPlayers([]);
                setPacks([]);
                setGoal(null);
                document.getElementById('joinBtn').classList.add('disabled');
            }

        }, 500);
        return () => clearInterval(interval);
    });

    // display all details and enable joining when clicked
    useEffect(()=>{
        document.getElementById('joinBtn').classList.remove('disabled');

        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++){
                if(data.games[i].id === clickedGame){
                    setPlayers(data.games[i].players)
                    setGoal(data.games[i].goal)
                    let gamePacks = data.games[i].packs;

                    // search for the packs in the game and set name and id to setPacks State
                    fetch(serviceendpoint + '/packs/')
                    .then(response => response.json())
                    .then(packsData => {
                        for(var i = 0; i < packsData.packs.length; i++){
                            for(var j = 0; j < gamePacks.length; j++){
                                if(packsData.packs[i].id === gamePacks[j]){
                                    arr[j]={'name': packsData.packs[i].name, 'id': packsData.packs[i].id};
                                }
                            }
                        }
                        setPacks(arr)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [clickedGame])

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

    function joinGame(){
        
        if(!document.getElementById('joinBtn').classList.contains('disabled')){

            localStorage.setItem('gameID', clickedGame);

            //joining available game and navigate to gameLobby
            fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
                method: 'PATCH',
                body: JSON.stringify({ action : "join" }),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(res.ok){
                    console.log('joined game ' + Number(localStorage.getItem('gameID')) + ' successful.');
                    navigate('/lobby/' + Number(localStorage.getItem('gameID')));
                }
                return res
            })
            .then(res => res.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }


    if (gameList.length === 0) {
        return (
            <>
                <h1 className='header'>CAH Lobby</h1>
                <div id='gamesList' className='list'>
                    <p>{content.noGames}</p>
                </div>

                <div id='detailsList'>
                    <p id='headerID'>{content.headerG} {clickedGame}</p>
                    <p id='playerCont'>{content.infoPlayer}</p>
                    <div id='playerList' className='lobbyList'>
                        {playerList.map((player) =>(
                            <p key={player.id}>{player.name} ({player.id})</p>
                        ))}
                    </div>
                    <p id='packsCont'>{content.infoPacks}</p>
                    <div id='packsList' className='lobbyList'>
                        {packList.map((pack) =>(
                            <p key={pack.id}>{pack.name}</p>
                        ))}
                    </div>
                    <p id='gamePoints'>{content.infoGoal} {curGoal}</p>
                </div>
                <button id='createBtn' className='continueBtn' title='Create Game' onClick={() => navigate('./create-game')}>{content.createGame}</button>
                <button id='joinBtn' className='continueBtn disabled' title='Join Game' onClick={() =>joinGame()}>{content.join}</button>
            </>
        );
    } else {

        return (
            <>
                <h1 className='header'>CAH Lobby</h1>
                <div id='gamesList' className='list'>
                    {gameList.map((game) => (
                        <button id={game.id} onClick={() => setClicked(game.id)}>
                            {content.headerG} {game.id} [{game.running ? 'running' : 'not running'}]
                        </button>
                    ))}
                </div>

                <div id='detailsList'>
                    <p id='headerID'>{content.headerG} {clickedGame}</p>
                    <p id='playerCont'>{content.infoPlayer}</p>
                    <div id='playerList' className='lobbyList'>
                        {playerList.map((player) =>(
                            <p key={player.id}>{player.name} ({player.id})</p>
                        ))}
                    </div>
                    <p id='packsCont'>{content.infoPacks}</p>
                    <div id='packsList' className='lobbyList'>
                        {packList.map((pack) =>(
                            <p key={pack.id}>- {pack.name}</p>
                        ))}
                    </div>
                    <p id='gamePoints'>{content.infoGoal} {curGoal}</p>
                </div>

                <button id='createBtn' className='continueBtn' title='Create Game' onClick={() => navigate('./create-game')}>{content.createGame}</button>
                <button id='joinBtn' className='continueBtn disabled' onClick={() =>joinGame()}>{content.join}</button>
            </>
        );
    }
}