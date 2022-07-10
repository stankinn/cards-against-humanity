import React from 'react';
import '../components-styles/Cards.css'
import { useState, useEffect } from 'react';
import { serviceendpoint, playerID } from './Imports';


var cardText = [];
var str = '';

export default function BlackCard() {

    let [prompt, setPromt] = useState([]);
    let [running, setRunning] = useState();

    useEffect(() => {
        fetch('https://gruppe7.toni-barth.com/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    //check if game is running: if so, display text
                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
                                .then(response => response.json())
                                .then(data => {
                                    str = data.currentBlackCard.text;
                                    cardText = str.replaceAll('_', ' _______ ');
                                    setPromt(cardText);
                                    setRunning(true);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        } else {
                            console.log('Black Card cannot be shown. Game is not running yet.');
                            setRunning(false);
                        }
                        i = data.games.length;
                        break;
                    }
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log(prompt)

    }, [])


    if ({ running }.running === true) {
        return (
            <>
                <div className='card black'>

                    <p>{prompt}</p>

                </div>
            </>
        );
    } else {
        return (
            <>
                <div className='card black'>

                    <p></p>

                </div>
            </>
        );
    }
}