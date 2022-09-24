import React from 'react';
import '../../components-styles/Cards.css'
import { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import { useNavigate } from 'react-router-dom';

var cardText = [];
var str = '';


export default function BlackCard() {

    let [prompt, setPromt] = useState([]);
    let [running, setRunning] = useState();

    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
        fetch(serviceendpoint + '/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    //check if selected game is running: if so, set prompt and running state
                    if (data.games[i].id === Number(localStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')))
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

                            //if game is not running, return to gamelobby
                            setRunning(false);
                            navigate('/lobby/' + Number(localStorage.getItem('gameID')));
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