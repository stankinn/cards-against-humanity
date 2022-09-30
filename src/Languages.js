export let lang = {
    English:{
        error: 'Page not found!',

        hsaInfo1:'A project of the',
        hsaInfo2:'under the supervision of',
        
        helpTitle1: 'How to change the Language!',
        helpTxt1: 'If you want to change the language of the game (cards only available in English), ' +
                  'click on the menu button in the upper left corner and choose between English and German there.',
        
        helpTitle2: 'How to get started!',
        helpTxt2: 'To start a game, players must first choose a name that will be visible to all players ' +
                  'in the lobby. Click on "create new" to save your name and then on "PLAY". ' + 
                  'If you want to delete your player, just click on "delete" and your name should not be listed anymore.',
                
        helpTitle3: 'How to join/leave a Game!',
        helpTxt3: 'In the next step you will see all the current lobbies, if there is one. If you click on a lobby, you will see more information ' +
                  'in the lower section, such as the game ID, the points target, the names of the players in that lobby and the card packs used. '+
                  'If you want to join a session, select the lobby you want to join and click "join" at the bottom right. '+
                  'To leave the game, click on "LEAVE GAME" and you will return to the lobby overview.',
        
        helpTitle4: 'How to create and start a Game!',
        helpTxt4: 'If you want to create a lobby, click "create game" in the bottom left corner and in the next step, ' +
                  'enter the target score and select the card packs to be used in the game. To create the lobby, you must now click on the "create" ' +
                  'button, which will take you to the next screen with a list of all players. To start the game, you need to be the creator of the game ' +
                  'and there must be at least 3 players in the lobby. To start the game, click on "START GAME".',
                
        helpTitle5: 'How to play!',
        helpTxt5_1: 'The game is divided into rounds. At the beginning of each round a czar is chosen. '+
                    'The czar himself does not participate in the current round of the game.',   
        helpTxt5_2: 'A black card appears, and the czar reads out the cloze text on it. The cloze can also be in the ' +
                    'form of a question, where the answer must be completed. Each player except the czar chooses a white card from his supply ' +
                    'whose content he thinks best matches the cloze or question, and selects it by clicking it and submit it with the button appearing.',
        helpTxt5_3: 'After all players have selected a card, the czar reads out the terms or phrases printed on it. He then chooses the card that he '+
                    'thinks best matches the cloze or question he originally read aloud. The person who had chosen this card gets one point.',
        helpTxt5_4: 'Then a new czar is chosen, and new cards are revealed. If a player reaches the goal every player gets an animation, '+
                    'that shows its result and everyone will be back in the main lobby after a short time.',
        

        headerP:'Player',
        curName:'Your Name: ',
        delBtn:'delete',
        addBtn:'create new',
        playButton:'PLAY',

        noGames: 'No games available. Please create a new game.',
        noGameClicked: 'please select a game',
        infoPlayer: 'players in this Game: ',
        infoPacks: 'packs in this Game: ',
        infoGoal: 'points to win: ',
        join: 'join',

        headerG:'Game-ID: ',
        startButton:'START GAME',
        leaveButton: 'LEAVE GAME',
        deleteButton: 'DELETE GAME',

        createGame: 'Create Game',
        points: 'Points',
        select: 'select all',
        deselect: 'deselect all',
        create: 'create',

        czar:'czar: ',
        czarWarning: 'You are the Czar.',
        playerPoints:'Points: ',
        black: 'Black: ',
        white: 'White: ',
        choose: 'choose',

        playerWon:'YOU WON',
        playerLost:'YOU LOST',
    },
    German:{
        error: 'Seite nicht gefunden!',

        hsaInfo1:'Ein Projekt an der',
        hsaInfo2:'unter der Aufsicht von',

        helpTitle1: 'Wie man die Sprache ändert',
        helpTxt1: 'Wenn Sie die Sprache des Spiels ändern möchten (Karten nur in Englischer Sprache vorhanden), klicken Sie oben links auf den ' +
                  'Menü-Button und wählen dort zwischen Deutsch und Englisch.',
        helpImg1: './images/Lang.gif',

        helpTitle2: 'Wie man beginnt',
        helpTxt2: 'Um ein Spiel zu beginnen, müssen die Spieler zunächst einen ' +
                  'Namen wählen, der für alle Spieler in der Lobby sichtbar ist. Klicken Sie auf „neu erstellen“, um Ihren Namen zu speichern und ' +
                  'dann auf „SPIELEN“. Wenn Sie ihren Namen löschen wollen, klicken Sie auf "löschen" und Ihr zuvor ausgewählter Name sollte nicht mehr ' +
                  'angezeigt werden.',

        helpTitle3: 'Wie man einem Spiel beitritt/es verlässt ',
        helpTxt3: 'Im nächsten Schritt sind alle momentanen Lobbys zu sehen, falls eine vorhanden ist. Wird auf eine Lobby ' +
                  'geklickt, sieht man im Unteren Bereich weitere Informationen, wie die Spiel-ID, das Punkte-Ziel, die Namen der Spieler in dieser ' +
                  'Lobby und die verwendeten Karten-Packs. Wenn Sie einer Sitzung beitreten wollen, wählen Sie die gewünschte Lobby aus und ' +
                  'klicken unten rechts auf „beitreten“.'+
                  'Um das Spiel zu verlassen, klicken Sie auf „SPIEL VERLASSEN“ und Sie gelangen zur Lobbyübersicht zurück.',

        helpTitle4: 'Wie man ein Spiel erstellt und startet',
        helpTxt4: 'Wenn Sie eine Lobby erstellen wollen, klicken Sie unten links auf „Spiel erstellen“ und '  +
                  'wählen im nächsten Schritt die Ziel-Punktzahl ein und wählen die Karten-Packs aus, die im Spiel verwendet werden sollen. ' +
                  'Zum Erstellen der Lobby müssen Sie nun auf den Button „erstellen“ klicken und gelangen so zum nächsten Screen mit einer ' +
                  'Liste aller Spieler.'+
                  'Um das Spiel starten zu können, musst du der ersteller des Spiels und mindestens 3 Spieler in der Lobby sein. ' +
                  'Zum Starten klicken Sie auf „SPIEL STARTEN“.',

        helpTitle5: 'Wie man spielt',
        helpTxt5_1: 'Das Spiel ist in Runden unterteilt. Zu Beginn jeder Runde wird ein Zar ernannt. Der Zar nimmt selbst an der ' + 
                    'aktuellen Spielrunde nicht teil.',
        helpTxt5_2: 'Es erscheint eine schwarze Karte und der Zar liest den darauf befindlichen Lückentext vor. Der ' + 
                    'Lückentext kann auch in Form einer Frage vorliegen, bei der die Antwort ergänzt werden muss. Jeder Spieler außer dem ' + 
                    'Zar wählt eine weiße Karte aus seinem Vorrat, deren Inhalt seiner Meinung nach am besten zum Lückentext bzw. der Frage passt, ' + 
                    'und wählt diese durch Anklicken aus und schickt seine Karte/n mit dem auftauchendem Button ab.',
        helpTxt5_3: 'Nachdem alle Spieler eine Karte ausgewählt haben, liest der Zar die darauf abgedruckten ' +
                    'Begriffe oder Phrasen vor. Anschließend wählt er diejenige Karte, die seiner Meinung nach am besten zum ursprünglich von ihm ' + 
                    'vorgelesenen Lückentext bzw. zur vorgelesenen Frage passt. Derjenige, der diese Karte ausgewählt hatte, erhält einen Punkt.',
        helpTxt5_4: 'Anschließend wird ein neuer Zar ausgewählt und neue Karten werden aufgedeckt.'+
                    'Wenn ein Spieler das Punkteziel erreicht, erscheint bei jedem Spieler eine Animation, welche sein eigenes Ergebnis zeigt.'+
                    'Nach einer kurzen Zeit wird jeder Spieler automatisch in die Hauptlobby zurückgebracht.',

        headerP:'Spieler',
        curName:'Dein Name: ',
        delBtn:'löschen',
        addBtn:'neu erstellen',
        playButton:'SPIELEN',

        noGames: 'Keine Spiele vorhanden. Bitte erstelle ein neues.',
        noGameClicked: 'Bitte ein Spiel auswählen',
        infoPlayer: 'Spieler im Spiel: ',
        infoPacks: 'Karten-Packs im Spiel: ',
        infoGoal: 'Punkte-Ziel: ',
        join: 'beitreten',

        headerG:'Spiel-ID: ',
        startButton:'SPIEL STARTEN',
        leaveButton: 'SPIEL VERLASSEN',
        deleteButton: 'SPIEL LÖSCHEN',

        createGame: 'Spiel erstellen',
        points: 'Punkte',
        select: 'alle auswählen',
        deselect: 'Auswahl aufheben',
        create: 'erstellen',

        czar:'Zar: ',
        czarWarning:'Du bist der Zar.',
        playerPoints:'Punkte: ',
        black: 'Schwarz: ',
        white: 'Weiß: ',
        choose: 'wählen',

        playerWon:'GEWONNEN',
        playerLost:'VERLOREN',
    }
};