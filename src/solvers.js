/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

 window.makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solutionboard = new Board (makeEmptyMatrix(n));
  var board = solutionboard.rows();

  for(var i = 0; i < n; i++) {
    var randomColIndex =  Math.floor(Math.random() * (n - 0));
    board[i][randomColIndex] = 1;
  };
  
  function subroutine(){
  for (var i = 0; i < n; i++) {
     if(solutionboard.hasColConflictAt(i)) {
        for (var j = 1; j < n; j++) {
          if(board[j][i] > 0 && i < n){
            board[j][i] = 0;
            board[j][i+1] = 1;
          }else if(board[j][i] > 0 && i > n){
              board[j][i] = 0;
            board[j][0] = 1;
            }
          };
        }    
      };
    };

    while(solutionboard.hasAnyColConflicts()){
      subroutine();
    }
//hasRowConflictAt(rowIndex)
 //hasColConflictAt(colIndex)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionboard));
  return board;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
