// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var trigger = 0; 
      var result = false;
      var row = this.get(rowIndex);

      _.each(row, function(square){
        if(square > 0){
          trigger++;
        }
      });

      if(trigger > 1){
    
        result = true
      };
      return result; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardLength = this.rows().length;
      var result = false
    
      var index = 0; 

      while(index < boardLength) {
        if(this.hasRowConflictAt(index++)) {
          return true; 
        }
      } 
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
    var board = this.rows();
  
    var trigger = 0; 

      _.each(board, function(eachRow){
        if(eachRow[colIndex] > 0) {
          trigger++
        }
      });
      
      if(trigger > 1) {
        return true; 
      }

    return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
    var boardLength = this.rows().length;
      var result = false
  
      var index = 0; 

      while(index < boardLength) {
        if(this.hasColConflictAt(index++)) {
          return true; 
        }
      } 
  
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var boardLength = board.length; 
      var trigger = 0; 
      var row = 0;
      var col = Math.abs(majorDiagonalColumnIndexAtFirstRow);

        while(this._isInBounds(row, col)){
           if(majorDiagonalColumnIndexAtFirstRow >= 0) {
            if(board[row++][col++] > 0){
              trigger++
            }
           }else{
            if(board[col++][row++] > 0){
              trigger++
            }
          }
        }
      if(trigger > 1){
        return true
      }
      return false; // fixme
    },          

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var boardLength = board.length - 1; 
      var index = -(boardLength-1);
      
      while(index < boardLength){
        if(this.hasMajorDiagonalConflictAt(index++)){
          return true
        }
      }


      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows()
      var boardLength = board.length - 1
      var row = 0; 
      var column = minorDiagonalColumnIndexAtFirstRow;
      var trigger = 0;
      var row1 = minorDiagonalColumnIndexAtFirstRow - boardLength;
      var col1 = boardLength;

      if(minorDiagonalColumnIndexAtFirstRow <= boardLength){
        while(this._isInBounds(row,column)){
          if(board[row++][column--] > 0){
            trigger++
          }
        }
      }else{
        while(this._isInBounds(row1,col1)){
          if(board[row1++][col1--] > 0){
            trigger++
          }
        }
      };
      
      if(trigger > 1) {
      return true; 
      };

      return false; // fixme
      },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
