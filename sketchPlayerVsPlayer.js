let board = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
];

let w;
let h;
let draggingBlack = false;
let draggingWhite = false;
let whiteMoveFirst = true;

function preload() {
    setBlackPieces();
    loadBlackPieceImages();
    setWhitePieces();
    loadWhitePieceImages();
    initializeAttackAndMoveBoards();
    displayPieces();
}

function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent("#canvas-holder");
    w = width / 8;
    h = height / 8;
}

function draw() {
    // color main (brown default)
    background(165, 107, 70);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // lines NOT NECESSARY!
            line(w*j, 0, w*j, height);
            line(0, h*j, width, h*j);
            // secondary color (tan default)
            fill(255, 220, 177);
            rect(w*2*j, h*2*i, w, h);
            rect(w*(j+j+1), h*(i+i+1), w, h);
        }
    }
    displayPieces();
    movePiece();
    cursorChange();
    // loop() to resume (when mousePressed().... mouseReleased() then noLoop())
}

let draggingBlackPieceIndex;
let draggingWhitePieceIndex;

function mousePressed() {
    let draggingPiece = board[floor(mouseY/100)][floor(mouseX/100)];
    if (draggingPiece != '') {
        loop();
        for (let i = 0; i < 16; i++) {
            // if dragging black piece and black turn to move
            if (draggingPiece == blackIdentityArray[i] && !whiteMoveFirst) {
                draggingBlackPieceIndex = i;
                draggingBlack = true;
            }
            // if dragging white piece and white turn to move
            if (draggingPiece == whiteIdentityArray[i] && whiteMoveFirst) {
                draggingWhitePieceIndex = i;
                draggingWhite = true;
            }
        }
    }
}
function mouseReleased() {
    let newMoveX = floor(mouseX/100);
    let newMoveY = floor(mouseY/100);
    // put if it is on top of same color piece dont go through here
    if (draggingBlack) {
        blackPieceArray[draggingBlackPieceIndex].logic(newMoveX, newMoveY);
    }
    if (draggingWhite) {
        whitePieceArray[draggingWhitePieceIndex].logic(newMoveX, newMoveY);
    }
    draggingBlack = false;
    draggingWhite = false;
    noLoop();
}

function movePiece() {
    if (draggingBlack) {
        if (mouseX > 800) {
            if (mouseY > 800) {
                blackPieceArray[draggingBlackPieceIndex].x = 750;
                blackPieceArray[draggingBlackPieceIndex].y = 750;
            }
            else if (mouseY < 0) {
                blackPieceArray[draggingBlackPieceIndex].x = 750;
                blackPieceArray[draggingBlackPieceIndex].y = -50;
            }
            else {
                blackPieceArray[draggingBlackPieceIndex].x = 750;
                blackPieceArray[draggingBlackPieceIndex].y = mouseY - 50;
            }
        }
        else if (mouseX < 0) {
            if (mouseY > 800) {
                blackPieceArray[draggingBlackPieceIndex].x = -50;
                blackPieceArray[draggingBlackPieceIndex].y = 750;
            }
            else if (mouseY < 0) {
                blackPieceArray[draggingBlackPieceIndex].x = -50;
                blackPieceArray[draggingBlackPieceIndex].y = -50;
            }
            else {
                blackPieceArray[draggingBlackPieceIndex].x = -50;
                blackPieceArray[draggingBlackPieceIndex].y = mouseY - 50;
            }
        }
        else if (mouseY > 800) {
            if (mouseX > 800) {
                blackPieceArray[draggingBlackPieceIndex].x = 750;
                blackPieceArray[draggingBlackPieceIndex].y = 750;
            }
            else if (mouseX < 0) {
                blackPieceArray[draggingBlackPieceIndex].x = -50;
                blackPieceArray[draggingBlackPieceIndex].y = 750;
            }
            else {
                blackPieceArray[draggingBlackPieceIndex].x = mouseX - 50;
                blackPieceArray[draggingBlackPieceIndex].y = 750;
            }
        }
        else if (mouseY < 0) {
            if (mouseX > 800) {
                blackPieceArray[draggingBlackPieceIndex].x = 750;
                blackPieceArray[draggingBlackPieceIndex].y = -50;
            }
            else if (mouseX < 0) {
                blackPieceArray[draggingBlackPieceIndex].x = -50;
                blackPieceArray[draggingBlackPieceIndex].y = -50;
            }
            else {
                blackPieceArray[draggingBlackPieceIndex].x = mouseX - 50;
                blackPieceArray[draggingBlackPieceIndex].y = -50;
            }
        }
        else {
            blackPieceArray[draggingBlackPieceIndex].x = mouseX - 50;
            blackPieceArray[draggingBlackPieceIndex].y = mouseY - 50;
        }
    }
    if (draggingWhite) {
        if (mouseX > 800) {
            if (mouseY > 800) {
                whitePieceArray[draggingWhitePieceIndex].x = 750;
                whitePieceArray[draggingWhitePieceIndex].y = 750;
            }
            else if (mouseY < 0) {
                whitePieceArray[draggingWhitePieceIndex].x = 750;
                whitePieceArray[draggingWhitePieceIndex].y = -50;
            }
            else {
                whitePieceArray[draggingWhitePieceIndex].x = 750;
                whitePieceArray[draggingWhitePieceIndex].y = mouseY - 50;
            }
        }
        else if (mouseX < 0) {
            if (mouseY > 800) {
                whitePieceArray[draggingWhitePieceIndex].x = -50;
                whitePieceArray[draggingWhitePieceIndex].y = 750;
            }
            else if (mouseY < 0) {
                whitePieceArray[draggingWhitePieceIndex].x = -50;
                whitePieceArray[draggingWhitePieceIndex].y = -50;
            }
            else {
                whitePieceArray[draggingWhitePieceIndex].x = -50;
                whitePieceArray[draggingWhitePieceIndex].y = mouseY - 50;
            }
        }
        else if (mouseY > 800) {
            if (mouseX > 800) {
                whitePieceArray[draggingWhitePieceIndex].x = 750;
                whitePieceArray[draggingWhitePieceIndex].y = 750;
            }
            else if (mouseX < 0) {
                whitePieceArray[draggingWhitePieceIndex].x = -50;
                whitePieceArray[draggingWhitePieceIndex].y = 750;
            }
            else {
                whitePieceArray[draggingWhitePieceIndex].x = mouseX - 50;
                whitePieceArray[draggingWhitePieceIndex].y = 750;
            }
        }
        else if (mouseY < 0) {
            if (mouseX > 800) {
                whitePieceArray[draggingWhitePieceIndex].x = 750;
                whitePieceArray[draggingWhitePieceIndex].y = -50;
            }
            else if (mouseX < 0) {
                whitePieceArray[draggingWhitePieceIndex].x = -50;
                whitePieceArray[draggingWhitePieceIndex].y = -50;
            }
            else {
                whitePieceArray[draggingWhitePieceIndex].x = mouseX - 50;
                whitePieceArray[draggingWhitePieceIndex].y = -50;
            }
        }
        else {
            whitePieceArray[draggingWhitePieceIndex].x = mouseX - 50;
            whitePieceArray[draggingWhitePieceIndex].y = mouseY - 50;
        }
    }
}

function cursorChange() {
    // let piece = board[floor(mouseY/100)][floor(mouseX/100)];
    // if (piece != '' && mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 800) {
    //     if (!draggingBlack || !draggingWhite) {
    //         cursor('grab');
    //     }
    //     if (draggingBlack || draggingWhite) {
    //         cursor('grabbing');
    //     }
    // }
    // else {
    //     cursor();
    // }
}


function displayPieces() {
    for (let i = 0; i < 16; i++) {
        blackPieceArray[i].display();
        whitePieceArray[i].display();
    }
}

function initializeAttackAndMoveBoards() {
    for (let i = 0; i < 16; i++) {
        blackPieceArray[i].setAttackBoard();
        whitePieceArray[i].setAttackBoard();
    }
}


let whiteIdentityArray = ['wK','wQ1','wB1','wB2','wR1','wR2','wKn1','wKn2','wP1','wP2','wP3','wP4','wP5','wP6','wP7','wP8'];
let blackIdentityArray = ['bK','bQ1','bB1','bB2','bR1','bR2','bKn1','bKn2','bP1','bP2','bP3','bP4','bP5','bP6','bP7','bP8'];

let blackPieceArray = [];
let whitePieceArray = [];

function setBlackPieces() {
    blackPieceArray.push(new BlackKing());
    blackPieceArray.push(new BlackQueen(1));
    blackPieceArray.push(new BlackBishop(1));
    blackPieceArray.push(new BlackBishop(2));
    blackPieceArray.push(new BlackRook(1));
    blackPieceArray.push(new BlackRook(2));
    blackPieceArray.push(new BlackKnight(1));
    blackPieceArray.push(new BlackKnight(2));
    blackPieceArray.push(new BlackPawn(1));
    blackPieceArray.push(new BlackPawn(2));
    blackPieceArray.push(new BlackPawn(3));
    blackPieceArray.push(new BlackPawn(4));
    blackPieceArray.push(new BlackPawn(5));
    blackPieceArray.push(new BlackPawn(6));
    blackPieceArray.push(new BlackPawn(7));
    blackPieceArray.push(new BlackPawn(8));
}
function setWhitePieces() {
    whitePieceArray.push(new WhiteKing());
    whitePieceArray.push(new WhiteQueen(1));
    whitePieceArray.push(new WhiteBishop(1));
    whitePieceArray.push(new WhiteBishop(2));
    whitePieceArray.push(new WhiteRook(1));
    whitePieceArray.push(new WhiteRook(2));
    whitePieceArray.push(new WhiteKnight(1));
    whitePieceArray.push(new WhiteKnight(2));
    whitePieceArray.push(new WhitePawn(1));
    whitePieceArray.push(new WhitePawn(2));
    whitePieceArray.push(new WhitePawn(3));
    whitePieceArray.push(new WhitePawn(4));
    whitePieceArray.push(new WhitePawn(5));
    whitePieceArray.push(new WhitePawn(6));
    whitePieceArray.push(new WhitePawn(7));
    whitePieceArray.push(new WhitePawn(8));
}

let blackKingIMG, blackQueenIMG, blackBishopIMG, blackRookIMG, blackKnightIMG, blackPawnIMG;
let whiteKingIMG, whiteQueenIMG, whiteBishopIMG, whiteRookIMG, whiteKnightIMG, whitePawnIMG;

function loadBlackPieceImages() {
    blackKingIMG = loadImage('pieceImages/blackKing.png');
    blackQueenIMG = loadImage('pieceImages/blackQueen.png');
    blackBishopIMG = loadImage('pieceImages/blackBishop.png');
    blackRookIMG = loadImage('pieceImages/blackRook.png');
    blackKnightIMG = loadImage('pieceImages/blackKnight.png');
    blackPawnIMG = loadImage('pieceImages/blackPawn.png');
}
function loadWhitePieceImages() {
    whiteKingIMG = loadImage('pieceImages/whiteKing.png');
    whiteQueenIMG = loadImage('pieceImages/whiteQueen.png');
    whiteBishopIMG = loadImage('pieceImages/whiteBishop.png');
    whiteRookIMG = loadImage('pieceImages/whiteRook.png');
    whiteKnightIMG = loadImage('pieceImages/whiteKnight.png');
    whitePawnIMG = loadImage('pieceImages/whitePawn.png');
}


isWhiteKingChecked = false;
isBlackKingChecked = false;
whiteQueenCount = 1;
blackQueenCount = 1;

class Piece {
    constructor() {
        this.isAlive = true;
    }
    setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        // !!!!! put everything in white first move and black first move to cut down on time?
        // promoting pawns
        if (board[oldMoveY][oldMoveX][1] == 'P') {
            // promoting white pawn to queen
            if (newMoveY == 0) {
                for (let i = 8; i < 16; i++) {
                    if (board[oldMoveY][oldMoveX] == whiteIdentityArray[i]) {
                        this.promoteWhitePawn(oldMoveX, oldMoveY, newMoveX, newMoveY, i);
                        return;
                    }
                }
            }
            // promoting black pawn to queen
            if (newMoveY == 7) {
                for (let i = 8; i < 16; i++) {
                    if (board[oldMoveY][oldMoveX] == blackIdentityArray[i]) {
                        this.promoteBlackPawn(oldMoveX, oldMoveY, newMoveX, newMoveY, i);
                        return;
                    }
                }
            }
        }
        // first if white king in check, then only make move that removes the check
        if (isWhiteKingChecked) {
            let temp = board[oldMoveY][oldMoveX];
            board[oldMoveY][oldMoveX] = '';
            board[newMoveY][newMoveX] = temp;
            this.x = newMoveX*100;
            this.y = newMoveY*100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.changeAttackBoards();
            // if king is still in check after making the move, reset piece and return to try again
            if (this.isWhiteKingInCheck()) {
                board[newMoveY][newMoveX] = '';
                board[oldMoveY][oldMoveX] = temp;
                this.x = oldMoveX*100;
                this.y = oldMoveY*100;
                this.prevX = this.x;
                this.prevY = this.y;
                this.changeAttackBoards();
                return;
            }
        }
        else if (isBlackKingChecked) {
            let temp = board[oldMoveY][oldMoveX];
            board[oldMoveY][oldMoveX] = '';
            board[newMoveY][newMoveX] = temp;
            this.x = newMoveX*100;
            this.y = newMoveY*100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.changeAttackBoards();
            // if king is still in check after making the move, reset piece and return to try again
            if (this.isBlackKingInCheck()) {
                board[newMoveY][newMoveX] = '';
                board[oldMoveY][oldMoveX] = temp;
                this.x = oldMoveX*100;
                this.y = oldMoveY*100;
                this.prevX = this.x;
                this.prevY = this.y;
                this.changeAttackBoards();
                return;
            }
        }
        else {
            // first fully make the move
            let temp = board[oldMoveY][oldMoveX];
            board[oldMoveY][oldMoveX] = '';
            board[newMoveY][newMoveX] = temp;
            this.x = newMoveX*100;
            this.y = newMoveY*100;
            this.prevX = this.x;
            this.prevY = this.y;
            // then change all attack boards (including pawns' move boards)
            this.changeAttackBoards();
            // making sure that the piece we move doesn't cause the enemy to check our king
            if (whiteMoveFirst && this.isWhiteKingInCheck()) {
                board[newMoveY][newMoveX] = '';
                board[oldMoveY][oldMoveX] = temp;
                this.x = oldMoveX*100;
                this.y = oldMoveY*100;
                this.prevX = this.x;
                this.prevY = this.y;
                this.changeAttackBoards();
                return;
            }
            else if (!whiteMoveFirst && this.isBlackKingInCheck()) {
                board[newMoveY][newMoveX] = '';
                board[oldMoveY][oldMoveX] = temp;
                this.x = oldMoveX*100;
                this.y = oldMoveY*100;
                this.prevX = this.x;
                this.prevY = this.y;
                this.changeAttackBoards();
                return;
            }

        }
        // alternate between you and opponent after confirming a move
        if (whiteMoveFirst) {
            // reset white en passants to false and black piece double jumped to false (paired pieces)
            for (let i = 8; i < 16; i++) {
                if (whitePieceArray[i].isAlive) {
                    whitePieceArray[i].canEnPassant = false;
                    blackPieceArray[i].justDoubleJumped = false;
                }
            }
            // first check if king in check, then if king has escape square to move to, then if friendly piece can block
            if (this.isBlackKingInCheck() && !this.canBlackKingEscape() && !this.canBlackPieceBlock()) {
                createP('Checkmate! White wins')
            }
            whiteMoveFirst = false;
        }
        else {
            // reset black en passants to false and white piece double jumped to false (paired pieces)
            for (let i = 8; i < 16; i++) {
                if (blackPieceArray[i].isAlive) {
                    blackPieceArray[i].canEnPassant = false;
                    whitePieceArray[i].justDoubleJumped = false;
                }
            }
            if (this.isWhiteKingInCheck() && !this.canWhiteKingEscape() && !this.canWhitePieceBlock()) {
                createP('Checkmate! Black wins')
            }
            whiteMoveFirst = true;
        }
    }
    isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        for (let i = 0; i < 16; i++) {
            // make sure that it is opponent piece
            if (blackPieceArray[i].isAlive) {
                if (board[newMoveY][newMoveX] == blackIdentityArray[i]) {
                    board[newMoveY][newMoveX] = '';
                    blackPieceArray[i].isAlive = false;
                    blackPieceArray[i].attackBoard = this.resetTypeBoards(blackPieceArray[i].attackBoard);
                    if (i >= 8) {
                        blackPieceArray[i].moveBoard = this.resetTypeBoards(blackPieceArray[i].moveBoard);
                    }
                    return true;
                }
            }
        }
        return false;
    }
    isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        for (let i = 0; i < 16; i++) {
            // make sure that it is opponent piece
            if (whitePieceArray[i].isAlive) {
                if (board[newMoveY][newMoveX] == whiteIdentityArray[i]) {
                    board[newMoveY][newMoveX] = '';
                    whitePieceArray[i].isAlive = false;
                    whitePieceArray[i].attackBoard = this.resetTypeBoards(whitePieceArray[i].attackBoard);
                    if (i >= 8) {
                        whitePieceArray[i].moveBoard = this.resetTypeBoards(whitePieceArray[i].moveBoard);
                    }
                    return true;
                }
            }
        }
        return false;
    }
    resetTypeBoards(b) {
        b = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
        ];
        return b;
    }
    changeAttackBoards() {
        // pretty lazy way to reset. try to make it more efficient
        for (let i = 0; i < 16; i++) {
            if (whitePieceArray[i].isAlive) {
                whitePieceArray[i].setAttackBoard();
            }
            if (blackPieceArray[i].isAlive) {
                blackPieceArray[i].setAttackBoard();
            }
        }
    }
    isBlackKingInCheck() {
        let kingX = blackPieceArray[0].x / 100;
        let kingY = blackPieceArray[0].y / 100;
        for (let i = 0; i < 16; i++) {
            if (whitePieceArray[i].attackBoard[kingY][kingX] != '') {
                createP(whiteIdentityArray[i]);
                createP('black king is in check');
                isBlackKingChecked = true;
                return true;
            }
        }
        isBlackKingChecked = false;
        return false;
    }
    canBlackKingEscape() {
        let x = blackPieceArray[0].x / 100;
        let y = blackPieceArray[0].y / 100;
        // IMPORTANT. delete king from board, change all pieces' attack boards, then analyze king's escape squares
        // want to do this because if rook is attacking from left-side of king, king cannot escape by jumping to the right
        let king = board[y][x];
        board[y][x] = '';
        blackPieceArray[0].isAlive = false;
        this.changeAttackBoards();
        let safeArray = [true, true, true, true, true, true, true, true];
        for (let i = 0; i < 16; i++) {
            // up
            if (y - 1 < 0 || board[y - 1][x][0] == 'b' || whitePieceArray[i].attackBoard[y - 1][x] != '') {
                safeArray[0] = false;
            }
            // diagonal top-right
            if (y - 1 < 0 || x + 1 >= 8 || board[y - 1][x + 1][0] == 'b' || whitePieceArray[i].attackBoard[y - 1][x + 1] != '') {
                safeArray[1] = false;
            }
            // right
            if (x + 1 >= 8 || board[y][x + 1][0] == 'b' || whitePieceArray[i].attackBoard[y][x + 1] != '') {
                safeArray[2] = false;
            }
            // diagonal bottom-right
            if (y + 1 >= 8 || x + 1 >= 8 || board[y + 1][x + 1][0] == 'b' || whitePieceArray[i].attackBoard[y + 1][x + 1] != '') {
                safeArray[3] = false;
            }
            // bottom
            if (y + 1 >= 8 || board[y + 1][x][0] == 'b' || whitePieceArray[i].attackBoard[y + 1][x] != '') {
                safeArray[4] = false;
            }
            // diagonal bottom-left
            if (y + 1 >= 8 || x - 1 < 0 || board[y + 1][x - 1][0] == 'b' || whitePieceArray[i].attackBoard[y + 1][x - 1] != '') {
                safeArray[5] = false;
            }
            // left
            if (x - 1 < 0 || board[y][x - 1][0] == 'b' || whitePieceArray[i].attackBoard[y][x - 1] != '') {
                safeArray[6] = false;
            }
            // diagonal top-left
            if (y - 1 < 0 || x - 1 < 0 || board[y - 1][x - 1][0] == 'b' || whitePieceArray[i].attackBoard[y - 1][x - 1] != '') {
                safeArray[7] = false;
            }
        }
        // return king to position alive, and change all attack boards to original attacks
        blackPieceArray[0].isAlive = true;
        board[y][x] = king;
        this.changeAttackBoards();
        for (let i = 0; i < 8; i++) {
            if (safeArray[i]) {
                createP('there is an escape square for black king');
                return true;
            }
        }
        createP('there is no escape square for black king');
        return false;
    }
    canBlackPieceBlock() {
        let kingX = blackPieceArray[0].x / 100;
        let kingY = blackPieceArray[0].y / 100;
        let attackerX;
        let attackerY;
        for (let i = 0; i < 16; i++) {
            if (whitePieceArray[i].attackBoard[kingY][kingX] != '') {
                attackerX = whitePieceArray[i].x / 100;
                attackerY = whitePieceArray[i].y / 100;
            }
        }
        // king is above attacker
        if (kingX == attackerX && kingY < attackerY) {
            // starting with king, following path back to attacker (not including king)
            let x = kingX;
            let y = kingY + 1;
            while (y <= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                y++;
            }
        }
        // king top-right of attacker
        else if (kingX > attackerX && kingY < attackerY) {
            let x = kingX - 1;
            let y = kingY + 1;
            while (x >= attackerX && y <= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                x--;
                y++;
            }
        }
        // king right of attacker
        else if (kingX > attackerX && kingY == attackerY) {
            let x = kingX - 1;
            let y = kingY;
            while (x >= attackerX) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                x--;
            }
        }
        // king bottom-right of attacker
        else if (kingX > attackerX && kingY > attackerY) {
            let x = kingX - 1;
            let y = kingY - 1;
            while (x >= attackerX && y >= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                x--
                y--;
            }
        }
        // king below attacker
        else if (kingX == attackerX && kingY > attackerY) {
            let x = kingX;
            let y = kingY - 1;
            while (y >= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                y--;
            }
        }
        // king bottom-left of attacker
        else if (kingX < attackerX && kingY > attackerY) {
            let x = kingX + 1;
            let y = kingY - 1;
            while (x <= attackerX && y >= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                x++;
                y--;
            }
        }
        // king left of attacker
        else if (kingX < attackerX && kingY == attackerY) {
            let x = kingX + 1;
            let y = kingY;
            while (x <= attackerX) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                x++;
            }
        }
        // king top-left of attacker
        else if (kingX < attackerX && kingY < attackerY) {
            let x = kingX + 1;
            let y = kingY + 1;
            while (x <= attackerX && y <= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (blackPieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && blackPieceArray[i].attackBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                        else if (blackPieceArray[i].moveBoard[y][x] != '') {
                            createP('black piece can block attacker path');
                            return true;
                        }
                    }
                }
                x++;
                y++;
            }
        }
        return false;
    }
    isWhiteKingInCheck() {
        let kingX = whitePieceArray[0].x / 100;
        let kingY = whitePieceArray[0].y / 100;
        for (let i = 0; i < 16; i++) {
            if (blackPieceArray[i].attackBoard[kingY][kingX] != '') {
                createP(blackIdentityArray[i]);
                createP('white king is in check');
                isWhiteKingChecked = true;
                return true;
            }
        }
        isWhiteKingChecked = false;
        return false;
    }
    canWhiteKingEscape() {
        let x = whitePieceArray[0].x / 100;
        let y = whitePieceArray[0].y / 100;
        // IMPORTANT. delete king from board, change all pieces' attack boards, then analyze king's escape squares
        // want to do this because if rook is attacking from left-side of king, king cannot escape by jumping to the right
        let king = board[y][x];
        board[y][x] = '';
        whitePieceArray[0].isAlive = false;
        this.changeAttackBoards();
        let safeArray = [true, true, true, true, true, true, true, true];
        for (let i = 0; i < 16; i++) {
            // up
            if (y - 1 < 0 || board[y - 1][x][0] == 'w' || blackPieceArray[i].attackBoard[y - 1][x] != '') {
                safeArray[0] = false;
            }
            // diagonal top-right
            if (y - 1 < 0 || x + 1 >= 8 || board[y - 1][x + 1][0] == 'w' || blackPieceArray[i].attackBoard[y - 1][x + 1] != '') {
                safeArray[1] = false;
            }
            // right
            if (x + 1 >= 8 || board[y][x + 1][0] == 'w' || blackPieceArray[i].attackBoard[y][x + 1] != '') {
                safeArray[2] = false;
            }
            // diagonal bottom-right
            if (y + 1 >= 8 || x + 1 >= 8 || board[y + 1][x + 1][0] == 'w' || blackPieceArray[i].attackBoard[y + 1][x + 1] != '') {
                safeArray[3] = false;
            }
            // bottom
            if (y + 1 >= 8 || board[y + 1][x][0] == 'w' || blackPieceArray[i].attackBoard[y + 1][x] != '') {
                safeArray[4] = false;
            }
            // diagonal bottom-left
            if (y + 1 >= 8 || x - 1 < 0 || board[y + 1][x - 1][0] == 'w' || blackPieceArray[i].attackBoard[y + 1][x - 1] != '') {
                safeArray[5] = false;
            }
            // left
            if (x - 1 < 0 || board[y][x - 1][0] == 'w' || blackPieceArray[i].attackBoard[y][x - 1] != '') {
                safeArray[6] = false;
            }
            // diagonal top-left
            if (y - 1 < 0 || x - 1 < 0 || board[y - 1][x - 1][0] == 'w' || blackPieceArray[i].attackBoard[y - 1][x - 1] != '') {
                safeArray[7] = false;
            }
        }
        // return king to position alive, and change all attack boards to original attacks
        whitePieceArray[0].isAlive = true;
        board[y][x] = king;
        this.changeAttackBoards();
        for (let i = 0; i < 8; i++) {
            if (safeArray[i]) {
                createP('there is an escape square for white king');
                return true;
            }
        }
        createP('there is no escape square for white king');
        return false;
    }
    canWhitePieceBlock() {
        let kingX = whitePieceArray[0].x / 100;
        let kingY = whitePieceArray[0].y / 100;
        let attackerX;
        let attackerY;
        for (let i = 0; i < 16; i++) {
            if (blackPieceArray[i].attackBoard[kingY][kingX] != '') {
                attackerX = blackPieceArray[i].x / 100;
                attackerY = blackPieceArray[i].y / 100;
            }
        }
        // king is above attacker
        if (kingX == attackerX && kingY < attackerY) {
            // starting with king, following path back to attacker (not including king)
            let x = kingX;
            let y = kingY + 1;
            while (y <= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                y++;
            }
        }
        // king top-right of attacker
        else if (kingX > attackerX && kingY < attackerY) {
            let x = kingX - 1;
            let y = kingY + 1;
            while (x >= attackerX && y <= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                x--;
                y++;
            }
        }
        // king right of attacker
        else if (kingX > attackerX && kingY == attackerY) {
            let x = kingX - 1;
            let y = kingY;
            while (x >= attackerX) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                x--;
            }
        }
        // king bottom-right of attacker
        else if (kingX > attackerX && kingY > attackerY) {
            let x = kingX - 1;
            let y = kingY - 1;
            while (x >= attackerX && y >= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                x--
                y--;
            }
        }
        // king below attacker
        else if (kingX == attackerX && kingY > attackerY) {
            let x = kingX;
            let y = kingY - 1;
            while (y >= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                y--;
            }
        }
        // king bottom-left of attacker
        else if (kingX < attackerX && kingY > attackerY) {
            let x = kingX + 1;
            let y = kingY - 1;
            while (x <= attackerX && y >= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                x++;
                y--;
            }
        }
        // king left of attacker
        else if (kingX < attackerX && kingY == attackerY) {
            let x = kingX + 1;
            let y = kingY;
            while (x <= attackerX) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                x++;
            }
        }
        // king top-left of attacker
        else if (kingX < attackerX && kingY < attackerY) {
            let x = kingX + 1;
            let y = kingY + 1;
            while (x <= attackerX && y <= attackerY) {
                for (let i = 1; i < 8; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                for (let i = 8; i < 16; i++) {
                    if (whitePieceArray[i].isAlive) {
                        if (x == attackerX && y == attackerY && whitePieceArray[i].attackBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                        else if (whitePieceArray[i].moveBoard[y][x] != '') {
                            createP('white piece can block attacker path');
                            return true;
                        }
                    }
                }
                x++;
                y++;
            }
        }
        return false;
    }
    promoteWhitePawn(oldMoveX, oldMoveY, newMoveX, newMoveY, i) {
        queenCount++;
        board[oldMoveY][oldMoveX] = '';
        whitePieceArray[i] = new WhiteQueen(queenCount);
        let identity = concat('wQ', queenCount);
        board[oldMoveY][oldMoveX] = identity;
        whiteIdentityArray[i] = identity;
        let temp = board[oldMoveY][oldMoveX];
        board[oldMoveY][oldMoveX] = '';
        board[newMoveY][newMoveX] = temp;
        whitePieceArray[i].x = newMoveX*100;
        whitePieceArray[i].y = newMoveY*100;
        whitePieceArray[i].prevX = whitePieceArray[i].x;
        whitePieceArray[i].prevY = whitePieceArray[i].y;
        // then change all attack boards (including pawns' move boards)
        this.changeAttackBoards();
        for (let i = 8; i < 16; i++) {
            if (whitePieceArray[i].isAlive) {
                whitePieceArray[i].canEnPassant = false;
                blackPieceArray[i].justDoubleJumped = false;
            }
        }
        // first check if king in check, then if king has escape square to move to, then if friendly piece can block
        if (this.isBlackKingInCheck() && !this.canBlackKingEscape() && !this.canBlackPieceBlock()) {
            createP('Checkmate! White wins')
        }
        whiteMoveFirst = false;
    }
    promoteBlackPawn(oldMoveX, oldMoveY, newMoveX, newMoveY, i) {
        blackQueenCount++;
        board[oldMoveY][oldMoveX] = '';
        blackPieceArray[i] = new BlackQueen(blackQueenCount);
        let identity = concat('bQ', blackQueenCount);
        board[oldMoveY][oldMoveX] = identity;
        blackIdentityArray[i] = identity;
        let temp = board[oldMoveY][oldMoveX];
        board[oldMoveY][oldMoveX] = '';
        board[newMoveY][newMoveX] = temp;
        blackPieceArray[i].x = newMoveX*100;
        blackPieceArray[i].y = newMoveY*100;
        blackPieceArray[i].prevX = blackPieceArray[i].x;
        blackPieceArray[i].prevY = blackPieceArray[i].y;
        // then change all attack boards (including pawns' move boards)
        this.changeAttackBoards();
        for (let i = 8; i < 16; i++) {
            if (blackPieceArray[i].isAlive) {
                blackPieceArray[i].canEnPassant = false;
                whitePieceArray[i].justDoubleJumped = false;
            }
        }
        if (this.isWhiteKingInCheck() && !this.canWhiteKingEscape() && !this.canWhitePieceBlock()) {
            createP('Checkmate! Black wins')
        }
        whiteMoveFirst = true;
    }

}




class WhiteKing extends Piece {
    constructor() {
        super();
        board[7][4] = 'wK';
        this.x = 400;
        this.y = 700;
        this.prevX = this.x;
        this.prevY = this.y;
        this.canCastle = true;
        this.attackBoard = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
        ];
    }
    display() {
        if (this.isAlive) {
            image(whiteKingIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        let x = this.x / 100;
        let y = this.y / 100;
        // up
        if (y - 1 >= 0) {
            this.attackBoard[y - 1][x] = 'wKingAttack';
        }
        // diagonal top-right
        if (y - 1 >= 0 && x + 1 < 8) {
            this.attackBoard[y - 1][x + 1] = 'wKingAttack';
        }
        // right
        if (x + 1 < 8) {
            this.attackBoard[y][x + 1] = 'wKingAttack';
        }
        // diagonal bottom-right
        if (x + 1 < 8 && y + 1 < 8) {
            this.attackBoard[y + 1][x + 1] = 'wKingAttack';
        }
        // down
        if (y + 1 < 8) {
            this.attackBoard[y + 1][x] = 'wKingAttack';
        }
        // diagonal bottom-left
        if (x - 1 >= 0 && y + 1 < 8) {
            this.attackBoard[y + 1][x - 1] = 'wKingAttack';
        }
        // left
        if (x - 1 >= 0) {
            this.attackBoard[y][x - 1] = 'wKingAttack';
        }
        // diagonal top-left
        if (x - 1 >= 0 && y + 1 < 8) {
            this.attackBoard[y + 1][x - 1] = 'wKingAttack';
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        let safeArray = this.isSpotSafe(oldMoveX, oldMoveY);
        // right
        if (safeArray[2] && oldMoveX + 1 == newMoveX && oldMoveY == newMoveY) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // down
        else if (safeArray[4] && oldMoveY + 1 == newMoveY && oldMoveX == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // left
        else if (safeArray[6] && oldMoveX - 1 == newMoveX && oldMoveY == newMoveY) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // up
        else if (safeArray[0] && oldMoveY - 1 == newMoveY && oldMoveX == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-right
        else if (safeArray[1] && oldMoveY - 1 == newMoveY && oldMoveX + 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-right
        else if (safeArray[3] && oldMoveY + 1 == newMoveY && oldMoveX + 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-left
        else if (safeArray[5] && oldMoveY + 1 == newMoveY && oldMoveX - 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-left
        else if (safeArray[7] && oldMoveY - 1 == newMoveY && oldMoveX - 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        if (this.isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
            this.castlesRight(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
        if (this.isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
            this.castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
    isSpotSafe(x, y) {
        let safeArray = [true, true, true, true, true, true, true, true];
        for (let i = 0; i < 16; i++) {
            // up
            if (y - 1 < 0 || board[y - 1][x][0] == 'w' || blackPieceArray[i].attackBoard[y - 1][x] != '') {
                safeArray[0] = false;
            }
            // diagonal top-right
            if (y - 1 < 0 || x + 1 >= 8 || board[y - 1][x + 1][0] == 'w' || blackPieceArray[i].attackBoard[y - 1][x + 1] != '') {
                safeArray[1] = false;
            }
            // right
            if (x + 1 >= 8 || board[y][x + 1][0] == 'w' || blackPieceArray[i].attackBoard[y][x + 1] != '') {
                safeArray[2] = false;
            }
            // diagonal bottom-right
            if (y + 1 >= 8 || x + 1 >= 8 || board[y + 1][x + 1][0] == 'w' || blackPieceArray[i].attackBoard[y + 1][x + 1] != '') {
                safeArray[3] = false;
            }
            // bottom
            if (y + 1 >= 8 || board[y + 1][x][0] == 'w' || blackPieceArray[i].attackBoard[y + 1][x] != '') {
                safeArray[4] = false;
            }
            // diagonal bottom-left
            if (y + 1 >= 8 || x - 1 < 0 || board[y + 1][x - 1][0] == 'w' || blackPieceArray[i].attackBoard[y + 1][x - 1] != '') {
                safeArray[5] = false;
            }
            // left
            if (x - 1 < 0 || board[y][x - 1][0] == 'w' || blackPieceArray[i].attackBoard[y][x - 1] != '') {
                safeArray[6] = false;
            }
            // diagonal top-left
            if (y - 1 < 0 || x - 1 < 0 || board[y - 1][x - 1][0] == 'w' || blackPieceArray[i].attackBoard[y - 1][x - 1] != '') {
                safeArray[7] = false;
            }
        }
        return safeArray;
    }
    isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY == newMoveY && (oldMoveX + 2 == newMoveX || oldMoveX + 3 == newMoveX)) {
            if (board[7][4] == 'wK' && board[7][5] == '' && board[7][6] == '' && board[7][7] == 'wR2') {
                for (let i = 0; i < 16; i++) {
                    if (blackPieceArray[i].attackBoard[7][4] != '' || blackPieceArray[i].attackBoard[7][5] != '' || blackPieceArray[i].attackBoard[7][6] != '' || blackPieceArray[i].attackBoard[7][7] != '') {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY == newMoveY && (oldMoveX - 2 == newMoveX || oldMoveX - 3 == newMoveX || oldMoveX - 4 == newMoveX)) {
            if (board[7][4] == 'wK' && board[7][3] == '' && board[7][2] == '' && board[7][1] == '' && board[7][0] == 'wR1') {
                for (let i = 0; i < 16; i++) {
                    if (blackPieceArray[i].attackBoard[7][4] != '' || blackPieceArray[i].attackBoard[7][3] != '' || blackPieceArray[i].attackBoard[7][2] != '' || blackPieceArray[i].attackBoard[7][1] != '' || blackPieceArray[i].attackBoard[7][0] != '') {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    castlesRight(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        newMoveX = 6;
        let temp = board[oldMoveY][oldMoveX];
        board[oldMoveY][oldMoveX] = '';
        board[newMoveY][newMoveX] = temp;
        this.x = newMoveX*100;
        this.y = newMoveY*100;
        this.prevX = this.x;
        this.prevY = this.y;
        board[7][7] = '';
        board[7][5] = 'wR2';
        whitePieceArray[5].x = 500;
        whitePieceArray[5].y = 700;
        whitePieceArray[5].prevX = 500;
        whitePieceArray[5].prevY = 700;
        if (whiteMoveFirst) {
            whiteMoveFirst = false;
        }
        else {
            whiteMoveFirst = true;
        }
    }
    castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        newMoveX = 2;
        let temp = board[oldMoveY][oldMoveX];
        board[oldMoveY][oldMoveX] = '';
        board[newMoveY][newMoveX] = temp;
        this.x = newMoveX*100;
        this.y = newMoveY*100;
        this.prevX = this.x;
        this.prevY = this.y;
        board[7][0] = '';
        board[7][3] = 'wR1';
        whitePieceArray[4].x = 300;
        whitePieceArray[4].y = 700;
        whitePieceArray[4].prevX = 300;
        whitePieceArray[4].prevY = 700;
        if (whiteMoveFirst) {
            whiteMoveFirst = false;
        }
        else {
            whiteMoveFirst = true;
        }
    }
}
class WhiteQueen extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[7][3] = 'wQ1';
            this.x = 300;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 3) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 4) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 5) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 6) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 7) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 8) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 9) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(whiteQueenIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        // up
        let x = this.x / 100;
        let y = this.y / 100;
        y = y - 1;
        while (y >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            y--;
        }
        // diagonal top-right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1;
        y = y - 1;
        while (x < 8 && y >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            x++;
            y--;
        }
        // right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1
        while (x < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            x++;
        }
        // diagonal bottom-right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1;
        y = y + 1;
        while (x < 8 && y < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            x++;
            y++;
        }
        // down
        x = this.x / 100;
        y = this.y / 100;
        y = y + 1
        while (y < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            y++;
        }
        // diagonal bottom-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y + 1;
        while (x >= 0 && y < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            x--;
            y++;
        }
        // left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        while (x >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            x--;
        }
        // diagonal top-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y - 1;
        while (x >= 0 && y >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'wQueenAttack';
            x--;
            y--;
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // down
        if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY + 1;
            // count each space up until new position. If contact with piece in-between, reset
            // do not count original position of piece or landing square
            while (count <= newMoveY-1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            // if landing square is blank
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            // if landing square is taken, capture if opponent piece
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // right
        else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX + 1;
            while (count <= newMoveX-1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // up
        else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY - 1;
            while (count >= newMoveY+1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // left
        else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX - 1;
            while (count >= newMoveX+1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-right
        else if (newMoveX > oldMoveX && newMoveY < oldMoveY && (newMoveX - oldMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY - 1;
            while (countX <= newMoveX-1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-right
        else if (newMoveX > oldMoveX && newMoveY > oldMoveY && (newMoveX - oldMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY + 1;
            while (countX <= newMoveX-1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-left
        else if (newMoveX < oldMoveX && newMoveY > oldMoveY && (oldMoveX - newMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY + 1;
            while (countX >= newMoveX+1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-left
        else if (newMoveX < oldMoveX && newMoveY < oldMoveY && (oldMoveX - newMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY - 1;
            while (countX >= newMoveX+1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class WhiteBishop extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[7][2] = 'wB1';
            this.x = 200;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[7][5] = 'wB2';
            this.x = 500;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(whiteBishopIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        // diagonal top-right
        let x = this.x / 100;
        let y = this.y / 100;
        x = x + 1;
        y = y - 1;
        while (x < 8 && y >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'wBishopAttack';
            x++;
            y--;
        }
        // diagonal bottom-right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1;
        y = y + 1;
        while (x < 8 && y < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'wBishopAttack';
            x++;
            y++;
        }
        // diagonal bottom-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y + 1;
        while (x >= 0 && y < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'wBishopAttack';
            x--;
            y++;
        }
        // diagonal top-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y - 1;
        while (x >= 0 && y >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'wBishopAttack';
            x--;
            y--;
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // diagonal top-right
        if (newMoveX > oldMoveX && newMoveY < oldMoveY && (newMoveX - oldMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY - 1;
            while (countX <= newMoveX-1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-right
        else if (newMoveX > oldMoveX && newMoveY > oldMoveY && (newMoveX - oldMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY + 1;
            while (countX <= newMoveX-1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-left
        else if (newMoveX < oldMoveX && newMoveY > oldMoveY && (oldMoveX - newMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY + 1;
            while (countX >= newMoveX+1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-left
        else if (newMoveX < oldMoveX && newMoveY < oldMoveY && (oldMoveX - newMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY - 1;
            while (countX >= newMoveX+1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class WhiteKnight extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[7][1] = 'wKn1';
            this.x = 100;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[7][6] = 'wKn2';
            this.x = 600;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(whiteKnightIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        let x = this.x / 100;
        let y = this.y / 100;
        // top-right vertical
        if (y - 2 >= 0 && x + 1 < 8) {
            this.attackBoard[y - 2][x + 1] = 'wKnightAttack';
        }
        // top-right horizontal
        if (y - 1 >= 0 && x + 2 < 8) {
            this.attackBoard[y - 1][x + 2] = 'wKnightAttack';
        }
        // bottom-right horizontal
        if (y + 1 < 8 && x + 2 < 8) {
            this.attackBoard[y + 1][x + 2] = 'wKnightAttack';
        }
        // bottom-right vertical
        if (y + 2 < 8 && x + 1 < 8) {
            this.attackBoard[y + 2][x + 1] = 'wKnightAttack';
        }
        // bottom-left vertical
        if (y + 2 < 8 && x - 1 >= 0) {
            this.attackBoard[y + 2][x - 1] = 'wKnightAttack';
        }
        // bottom-left horizontal
        if (y + 1 < 8 && x - 2 >= 0) {
            this.attackBoard[y + 1][x - 2] = 'wKnightAttack';
        }
        // top-left horizontal
        if (y - 1 >= 0 && x - 2 >= 0) {
            this.attackBoard[y - 1][x - 2] = 'wKnightAttack';
        }
        // top-left vertical
        if (y - 2 >= 0 && x - 1 >= 0) {
            this.attackBoard[y - 2][x - 1] = 'wKnightAttack';
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        if (board[newMoveY][newMoveX] == '' || board[newMoveY][newMoveX][0] == 'b') {
            // bottom-right horizontal
            if (oldMoveX + 2 == newMoveX && oldMoveY + 1 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // bottom-right vertical
            else if (oldMoveX + 1 == newMoveX && oldMoveY + 2 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // bottom-left vertical
            else if (oldMoveX - 1 == newMoveX && oldMoveY + 2 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // bottom-left horizontal
            else if (oldMoveX - 2 == newMoveX && oldMoveY + 1 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-left horizontal
            else if (oldMoveX - 2 == newMoveX && oldMoveY - 1 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-left vertical
            else if (oldMoveX - 1 == newMoveX && oldMoveY - 2 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-right vertical
            else if (oldMoveX + 1 == newMoveX && oldMoveY - 2 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-right horizontal
            else if (oldMoveX + 2 == newMoveX && oldMoveY - 1 == newMoveY) {
                if (this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class WhiteRook extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[7][0] = 'wR1';
            this.x = 0;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[7][7] = 'wR2';
            this.x = 700;
            this.y = 700;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(whiteRookIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        // up
        let x = this.x / 100;
        let y = this.y / 100;
        y = y - 1;
        while (y >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'wRookAttack';
            y--;
        }
        // right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1
        while (x < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'wRookAttack';
            x++;
        }
        // down
        x = this.x / 100;
        y = this.y / 100;
        y = y + 1
        while (y < 8) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'wRookAttack';
            y++;
        }
        // left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        while (x >= 0) {
            if (!(board[y][x] == 'bK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'wRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'wRookAttack';
            x--;
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // down
        if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY + 1;
            // count each space up until new position. If contact with piece in-between, reset
            // do not count original position of piece or landing square
            while (count <= newMoveY-1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            // if landing square is blank
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            // if landing square is taken, capture if opponent piece
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // right
        else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX + 1;
            while (count <= newMoveX-1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // up
        else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY - 1;
            while (count >= newMoveY+1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // left
        else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX - 1;
            while (count >= newMoveX+1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class WhitePawn extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[6][0] = 'wP1';
            this.x = 0;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[6][1] = 'wP2';
            this.x = 100;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 3) {
            board[6][2] = 'wP3';
            this.x = 200;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 4) {
            board[6][3] = 'wP4';
            this.x = 300;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 5) {
            board[6][4] = 'wP5';
            this.x = 400;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 6) {
            board[6][5] = 'wP6';
            this.x = 500;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 7) {
            board[6][6] = 'wP7';
            this.x = 600;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 8) {
            board[6][7] = 'wP8';
            this.x = 700;
            this.y = 600;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(whitePawnIMG, this.x, this.y, 100, 100);
        }
    }
    // pawns include move boards because they move differently than they attack
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        this.moveBoard = this.resetTypeBoards(this.moveBoard);
        let x = this.x / 100;
        let y = this.y / 100;
        // diagonal top-right
        if (y - 1 >= 0 && x + 1 < 8) {
            this.attackBoard[y - 1][x + 1] = 'wPawnAttack';
        }
        // diagonal top-left
        if (y - 1 >= 0 && x - 1 >= 0) {
            this.attackBoard[y - 1][x - 1] = 'wPawnAttack';
        }
        if (y == 6) {
            if (board[y - 1][x] == '') {
                this.moveBoard[y - 1][x] = 'wPawnMove';
                if (board[y - 2][x] == '') {
                    this.moveBoard[y - 2][x] = 'wPawnMove';
                }
            }
        }
        else {
            if (y - 1 >= 0 && board[y - 1][x] == '') {
                this.moveBoard[y - 1][x] = 'wPawnMove';
            }
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // attacking opponent?
        // if (newMoveY == 0) {
        //     createP('switch to queen');
        //     this.pawnToQueen(newMoveX, newMoveY, oldMoveX, oldMoveY);
        // }
        if (board[newMoveY][newMoveX] != '' && this.isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY) || this.canPawnEnPassant(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
            this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
        else if (board[newMoveY][newMoveX] == '') {
            // initial position. Can jump two spots (making sure spot in between is empty)
            if (oldMoveY == 6 && oldMoveY - 2 == newMoveY && oldMoveX == newMoveX && board[oldMoveY-1][oldMoveX] == '') {
                if ((newMoveX - 1 >= 0 && board[newMoveY][newMoveX - 1][1] == 'P') || (newMoveX + 1 < 8 && board[newMoveY][newMoveX + 1][1] == 'P')) {
                    for (let i = 8; i < 16; i++) {
                        if (blackPieceArray[i].isAlive) {
                            if (board[newMoveY][newMoveX - 1] == blackIdentityArray[i]) {
                                this.justDoubleJumped = true;
                                blackPieceArray[i].canEnPassant = true;
                            }
                            if (board[newMoveY][newMoveX + 1] == blackIdentityArray[i]) {
                                this.justDoubleJumped = true;
                                blackPieceArray[i].canEnPassant = true;
                            }
                        }
                    }
                }
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            // jump one spot
            else if (oldMoveY - 1 == newMoveY && oldMoveX == newMoveX) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
    isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY - 1 == newMoveY && (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)) {
            for (let i = 0; i < 16; i++) {
                // make sure that it is opponent piece
                if (blackPieceArray[i].isAlive) {
                    if (board[newMoveY][newMoveX] == blackIdentityArray[i]) {
                        board[newMoveY][newMoveX] = '';
                        blackPieceArray[i].isAlive = false;
                        blackPieceArray[i].attackBoard = this.resetTypeBoards(blackPieceArray[i].attackBoard);
                        if (i >= 8) {
                            blackPieceArray[i].moveBoard = this.resetTypeBoards(blackPieceArray[i].moveBoard);
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        return false;
    }
    canPawnEnPassant(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY - 1 == newMoveY && (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)) {
            for (let i = 8; i < 16; i++) {
                // make sure that it is opponent piece
                if (blackPieceArray[i].isAlive) {
                    if (this.canEnPassant && blackPieceArray[i].justDoubleJumped && board[newMoveY + 1][newMoveX] == blackIdentityArray[i]) {
                        board[newMoveY + 1][newMoveX] = '';
                        blackPieceArray[i].isAlive = false;
                        this.resetTypeBoards(blackPieceArray[i].attackBoard);
                        if (i >= 8) {
                            this.resetTypeBoards(blackPieceArray[i].moveBoard);
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        return false;
    }
    pawnToQueen(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        // this.isPawn = false;
        // find exactly what pawn we are
        let x = this.x / 100;
        let y = this.y / 100;
        for (let i = 8; i < 16; i++) {
            if (board[y][x] == whiteIdentityArray[i]) {
                whitePieceArray[i] = new WhiteQueen();
            }
        }
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
    }
}








class BlackKing extends Piece {
    constructor() {
        // super calls parent constructor. MUST do to give access to methods and functions
        super();
        board[0][4] = 'bK';
        this.x = 400;
        this.y = 0;
        this.prevX = this.x;
        this.prevY = this.y;
        this.canCastle = true;
        this.attackBoard = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
        ];
    }
    display() {
        if (this.isAlive) {
            image(blackKingIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        let x = this.x / 100;
        let y = this.y / 100;
        // up
        if (y - 1 >= 0) {
            this.attackBoard[y - 1][x] = 'bKingAttack';
        }
        // diagonal top-right
        if (y - 1 >= 0 && x + 1 < 8) {
            this.attackBoard[y - 1][x + 1] = 'bKingAttack';
        }
        // right
        if (x + 1 < 8) {
            this.attackBoard[y][x + 1] = 'bKingAttack';
        }
        // diagonal bottom-right
        if (x + 1 < 8 && y + 1 < 8) {
            this.attackBoard[y + 1][x + 1] = 'bKingAttack';
        }
        // down
        if (y + 1 < 8) {
            this.attackBoard[y + 1][x] = 'bKingAttack';
        }
        // diagonal bottom-left
        if (x - 1 >= 0 && y + 1 < 8) {
            this.attackBoard[y + 1][x - 1] = 'bKingAttack';
        }
        // left
        if (x - 1 >= 0) {
            this.attackBoard[y][x - 1] = 'bKingAttack';
        }
        // diagonal top-left
        if (x - 1 >= 0 && y + 1 < 8) {
            this.attackBoard[y + 1][x - 1] = 'bKingAttack';
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        let safeArray = this.isSpotSafe(oldMoveX, oldMoveY);
        // right
        if (safeArray[2] && oldMoveX + 1 == newMoveX && oldMoveY == newMoveY) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // down
        else if (safeArray[4] && oldMoveY + 1 == newMoveY && oldMoveX == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // left
        else if (safeArray[6] && oldMoveX - 1 == newMoveX && oldMoveY == newMoveY) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // up
        else if (safeArray[0] && oldMoveY - 1 == newMoveY && oldMoveX == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-right
        else if (safeArray[1] && oldMoveY - 1 == newMoveY && oldMoveX + 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-right
        else if (safeArray[3] && oldMoveY + 1 == newMoveY && oldMoveX + 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-left
        else if (safeArray[5] && oldMoveY + 1 == newMoveY && oldMoveX - 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-left
        else if (safeArray[7] && oldMoveY - 1 == newMoveY && oldMoveX - 1 == newMoveX) {
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                this.canCastle = false;
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        if (this.isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
            this.castlesRight(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
        if (this.isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
            this.castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
    isSpotSafe(x, y) {
        let safeArray = [true, true, true, true, true, true, true, true];
        for (let i = 0; i < 16; i++) {
            // up
            if (y - 1 < 0 || board[y - 1][x][0] == 'b' || whitePieceArray[i].attackBoard[y - 1][x] != '') {
                safeArray[0] = false;
            }
            // diagonal top-right
            if (y - 1 < 0 || x + 1 >= 8 || board[y - 1][x + 1][0] == 'b' || whitePieceArray[i].attackBoard[y - 1][x + 1] != '') {
                safeArray[1] = false;
            }
            // right
            if (x + 1 >= 8 || board[y][x + 1][0] == 'b' || whitePieceArray[i].attackBoard[y][x + 1] != '') {
                safeArray[2] = false;
            }
            // diagonal bottom-right
            if (y + 1 >= 8 || x + 1 >= 8 || board[y + 1][x + 1][0] == 'b' || whitePieceArray[i].attackBoard[y + 1][x + 1] != '') {
                safeArray[3] = false;
            }
            // bottom
            if (y + 1 >= 8 || board[y + 1][x][0] == 'b' || whitePieceArray[i].attackBoard[y + 1][x] != '') {
                safeArray[4] = false;
            }
            // diagonal bottom-left
            if (y + 1 >= 8 || x - 1 < 0 || board[y + 1][x - 1][0] == 'b' || whitePieceArray[i].attackBoard[y + 1][x - 1] != '') {
                safeArray[5] = false;
            }
            // left
            if (x - 1 < 0 || board[y][x - 1][0] == 'b' || whitePieceArray[i].attackBoard[y][x - 1] != '') {
                safeArray[6] = false;
            }
            // diagonal top-left
            if (y - 1 < 0 || x - 1 < 0 || board[y - 1][x - 1][0] == 'b' || whitePieceArray[i].attackBoard[y - 1][x - 1] != '') {
                safeArray[7] = false;
            }
        }
        return safeArray;
    }
    isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY == newMoveY && (oldMoveX + 2 == newMoveX || oldMoveX + 3 == newMoveX)) {
            if (board[0][4] == 'bK' && board[0][5] == '' && board[0][6] == '' && board[0][7] == 'bR2') {
                for (let i = 0; i < 16; i++) {
                    if (whitePieceArray[i].attackBoard[0][4] != '' || whitePieceArray[i].attackBoard[0][5] != '' || whitePieceArray[i].attackBoard[0][6] != '' || whitePieceArray[i].attackBoard[0][7] != '') {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY == newMoveY && (oldMoveX - 2 == newMoveX || oldMoveX - 3 == newMoveX || oldMoveX - 4 == newMoveX)) {
            if (board[0][4] == 'bK' && board[0][3] == '' && board[0][2] == '' && board[0][1] == '' && board[0][0] == 'bR1') {
                for (let i = 0; i < 16; i++) {
                    if (whitePieceArray[i].attackBoard[0][4] != '' || whitePieceArray[i].attackBoard[0][3] != '' || whitePieceArray[i].attackBoard[0][2] != '' || whitePieceArray[i].attackBoard[0][1] != '' || whitePieceArray[i].attackBoard[0][0] != '') {
                        return true;
                    }
                }
                return true;
            }
        }
    }
    castlesRight(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        newMoveX = 6;
        let temp = board[oldMoveY][oldMoveX];
        board[oldMoveY][oldMoveX] = '';
        board[newMoveY][newMoveX] = temp;
        this.x = newMoveX*100;
        this.y = newMoveY*100;
        this.prevX = this.x;
        this.prevY = this.y;
        board[0][7] = '';
        board[0][5] = 'bR2';
        blackPieceArray[5].x = 500;
        blackPieceArray[5].y = 0;
        blackPieceArray[5].prevX = 500;
        blackPieceArray[5].prevY = 0;
        if (whiteMoveFirst) {
            whiteMoveFirst = false;
        }
        else {
            whiteMoveFirst = true;
        }
    }
    castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        newMoveX = 2;
        let temp = board[oldMoveY][oldMoveX];
        board[oldMoveY][oldMoveX] = '';
        board[newMoveY][newMoveX] = temp;
        this.x = newMoveX*100;
        this.y = newMoveY*100;
        this.prevX = this.x;
        this.prevY = this.y;
        board[0][0] = '';
        board[0][3] = 'bR1';
        blackPieceArray[4].x = 300;
        blackPieceArray[4].y = 0;
        blackPieceArray[4].prevX = 300;
        blackPieceArray[4].prevY = 0;
        if (whiteMoveFirst) {
            whiteMoveFirst = false;
        }
        else {
            whiteMoveFirst = true;
        }
    }
}
class BlackQueen extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[0][3] = 'bQ1';
            this.x = 300;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 3) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 4) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 5) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 6) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 7) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 8) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 9) {
            this.x;
            this.y;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(blackQueenIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        // up
        let x = this.x / 100;
        let y = this.y / 100;
        y = y - 1;
        while (y >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            y--;
        }
        // diagonal top-right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1;
        y = y - 1;
        while (x < 8 && y >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            x++;
            y--;
        }
        // right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1
        while (x < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            x++;
        }
        // diagonal bottom-right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1;
        y = y + 1;
        while (x < 8 && y < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            x++;
            y++;
        }
        // down
        x = this.x / 100;
        y = this.y / 100;
        y = y + 1
        while (y < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            y++;
        }
        // diagonal bottom-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y + 1;
        while (x >= 0 && y < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            x--;
            y++;
        }
        // left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        while (x >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            x--;
        }
        // diagonal top-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y - 1;
        while (x >= 0 && y >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bQueenAttack';
                break;
            }
            this.attackBoard[y][x] = 'bQueenAttack';
            x--;
            y--;
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // down
        if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY + 1;
            // count each space up until new position. If contact with piece in-between, reset
            // do not count original position of piece or landing square
            while (count <= newMoveY-1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            // if landing square is blank
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            // if landing square is taken, capture if opponent piece
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // right
        else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX + 1;
            while (count <= newMoveX-1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // up
        else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY - 1;
            while (count >= newMoveY+1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // left
        else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX - 1;
            while (count >= newMoveX+1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-right
        else if (newMoveX > oldMoveX && newMoveY < oldMoveY && (newMoveX - oldMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY - 1;
            while (countX <= newMoveX-1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-right
        else if (newMoveX > oldMoveX && newMoveY > oldMoveY && (newMoveX - oldMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY + 1;
            while (countX <= newMoveX-1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-left
        else if (newMoveX < oldMoveX && newMoveY > oldMoveY && (oldMoveX - newMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY + 1;
            while (countX >= newMoveX+1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-left
        else if (newMoveX < oldMoveX && newMoveY < oldMoveY && (oldMoveX - newMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY - 1;
            while (countX >= newMoveX+1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class BlackBishop extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[0][2] = 'bB1';
            this.x = 200;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[0][5] = 'bB2';
            this.x = 500;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(blackBishopIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        // diagonal top-right
        let x = this.x / 100;
        let y = this.y / 100;
        x = x + 1;
        y = y - 1;
        while (x < 8 && y >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'bBishopAttack';
            x++;
            y--;
        }
        // diagonal bottom-right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1;
        y = y + 1;
        while (x < 8 && y < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'bBishopAttack';
            x++;
            y++;
        }
        // diagonal bottom-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y + 1;
        while (x >= 0 && y < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'bBishopAttack';
            x--;
            y++;
        }
        // diagonal top-left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        y = y - 1;
        while (x >= 0 && y >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bBishopAttack';
                break;
            }
            this.attackBoard[y][x] = 'bBishopAttack';
            x--;
            y--;
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // diagonal top-right
        if (newMoveX > oldMoveX && newMoveY < oldMoveY && (newMoveX - oldMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY - 1;
            while (countX <= newMoveX-1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-right
        else if (newMoveX > oldMoveX && newMoveY > oldMoveY && (newMoveX - oldMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX + 1;
            let countY = oldMoveY + 1;
            while (countX <= newMoveX-1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX++;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal bottom-left
        else if (newMoveX < oldMoveX && newMoveY > oldMoveY && (oldMoveX - newMoveX == newMoveY - oldMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY + 1;
            while (countX >= newMoveX+1 && countY <= newMoveY-1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // diagonal top-left
        else if (newMoveX < oldMoveX && newMoveY < oldMoveY && (oldMoveX - newMoveX == oldMoveY - newMoveY)) {
            let countX = oldMoveX - 1;
            let countY = oldMoveY - 1;
            while (countX >= newMoveX+1 && countY >= newMoveY+1) { 
                if (board[countY][countX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                countX--;
                countY--;
            }
            if (board[newMoveY][newMoveX] == '') {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class BlackKnight extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[0][1] = 'bKn1';
            this.x = 100;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[0][6] = 'bKn2';
            this.x = 600;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(blackKnightIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        let x = this.x / 100;
        let y = this.y / 100;
        // top-right vertical
        if (y - 2 >= 0 && x + 1 < 8) {
            this.attackBoard[y - 2][x + 1] = 'bKnightAttack';
        }
        // top-right horizontal
        if (y - 1 >= 0 && x + 2 < 8) {
            this.attackBoard[y - 1][x + 2] = 'bKnightAttack';
        }
        // bottom-right horizontal
        if (y + 1 < 8 && x + 2 < 8) {
            this.attackBoard[y + 1][x + 2] = 'bKnightAttack';
        }
        // bottom-right vertical
        if (y + 2 < 8 && x + 1 < 8) {
            this.attackBoard[y + 2][x + 1] = 'bKnightAttack';
        }
        // bottom-left vertical
        if (y + 2 < 8 && x - 1 >= 0) {
            this.attackBoard[y + 2][x - 1] = 'bKnightAttack';
        }
        // bottom-left horizontal
        if (y + 1 < 8 && x - 2 >= 0) {
            this.attackBoard[y + 1][x - 2] = 'bKnightAttack';
        }
        // top-left horizontal
        if (y - 1 >= 0 && x - 2 >= 0) {
            this.attackBoard[y - 1][x - 2] = 'bKnightAttack';
        }
        // top-left vertical
        if (y - 2 >= 0 && x - 1 >= 0) {
            this.attackBoard[y - 2][x - 1] = 'bKnightAttack';
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        if (board[newMoveY][newMoveX] == '' || board[newMoveY][newMoveX][0] == 'w') {
            // bottom-right horizontal
            if (oldMoveX + 2 == newMoveX && oldMoveY + 1 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // bottom-right vertical
            else if (oldMoveX + 1 == newMoveX && oldMoveY + 2 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // bottom-left vertical
            else if (oldMoveX - 1 == newMoveX && oldMoveY + 2 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // bottom-left horizontal
            else if (oldMoveX - 2 == newMoveX && oldMoveY + 1 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-left horizontal
            else if (oldMoveX - 2 == newMoveX && oldMoveY - 1 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-left vertical
            else if (oldMoveX - 1 == newMoveX && oldMoveY - 2 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-right vertical
            else if (oldMoveX + 1 == newMoveX && oldMoveY - 2 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            // top-right horizontal
            else if (oldMoveX + 2 == newMoveX && oldMoveY - 1 == newMoveY) {
                if (this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
                else {
                    this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
                }
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class BlackRook extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[0][0] = 'bR1';
            this.x = 0;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[0][7] = 'bR2';
            this.x = 700;
            this.y = 0;
            this.prevX = this.x;
            this.prevY = this.y;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(blackRookIMG, this.x, this.y, 100, 100);
        }
    }
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        // up
        let x = this.x / 100;
        let y = this.y / 100;
        y = y - 1;
        while (y >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'bRookAttack';
            y--;
        }
        // right
        x = this.x / 100;
        y = this.y / 100;
        x = x + 1
        while (x < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'bRookAttack';
            x++;
        }
        // down
        x = this.x / 100;
        y = this.y / 100;
        y = y + 1
        while (y < 8) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'bRookAttack';
            y++;
        }
        // left
        x = this.x / 100;
        y = this.y / 100;
        x = x - 1;
        while (x >= 0) {
            if (!(board[y][x] == 'wK') && board[y][x][0] == 'b' || board[y][x][0] == 'w') {
                this.attackBoard[y][x] = 'bRookAttack';
                break;
            }
            this.attackBoard[y][x] = 'bRookAttack';
            x--;
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // down
        if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY + 1;
            // count each space up until new position. If contact with piece in-between, reset
            // do not count original position of piece or landing square
            while (count <= newMoveY-1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            // if landing square is blank
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            // if landing square is taken, capture if opponent piece
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // right
        else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX + 1;
            while (count <= newMoveX-1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count++;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // up
        else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
            let count = oldMoveY - 1;
            while (count >= newMoveY+1) { 
                if (board[count][oldMoveX] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        // left
        else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
            let count = oldMoveX - 1;
            while (count >= newMoveX+1) { 
                if (board[oldMoveY][count] != '') {
                    this.x = this.prevX;
                    this.y = this.prevY;
                    return;
                }
                count--;
            }
            if (board[newMoveY][newMoveX] == '') {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else if (board[newMoveY][newMoveX] != '' && this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
}
class BlackPawn extends Piece {
    constructor(num) {
        super();
        if (num == 1) {
            board[1][0] = 'bP1';
            this.x = 0;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 2) {
            board[1][1] = 'bP2';
            this.x = 100;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 3) {
            board[1][2] = 'bP3';
            this.x = 200;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 4) {
            board[1][3] = 'bP4';
            this.x = 300;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 5) {
            board[1][4] = 'bP5';
            this.x = 400;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 6) {
            board[1][5] = 'bP6';
            this.x = 500;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 7) {
            board[1][6] = 'bP7';
            this.x = 600;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
        else if (num == 8) {
            board[1][7] = 'bP8';
            this.x = 700;
            this.y = 100;
            this.prevX = this.x;
            this.prevY = this.y;
            this.canEnPassant = false;
            this.justDoubleJumped = false;
            this.attackBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
            this.moveBoard = [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
            ];
        }
    }
    display() {
        if (this.isAlive) {
            image(blackPawnIMG, this.x, this.y, 100, 100);
        }
    }
    // pawns include move boards because they move differently than they attack
    setAttackBoard() {
        this.attackBoard = this.resetTypeBoards(this.attackBoard);
        this.moveBoard = this.resetTypeBoards(this.moveBoard);
        let x = this.x / 100;
        let y = this.y / 100;
        // diagonal bottom-right
        if (y + 1 < 8 && x + 1 < 8) {
            this.attackBoard[y + 1][x + 1] = 'bPawnAttack';
        }
        // diagonal bottom-left
        if (y + 1 < 8 && x - 1 >= 0) {
            this.attackBoard[y + 1][x - 1] = 'bPawnAttack';
        }
        if (y == 1) {
            if (board[y + 1][x] == '') {
                this.moveBoard[y + 1][x] = 'bPawnMove';
                if (board[y + 2][x] == '') {
                    this.moveBoard[y + 2][x] = 'bPawnMove';
                }
            }
        }
        else {
            if (y + 1 < 8 && board[y + 1][x] == '') {
                this.moveBoard[y + 1][x] = 'bPawnMove';
            }
        }
    }
    logic(newMoveX, newMoveY) {
        let oldMoveX = floor(this.prevX/100);
        let oldMoveY = floor(this.prevY/100);
        // attacking opponent?
        if (board[newMoveY][newMoveX] != '' && this.isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY) || this.canPawnEnPassant(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
            this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
        else if (board[newMoveY][newMoveX] == '') {
            // initial position. Can jump two spots (making sure spot in between is empty)
            if (oldMoveY == 1 && oldMoveY + 2 == newMoveY && oldMoveX == newMoveX && board[oldMoveY+1][oldMoveX] == '') {
                if ((newMoveX - 1 >= 0 && board[newMoveY][newMoveX - 1][1] == 'P') || (newMoveX + 1 < 8 && board[newMoveY][newMoveX + 1][1] == 'P')) {
                    for (let i = 8; i < 16; i++) {
                        if (whitePieceArray[i].isAlive) {
                            if (board[newMoveY][newMoveX - 1] == whiteIdentityArray[i]) {
                                this.justDoubleJumped = true;
                                whitePieceArray[i].canEnPassant = true;
                            }
                            if (board[newMoveY][newMoveX + 1] == whiteIdentityArray[i]) {
                                this.justDoubleJumped = true;
                                whitePieceArray[i].canEnPassant = true;
                            }
                        }
                    }
                }
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            // jump one spot
            else if (oldMoveY + 1 == newMoveY && oldMoveX == newMoveX) {
                this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
            }
            else {
                this.x = this.prevX;
                this.y = this.prevY;
            }
        }
        else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
    isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY + 1 == newMoveY && (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)) {
            for (let i = 0; i < 16; i++) {
                // make sure that it is opponent piece
                if (whitePieceArray[i].isAlive) {
                    if (board[newMoveY][newMoveX] == whiteIdentityArray[i]) {
                        board[newMoveY][newMoveX] = '';
                        whitePieceArray[i].isAlive = false;
                        // createP(whiteIdentityArray[i]);
                        whitePieceArray[i].attackBoard = this.resetTypeBoards(whitePieceArray[i].attackBoard);
                        if (i >= 8) {
                            whitePieceArray[i].moveBoard = this.resetTypeBoards(whitePieceArray[i].moveBoard);
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        return false;
    }
    canPawnEnPassant(newMoveX, newMoveY, oldMoveX, oldMoveY) {
        if (oldMoveY + 1 == newMoveY && (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)) {
            for (let i = 8; i < 16; i++) {
                // make sure that it is opponent piece
                if (whitePieceArray[i].isAlive) {
                    if (this.canEnPassant && whitePieceArray[i].justDoubleJumped && board[newMoveY - 1][newMoveX] == whiteIdentityArray[i]) {
                        board[newMoveY + 1][newMoveX] = '';
                        whitePieceArray[i].isAlive = false;
                        this.resetTypeBoards(whitePieceArray[i].attackBoard);
                        if (i >= 8) {
                            this.resetTypeBoards(whitePieceArray[i].moveBoard);
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        return false;
    }
}



