import React from 'react';
import {serviceendpoint, gameURL, playerURL} from './Imports';

class PlayerList extends React.Component {
    
    constructor(props){
    super(props);
    this.state = {notice: []};
    this.gameID = '';
    this.playerLength = '';
    this.ownerID = '';
    this.playerID = '';
    this.showPlayer= this.showPlayer.bind(this);
    this.startGame= this.startGame.bind(this);
    }
    
    showPlayer(){

        gameURL.then(data=>{
            if(data.games.length !== 0){
                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){
                        this.gameID = data.games[i].id;
                        this.setState({notice: data.games[i].players});
                        //this.setState({notice: this.state.notice.concat(data.games[i].players)});
                        this.playerLength = data.games[i].players.length;
                        for (var j = 0; j < data.games[i].players.length; j++) {
                          if (data.games[i].players[j].id === data.games[i].owner.id) {
                            this.ownerID = data.games[i].owner.id;
                          }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        playerURL.then(data => {

            if (data.players.length > 0){
            this.playerID = data.players[data.players.length - 1].id;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        if (this.ownerId === this.playerID) {
            if(this.playerLength >= 3){
                document.getElementById('startBtn').classList.remove('hidden');
            }
        }
    } 
    
    componentDidMount() {
       this.showPlayer();
    }

    componentDidUpdate() {
       this.showPlayer();
    }

    startGame(){
            if (this.ownerId === this.playerID) {
                document.getElementById('gameLobby').classList.add('hidden');

                fetch(serviceendpoint + '/games/' + this.gameID + '/' + this.playerID, {
                    method: "PATCH",
                    body: JSON.stringify({ player: this.playerID, action: "start" }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                console.log('Not the owner. Cannot start the game.');
            }
    }

    render() {
        return (
            <>
                <h1>{this.props.header}{this.gameID}</h1>
                <div className='list'>
                    {this.state.notice.map(({ name, id }) => (
                        <p key={id}> {name}</p>
                    ))}
                </div>
                <button id='startBtn' className='continueBtn hidden' onClick={this.startGame}>{this.props.startBtn}</button>
            </>
        );
    }
}

export default PlayerList;