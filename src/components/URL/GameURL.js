export default async() =>{

    const urlG= 'https://gruppe7.toni-barth.com/games/';
    let responseG= await fetch(urlG);
    return responseG = responseG.json();
    };
