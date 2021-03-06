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
  var solutionCount = factorial(n); //fixme

 function factorial(n) {
    var num = n -1;
    if (n === 0) {
      return 1;
    } 
    return n * factorial(n - 1);
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
 var board = new Board({n:n});
  var solution = board.rows();
  // If no solution exists, function will return the original unaltered board

  findQueenSolution(board, 0, n, function(board) {
    return solution = board.rows();
  });
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
return solution;

//  var board = new Board({n:n});
//  var solutionCount = 0;

//   var solutionboard = new Board (makeEmptyMatrix(n));
//   var board = solutionboard.rows();
//   var colIndex = 0
//   for(var i = 0; i < n; i++) {
//     if(colIndex < n) {
//      board[i][colIndex++] = 1;
//   }
// } 

//  function subroutine(){
//     for (var i = 0; i < n; i++) {
//       if(solutionboard.hasColConflictAt(i)) {
//         for (var j = 1; j < n; j++) {
//           if(board[j][i] > 0 && i < n){
//             board[j][i] = 0;
//             board[j][i+1] = 1;
//           }else if(board[j][i] > 0 && i > n){
//             board[j][i] = 0;
//             board[j][0] = 1;
//           }
//         };
//       } else if(solutionboard.hasAnyMajorDiagonalConflicts(i)){
            
//       }    
//     };
//   };

//     while(solutionboard.hasAnyColConflicts() && solutionboard.hasAnyMajorDiagonalConflicts() &&solutionboard.hasAnyMinorDiagonalConflicts()){
//       subroutine();
//     }
// console.log(board)
//   //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return board;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});
  var findSolution = function(row){
    if(row === n){
      solutionCount++
      return;
    }
    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()){
        findSolution(row+1);
      }
      board.togglePiece(row, i);
    }
  }
    findSolution(0)
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



window.findQueenSolution = function(board, startRow, rows, callback) {
  if( startRow === rows ) {
    return callback(board);
  }

  for( var i = 0; i < rows; i++ ) {
    board.togglePiece(startRow, i);
    if( !board.hasAnyQueensConflicts() ) {
      var result = findQueenSolution(board, startRow+1, rows, callback);
      if( result ){ return result; }
    }
    board.togglePiece(startRow, i);
  }
};




