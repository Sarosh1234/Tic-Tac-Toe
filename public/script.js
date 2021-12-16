let winners = new Array();
let player1Selections = new Array();
let player2Selections = new Array();
//let timer;
let numberOfPlayers = 2;
let currentPlayer = 0;
let move = 0;
let points1 = 0;    // player 1 points
let points2 = 0;    // player 2 points
let size = 3;
let Player1Wins = 0;
let Player2Wins = 0;
let Player1Losses = 0;
let Player2Losses = 0;


function drawBoard() {
let Parent = document.getElementById("game");
let counter = 1;
    
while (Parent.hasChildNodes()) {
Parent.removeChild(Parent.firstChild);
}

  for (s = 0; s < 3; s++) {
  let row = document.createElement("tr");
        
  for (r = 0; r < 3; r++) {
  let col = document.createElement("td");
  col.id = counter;

 let handler = function(e) {
 if (currentPlayer == 0) {
 this.innerHTML = "P1";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                    d('player1').classList.remove('selected');
                    d('player2').classList.add('selected');
                }

                else {
                    this.innerHTML = "P2";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                    d('player1').classList.add('selected');
                    d('player2').classList.remove('selected');
                }

                if (checkWinner())
                {
                    if(currentPlayer == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    reset();
                    drawBoard();
                    gameOver();
                    trackWinOrLose();
                    updateWinLose();
                }

                else if (player2Selections.length + player1Selections.length == 9)
                {
                    reset();
                    drawBoard();
                    gameOver();

                    debugger
                    trackWinOrLose();
                    updateWinLose();
                }
                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }

                //determine the winner
                function gameOver() {
                    if (points1 == 3 || points2 == 3 ) {
                        console.log("GameOver")
                        window.alert("GameOver! Please study now");
                        points1 = 0
                        points2 = 0
                        document.getElementById("player1").innerHTML = points1;
                        document.getElementById("player2").innerHTML = points2;
                    }       
                    
                }
                
                function trackWinOrLose() {
                    if (points1 == 3) {
                    Player1Wins++
                    Player2Losses++
                }
                    else {
                    Player2Wins++
                    Player1Losses++
                    }

                }
                
                    
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
}


function d(id)
{
    let el = document.getElementById(id);
    return el;
}
function reset()
{
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    d('player1').classList.add('selected');
    d('player2').classList.remove('selected');
}


//Combination for winning function
function loadAnswers()
{
    //horizontal combo
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);

    //vertical combo
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);

    //diagonal combo
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
}

function checkWinner() {
    // check if current player has a winning hand
    // only start checking when player x has size number of selections
    let win = false;
    let playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
	playerSelections = player2Selections;
    
    if (playerSelections.length >= size) {
        // check if any 'winners' are also in your selections
        
        for (i = 0; i < winners.length; i++) {
            let sets = winners[i];  // winning hand
            let setFound = true;
            
            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                let found = false;
                
                // players hand
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
} 

function updateWinLose() {
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Player1Wins, Player2Wins, Player1Losses, Player2Losses
        })
    }
    fetch("/update",payload)
        .then(res => res.json())
        .then(res => console.info(res))
}

window.addEventListener('load', drawBoard);