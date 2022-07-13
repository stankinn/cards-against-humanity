import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';

export default function OfferedCards(props) {

    let [running, setRunning] = useState();
    let [offers, setOffers] = useState();
    let [waitingPlayers, setPlayers] = useState();
    //let running= false;

    useEffect(() => {
        const interval = setInterval(() => {
            //check if game running
            fetch(serviceendpoint + '/games/')
                .then(response => response.json())
                .then(data => {
                    for (var i = 0; i < data.games.length; i++) {
                        if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                            if (data.games[i].running === true) {
                                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                                    .then(response => response.json())
                                    .then(() => {
                                        setRunning(true);
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });

                            } else {
                                console.log('Offered cards cannot be shown yet. Game is not running')
                                setRunning(false);
                            }
                            i = data.games.length;
                            break;
                        }
                    }
                })

            //status: waiting for players
            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
                .then(res => res.json())
                .then(data => {
                    setPlayers(data.waitingForPlayers);
                    console.log(JSON.stringify(data.waitingForPlayers));
                    //offers des spielers einsehen
                    var counter = 1;
                    if(counter === 1){
                    fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
                        .then(res => res.json())
                        .then(data => {
                            setOffers(data.offers);
                        })
                    counter--;
                    }
                })

        }, 500);
        return () => clearInterval(interval);
    }, [])



    function chooseWinner(){

        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')),
        {
        method: "PUT",
        body: JSON.stringify({ cards: props.offerC }),
        headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())

    }



    if ({ running }.running === true) {

        if (waitingPlayers > 0) {
            //gray offer cards
            return (
                <>
                    
                </>
            );
        } else {

            //visible offer cards
            console.log("all players put in their offer");
            const filtered = offers.filter(offer => {
                if (Object.keys(offer).length !== 0) {
                    return true;
                } return false;
            });
            console.log(props.offerC);

            return (
                <>
                    {filtered.map((offer) => (
                        <div className='card white' onClick={()=>chooseWinner()}>
                            {
                                offer.map((text) => {
                                    return <p key={text.id}> {text.text}</p>
                                })
                            }
                        </div>
                    ))}
                </>
            );
        }
    }
}