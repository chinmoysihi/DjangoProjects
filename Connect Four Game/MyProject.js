$
//Player Initialization
var player1 = "";
var player2 = "";

var game_on = true;
var table = $('table tr');

//Player Color Initialization
var player1Color = 'rgb(237, 64, 102)';
var player2Color = 'rgb(51, 127, 242)';



$('input').click(function () {
  player1 = prompt("Enter Player1 Name");
  player2 = prompt("Enter Player2 Name")
})
console.log(player1);

function changeColor(color,row,col){
  return table.eq(row).find('button').eq(col).css('background-color',color)
}


function returnColor(row,col) {
  return table.eq(row).find('button').eq(col).css('background-color')
}


function checkBottom(colIndex){
  var colorReport = returnColor(5,colIndex)
  for(var row = 5; row >= 0; row--)
  {
    colorReport = returnColor(row,colIndex)
    if(colorReport == 'rgb(198, 201, 207)')
    {
      return row
    }
  }
}
function colorMatch(one,two,three,four){
  return (one===two) && (two===three) && (three===four) && one != 'rgb(198, 201, 207)' && one != undefined
}

function reportWin(row,col){
  console.log("You won starting at this row,col");
  console.log(row);
  console.log(col);
}


function horizontalWinCheck(){
  for(var row = 0; row < 6; row++){
    for (var col = 0; col < 4; col++) {
      if(colorMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3)))
      {
        reportWin(row,col)
        return true
      }
      else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var col = 0; col < 6; col++){
    for (var row = 0; row < 4; row++) {
      if(colorMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col)))
      {
        reportWin(row,col)
        return true
      }
      else{
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatch(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatch(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "30px")
      $('h4').text("Game Over")
    }
  }
}

//Game Start
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('.board button').click(function () {
  var col = $(this).closest("td").index();
  // console.log(col);

  var bottomAvail = checkBottom(col)

  changeColor(currentColor,bottomAvail,col)

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    gameEnd(currentName)
    return
  }

  // If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h4').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player1Color;
  }else {
    currentName = player2
    $('h4').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player2Color;
  }
})
