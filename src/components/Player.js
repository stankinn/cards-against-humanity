import React from 'react'

class Player extends React.Component {
    
  constructor(){
  super();
  this.state = {content: [], visible: ''};
  this.showPlayer= this.showPlayer.bind(this);
  this.addPlayer= this.addPlayer.bind(this);
  this.deletePlayer= this.deletePlayer.bind(this);
  }
  
  showPlayer() {
    const serviceendpoint = "https://gruppe7.toni-barth.com";

    fetch(serviceendpoint + '/players/')
    .then(response => response.json())
    .then(data=>{
      if(data.players.length === 0){
        this.setState({content: 'No Players existing.', visible: 'true'});  
        
      }
      else{
        this.setState({content: data.players[0].name, visible: 'false'});
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
    const serviceendpoint = "https://gruppe7.toni-barth.com";

    fetch(serviceendpoint + '/players/')
    .then(response => response.json())
    .then(data=>{
        if(data.players.length === 0){
            if(input === ''){
              input = 'Player69'
              console.log('debug: ADD PLAYER');
            }
            fetch(serviceendpoint + '/players/',{
                method: 'POST',
                body:JSON.stringify({name: input}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data.id + ' New Player: ' + data.name)
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
      const serviceendpoint = "https://gruppe7.toni-barth.com";
      fetch(serviceendpoint + '/players/')
          .then(response => response.json())
          .then(data=>{
            var id = 0;
            if(data.players.length !== 0){
              if(data.players.id !== 0){
                id= data.players[data.players.length-1].id;
              }
              fetch(serviceendpoint + '/players/' + id, {
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
        <div id= 'playerEdit'>
          <p id='curPlayerName'>Your Name: {this.state.content}</p>
          <input id='inputName' maxLength={14}/>
          <button id='delPlayerBtn' className='delBtn' onClick={this.deletePlayer}>Delete</button>
          <button id='newPlayerBtn' className='newBtn' onClick={this.addPlayer}>New</button>
        </div>
    );
}
}

export default Player;