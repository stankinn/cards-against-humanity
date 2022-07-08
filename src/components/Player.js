import React from 'react'
import {serviceendpoint, playerURL} from './Imports';

class Player extends React.Component {
    
  constructor(){
  super();
  this.state = {content: []};
  this.showPlayer= this.showPlayer.bind(this);
  this.addPlayer= this.addPlayer.bind(this);
  this.deletePlayer= this.deletePlayer.bind(this);
  }
  
  showPlayer() {
    playerURL.then(data=>{
      if(data.players.length === 0){
        this.setState({content: 'No Players existing.'});  
        document.getElementById('playBtn').classList.add('disabled');
      }
      else{
        this.setState((state)=> {return {content: state.content = data.players[data.players.length-1].name}});
        document.getElementById('playBtn').classList.remove('disabled');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  componentDidMount() {
    this.showPlayer();
  }

  componentDidUpdate(){
    this.showPlayer();
  }

  addPlayer() {

    var input = document.getElementById('inputName').value;

    playerURL.then(data=>{
        if(data.players.length === 0){
            if(input === ''){
              input = 'Player69'
            }
            fetch(serviceendpoint + '/players/',{
                method: 'POST',
                body:JSON.stringify({name: input}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data.id + ' New Player: ' + data.name)
                document.getElementById('playBtn').classList.remove('disabled');
            })
            .catch((error) =>{
                console.error('Error: ', error);
            });
        }
        else
        {
            console.log("all Players:" + JSON.stringify(data));
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        });
 
  }

  deletePlayer() {
      playerURL.then(data=>{
            var playerId = 0;
            if(data.players.length !== 0){
              if(data.players.id !== 0){
                playerId= data.players[data.players.length-1].id;
              }
              fetch(serviceendpoint + '/players/' + playerId, {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" }
              })
              .then(res => console.log(res))
            }
            else{
              console.log('No Player existing.')
            }
      });
  }

  render() {
    return (
        <>
          <p id='curNameContent'>{this.state.content}</p>
          <button className='delBtn' onClick={this.deletePlayer}>{this.props.delBtn}</button>
          <button className='addBtn' onClick={this.addPlayer}>{this.props.addBtn}</button>
        </>
    );
}
}

export default Player;