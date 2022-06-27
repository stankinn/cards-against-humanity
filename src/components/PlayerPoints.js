import React from 'react';

var curPlayer = 0;

class PlayerPoints extends React.Component {
    
    constructor(){
        super();
        this.state = {notice:''};
        this.playerPoints= this.playerPoints.bind(this);
    }

    playerPoints() {     

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/:gameId')
        .then(response => response.json())
        .then(data=>{
                // this.setState({notice: data.points[curPlayer]});
        })
        .catch((error) => {
            console.error('Error:', error);
            });
        
    }

    componentDidMount() {
       this.playerPoints();
     }

    componentDidUpdate(){
        this.playerPoints();
    }
    
    render() {
        return (
            <>
            <p>Player1</p>
            <p>Player2</p>
            <p>Player3</p>
            <p>Player4</p>
                <p>Player1</p>
                <p>Player2</p>
                <p>Player3</p>
                <p>Player4</p>
            </>
        );
    }
}

export default PlayerPoints;