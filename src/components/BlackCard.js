import React from 'react';
import '../components-styles/Cards.css'
import { gameId } from './GameId';

var cardText = [];
var str = '';

class BlackCard extends React.Component {
    
    constructor(){
        super();
        this.state = {notice:[]};
        this.blackCard= this.blackCard.bind(this);
    }

    blackCard() {     

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/' + gameId)
        .then(response => response.json())
        .then(data=>{

            str = data.currentBlackCard.text;
            cardText = str.replaceAll('_', ' _______ ');
            this.setState({notice: cardText});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

    componentDidMount() {
       this.blackCard();
     }

    componentDidUpdate(){
        this.blackCard();
    }
    
    render() {
        return (
            <> 
            <div className='card black'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            </>
        );
    }
}

export default BlackCard;