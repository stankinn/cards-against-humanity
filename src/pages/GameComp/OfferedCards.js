import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';

export default function OfferedCards() {

    let [running, setRunning] = useState();
    let [offers, setOffers] = useState([]);
    let [waitingPlayers, setPlayers] = useState();
    //let running= false;


    useEffect(() => {

        //check if game running
        fetch('https://gruppe7.toni-barth.com/games/')
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


        //offers des spielers einsehen
        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {
                setOffers(data.offers);

                //status: waiting for players
                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
                    .then(res => res.json())
                    .then(data => {
                        setPlayers(data.waitingForPlayers);
                        console.log(JSON.stringify(data.waitingForPlayers));
                    })
            })
    }, [])


    if ({ running }.running === true) {

        if (waitingPlayers > 0) {
            var index= offers.indexOf([]);
            if (index !== -1) {
                offers.splice(index, 1);
            }
            //gray offer cards
            return (
                <>
                    {offers.map((offer) => (
                        <div className='card grey'>
                            <p key={offer.id}> </p>
                        </div>
                    ))}
                </>
            );
        } else {
            //visible offer cards
            console.log("all players put in their offer");
            offers.filter((offer) => offer!==[]);
            console.log(offers.text)

            return (
                <>
                    {offers.map((offer) => (
                        <div className='card white'>
                            <p key={offer.id}> {offer.text}</p>
                        </div>
                    ))}
                </>
            );

        }
    }
}