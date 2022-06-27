import React from 'react';

var players=[];

class ShowPlayer extends React.Component {
    
    constructor(){
    super();
    this.state = {notice: []};
    this.showPlayer= this.showPlayer.bind(this);
    }

    showPlayer() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/players/')
        .then(response => response.json())
        .then(data=>{
            if(data.players.lenght === 0){
                this.setState({notice: 'No Player exixting.'});
            }
            else{
                players = data.players;
                console.log(data.players);
            }
            console.log(players);
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
    
    render() {
        return (
            <div className='secBorder'>
                <div id='playerList' className='list'>
                {/* {players.map(({ name, id }) => (
                    <p key={id}> {name}</p>
                ))} */}
              </div>
            </div>
        );
    }
}

export default ShowPlayer;