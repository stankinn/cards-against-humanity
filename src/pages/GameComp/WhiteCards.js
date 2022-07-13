import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {

    let [answer, setAnswer] = useState([]);
    let [running, setRunning] = useState();
    let [list, setList] = useState([]);
    let [spaces, setSpaces] = useState();
    //let running= false;

    useEffect(() => {
        //console.log("ANSWER: " + answer);
        //console.log("RUNNING?: " + running);
        
        fetch('https://gruppe7.toni-barth.com/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                                .then(response => response.json())
                                .then(data => {
                                    let cards = data.cards;
                                    setAnswer(cards);
                                    setRunning(true);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });

                        } else {
                            console.log('White Cards cannot be shown yet. Game is not running')
                            setRunning(false);
                        }
                        i = data.games.length;
                        break;
                    }
                }
            })

        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
            .then(response => response.json())
            .then(data => {
                var spaceNumber = data.currentBlackCard.pick;
                setSpaces(spaceNumber);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            

        //offer cards, if enough cards have been selected
        console.log('List length: ' + list.length)
        if (list.length === spaces) {

            console.log('GAME: ' + Number(sessionStorage.getItem('gameID')));
            console.log('PLAYER: ' + Number(localStorage.getItem('playerID')));
            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')),
                {
                    method: "PUT",
                    body: JSON.stringify({ cards: list }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => {
                    if (res.ok) {
                        console.log("cards have been offered.");
                    }
                    return res
                })
                .then(response => response.json())
        }
    }, [])

    function makeList(id) {
        console.log("card ID: " +id);
        if (list.length === spaces) {
            console.log('No more cards can be added.');
        } else {

            const newSelection = [...list]
            newSelection.push(id);
            setList(newSelection);
        }
    }

    if ({ running }.running === true) {

        return (
            <>
                {answer.map((text) => (
                    <div className='card white' onClick={()=>makeList(text.id)}>
                        <p key={text.id} >{text.text}</p>
                    </div>
                ))}
            </>
        );

    } else {
        return (
            <>
                <div className='card white'>
                    <p> </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
            </>
        );
    }

}