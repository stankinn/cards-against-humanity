import React from 'react';
import { serviceendpoint, playerID} from './Imports';
import {useState, useEffect} from 'react';

export default function PlayerPoints(){

    let [points, setPoints] = useState([]);

        let gameId = '';
        let isRunning= false;

        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data => {

                if (data.games.length === 0) {
                    console.log('There are no games yet.');
                }
                for (var i = 0; i < data.games.length; i++) {
                    for (var j = 0; j < data.games[i].players.length; j++) {
                        if (data.games[i].players[j].id === Number(playerID)) {
                            gameId = data.games[i].id;
                            if(data.games[i].running===true){
                                isRunning= true;
                            }else{
                                isRunning= false;
                            }
                        }
                    }
                }
                if (isRunning === 'false') {

                    fetch(serviceendpoint + '/games/' + gameId)
                        .then(res => res.json())
                        .then(gameData => {

                            for (var j = 0; j < gameData.players.length; j++) {
                                setPoints(points[j]= gameData.players[j].name + '_______' + gameData.points[j]);
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else { console.log("No points. Game is not running yet."); }

                /*for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === gameId) {
                        for (var j = 0; j < data.games[i].players.length; j++) {
                            fetch(serviceendpoint + '/games/' + gameId)
                                .then(res => res.json())
                                .then(gameData => {
                                    this.setState({
                                        notice: this.state.notice.concat([data.games[i].players[j].name + '_______' + gameData.points[j]])
                                    });
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }
                    }
                }*/
            })
                .catch((error) => {
                    console.error('Error:', error);
                });


        return (
            <>
                {points.map(({ name, id }) => (
                    <p key={id}> {name}</p>
                ))}
            </>
        );
    }
