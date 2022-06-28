import React from 'react';

class NewPlayer extends React.Component {
    
    constructor(){
    super();
    this.addPlayer= this.addPlayer.bind(this);
    }

    
    addPlayer() {

        var input = document.getElementById('inputName').value;
        const serviceendpoint = "https://gruppe7.toni-barth.com";

        fetch(serviceendpoint + '/players/')
        .then(response => response.json())
        .then(data=>{
            if(data.players.length === 0){
                
                
                fetch(serviceendpoint + '/players/',{
                    method: 'POST',
                    body:JSON.stringify({name: input}),
                    headers: {'Content-Type': 'application/json'}
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data.id + ' New Player: ' + data.name)
                    console.log('All Players: ' + JSON.stringify(data))
                })
                .catch((error) =>{
                    console.error('Error: ', error);
                });
            }
            else
            {
                console.log("all Players:" + JSON.stringify(data.players));
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            });
     
    }

    render() {
        return (
            <>
                <button className='button btn1' onClick={this.addPlayer}>New Player</button>
                <input id='inputName' value={'enter Playername'}/>
            </>
        );
    }
}

export default NewPlayer;