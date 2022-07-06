export default async() =>{

    const urlG= 'https://gruppe7.toni-barth.com/games/';
    let responseG= await fetch(urlG);
    return responseG = responseG.json();
    };


/*export default new Promise(() =>{
    fetch('https://gruppe7.toni-barth.com/players/')
    .then(response => response.json())
    .then(data=>{
        if(data.players.length !== 0){
            var id= data.players[data.players.length-1].id;
            fetch('https://gruppe7.toni-barth.com/games/')
            .then(response => response.json())
            .then(data=>{
                for(var i = 0; i < data.games.length; i++){
                    for(var j = 0; j < data.games[i].players.length; j++){
                        if (data.games[i].players[j].id === id){
                            data = data.games[i].id;
                            i = data.games.length;
                            break;
                        } 
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});*/