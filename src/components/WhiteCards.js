import React from 'react';
import '../components-styles/Cards.css'
import { default as gameId } from './IDs/GameId';
import { default as playerId } from './IDs/PlayerId';

class WhiteCards extends React.Component {

    constructor() {
        super();
        this.state = { cardText: '' };
        this.whiteCards = this.whiteCards.bind(this);
    }

    whiteCards() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";

        fetch('https://gruppe7.toni-barth.com/players/')
            .then(response => response.json())
            .then(data => {
                if (data.players.length !== 0) {
                    var playerId = data.players[data.players.length - 1].id;
                    fetch('https://gruppe7.toni-barth.com/games/')
                        .then(response => response.json())
                        .then(data => {
                            for (var i = 0; i < data.games.length; i++) {
                                for (var j = 0; j < data.games[i].players.length; j++) {
                                    if (data.games[i].players[j] === playerId) {
                                        var gameID = data.games[i].id;
                                    }
                                }
                            }
                            fetch(serviceendpoint + '/games/' + gameID + '/cards' + playerId, {
                                method: "GET",
                                body: JSON.stringify({ player: playerId }),
                                headers: { "Content-Type": "application/json" }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    this.setState({ cardText: data.text });
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    componentDidMount() {
        this.whiteCards();
    }

    componentDidUpdate() {
        this.whiteCards();
    }

    render() {
        return (
            <>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
                {/* <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div> */}
            </>
        );
    }
}

export default WhiteCards;