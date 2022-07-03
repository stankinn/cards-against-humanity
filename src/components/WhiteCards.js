import React from 'react';
import '../components-styles/Cards.css'
import {default as gameId} from './IDs/GameId';
import {default as playerId} from './IDs/PlayerId';

class WhiteCards extends React.Component {
    
    constructor(){
        super();
        this.state = {cardText:''};
        this.whiteCards= this.whiteCards.bind(this);
    }

    whiteCards() {     

        const serviceendpoint = "https://gruppe7.toni-barth.com";

//weiße karten des spielers werden ausgegeben, werden laut API nur angezeigt, wenn das spiel läuft
        playerId.then(thisPlayerId => {  
            gameId.then(thisGameId => {
                fetch(serviceendpoint + '/games/'+ thisGameId + '/cards', {
                    method: "GET",
                    body: JSON.stringify({ player: thisPlayerId}),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data=>{
                    this.setState({cardText: data.text});
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
        })
    }

    componentDidMount() {
       this.whiteCards();
     }

    componentDidUpdate(){
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