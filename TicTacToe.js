var TicTacToe = (function Game() {
    var board;
    var count = 0;
    
    winningPatterns = [[{x:0,y:0},{x:0,y:1},{x:0,y:2}],[{x:1,y:0},{x:1,y:1},{x:1,y:2}],[{x:2,y:0},{x:2,y:1},{x:2,y:2}],[{x:0,y:0},{x:1,y:0},{x:2,y:0}],[{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:2},{x:1,y:2},{x:2,y:2}],[{x:0,y:0},{x:1,y:1},{x:2,y:2}],[{x:0,y:2},{x:1,y:1},{x:2,y:0}]];
    
    var mapTile = {
        'first' : '00',
        'second' : '01',
        'third' : '02',
        'fourth' : '10',
        'fifth' : '11',
        'sixth' : '12',
        'seventh' : '20',
        'eighth' : '21',
        'ninth' : '22'
    };
    
    var getTile = {
        '00' : 'first',
        '01' : 'second',
        '02' : 'third',
        '10' : 'fourth',
        '11' : 'fifth',
        '12' : 'sixth',
        '20' : 'seventh',
        '21' : 'eighth',
        '22' : 'ninth'
    
    };
  
    function getEmptyList(){
        var list = [];
        for(var i = 0 ; i < 3 ; i++){
            for(var j= 0 ; j < 3 ; j++){
                if(board[i][j] == 0){
                var obj = new Object();
                obj = {
                    x : i,
                    y : j
                };
            list.push(obj);
                }
            }
        }
        
        return list;
    }      
    
    function updateBoardOnPlayerMove(){
        var eleList = document.querySelectorAll('#container>div');
        for(var i = 0 ; i < eleList.length ; i++){
            if(eleList[i].getAttribute('class')=='zero'){
                var tileID = eleList[i].getAttribute('id');
                var tile = mapTile[tileID];
                var tileX = parseInt(tile.charAt(0));
                var tileY = parseInt(tile.charAt(1));
                board[tileX][tileY] = 1;
            }
        }
       // console.log(board);
        var check = checkDraw();
        var checkPlWin = onPlayerWin();
        if(checkPlWin) {
            var winner = document.getElementById('winner');
            winner.innerHTML = "WINNER : PLAYER"
            var endEl = document.getElementById('end');
            endEl.style.height = '100%';
            removeListener();
            return;
        } else if(!check && !checkPlWin) {
                setTimeout(computerMove, 1000);
            }
        
    }
    
    function waysToWin(tile){
        var patternsToCheck = [];
        for(var i = 0 ; i < 8 ; i++){
            for(var j= 0 ; j < 3 ; j++){
                if(winningPatterns[i][j].x == tile.x && winningPatterns[i][j].y == tile.y){
                patternsToCheck.push(winningPatterns[i]);
                }
            }
        }
  //console.log(patternsToCheck)
        count = 0;
        for(var i = 0 ; i < patternsToCheck.length ; i++){
            if(board[patternsToCheck[i][0].x][patternsToCheck[i][0].y] ==
                board[patternsToCheck[i][1].x][patternsToCheck[i][1].y] &&
                    board[patternsToCheck[i][1].x][patternsToCheck[i][1].y] ==
                        board[patternsToCheck[i][2].x][patternsToCheck[i][2].y]){
                            count++; 
            }
        }
  
        return count;
    }
    
    function checkComputerWin(){
        var count2 ;
        var counte;
        var tileToReturn;
        for(var i = 0 ; i < 8 ; i++){
            count2 = 0;
            counte = 0;
            for(var j= 0 ; j < 3 ; j++){
                if(board[winningPatterns[i][j].x][winningPatterns[i][j].y] == 2){
                    count2++;
                }
                
                if(board[winningPatterns[i][j].x][winningPatterns[i][j].y] == 0){
                    counte++;
                    tileToReturn = {
                        'x' : winningPatterns[i][j].x,
                        'y' : winningPatterns[i][j].y
                    };
                }
                
            }
            
            if(count2 == 2 && counte == 1){
                return tileToReturn;    
            }
        
        }
        
        return null;
    }
    
    function checkPlayerWin(){
        var count1;
        var counte ;
        var tileToReturn;
        for(var i = 0 ; i < 8 ; i++){
            
            count1 = 0;
            counte = 0;
            for(var j= 0 ; j < 3 ; j++){
                if(board[winningPatterns[i][j].x][winningPatterns[i][j].y] == 1){
                    count1++;
                }
                
                if(board[winningPatterns[i][j].x][winningPatterns[i][j].y] == 0){
                    counte++;
                    tileToReturn = {
                        'x' : winningPatterns[i][j].x,
                        'y' : winningPatterns[i][j].y
                    };
                }
                
            }
            
            if(count1 == 2 && counte == 1){
                return tileToReturn;    
            } 
        
        }
        
        return null;
    }
    
    function display() {
        for(var i = 0 ; i < 3 ; i++){
            for(var j = 0 ; j < 3 ; j++){
                var tempi = i.toString();
                var tempj = j.toString();
                var tempTile = tempi+tempj;
                var tileID = getTile[tempTile];
                var tile = document.getElementById(tileID);
                if(board[i][j] == 1) tile.setAttribute('class','zero');
                if(board[i][j] == 2) tile.setAttribute('class','cross');
            }
        }
    }
    
    
    function onPlayerWin(){
        var count;
        
        for(var i = 0 ; i < winningPatterns.length ; i++){
            count = 0;
            for(var j = 0 ; j < 3 ; j++){
                if(board[winningPatterns[i][j].x][winningPatterns[i][j].y] == 1){
                    count++;
                }
            }
            
            if(count == 3){
                return true;
            }
        }
    }
    
    function computerMove(){
        var list = getEmptyList();
        var compWin = checkComputerWin();
        var playerWin = checkPlayerWin();
        if(compWin != null){
            board[compWin.x][compWin.y] = 2;
            display();
            var winner = document.getElementById('winner');
            winner.innerHTML = "WINNER : COMPUTER"
            var endEl = document.getElementById('end');
            endEl.style.height = '100%';
            removeListener();
            return;
        } else if(playerWin != null){
            board[playerWin.x][playerWin.y] = 2;
            display();
            
        }else {
        
            for(var i = 0 ; i < list.length ; i++){
                board[list[i].x][list[i].y] = 1;
            }
        
            var max = waysToWin(list[0]);
            var tileObject = list[0];
            for(var i = 1 ; i < list.length ; i++){
                if(waysToWin(list[i]) > max){
                    max = waysToWin(list[i]);
                    tileObject = list[i];
                }
            }
            
            for(var i = 0 ; i < list.length ; i++){
                board[list[i].x][list[i].y] = 0;
            }
            
            board[tileObject.x][tileObject.y] = 2;
            display();
            checkDraw();
 
        }
    }
    
    function checkDraw() {
        count = 0;
        for(var i = 0 ; i < 3 ; i++){
            for(var j = 0 ; j < 3 ; j++){
                    if(board[i][j] != 0) {
                        count++;
                    }
                }
        }
        
        if(count!=9) {
            return false;
        } else {
            var winner = document.getElementById('winner');
            winner.innerHTML = "IT'S A DRAW"
            var endEl = document.getElementById('end');
            endEl.style.height = '100%';
            removeListener()
            return true;
        }
    }
    function addListener(){
        var elementList = document.querySelectorAll('#container>div');
        for(var i = 0 ; i < elementList.length ; i++){
           if(elementList[i].getAttribute('id') != 'end') elementList[i].addEventListener('click',makeMove);
        }
        
        var endButton = document.querySelector('#container>#end>.button');
        endButton.addEventListener('click',init);
    }
    
    function removeListener(){
        var elementList = document.querySelectorAll('#container>div');
        for(var i = 0 ; i < elementList.length ; i++){
            if(elementList[i].getAttribute('id') != 'end')elementList[i].removeEventListener('click',makeMove);
        }
    }
    
    function makeMove(){
       // console.log('reached makemove function');
        if(this.getAttribute('class')!='cross'){
            this.setAttribute('class','zero');
            updateBoardOnPlayerMove();
        }
    }
    
    function init(){
        board = [[0,0,0],[0,0,0],[0,0,0]];
        var el = document.getElementById('end');
        el.style.height = '0';
        var elementList = document.querySelectorAll('#container>div');
        for(var i = 0 ; i < elementList.length ; i++){
           if(elementList[i].getAttribute('id') != 'end' && elementList[i].hasAttribute('class')) elementList[i].removeAttribute('class');
        }
        display();
        addListener();
    }
    
    return {
        init : function(){
            board = [[0,0,0],[0,0,0],[0,0,0]];
            var el = document.getElementById('container');
            el.style.height = '350px';
            addListener();
        }
        
    };


})();