import React from 'react';
import {serviceendpoint, gameURL, playerURL} from './index';

class Games extends React.Component {
    
    constructor(){
    super();
    this.state = {notice: []};
    this.checkGames= this.checkGames.bind(this);
    this.showPlayer= this.showPlayer.bind(this);
    this.addGame = this.addGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.deleteGame= this.deleteGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    }

    checkGames() {

        gameURL.then(data=>{
            console.log("all games:" + JSON.stringify(data.games))
            if(data.games.length === 0)
            {
                this.addGame();
                console.log("New game is being created")
            }
            else 
            {
                console.log("joining available game")
                this.joinGame();
                //this.setState({notice: data});
                
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            });
    }

    componentDidMount() {
       this.showPlayer();
    }
    
    showPlayer(){

        gameURL.then(data=>{
            if(data.games.length !== 0)
            {
                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){
                        console.log('PLAYER IN GAME(' + data.games[i].id + '): '+ JSON.stringify(data.games[i].players));
                        this.setState({notice: data.games[i].players});
                        console.log(data.games[i].players.length + ' Player/s in Game.');
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            });
    } 

    /*componentDidUpdate() {
       this.showPlayer();
    }*/

    addGame(){

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        var playerID= '';

        //spielerID wird herausgefunden
        playerURL.then(data=>{
            if(data.players.length !== 0){
                playerID= data.players[data.players.length-1].id;
                console.log("PlayerID:" + playerID);

                //neues Spiel wird erstellt mit eigener SpielerID
                fetch(serviceendpoint + '/games/', {
                    method: "POST",
                    body: JSON.stringify({ owner: playerID}),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data=>{
                    console.log(data.owner.name)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }else{
                console.log('No Player existing.');
            }   
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

  joinGame() {

        var playerID= '';
        var gameID= '';
        
        playerURL.then(data=>{  
            if(data.players.length !== 0){
            playerID = data.players[data.players.length-1].id;

            gameURL.then(data =>{
                console.log("all games: " + data.games.length);

                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){
                        gameID = data.games[i].id;
                    }
                }
                //console.log("GAME ID: " + gameID);
                fetch(serviceendpoint + '/games/'+ gameID + '/'+ playerID, {
                    method: "PATCH",
                    body: JSON.stringify({ player: playerID, action: "join"}),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            })

        }
    })}


    deleteGame(){

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data => {
            if(data.games.length !== 0){
                var gameID = data.games[data.games.length-1].id;
                console.log('All Games: ' + JSON.stringify(data.games));
                console.log('Game to be deleted: ' + gameID);
            
                fetch(serviceendpoint + '/games/' + gameID, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            }else{
                console.log('No Games existing.');
            }    
        })

    }
    render() {
        return (
            <>
                <button id= "newGameBtn" className='newBtn' onClick={this.checkGames}>Play</button>
                <button id= "delGameBtn" className='delBtn' onClick={this.deleteGame}>Delete Game</button>
                <div className='list'>
                    {this.state.notice.map(({ name, id }) => (
                        <p key={id}> {name}</p>
                    ))}
                </div>
            </>
        );
    }
}

export default Games;