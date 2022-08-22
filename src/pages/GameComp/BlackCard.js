import React from 'react';
import '../../components-styles/Cards.css'
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';

var cardText = [];
var str = '';


export default function BlackCard() {

    let [prompt, setPromt] = useState([]);
    let [running, setRunning] = useState();

    
    useEffect(() => {
        const interval = setInterval(() => {
        fetch(serviceendpoint + '/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    //check if selected game is running: if so, set prompt and running state
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
    }, 500);
    return () => clearInterval(interval);
    }, [])

//display of text
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

                    <p> </p>

                </div>
            </>
        );
    }
}