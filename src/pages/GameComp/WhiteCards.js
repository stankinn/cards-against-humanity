import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {

    let [answer, setAnswer] = useState([]); // white cards text in general
    let [running, setRunning] = useState(); // check if game is running
    let [list, setList] = useState([]);     // set list of selected cards for offer
    let [spaces, setSpaces] = useState();   // how many cards need to be selected
    let [offers, setOffers] = useState();   // get offeres cards
    let [waitingPlayers, setPlayers] = useState();  //how many players have to make their offers
    let [cardsOffered, setAlreadyOffered] = useState(false);

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
            if (list.length === spaces) {
                //console.log("list: " + list);
                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')),
                    {
                        method: "PUT",
                        body: JSON.stringify({ cards: list }),
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(res => {
                        if (res.ok) {
                            console.log("cards have been offered.");
                            setAlreadyOffered(true);
                        }
                        return res
                    })
                    .then(response => response.json())
                getOffers();
            }
        }, 1000);
        return () => clearInterval(interval);
    })


    //make an offer cards list
    function makeList(id) {
        console.log("card ID: " + id);
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
        if(cardsOffered === true){ 
        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')))
            .then(res => res.json())
            .then(data => {
                console.log("offers: " + JSON.stringify(data.offers));
                setOffers(data.offers);
                setAlreadyOffered(false);
            })
        }
    }
    
    //Choose a winning card from offers
    function chooseWinner() {
        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/offers/' + Number(localStorage.getItem('playerID')),
            {
                method: "PUT",
                body: JSON.stringify({ cards: list }),
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                if (res.ok) {
                    //list = [];
                }
                return res
            })
            .then(res => res.json())
    }

    if ({ running }.running === true) {
        console.log("list: " + list.length)
        if (waitingPlayers === 0 && list.length !== 0) {

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
                                <div className='card white' onClick={() => chooseWinner()}>

                                    {offer.map((text) => {
                                        return <p key={text.id}> {text.text}----</p>
                                    })}
                                    
                               </div>
                            
                        ))}
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