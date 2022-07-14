import React from 'react'
import { serviceendpoint } from './Imports'

// only a debugging function
export default function DeleteAll() {

    function deleteAllGames(){
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            console.log('There are still ' + data.games.length + ' Games')
                if(data.games[data.games.length-1].running === true){
                    fetch(serviceendpoint + '/games/' + data.games[data.games.length-1].id + '/' + data.games[data.games.length-1].owner.id, {
                        method: "PATCH",
                        body: JSON.stringify({ action: "end" }),
                        headers: { "Content-Type": "application/json" }
                      })
                      .then(res => res.json())
                      .catch((error) => {
                        console.error('Error:', error);
                      });
                }
                fetch(serviceendpoint + '/games/' + data.games[data.games.length-1].id, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(res =>{
                    if(res.ok){
                        console.log('Deleted Game: ' + data.games[data.games.length-1].id + ', ' + data.games.length + ' Games left')
                    }
                    return res
                })
                .then(res => res.json())
                .catch((error) => {
                  console.error('Error:', error);
                });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    
    function deleteAllPlayer(){
        fetch(serviceendpoint + '/players/')
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data.players))
            console.log('There are still ' + data.players.length + ' Player')
            // const playerID = data.players[data.players.length-1].id;
            //     fetch(serviceendpoint + '/players/' + playerID, {
            //         method: 'DELETE',
            //         headers: { "Content-Type": "application/json" }
            //       })
            //       .then(res => {
            //         if(res.ok){
            //             console.log('Deleted Player: ' + playerID + ', ' + data.players.length + ' Players left')
            //         }
            //         return res
            //       })
            //       .then(res => console.log(res))
            //       .catch((error) => {
            //         console.error('Error:', error);
            //       });
        })
    }

  return (
    <>
        <button className='delBtn fixed' onClick={deleteAllGames}>Delete last Games</button>
        <button id='fixedL' className='delBtn fixed' onClick={deleteAllPlayer}>Delete last Player</button>
    </>
  )
}
