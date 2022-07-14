import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {

    let [answer, setAnswer] = useState([]); // white cards text in general
    let [running, setRunning] = useState(); // check if game is running
    let [list, setList] = useState([]);     // set list of selected cards for offer
    let [spaces, setSpaces] = useState();   // how many cards need to be selected
    let [offers, setOffers] = useState();   // get offered cards
    let [waitingPlayers, setPlayers] = useState();  //how many players have to make their offers
    var helpArray = [];

    useEffect(() => {
        const interval = setInterval(() => {
            //set running state and white cards
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
            //set space number from black card and waiting for players state
            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
                .then(response => response.json())
                .then(data => {
                    var spaceNumber = data.currentBlackCard.pick;
                    var waiting = data.waitingForPlayers;
                    setSpaces(spaceNumber);
                    setPlayers(waiting);

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            //offer cards, if enough cards have been selected

            if (list.length === spaces && waitingPlayers > 0) {
                console.log("list: " + list);
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
            //show offers, once all players selected cards
            if (waitingPlayers === 0) {
                setList([]);
                getOffers();
            }

        }, 500);
        return () => clearInterval(interval);
    })


    //make an offer cards list
    function makeList(id) {

        if (list.length === spaces) {
            console.log('No more cards can be added.');
        } else {
            const newSelection = [...list]
            newSelection.push(id);
            setList(newSelection);
        }
    }


    //get offers for display
    function getOffers() {
        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {

                setOffers(data.offers);
            })
    }

    //Choose a winning card from offers
    function chooseWinner(id) {

        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {

                for (var i = 0; i < data.offers.length; i++) {

                    if (data.offers[i].length > 0) {

                        for (var j = 0; j < data.offers[i].length; j++) {
                            if (data.offers[i][j].id === id) {
                                console.log("GOT the winner ID");
                                for (var k = 0; k < data.offers[i].length; k++) {
                                    helpArray[k] = data.offers[i][k].id;
                                }

                            }
                        }
                    }
                } console.log("Winner ID List:" + helpArray);


                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')),
                    {
                        method: "PUT",
                        body: JSON.stringify({ cards: helpArray }),
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(res => res.json())

            })
    }

    if ({ running }.running === true) {
        if (waitingPlayers === 0 && offers !== undefined) {

            //visible offer cards
            //console.log("all players put in their offer");

            const filtered = offers.filter(offer => {
                if (Object.keys(offer).length !== 0) {
                    return true;
                } return false;
            });

            return (
                <>
                    <div id='offeredCards' className='gameDiv cardsBackground'>

                        {filtered.map((offer) => (

                            <>
                                {offer.map((text) => {
                                    return (
                                        <div className='card white' onClick={() => chooseWinner(text.id)}>

                                            <p key={text.id}> {text.text} </p>

                                        </div>);
                                })}

                            </>

                        ))}
                    </div>
                    <div id='playerCards' className='gameDiv cardsBackground'>
                        {answer.map((text) => (
                            <div className='card white'>
                                <p key={text.id} >{text.text}</p>
                            </div>
                        ))}
                    </div>
                </>
            );

        } else {
            return (
                <>
                    <div id='offeredCards' className='gameDiv cardsBackground'>

                        <>
                        </>

                    </div>

                    <div id='playerCards' className='gameDiv cardsBackground'>
                        {answer.map((text) => (
                            <div className='card white' onClick={() => makeList(text.id)}>
                                <p key={text.id} >{text.text}</p>
                            </div>
                        ))}
                    </div>

                </>
            );

        }

    } else {
        return (
            <>
                <div id='offeredCards' className='gameDiv cardsBackground'>

                    <>
                    </>

                </div>
                
                <div id='playerCards' className='gameDiv cardsBackground'>
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
                </div>
            </>
        );
    }

}