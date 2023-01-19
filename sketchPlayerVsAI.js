let board = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

let w;
let h;
let draggingBlack = false;
let draggingWhite = false;
let whiteMoveFirst = true;
let gameOver = false;

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
  transpositionSetup();
  frameRate(60);
}

function draw() {
  // color main (brown default)
  background(165, 107, 70);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // lines NOT NECESSARY!
      line(w * j, 0, w * j, height);
      line(0, h * j, width, h * j);
      // secondary color (tan default)
      fill(255, 220, 177);
      rect(w * 2 * j, h * 2 * i, w, h);
      rect(w * (j + j + 1), h * (i + i + 1), w, h);
    }
  }
  // let currentTime = int(millis() / 1000);
  // text("TIME: " + currentTime, 30, 380);
  displayPieces();
  movePiece();
  cursorChange();
  // loop() to resume (when mousePressed().... mouseReleased() then noLoop())
}

let draggingBlackPieceIndex;
let draggingWhitePieceIndex;

function mousePressed() {
  let draggingPiece = board[floor(mouseY / 100)][floor(mouseX / 100)];
  if (draggingPiece != "") {
    loop();
    for (let i = 0; i < 16; i++) {
      // if dragging black piece and black turn to move
      if (
        draggingPiece == blackIdentityArray[i] &&
        !whiteMoveFirst &&
        !gameOver
      ) {
        draggingBlackPieceIndex = i;
        draggingBlack = true;
      }
      // if dragging white piece and white turn to move
      if (
        draggingPiece == whiteIdentityArray[i] &&
        whiteMoveFirst &&
        !gameOver
      ) {
        draggingWhitePieceIndex = i;
        draggingWhite = true;
      }
    }
  }
}
function mouseReleased() {
  let newMoveX = floor(mouseX / 100);
  let newMoveY = floor(mouseY / 100);
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
      } else if (mouseY < 0) {
        blackPieceArray[draggingBlackPieceIndex].x = 750;
        blackPieceArray[draggingBlackPieceIndex].y = -50;
      } else {
        blackPieceArray[draggingBlackPieceIndex].x = 750;
        blackPieceArray[draggingBlackPieceIndex].y = mouseY - 50;
      }
    } else if (mouseX < 0) {
      if (mouseY > 800) {
        blackPieceArray[draggingBlackPieceIndex].x = -50;
        blackPieceArray[draggingBlackPieceIndex].y = 750;
      } else if (mouseY < 0) {
        blackPieceArray[draggingBlackPieceIndex].x = -50;
        blackPieceArray[draggingBlackPieceIndex].y = -50;
      } else {
        blackPieceArray[draggingBlackPieceIndex].x = -50;
        blackPieceArray[draggingBlackPieceIndex].y = mouseY - 50;
      }
    } else if (mouseY > 800) {
      if (mouseX > 800) {
        blackPieceArray[draggingBlackPieceIndex].x = 750;
        blackPieceArray[draggingBlackPieceIndex].y = 750;
      } else if (mouseX < 0) {
        blackPieceArray[draggingBlackPieceIndex].x = -50;
        blackPieceArray[draggingBlackPieceIndex].y = 750;
      } else {
        blackPieceArray[draggingBlackPieceIndex].x = mouseX - 50;
        blackPieceArray[draggingBlackPieceIndex].y = 750;
      }
    } else if (mouseY < 0) {
      if (mouseX > 800) {
        blackPieceArray[draggingBlackPieceIndex].x = 750;
        blackPieceArray[draggingBlackPieceIndex].y = -50;
      } else if (mouseX < 0) {
        blackPieceArray[draggingBlackPieceIndex].x = -50;
        blackPieceArray[draggingBlackPieceIndex].y = -50;
      } else {
        blackPieceArray[draggingBlackPieceIndex].x = mouseX - 50;
        blackPieceArray[draggingBlackPieceIndex].y = -50;
      }
    } else {
      blackPieceArray[draggingBlackPieceIndex].x = mouseX - 50;
      blackPieceArray[draggingBlackPieceIndex].y = mouseY - 50;
    }
  }
  if (draggingWhite) {
    if (mouseX > 800) {
      if (mouseY > 800) {
        whitePieceArray[draggingWhitePieceIndex].x = 750;
        whitePieceArray[draggingWhitePieceIndex].y = 750;
      } else if (mouseY < 0) {
        whitePieceArray[draggingWhitePieceIndex].x = 750;
        whitePieceArray[draggingWhitePieceIndex].y = -50;
      } else {
        whitePieceArray[draggingWhitePieceIndex].x = 750;
        whitePieceArray[draggingWhitePieceIndex].y = mouseY - 50;
      }
    } else if (mouseX < 0) {
      if (mouseY > 800) {
        whitePieceArray[draggingWhitePieceIndex].x = -50;
        whitePieceArray[draggingWhitePieceIndex].y = 750;
      } else if (mouseY < 0) {
        whitePieceArray[draggingWhitePieceIndex].x = -50;
        whitePieceArray[draggingWhitePieceIndex].y = -50;
      } else {
        whitePieceArray[draggingWhitePieceIndex].x = -50;
        whitePieceArray[draggingWhitePieceIndex].y = mouseY - 50;
      }
    } else if (mouseY > 800) {
      if (mouseX > 800) {
        whitePieceArray[draggingWhitePieceIndex].x = 750;
        whitePieceArray[draggingWhitePieceIndex].y = 750;
      } else if (mouseX < 0) {
        whitePieceArray[draggingWhitePieceIndex].x = -50;
        whitePieceArray[draggingWhitePieceIndex].y = 750;
      } else {
        whitePieceArray[draggingWhitePieceIndex].x = mouseX - 50;
        whitePieceArray[draggingWhitePieceIndex].y = 750;
      }
    } else if (mouseY < 0) {
      if (mouseX > 800) {
        whitePieceArray[draggingWhitePieceIndex].x = 750;
        whitePieceArray[draggingWhitePieceIndex].y = -50;
      } else if (mouseX < 0) {
        whitePieceArray[draggingWhitePieceIndex].x = -50;
        whitePieceArray[draggingWhitePieceIndex].y = -50;
      } else {
        whitePieceArray[draggingWhitePieceIndex].x = mouseX - 50;
        whitePieceArray[draggingWhitePieceIndex].y = -50;
      }
    } else {
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

let whiteIdentityArray = [
  "wK",
  "wQ1",
  "wB1",
  "wB2",
  "wR1",
  "wR2",
  "wKn1",
  "wKn2",
  "wP1",
  "wP2",
  "wP3",
  "wP4",
  "wP5",
  "wP6",
  "wP7",
  "wP8",
];
let blackIdentityArray = [
  "bK",
  "bQ1",
  "bB1",
  "bB2",
  "bR1",
  "bR2",
  "bKn1",
  "bKn2",
  "bP1",
  "bP2",
  "bP3",
  "bP4",
  "bP5",
  "bP6",
  "bP7",
  "bP8",
];

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

let transpositionBoard = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

let zobrist;
let transpositionMap = new Map();

function transpositionSetup() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let arr = [];
      for (let k = 0; k < 12; k++) {
        let r = round(random(1, 99999999999));
        arr[k] = r;
      }
      transpositionBoard[i][j] = arr;
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] != "") {
        for (let k = 0; k < 16; k++) {
          if (board[i][j] == blackIdentityArray[k]) {
            if (zobrist == null) {
              zobrist =
                transpositionBoard[0][0][blackPieceArray[4].transpositionNum];
            } else {
              zobrist =
                zobrist ^
                transpositionBoard[i][j][blackPieceArray[k].transpositionNum];
            }
          } else if (board[i][j] == whiteIdentityArray[k]) {
            zobrist =
              zobrist ^
              transpositionBoard[i][j][whitePieceArray[k].transpositionNum];
          }
        }
      }
    }
  }
  // createP('final z: ' + zobrist)
}

let blackKingIMG,
  blackQueenIMG,
  blackBishopIMG,
  blackRookIMG,
  blackKnightIMG,
  blackPawnIMG;
let whiteKingIMG,
  whiteQueenIMG,
  whiteBishopIMG,
  whiteRookIMG,
  whiteKnightIMG,
  whitePawnIMG;

function loadBlackPieceImages() {
  blackKingIMG = loadImage("pieceImages/blackKing.png");
  blackQueenIMG = loadImage("pieceImages/blackQueen.png");
  blackBishopIMG = loadImage("pieceImages/blackBishop.png");
  blackRookIMG = loadImage("pieceImages/blackRook.png");
  blackKnightIMG = loadImage("pieceImages/blackKnight.png");
  blackPawnIMG = loadImage("pieceImages/blackPawn.png");
}
function loadWhitePieceImages() {
  whiteKingIMG = loadImage("pieceImages/whiteKing.png");
  whiteQueenIMG = loadImage("pieceImages/whiteQueen.png");
  whiteBishopIMG = loadImage("pieceImages/whiteBishop.png");
  whiteRookIMG = loadImage("pieceImages/whiteRook.png");
  whiteKnightIMG = loadImage("pieceImages/whiteKnight.png");
  whitePawnIMG = loadImage("pieceImages/whitePawn.png");
}

function bestMove() {
  let whitePieceStack = new Stack();
  let blackPieceStack = new Stack();
  let bestScore = -100000;
  let bestOldMoveY;
  let bestOldMoveX;
  let bestNewMoveY;
  let bestNewMoveX;
  let bestPieceIndex;
  let bestPiece;
  // moving each piece - move a piece then perform minimax algorithm
  for (let i = 0; i < 16; i++) {
    if (blackPieceArray[i].isAlive) {
      let moves = blackPieceArray[i].pieceMoves();
      let length = moves.items.length;
      if (length > 0) {
        // each piece being moved to a movable spot each time
        for (let j = 0; j < length; j++) {
          // find original spot and new move spot
          let oldMoveY = floor(blackPieceArray[i].y / 100);
          let oldMoveX = floor(blackPieceArray[i].x / 100);
          let newMoveY = moves.items[j].coordinates[0];
          let newMoveX = moves.items[j].coordinates[1];
          blackPieceArray[i].y = newMoveY * 100;
          blackPieceArray[i].x = newMoveX * 100;
          let movePieceName = board[oldMoveY][oldMoveX];
          board[oldMoveY][oldMoveX] = "";
          // get taken piece identity whether a piece was actually taken or not
          let takenPiece = "";
          let takenPieceIndex;
          // if we actually take a piece, make sure it is not alive and find its index
          if (board[newMoveY][newMoveX] != "") {
            takenPiece = board[newMoveY][newMoveX];
            for (let k = 0; k < 16; k++) {
              if (takenPiece == whiteIdentityArray[k]) {
                takenPieceIndex = k;
                whitePieceArray[takenPieceIndex].isAlive = false;
                if (takenPieceIndex == 0) {
                  kingTaken = true;
                }
                // delete taken white piece from zobrist
                zobrist =
                  zobrist ^
                  transpositionBoard[newMoveY][newMoveX][
                    whitePieceArray[i].transpositionNum
                  ];
                whitePieceStack.push(takenPiece);
              }
            }
          }
          board[newMoveY][newMoveX] = movePieceName;
          // delete original position from zobrist, then add new position to zobrist
          zobrist =
            zobrist ^
            transpositionBoard[oldMoveY][oldMoveX][
              blackPieceArray[i].transpositionNum
            ];
          zobrist =
            zobrist ^
            transpositionBoard[newMoveY][newMoveX][
              blackPieceArray[i].transpositionNum
            ];
          // perform algorithm: depth of 4 meaning looking 2 moves ahead
          isQuietSearchingMax = false;
          isQuietSearchingMin = false;
          let score = minimax(
            board,
            6, // !!! depth of ai !!!!
            false,
            whitePieceStack,
            blackPieceStack,
            -100000,
            100000
          );
          // score = score + blackPieceArray[i].heuristicBoard[newMoveY][newMoveX];
          // delete the new move position from zobrist (returning the piece), then add the old position back to zobrist
          zobrist =
            zobrist ^
            transpositionBoard[newMoveY][newMoveX][
              blackPieceArray[i].transpositionNum
            ];
          zobrist =
            zobrist ^
            transpositionBoard[oldMoveY][oldMoveX][
              blackPieceArray[i].transpositionNum
            ];
          // return piece and return taken piece and make it alive
          board[oldMoveY][oldMoveX] = movePieceName;
          blackPieceArray[i].y = oldMoveY * 100;
          blackPieceArray[i].x = oldMoveX * 100;
          if (takenPiece != "") {
            whitePieceArray[takenPieceIndex].isAlive = true;
            if (takenPieceIndex == 0) {
              kingTaken = false;
            }
            // add back taken white piece to zobrist
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                whitePieceArray[i].transpositionNum
              ];
            whitePieceStack.pop();
          }
          board[newMoveY][newMoveX] = takenPiece;
          if (score > bestScore) {
            bestScore = score;
            bestOldMoveY = oldMoveY;
            bestOldMoveX = oldMoveX;
            bestNewMoveY = newMoveY;
            bestNewMoveX = newMoveX;
            bestPieceIndex = i;
            bestPiece = movePieceName;
          }
        }
      }
    }
  }
  // createP(count);
  count = 0;
  // IFFY: !!!!!!!! should we clear memory each time? or two moves from now? ancienct variables?
  transpositionMap.clear();
  // createP(
  //   "bestPiece: " +
  //     bestPiece +
  //     " " +
  //     bestNewMoveY +
  //     " " +
  //     bestNewMoveX +
  //     " score: " +
  //     bestScore
  // );
  setAIMove(
    bestOldMoveY,
    bestOldMoveX,
    bestNewMoveY,
    bestNewMoveX,
    bestPieceIndex,
    bestPiece
  );
}

let count = 0;
let kingTaken = false;

function minimax(
  board,
  depth,
  isMaximizing,
  whitePieceStack,
  blackPieceStack,
  alpha,
  beta
) {
  if (depth == 0 || kingTaken) {
    return evaluate(!isMaximizing, whitePieceStack, blackPieceStack);
  }
  if (isMaximizing) {
    for (let i = 0; i < 16; i++) {
      if (blackPieceArray[i].isAlive) {
        let moves = blackPieceArray[i].pieceMoves();
        let lengthBlack = moves.items.length;
        if (lengthBlack > 0) {
          // each piece being moved to a movable spot each time
          for (let j = 0; j < lengthBlack; j++) {
            let oldMoveY = floor(blackPieceArray[i].y / 100);
            let oldMoveX = floor(blackPieceArray[i].x / 100);
            let newMoveY = moves.items[j].coordinates[0];
            let newMoveX = moves.items[j].coordinates[1];
            blackPieceArray[i].y = newMoveY * 100;
            blackPieceArray[i].x = newMoveX * 100;
            let movePieceName = board[oldMoveY][oldMoveX];
            board[oldMoveY][oldMoveX] = "";
            let takenPiece = "";
            let takenPieceIndex;
            if (board[newMoveY][newMoveX][0] == "w") {
              takenPiece = board[newMoveY][newMoveX];
              for (let k = 0; k < 16; k++) {
                if (takenPiece == whiteIdentityArray[k]) {
                  takenPieceIndex = k;
                  whitePieceArray[takenPieceIndex].isAlive = false;
                  if (takenPieceIndex == 0) {
                    kingTaken = true;
                  }
                  // delete taken white piece position from zobrist
                  zobrist =
                    zobrist ^
                    transpositionBoard[newMoveY][newMoveX][
                      whitePieceArray[i].transpositionNum
                    ];
                  whitePieceStack.push(takenPiece);
                }
              }
            }
            board[newMoveY][newMoveX] = movePieceName;
            zobrist =
              zobrist ^
              transpositionBoard[oldMoveY][oldMoveX][
                blackPieceArray[i].transpositionNum
              ];
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                blackPieceArray[i].transpositionNum
              ];
            let score;
            if (transpositionMap.has(zobrist)) {
              score = transpositionMap.get(zobrist);
              count++;
            } else {
              score = minimax(
                board,
                depth - 1,
                false,
                whitePieceStack,
                blackPieceStack,
                alpha,
                beta
              );
              transpositionMap.set(zobrist, score);
            }
            if (takenPiece != "") {
              whitePieceArray[takenPieceIndex].isAlive = true;
              if (takenPieceIndex == 0) {
                kingTaken = false;
              }
              // add back taken white piece position from zobrist
              zobrist =
                zobrist ^
                transpositionBoard[newMoveY][newMoveX][
                  whitePieceArray[i].transpositionNum
                ];
              whitePieceStack.pop();
            }
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                blackPieceArray[i].transpositionNum
              ];
            zobrist =
              zobrist ^
              transpositionBoard[oldMoveY][oldMoveX][
                blackPieceArray[i].transpositionNum
              ];
            board[oldMoveY][oldMoveX] = movePieceName;
            blackPieceArray[i].y = oldMoveY * 100;
            blackPieceArray[i].x = oldMoveX * 100;
            board[newMoveY][newMoveX] = takenPiece;
            // fail hard beta-cutoff
            if (score >= beta) {
              return beta;
            }
            // alpha acts like max in minimax
            if (score > alpha) {
              alpha = score;
            }
          }
        }
      }
    }
    return alpha;
  } else {
    for (let i = 0; i < 16; i++) {
      if (whitePieceArray[i].isAlive) {
        let moves = whitePieceArray[i].pieceMoves();
        let lengthWhite = moves.items.length;
        if (lengthWhite > 0) {
          // each piece being moved to a movable spot each time
          for (let j = 0; j < lengthWhite; j++) {
            let oldMoveY = floor(whitePieceArray[i].y / 100);
            let oldMoveX = floor(whitePieceArray[i].x / 100);
            let newMoveY = moves.items[j].coordinates[0];
            let newMoveX = moves.items[j].coordinates[1];
            whitePieceArray[i].y = newMoveY * 100;
            whitePieceArray[i].x = newMoveX * 100;
            let movePieceName = board[oldMoveY][oldMoveX];
            board[oldMoveY][oldMoveX] = "";
            let takenPiece = "";
            let takenPieceIndex;
            if (board[newMoveY][newMoveX][0] == "b") {
              takenPiece = board[newMoveY][newMoveX];
              for (let k = 0; k < 16; k++) {
                if (takenPiece == blackIdentityArray[k]) {
                  takenPieceIndex = k;
                  blackPieceArray[takenPieceIndex].isAlive = false;
                  if (takenPieceIndex == 0) {
                    kingTaken = true;
                  }
                  // delete taken black piece position from zobrist
                  zobrist =
                    zobrist ^
                    transpositionBoard[newMoveY][newMoveX][
                      blackPieceArray[i].transpositionNum
                    ];
                  blackPieceStack.push(takenPiece);
                }
              }
            }
            board[newMoveY][newMoveX] = movePieceName;
            zobrist =
              zobrist ^
              transpositionBoard[oldMoveY][oldMoveX][
                whitePieceArray[i].transpositionNum
              ];
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                whitePieceArray[i].transpositionNum
              ];
            let score;
            if (transpositionMap.has(zobrist)) {
              score = transpositionMap.get(zobrist);
              count++;
            } else {
              score = minimax(
                board,
                depth - 1,
                true,
                whitePieceStack,
                blackPieceStack,
                alpha,
                beta
              );
              transpositionMap.set(zobrist, score);
            }
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                whitePieceArray[i].transpositionNum
              ];
            zobrist =
              zobrist ^
              transpositionBoard[oldMoveY][oldMoveX][
                whitePieceArray[i].transpositionNum
              ];
            board[oldMoveY][oldMoveX] = movePieceName;
            whitePieceArray[i].y = oldMoveY * 100;
            whitePieceArray[i].x = oldMoveX * 100;
            if (takenPiece != "") {
              blackPieceArray[takenPieceIndex].isAlive = true;
              if (takenPieceIndex == 0) {
                kingTaken = false;
              }
              // add back taken black piece position to zobrist
              zobrist =
                zobrist ^
                transpositionBoard[newMoveY][newMoveX][
                  blackPieceArray[i].transpositionNum
                ];
              blackPieceStack.pop();
            }
            board[newMoveY][newMoveX] = takenPiece;
            // fail hard alpha-cutoff
            if (score <= alpha) {
              return alpha;
            }
            // beta acts like min in minimax
            if (score < beta) {
              beta = score;
            }
          }
        }
      }
    }
    return beta;
  }
}

function evaluate(isMaximizing, whitePieceStack, blackPieceStack) {
  let score = 0;
  if (isMaximizing && !whitePieceStack.isEmpty()) {
    for (let i = 0; i < whitePieceStack.items.length; i++) {
      let takenPiece = whitePieceStack.items[i];
      if (takenPiece == "wK") {
        score = score + 900;
        kingTaken = false;
      } else if (takenPiece[1] == "P") {
        score = score + 10;
      } else if (takenPiece[1] == "K" && takenPiece[2] == "n") {
        score = score + 30;
      } else if (takenPiece[1] == "B") {
        score = score + 30;
      } else if (takenPiece[1] == "R") {
        score = score + 50;
      } else if (takenPiece[1] == "Q") {
        score = score + 200;
      }
    }
    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         if (board[i][j] != '') {
    //             if (board[i][j][0] == 'b') {
    //                 if (board[i][j] == 'bk') {
    //                     score = score + blackPieceArray[0].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'P') {
    //                     score = score + blackPieceArray[8].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'K' && board[i][j][2] == 'n') {
    //                     score = score + blackPieceArray[6].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'B') {
    //                     score = score + blackPieceArray[2].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'R') {
    //                     score = score + blackPieceArray[4].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'Q') {
    //                     score = score + blackPieceArray[1].heuristicBoard[i][j];
    //                 }
    //             }
    //         }
    //     }
    // }
  } else if (!isMaximizing && !blackPieceStack.isEmpty()) {
    for (let i = 0; i < blackPieceStack.items.length; i++) {
      let takenPiece = blackPieceStack.items[i];
      if (takenPiece == "bK") {
        score = score - 900;
        kingTaken = false;
      } else if (takenPiece[1] == "P") {
        score = score - 10;
      } else if (takenPiece[1] == "K" && takenPiece[2] == "n") {
        score = score - 30;
      } else if (takenPiece[1] == "B") {
        score = score - 30;
      } else if (takenPiece[1] == "R") {
        score = score - 50;
      } else if (takenPiece[1] == "Q") {
        score = score - 200;
      }
    }
    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         if (board[i][j] != '') {
    //             if (board[i][j][0] == 'w') {
    //                 if (board[i][j] == 'wk') {
    //                     score = score - whitePieceArray[0].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'P') {
    //                     score = score - whitePieceArray[8].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'K' && board[i][j][2] == 'n') {
    //                     score = score - whitePieceArray[6].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'B') {
    //                     score = score - whitePieceArray[2].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'R') {
    //                     score = score - whitePieceArray[4].heuristicBoard[i][j];
    //                 }
    //                 else if (board[i][j][1] == 'Q') {
    //                     score = score - whitePieceArray[1].heuristicBoard[i][j];
    //                 }
    //             }
    //         }
    //     }
    // }
  }
  return score;
}

function setAIMove(
  bestOldMoveY,
  bestOldMoveX,
  bestNewMoveY,
  bestNewMoveX,
  i,
  bestPiece
) {
  let temp = new Piece();
  if (board[bestNewMoveY][bestNewMoveX] != "") {
    for (let j = 0; j < 16; j++) {
      if (whitePieceArray[j].isAlive) {
        if (whiteIdentityArray[j] == board[bestNewMoveY][bestNewMoveX]) {
          // createP(j + " is dead");
          whitePieceArray[j].isAlive = false;
          whitePieceArray[j].attackBoard = temp.resetTypeBoards(
            whitePieceArray[j].attackBoard
          );
          if (j >= 8) {
            whitePieceArray[j].moveBoard = temp.resetTypeBoards(
              whitePieceArray[j].moveBoard
            );
          }
        }
      }
    }
  }
  board[bestOldMoveY][bestOldMoveX] = "";
  board[bestNewMoveY][bestNewMoveX] = bestPiece;
  blackPieceArray[i].x = bestNewMoveX * 100;
  blackPieceArray[i].y = bestNewMoveY * 100;
  blackPieceArray[i].prevX = blackPieceArray[i].x;
  blackPieceArray[i].prevY = blackPieceArray[i].y;
  blackPieceArray[i].changeAttackBoards();
  if (
    temp.isWhiteKingInCheck() &&
    !temp.canWhiteKingEscape() &&
    !temp.canWhitePieceBlock()
  ) {
    createP("Checkmate! Black wins");
    gameOver = true;
  } else {
    whiteMoveFirst = true;
  }
}

function pieceWorth(takenPiece) {
  // don't need negative numbers for minimizing player: this is just for priority piece placement in moves
  if (takenPiece[1] == "P") {
    return 10;
  } else if (takenPiece[1] == "K" && takenPiece[2] == "n") {
    return 30;
  } else if (takenPiece[1] == "B") {
    return 30;
  } else if (takenPiece[1] == "R") {
    return 50;
  } else if (takenPiece[1] == "Q") {
    return 90;
  } else if (takenPiece[1] == "K") {
    return 900;
  } else {
    return 0;
  }
}

// IMPORTANT: for each pieceMove, first changeattack board and check if moving that piece causes king to be in check, if yes dont do

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
    if (board[oldMoveY][oldMoveX][1] == "P") {
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
      board[oldMoveY][oldMoveX] = "";
      board[newMoveY][newMoveX] = temp;
      this.x = newMoveX * 100;
      this.y = newMoveY * 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.changeAttackBoards();
      // if king is still in check after making the move, reset piece and return to try again
      if (this.isWhiteKingInCheck()) {
        board[newMoveY][newMoveX] = "";
        board[oldMoveY][oldMoveX] = temp;
        this.x = oldMoveX * 100;
        this.y = oldMoveY * 100;
        this.prevX = this.x;
        this.prevY = this.y;
        this.changeAttackBoards();
        return;
      }
    }
    // else if (isBlackKingChecked) {
    //     let temp = board[oldMoveY][oldMoveX];
    //     board[oldMoveY][oldMoveX] = '';
    //     board[newMoveY][newMoveX] = temp;
    //     this.x = newMoveX*100;
    //     this.y = newMoveY*100;
    //     this.prevX = this.x;
    //     this.prevY = this.y;
    //     this.changeAttackBoards();
    //     // if king is still in check after making the move, reset piece and return to try again
    //     if (this.isBlackKingInCheck()) {
    //         board[newMoveY][newMoveX] = '';
    //         board[oldMoveY][oldMoveX] = temp;
    //         this.x = oldMoveX*100;
    //         this.y = oldMoveY*100;
    //         this.prevX = this.x;
    //         this.prevY = this.y;
    //         this.changeAttackBoards();
    //         return;
    //     }
    // }
    else {
      // first fully make the move
      let temp = board[oldMoveY][oldMoveX];
      board[oldMoveY][oldMoveX] = "";
      board[newMoveY][newMoveX] = temp;
      this.x = newMoveX * 100;
      this.y = newMoveY * 100;
      this.prevX = this.x;
      this.prevY = this.y;
      // then change all attack boards (including pawns' move boards)
      this.changeAttackBoards();
      // making sure that the piece we move doesn't cause the enemy to check our king
      if (whiteMoveFirst && this.isWhiteKingInCheck()) {
        board[newMoveY][newMoveX] = "";
        board[oldMoveY][oldMoveX] = temp;
        this.x = oldMoveX * 100;
        this.y = oldMoveY * 100;
        this.prevX = this.x;
        this.prevY = this.y;
        this.changeAttackBoards();
        return;
      } else if (!whiteMoveFirst && this.isBlackKingInCheck()) {
        board[newMoveY][newMoveX] = "";
        board[oldMoveY][oldMoveX] = temp;
        this.x = oldMoveX * 100;
        this.y = oldMoveY * 100;
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
      if (
        this.isBlackKingInCheck() &&
        !this.canBlackKingEscape() &&
        !this.canBlackPieceBlock()
      ) {
        createP("Checkmate! White wins");
        gameOver = true;
      } else {
        // deleting original position from zobrist
        zobrist =
          zobrist ^
          transpositionBoard[oldMoveY][oldMoveX][this.transpositionNum];
        // adding new position to zobrist
        zobrist =
          zobrist ^
          transpositionBoard[newMoveY][newMoveX][this.transpositionNum];
        whiteMoveFirst = false;
        bestMove();
      }
    } else {
      // reset black en passants to false and white piece double jumped to false (paired pieces)
      for (let i = 8; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          blackPieceArray[i].canEnPassant = false;
          whitePieceArray[i].justDoubleJumped = false;
        }
      }
      if (
        this.isWhiteKingInCheck() &&
        !this.canWhiteKingEscape() &&
        !this.canWhitePieceBlock()
      ) {
        createP("Checkmate! Black wins");
      }
      whiteMoveFirst = true;
    }
  }
  isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    for (let i = 0; i < 16; i++) {
      // make sure that it is opponent piece
      if (blackPieceArray[i].isAlive) {
        if (board[newMoveY][newMoveX] == blackIdentityArray[i]) {
          board[newMoveY][newMoveX] = "";
          blackPieceArray[i].isAlive = false;
          // deleting the enemy piece (that has been taken) from zobrist
          zobrist =
            zobrist ^
            transpositionBoard[newMoveY][newMoveX][
              blackPieceArray[i].transpositionNum
            ];
          blackPieceArray[i].attackBoard = this.resetTypeBoards(
            blackPieceArray[i].attackBoard
          );
          if (i >= 8) {
            blackPieceArray[i].moveBoard = this.resetTypeBoards(
              blackPieceArray[i].moveBoard
            );
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
          board[newMoveY][newMoveX] = "";
          whitePieceArray[i].isAlive = false;
          zobrist =
            zobrist ^
            transpositionBoard[newMoveY][newMoveX][
              whitePieceArray[i].transpositionNum
            ];
          whitePieceArray[i].attackBoard = this.resetTypeBoards(
            whitePieceArray[i].attackBoard
          );
          if (i >= 8) {
            whitePieceArray[i].moveBoard = this.resetTypeBoards(
              whitePieceArray[i].moveBoard
            );
          }
          return true;
        }
      }
    }
    return false;
  }
  resetTypeBoards(b) {
    b = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
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
      if (whitePieceArray[i].attackBoard[kingY][kingX] != "") {
        // createP(whiteIdentityArray[i]);
        // createP("black king is in check");
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
    board[y][x] = "";
    blackPieceArray[0].isAlive = false;
    this.changeAttackBoards();
    let safeArray = [true, true, true, true, true, true, true, true];
    for (let i = 0; i < 16; i++) {
      // up
      if (
        y - 1 < 0 ||
        board[y - 1][x][0] == "b" ||
        whitePieceArray[i].attackBoard[y - 1][x] != ""
      ) {
        safeArray[0] = false;
      }
      // diagonal top-right
      if (
        y - 1 < 0 ||
        x + 1 >= 8 ||
        board[y - 1][x + 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y - 1][x + 1] != ""
      ) {
        safeArray[1] = false;
      }
      // right
      if (
        x + 1 >= 8 ||
        board[y][x + 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y][x + 1] != ""
      ) {
        safeArray[2] = false;
      }
      // diagonal bottom-right
      if (
        y + 1 >= 8 ||
        x + 1 >= 8 ||
        board[y + 1][x + 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y + 1][x + 1] != ""
      ) {
        safeArray[3] = false;
      }
      // bottom
      if (
        y + 1 >= 8 ||
        board[y + 1][x][0] == "b" ||
        whitePieceArray[i].attackBoard[y + 1][x] != ""
      ) {
        safeArray[4] = false;
      }
      // diagonal bottom-left
      if (
        y + 1 >= 8 ||
        x - 1 < 0 ||
        board[y + 1][x - 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y + 1][x - 1] != ""
      ) {
        safeArray[5] = false;
      }
      // left
      if (
        x - 1 < 0 ||
        board[y][x - 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y][x - 1] != ""
      ) {
        safeArray[6] = false;
      }
      // diagonal top-left
      if (
        y - 1 < 0 ||
        x - 1 < 0 ||
        board[y - 1][x - 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y - 1][x - 1] != ""
      ) {
        safeArray[7] = false;
      }
    }
    // return king to position alive, and change all attack boards to original attacks
    blackPieceArray[0].isAlive = true;
    board[y][x] = king;
    this.changeAttackBoards();
    for (let i = 0; i < 8; i++) {
      if (safeArray[i]) {
        // createP("there is an escape square for black king");
        return true;
      }
    }
    // createP("there is no escape square for black king");
    return false;
  }
  canBlackPieceBlock() {
    let kingX = blackPieceArray[0].x / 100;
    let kingY = blackPieceArray[0].y / 100;
    let attackerX;
    let attackerY;
    for (let i = 0; i < 16; i++) {
      if (whitePieceArray[i].attackBoard[kingY][kingX] != "") {
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        x--;
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
            if (blackPieceArray[i].attackBoard[y][x] != "") {
              // createP("black piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (blackPieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              blackPieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("black piece can block attacker path");
              return true;
            } else if (blackPieceArray[i].moveBoard[y][x] != "") {
              // createP("black piece can block attacker path");
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
      if (blackPieceArray[i].attackBoard[kingY][kingX] != "") {
        // createP(blackIdentityArray[i]);
        // createP("white king is in check");
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
    board[y][x] = "";
    whitePieceArray[0].isAlive = false;
    this.changeAttackBoards();
    let safeArray = [true, true, true, true, true, true, true, true];
    for (let i = 0; i < 16; i++) {
      // up
      if (
        y - 1 < 0 ||
        board[y - 1][x][0] == "w" ||
        blackPieceArray[i].attackBoard[y - 1][x] != ""
      ) {
        safeArray[0] = false;
      }
      // diagonal top-right
      if (
        y - 1 < 0 ||
        x + 1 >= 8 ||
        board[y - 1][x + 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y - 1][x + 1] != ""
      ) {
        safeArray[1] = false;
      }
      // right
      if (
        x + 1 >= 8 ||
        board[y][x + 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y][x + 1] != ""
      ) {
        safeArray[2] = false;
      }
      // diagonal bottom-right
      if (
        y + 1 >= 8 ||
        x + 1 >= 8 ||
        board[y + 1][x + 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y + 1][x + 1] != ""
      ) {
        safeArray[3] = false;
      }
      // bottom
      if (
        y + 1 >= 8 ||
        board[y + 1][x][0] == "w" ||
        blackPieceArray[i].attackBoard[y + 1][x] != ""
      ) {
        safeArray[4] = false;
      }
      // diagonal bottom-left
      if (
        y + 1 >= 8 ||
        x - 1 < 0 ||
        board[y + 1][x - 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y + 1][x - 1] != ""
      ) {
        safeArray[5] = false;
      }
      // left
      if (
        x - 1 < 0 ||
        board[y][x - 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y][x - 1] != ""
      ) {
        safeArray[6] = false;
      }
      // diagonal top-left
      if (
        y - 1 < 0 ||
        x - 1 < 0 ||
        board[y - 1][x - 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y - 1][x - 1] != ""
      ) {
        safeArray[7] = false;
      }
    }
    // return king to position alive, and change all attack boards to original attacks
    whitePieceArray[0].isAlive = true;
    board[y][x] = king;
    this.changeAttackBoards();
    for (let i = 0; i < 8; i++) {
      if (safeArray[i]) {
        // createP("there is an escape square for white king");
        return true;
      }
    }
    // createP("there is no escape square for white king");
    return false;
  }
  canWhitePieceBlock() {
    let kingX = whitePieceArray[0].x / 100;
    let kingY = whitePieceArray[0].y / 100;
    let attackerX;
    let attackerY;
    for (let i = 0; i < 16; i++) {
      if (blackPieceArray[i].attackBoard[kingY][kingX] != "") {
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        x--;
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
            if (whitePieceArray[i].attackBoard[y][x] != "") {
              // createP("white piece can block attacker path");
              return true;
            }
          }
        }
        for (let i = 8; i < 16; i++) {
          if (whitePieceArray[i].isAlive) {
            if (
              x == attackerX &&
              y == attackerY &&
              whitePieceArray[i].attackBoard[y][x] != ""
            ) {
              // createP("white piece can block attacker path");
              return true;
            } else if (whitePieceArray[i].moveBoard[y][x] != "") {
              // createP("white piece can block attacker path");
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
    board[oldMoveY][oldMoveX] = "";
    whitePieceArray[i] = new WhiteQueen(queenCount);
    let identity = concat("wQ", queenCount);
    board[oldMoveY][oldMoveX] = identity;
    whiteIdentityArray[i] = identity;
    let temp = board[oldMoveY][oldMoveX];
    board[oldMoveY][oldMoveX] = "";
    board[newMoveY][newMoveX] = temp;
    whitePieceArray[i].x = newMoveX * 100;
    whitePieceArray[i].y = newMoveY * 100;
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
    if (
      this.isBlackKingInCheck() &&
      !this.canBlackKingEscape() &&
      !this.canBlackPieceBlock()
    ) {
      createP("Checkmate! White wins");
    }
    whiteMoveFirst = false;
  }
  promoteBlackPawn(oldMoveX, oldMoveY, newMoveX, newMoveY, i) {
    blackQueenCount++;
    board[oldMoveY][oldMoveX] = "";
    blackPieceArray[i] = new BlackQueen(blackQueenCount);
    let identity = concat("bQ", blackQueenCount);
    board[oldMoveY][oldMoveX] = identity;
    blackIdentityArray[i] = identity;
    let temp = board[oldMoveY][oldMoveX];
    board[oldMoveY][oldMoveX] = "";
    board[newMoveY][newMoveX] = temp;
    blackPieceArray[i].x = newMoveX * 100;
    blackPieceArray[i].y = newMoveY * 100;
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
    if (
      this.isWhiteKingInCheck() &&
      !this.canWhiteKingEscape() &&
      !this.canWhitePieceBlock()
    ) {
      createP("Checkmate! Black wins");
    }
    whiteMoveFirst = true;
  }
}

class WhiteKing extends Piece {
  constructor() {
    super();
    board[7][4] = "wK";
    this.x = 400;
    this.y = 700;
    this.prevX = this.x;
    this.prevY = this.y;
    this.canCastle = true;
    this.transpositionNum = 0;
    this.attackBoard = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    this.heuristicBoard = [
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
      [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
      [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
      [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
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
      this.attackBoard[y - 1][x] = "wKingAttack";
    }
    // diagonal top-right
    if (y - 1 >= 0 && x + 1 < 8) {
      this.attackBoard[y - 1][x + 1] = "wKingAttack";
    }
    // right
    if (x + 1 < 8) {
      this.attackBoard[y][x + 1] = "wKingAttack";
    }
    // diagonal bottom-right
    if (x + 1 < 8 && y + 1 < 8) {
      this.attackBoard[y + 1][x + 1] = "wKingAttack";
    }
    // down
    if (y + 1 < 8) {
      this.attackBoard[y + 1][x] = "wKingAttack";
    }
    // diagonal bottom-left
    if (x - 1 >= 0 && y + 1 < 8) {
      this.attackBoard[y + 1][x - 1] = "wKingAttack";
    }
    // left
    if (x - 1 >= 0) {
      this.attackBoard[y][x - 1] = "wKingAttack";
    }
    // diagonal top-left
    if (x - 1 >= 0 && y - 1 >= 0) {
      this.attackBoard[y - 1][x - 1] = "wKingAttack";
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    let safeArray = this.isSpotSafe(oldMoveX, oldMoveY);
    // right
    if (safeArray[2] && oldMoveX + 1 == newMoveX && oldMoveY == newMoveY) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // down
    else if (safeArray[4] && oldMoveY + 1 == newMoveY && oldMoveX == newMoveX) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // left
    else if (safeArray[6] && oldMoveX - 1 == newMoveX && oldMoveY == newMoveY) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // up
    else if (safeArray[0] && oldMoveY - 1 == newMoveY && oldMoveX == newMoveX) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-right
    else if (
      safeArray[1] &&
      oldMoveY - 1 == newMoveY &&
      oldMoveX + 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-right
    else if (
      safeArray[3] &&
      oldMoveY + 1 == newMoveY &&
      oldMoveX + 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-left
    else if (
      safeArray[5] &&
      oldMoveY + 1 == newMoveY &&
      oldMoveX - 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-left
    else if (
      safeArray[7] &&
      oldMoveY - 1 == newMoveY &&
      oldMoveX - 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    if (this.isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
      this.castlesRight(newMoveX, newMoveY, oldMoveX, oldMoveY);
    }
    if (this.isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
      this.castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY);
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  isSpotSafe(x, y) {
    let safeArray = [true, true, true, true, true, true, true, true];
    for (let i = 0; i < 16; i++) {
      // up
      if (
        y - 1 < 0 ||
        board[y - 1][x][0] == "w" ||
        blackPieceArray[i].attackBoard[y - 1][x] != ""
      ) {
        safeArray[0] = false;
      }
      // diagonal top-right
      if (
        y - 1 < 0 ||
        x + 1 >= 8 ||
        board[y - 1][x + 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y - 1][x + 1] != ""
      ) {
        safeArray[1] = false;
      }
      // right
      if (
        x + 1 >= 8 ||
        board[y][x + 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y][x + 1] != ""
      ) {
        safeArray[2] = false;
      }
      // diagonal bottom-right
      if (
        y + 1 >= 8 ||
        x + 1 >= 8 ||
        board[y + 1][x + 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y + 1][x + 1] != ""
      ) {
        safeArray[3] = false;
      }
      // bottom
      if (
        y + 1 >= 8 ||
        board[y + 1][x][0] == "w" ||
        blackPieceArray[i].attackBoard[y + 1][x] != ""
      ) {
        safeArray[4] = false;
      }
      // diagonal bottom-left
      if (
        y + 1 >= 8 ||
        x - 1 < 0 ||
        board[y + 1][x - 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y + 1][x - 1] != ""
      ) {
        safeArray[5] = false;
      }
      // left
      if (
        x - 1 < 0 ||
        board[y][x - 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y][x - 1] != ""
      ) {
        safeArray[6] = false;
      }
      // diagonal top-left
      if (
        y - 1 < 0 ||
        x - 1 < 0 ||
        board[y - 1][x - 1][0] == "w" ||
        blackPieceArray[i].attackBoard[y - 1][x - 1] != ""
      ) {
        safeArray[7] = false;
      }
    }
    return safeArray;
  }
  isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    if (
      oldMoveY == newMoveY &&
      (oldMoveX + 2 == newMoveX || oldMoveX + 3 == newMoveX)
    ) {
      if (
        board[7][4] == "wK" &&
        board[7][5] == "" &&
        board[7][6] == "" &&
        board[7][7] == "wR2"
      ) {
        for (let i = 0; i < 16; i++) {
          if (
            blackPieceArray[i].attackBoard[7][4] != "" ||
            blackPieceArray[i].attackBoard[7][5] != "" ||
            blackPieceArray[i].attackBoard[7][6] != "" ||
            blackPieceArray[i].attackBoard[7][7] != ""
          ) {
            return false;
          }
        }
        return true;
      }
    }
  }
  isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    if (
      oldMoveY == newMoveY &&
      (oldMoveX - 2 == newMoveX ||
        oldMoveX - 3 == newMoveX ||
        oldMoveX - 4 == newMoveX)
    ) {
      if (
        board[7][4] == "wK" &&
        board[7][3] == "" &&
        board[7][2] == "" &&
        board[7][1] == "" &&
        board[7][0] == "wR1"
      ) {
        for (let i = 0; i < 16; i++) {
          if (
            blackPieceArray[i].attackBoard[7][4] != "" ||
            blackPieceArray[i].attackBoard[7][3] != "" ||
            blackPieceArray[i].attackBoard[7][2] != "" ||
            blackPieceArray[i].attackBoard[7][1] != "" ||
            blackPieceArray[i].attackBoard[7][0] != ""
          ) {
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
    board[oldMoveY][oldMoveX] = "";
    board[newMoveY][newMoveX] = temp;
    this.x = newMoveX * 100;
    this.y = newMoveY * 100;
    this.prevX = this.x;
    this.prevY = this.y;
    board[7][7] = "";
    board[7][5] = "wR2";
    whitePieceArray[5].x = 500;
    whitePieceArray[5].y = 700;
    whitePieceArray[5].prevX = 500;
    whitePieceArray[5].prevY = 700;
    if (whiteMoveFirst) {
      whiteMoveFirst = false;
    } else {
      whiteMoveFirst = true;
    }
  }
  castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    newMoveX = 2;
    let temp = board[oldMoveY][oldMoveX];
    board[oldMoveY][oldMoveX] = "";
    board[newMoveY][newMoveX] = temp;
    this.x = newMoveX * 100;
    this.y = newMoveY * 100;
    this.prevX = this.x;
    this.prevY = this.y;
    board[7][0] = "";
    board[7][3] = "wR1";
    whitePieceArray[4].x = 300;
    whitePieceArray[4].y = 700;
    whitePieceArray[4].prevX = 300;
    whitePieceArray[4].prevY = 700;
    if (whiteMoveFirst) {
      whiteMoveFirst = false;
    } else {
      whiteMoveFirst = true;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    let x = this.x / 100;
    let y = this.y / 100;
    let canMove;
    // up
    if (y - 1 >= 0 && board[y - 1][x][0] != "w") {
      // moving to a spot within bounds and is a blank square or enemy square
      // making sure that move does not land on enemy attack square
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y - 1][x] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y - 1][x]);
        priority = priority + this.heuristicBoard[y - 1][x];
        moveSet.enqueue([y - 1, x], priority);
      }
    }
    // diagonal top-right
    if (y - 1 >= 0 && x + 1 < 8 && board[y - 1][x + 1][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y - 1][x + 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y - 1][x + 1]);
        priority = priority + this.heuristicBoard[y - 1][x + 1];
        moveSet.enqueue([y - 1, x + 1], priority);
      }
    }
    // right
    if (x + 1 < 8 && board[y][x + 1][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y][x + 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y][x + 1]);
        priority = priority + this.heuristicBoard[y][x + 1];
        moveSet.enqueue([y, x + 1], priority);
      }
    }
    // diagonal bottom-right
    if (x + 1 < 8 && y + 1 < 8 && board[y + 1][x + 1][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y + 1][x + 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y + 1][x + 1]);
        priority = priority + this.heuristicBoard[y + 1][x + 1];
        moveSet.enqueue([y + 1, x + 1], priority);
      }
    }
    // down
    if (y + 1 < 8 && board[y + 1][x][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y + 1][x] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y + 1][x]);
        priority = priority + this.heuristicBoard[y + 1][x];
        moveSet.enqueue([y + 1, x], priority);
      }
    }
    // diagonal bottom-left
    if (x - 1 >= 0 && y + 1 < 8 && board[y + 1][x - 1][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y + 1][x - 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y + 1][x - 1]);
        priority = priority + this.heuristicBoard[y + 1][x - 1];
        moveSet.enqueue([y + 1, x - 1], priority);
      }
    }
    // left
    if (x - 1 >= 0 && board[y][x - 1][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y][x - 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y][x - 1]);
        priority = priority + this.heuristicBoard[y][x - 1];
        moveSet.enqueue([y, x - 1], priority);
      }
    }
    // diagonal top-left
    if (x - 1 >= 0 && y - 1 >= 0 && board[y - 1][x - 1][0] != "w") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (blackPieceArray[i].isAlive) {
          if (blackPieceArray[i].attackBoard[y - 1][x - 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y - 1][x - 1]);
        priority = priority + this.heuristicBoard[y - 1][x - 1];
        moveSet.enqueue([y - 1, x - 1], priority);
      }
    }
    return moveSet;
  }
}
class WhiteQueen extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[7][3] = "wQ1";
      this.x = 300;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 2) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 3) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 4) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 5) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 6) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 7) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 8) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 9) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 1;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
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
      // why tf did i do this. do: board[y][x] != 'bk'
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      y--;
    }
    // diagonal top-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y - 1;
    while (x < 8 && y >= 0) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      x++;
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      x++;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      x++;
      y++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      x--;
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      x--;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "wQueenAttack";
      x--;
      y--;
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // down
    if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY + 1;
      // count each space up until new position. If contact with piece in-between, reset
      // do not count original position of piece or landing square
      while (count <= newMoveY - 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      // if landing square is blank
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      }
      // if landing square is taken, capture if opponent piece
      else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // right
    else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX + 1;
      while (count <= newMoveX - 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // up
    else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY - 1;
      while (count >= newMoveY + 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // left
    else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX - 1;
      while (count >= newMoveX + 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-right
    else if (
      newMoveX > oldMoveX &&
      newMoveY < oldMoveY &&
      newMoveX - oldMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY - 1;
      while (countX <= newMoveX - 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-right
    else if (
      newMoveX > oldMoveX &&
      newMoveY > oldMoveY &&
      newMoveX - oldMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY + 1;
      while (countX <= newMoveX - 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY > oldMoveY &&
      oldMoveX - newMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY + 1;
      while (countX >= newMoveX + 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY < oldMoveY &&
      oldMoveX - newMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY - 1;
      while (countX >= newMoveX + 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    // up
    let x = this.x / 100;
    let y = this.y / 100;
    y = y - 1;
    while (y >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y--;
    }
    // diagonal top-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y - 1;
    while (x < 8 && y >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y--;
    }
    return moveSet;
  }
}
class WhiteBishop extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[7][2] = "wB1";
      this.x = 200;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 2;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
        [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
        [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
        [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
      ];
    } else if (num == 2) {
      board[7][5] = "wB2";
      this.x = 500;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 2;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
        [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
        [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
        [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
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
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "wBishopAttack";
      x++;
      y--;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "wBishopAttack";
      x++;
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "wBishopAttack";
      x--;
      y++;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "wBishopAttack";
      x--;
      y--;
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // diagonal top-right
    if (
      newMoveX > oldMoveX &&
      newMoveY < oldMoveY &&
      newMoveX - oldMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY - 1;
      while (countX <= newMoveX - 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-right
    else if (
      newMoveX > oldMoveX &&
      newMoveY > oldMoveY &&
      newMoveX - oldMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY + 1;
      while (countX <= newMoveX - 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY > oldMoveY &&
      oldMoveX - newMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY + 1;
      while (countX >= newMoveX + 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY < oldMoveY &&
      oldMoveX - newMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY - 1;
      while (countX >= newMoveX + 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    // diagonal top-right
    let x = this.x / 100;
    let y = this.y / 100;
    x = x + 1;
    y = y - 1;
    while (x < 8 && y >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y--;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y++;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y--;
    }
    return moveSet;
  }
}
class WhiteKnight extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[7][1] = "wKn1";
      this.x = 100;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 3;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
        [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
        [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
        [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
        [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
        [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
      ];
    } else if (num == 2) {
      board[7][6] = "wKn2";
      this.x = 600;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 3;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
        [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
        [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
        [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
        [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
        [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
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
      this.attackBoard[y - 2][x + 1] = "wKnightAttack";
    }
    // top-right horizontal
    if (y - 1 >= 0 && x + 2 < 8) {
      this.attackBoard[y - 1][x + 2] = "wKnightAttack";
    }
    // bottom-right horizontal
    if (y + 1 < 8 && x + 2 < 8) {
      this.attackBoard[y + 1][x + 2] = "wKnightAttack";
    }
    // bottom-right vertical
    if (y + 2 < 8 && x + 1 < 8) {
      this.attackBoard[y + 2][x + 1] = "wKnightAttack";
    }
    // bottom-left vertical
    if (y + 2 < 8 && x - 1 >= 0) {
      this.attackBoard[y + 2][x - 1] = "wKnightAttack";
    }
    // bottom-left horizontal
    if (y + 1 < 8 && x - 2 >= 0) {
      this.attackBoard[y + 1][x - 2] = "wKnightAttack";
    }
    // top-left horizontal
    if (y - 1 >= 0 && x - 2 >= 0) {
      this.attackBoard[y - 1][x - 2] = "wKnightAttack";
    }
    // top-left vertical
    if (y - 2 >= 0 && x - 1 >= 0) {
      this.attackBoard[y - 2][x - 1] = "wKnightAttack";
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    if (
      board[newMoveY][newMoveX] == "" ||
      board[newMoveY][newMoveX][0] == "b"
    ) {
      // bottom-right horizontal
      if (oldMoveX + 2 == newMoveX && oldMoveY + 1 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // bottom-right vertical
      else if (oldMoveX + 1 == newMoveX && oldMoveY + 2 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // bottom-left vertical
      else if (oldMoveX - 1 == newMoveX && oldMoveY + 2 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // bottom-left horizontal
      else if (oldMoveX - 2 == newMoveX && oldMoveY + 1 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-left horizontal
      else if (oldMoveX - 2 == newMoveX && oldMoveY - 1 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-left vertical
      else if (oldMoveX - 1 == newMoveX && oldMoveY - 2 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-right vertical
      else if (oldMoveX + 1 == newMoveX && oldMoveY - 2 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-right horizontal
      else if (oldMoveX + 2 == newMoveX && oldMoveY - 1 == newMoveY) {
        if (
          this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    let x = this.x / 100;
    let y = this.y / 100;
    // top-right vertical
    if (y - 2 >= 0 && x + 1 < 8 && board[y - 2][x + 1][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y - 2][x + 1]);
      priority = priority + this.heuristicBoard[y - 2][x + 1];
      moveSet.enqueue([y - 2, x + 1], priority);
    }
    // top-right horizontal
    if (y - 1 >= 0 && x + 2 < 8 && board[y - 1][x + 2][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y - 1][x + 2]);
      priority = priority + this.heuristicBoard[y - 1][x + 2];
      moveSet.enqueue([y - 1, x + 2], priority);
    }
    // bottom-right horizontal
    if (y + 1 < 8 && x + 2 < 8 && board[y + 1][x + 2][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y + 1][x + 2]);
      priority = priority + this.heuristicBoard[y + 1][x + 2];
      moveSet.enqueue([y + 1, x + 2], priority);
    }
    // bottom-right vertical
    if (y + 2 < 8 && x + 1 < 8 && board[y + 2][x + 1][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y + 2][x + 1]);
      priority = priority + this.heuristicBoard[y + 2][x + 1];
      moveSet.enqueue([y + 2, x + 1], priority);
    }
    // bottom-left vertical
    if (y + 2 < 8 && x - 1 >= 0 && board[y + 2][x - 1][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y + 2][x - 1]);
      priority = priority + this.heuristicBoard[y + 2][x - 1];
      moveSet.enqueue([y + 2, x - 1], priority);
    }
    // bottom-left horizontal
    if (y + 1 < 8 && x - 2 >= 0 && board[y + 1][x - 2][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y + 1][x - 2]);
      priority = priority + this.heuristicBoard[y + 1][x - 2];
      moveSet.enqueue([y + 1, x - 2], priority);
    }
    // top-left horizontal
    if (y - 1 >= 0 && x - 2 >= 0 && board[y - 1][x - 2][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y - 1][x - 2]);
      priority = priority + this.heuristicBoard[y - 1][x - 2];
      moveSet.enqueue([y - 1, x - 2], priority);
    }
    // top-left vertical
    if (y - 2 >= 0 && x - 1 >= 0 && board[y - 2][x - 1][0] != "w") {
      priority = 0;
      priority = pieceWorth(board[y - 2][x - 1]);
      priority = priority + this.heuristicBoard[y - 2][x - 1];
      moveSet.enqueue([y - 2, x - 1], priority);
    }
    return moveSet;
  }
}
class WhiteRook extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[7][0] = "wR1";
      this.x = 0;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 4;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
      ];
    } else if (num == 2) {
      board[7][7] = "wR2";
      this.x = 700;
      this.y = 700;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 4;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
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
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wRookAttack";
        break;
      }
      this.attackBoard[y][x] = "wRookAttack";
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wRookAttack";
        break;
      }
      this.attackBoard[y][x] = "wRookAttack";
      x++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wRookAttack";
        break;
      }
      this.attackBoard[y][x] = "wRookAttack";
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0) {
      if (
        (!(board[y][x] == "bK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "wRookAttack";
        break;
      }
      this.attackBoard[y][x] = "wRookAttack";
      x--;
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // down
    if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY + 1;
      // count each space up until new position. If contact with piece in-between, reset
      // do not count original position of piece or landing square
      while (count <= newMoveY - 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      // if landing square is blank
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      }
      // if landing square is taken, capture if opponent piece
      else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // right
    else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX + 1;
      while (count <= newMoveX - 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // up
    else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY - 1;
      while (count >= newMoveY + 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // left
    else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX - 1;
      while (count >= newMoveX + 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForWhite(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    // up
    let x = this.x / 100;
    let y = this.y / 100;
    y = y - 1;
    while (y >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0 && board[y][x][0] != "w") {
      priority = 0;
      if (board[y][x][0] == "b") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
    }
    return moveSet;
  }
}
class WhitePawn extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[6][0] = "wP1";
      this.x = 0;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 2) {
      board[6][1] = "wP2";
      this.x = 100;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 3) {
      board[6][2] = "wP3";
      this.x = 200;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 4) {
      board[6][3] = "wP4";
      this.x = 300;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 5) {
      board[6][4] = "wP5";
      this.x = 400;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 6) {
      board[6][5] = "wP6";
      this.x = 500;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 7) {
      board[6][6] = "wP7";
      this.x = 600;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 8) {
      board[6][7] = "wP8";
      this.x = 700;
      this.y = 600;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 5;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
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
      this.attackBoard[y - 1][x + 1] = "wPawnAttack";
    }
    // diagonal top-left
    if (y - 1 >= 0 && x - 1 >= 0) {
      this.attackBoard[y - 1][x - 1] = "wPawnAttack";
    }
    if (y == 6) {
      if (board[y - 1][x] == "") {
        this.moveBoard[y - 1][x] = "wPawnMove";
        if (board[y - 2][x] == "") {
          this.moveBoard[y - 2][x] = "wPawnMove";
        }
      }
    } else {
      if (y - 1 >= 0 && board[y - 1][x] == "") {
        this.moveBoard[y - 1][x] = "wPawnMove";
      }
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // attacking opponent?
    // if (newMoveY == 0) {
    //     createP('switch to queen');
    //     this.pawnToQueen(newMoveX, newMoveY, oldMoveX, oldMoveY);
    // }
    if (
      (board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY)) ||
      this.canPawnEnPassant(newMoveX, newMoveY, oldMoveX, oldMoveY)
    ) {
      this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
    } else if (board[newMoveY][newMoveX] == "") {
      // initial position. Can jump two spots (making sure spot in between is empty)
      if (
        oldMoveY == 6 &&
        oldMoveY - 2 == newMoveY &&
        oldMoveX == newMoveX &&
        board[oldMoveY - 1][oldMoveX] == ""
      ) {
        if (
          (newMoveX - 1 >= 0 && board[newMoveY][newMoveX - 1][1] == "P") ||
          (newMoveX + 1 < 8 && board[newMoveY][newMoveX + 1][1] == "P")
        ) {
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
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    if (
      oldMoveY - 1 == newMoveY &&
      (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)
    ) {
      for (let i = 0; i < 16; i++) {
        // make sure that it is opponent piece
        if (blackPieceArray[i].isAlive) {
          if (board[newMoveY][newMoveX] == blackIdentityArray[i]) {
            board[newMoveY][newMoveX] = "";
            blackPieceArray[i].isAlive = false;
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                blackPieceArray[i].transpositionNum
              ];
            blackPieceArray[i].attackBoard = this.resetTypeBoards(
              blackPieceArray[i].attackBoard
            );
            if (i >= 8) {
              blackPieceArray[i].moveBoard = this.resetTypeBoards(
                blackPieceArray[i].moveBoard
              );
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
    if (
      oldMoveY - 1 == newMoveY &&
      (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)
    ) {
      for (let i = 8; i < 16; i++) {
        // make sure that it is opponent piece
        if (blackPieceArray[i].isAlive) {
          if (
            this.canEnPassant &&
            blackPieceArray[i].justDoubleJumped &&
            board[newMoveY + 1][newMoveX] == blackIdentityArray[i]
          ) {
            board[newMoveY + 1][newMoveX] = "";
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
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    let x = this.x / 100;
    let y = this.y / 100;
    // diagonal top-right
    if (y - 1 >= 0 && x + 1 < 8 && board[y - 1][x + 1][0] == "b") {
      priority = 0;
      priority = pieceWorth(board[y - 1][x + 1]);
      priority = priority + this.heuristicBoard[y - 1][x + 1];
      moveSet.enqueue([y - 1, x + 1], priority);
    }
    // diagonal top-left
    if (y - 1 >= 0 && x - 1 >= 0 && board[y - 1][x - 1][0] == "b") {
      priority = 0;
      priority = pieceWorth(board[y - 1][x - 1]);
      priority = priority + this.heuristicBoard[y - 1][x - 1];
      moveSet.enqueue([y - 1, x - 1], priority);
    }
    if (y == 6) {
      if (board[y - 1][x] == "") {
        priority = 0;
        priority = this.heuristicBoard[y - 1][x];
        moveSet.enqueue([y - 1, x], priority);
        if (board[y - 2][x] == "") {
          priority = 0;
          priority = this.heuristicBoard[y - 2][x];
          moveSet.enqueue([y - 2, x], priority);
        }
      }
    } else {
      if (y - 1 >= 0 && board[y - 1][x] == "") {
        priority = 0;
        priority = this.heuristicBoard[y - 1][x];
        moveSet.enqueue([y - 1, x], priority);
      }
    }
    return moveSet;
  }
}

class BlackKing extends Piece {
  constructor() {
    // super calls parent constructor. MUST do to give access to methods and functions
    super();
    board[0][4] = "bK";
    this.x = 400;
    this.y = 0;
    this.prevX = this.x;
    this.prevY = this.y;
    this.canCastle = true;
    this.transpositionNum = 6;
    this.attackBoard = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    this.heuristicBoard = [
      [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
      [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
      [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
      [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
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
      this.attackBoard[y - 1][x] = "bKingAttack";
    }
    // diagonal top-right
    if (y - 1 >= 0 && x + 1 < 8) {
      this.attackBoard[y - 1][x + 1] = "bKingAttack";
    }
    // right
    if (x + 1 < 8) {
      this.attackBoard[y][x + 1] = "bKingAttack";
    }
    // diagonal bottom-right
    if (x + 1 < 8 && y + 1 < 8) {
      this.attackBoard[y + 1][x + 1] = "bKingAttack";
    }
    // down
    if (y + 1 < 8) {
      this.attackBoard[y + 1][x] = "bKingAttack";
    }
    // diagonal bottom-left
    if (x - 1 >= 0 && y + 1 < 8) {
      this.attackBoard[y + 1][x - 1] = "bKingAttack";
    }
    // left
    if (x - 1 >= 0) {
      this.attackBoard[y][x - 1] = "bKingAttack";
    }
    // diagonal top-left
    if (x - 1 >= 0 && y - 1 >= 0) {
      this.attackBoard[y - 1][x - 1] = "bKingAttack";
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    let safeArray = this.isSpotSafe(oldMoveX, oldMoveY);
    // right
    if (safeArray[2] && oldMoveX + 1 == newMoveX && oldMoveY == newMoveY) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // down
    else if (safeArray[4] && oldMoveY + 1 == newMoveY && oldMoveX == newMoveX) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // left
    else if (safeArray[6] && oldMoveX - 1 == newMoveX && oldMoveY == newMoveY) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // up
    else if (safeArray[0] && oldMoveY - 1 == newMoveY && oldMoveX == newMoveX) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-right
    else if (
      safeArray[1] &&
      oldMoveY - 1 == newMoveY &&
      oldMoveX + 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-right
    else if (
      safeArray[3] &&
      oldMoveY + 1 == newMoveY &&
      oldMoveX + 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-left
    else if (
      safeArray[5] &&
      oldMoveY + 1 == newMoveY &&
      oldMoveX - 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-left
    else if (
      safeArray[7] &&
      oldMoveY - 1 == newMoveY &&
      oldMoveX - 1 == newMoveX
    ) {
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        this.canCastle = false;
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    if (this.isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
      this.castlesRight(newMoveX, newMoveY, oldMoveX, oldMoveY);
    }
    if (this.isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY)) {
      this.castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY);
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  isSpotSafe(x, y) {
    let safeArray = [true, true, true, true, true, true, true, true];
    for (let i = 0; i < 16; i++) {
      // up
      if (
        y - 1 < 0 ||
        board[y - 1][x][0] == "b" ||
        whitePieceArray[i].attackBoard[y - 1][x] != ""
      ) {
        safeArray[0] = false;
      }
      // diagonal top-right
      if (
        y - 1 < 0 ||
        x + 1 >= 8 ||
        board[y - 1][x + 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y - 1][x + 1] != ""
      ) {
        safeArray[1] = false;
      }
      // right
      if (
        x + 1 >= 8 ||
        board[y][x + 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y][x + 1] != ""
      ) {
        safeArray[2] = false;
      }
      // diagonal bottom-right
      if (
        y + 1 >= 8 ||
        x + 1 >= 8 ||
        board[y + 1][x + 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y + 1][x + 1] != ""
      ) {
        safeArray[3] = false;
      }
      // bottom
      if (
        y + 1 >= 8 ||
        board[y + 1][x][0] == "b" ||
        whitePieceArray[i].attackBoard[y + 1][x] != ""
      ) {
        safeArray[4] = false;
      }
      // diagonal bottom-left
      if (
        y + 1 >= 8 ||
        x - 1 < 0 ||
        board[y + 1][x - 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y + 1][x - 1] != ""
      ) {
        safeArray[5] = false;
      }
      // left
      if (
        x - 1 < 0 ||
        board[y][x - 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y][x - 1] != ""
      ) {
        safeArray[6] = false;
      }
      // diagonal top-left
      if (
        y - 1 < 0 ||
        x - 1 < 0 ||
        board[y - 1][x - 1][0] == "b" ||
        whitePieceArray[i].attackBoard[y - 1][x - 1] != ""
      ) {
        safeArray[7] = false;
      }
    }
    return safeArray;
  }
  isCastleRight(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    if (
      oldMoveY == newMoveY &&
      (oldMoveX + 2 == newMoveX || oldMoveX + 3 == newMoveX)
    ) {
      if (
        board[0][4] == "bK" &&
        board[0][5] == "" &&
        board[0][6] == "" &&
        board[0][7] == "bR2"
      ) {
        for (let i = 0; i < 16; i++) {
          if (
            whitePieceArray[i].attackBoard[0][4] != "" ||
            whitePieceArray[i].attackBoard[0][5] != "" ||
            whitePieceArray[i].attackBoard[0][6] != "" ||
            whitePieceArray[i].attackBoard[0][7] != ""
          ) {
            return false;
          }
        }
        return true;
      }
    }
  }
  isCastleLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    if (
      oldMoveY == newMoveY &&
      (oldMoveX - 2 == newMoveX ||
        oldMoveX - 3 == newMoveX ||
        oldMoveX - 4 == newMoveX)
    ) {
      if (
        board[0][4] == "bK" &&
        board[0][3] == "" &&
        board[0][2] == "" &&
        board[0][1] == "" &&
        board[0][0] == "bR1"
      ) {
        for (let i = 0; i < 16; i++) {
          if (
            whitePieceArray[i].attackBoard[0][4] != "" ||
            whitePieceArray[i].attackBoard[0][3] != "" ||
            whitePieceArray[i].attackBoard[0][2] != "" ||
            whitePieceArray[i].attackBoard[0][1] != "" ||
            whitePieceArray[i].attackBoard[0][0] != ""
          ) {
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
    board[oldMoveY][oldMoveX] = "";
    board[newMoveY][newMoveX] = temp;
    this.x = newMoveX * 100;
    this.y = newMoveY * 100;
    this.prevX = this.x;
    this.prevY = this.y;
    board[0][7] = "";
    board[0][5] = "bR2";
    blackPieceArray[5].x = 500;
    blackPieceArray[5].y = 0;
    blackPieceArray[5].prevX = 500;
    blackPieceArray[5].prevY = 0;
    if (whiteMoveFirst) {
      whiteMoveFirst = false;
    } else {
      whiteMoveFirst = true;
    }
  }
  castlesLeft(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    newMoveX = 2;
    let temp = board[oldMoveY][oldMoveX];
    board[oldMoveY][oldMoveX] = "";
    board[newMoveY][newMoveX] = temp;
    this.x = newMoveX * 100;
    this.y = newMoveY * 100;
    this.prevX = this.x;
    this.prevY = this.y;
    board[0][0] = "";
    board[0][3] = "bR1";
    blackPieceArray[4].x = 300;
    blackPieceArray[4].y = 0;
    blackPieceArray[4].prevX = 300;
    blackPieceArray[4].prevY = 0;
    if (whiteMoveFirst) {
      whiteMoveFirst = false;
    } else {
      whiteMoveFirst = true;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    let x = this.x / 100;
    let y = this.y / 100;
    let canMove;
    // up
    if (y - 1 >= 0 && board[y - 1][x][0] != "b") {
      // moving to a spot within bounds and is a blank square or enemy square
      // making sure that move does not land on enemy attack square
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y - 1][x] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y - 1][x]);
        priority = priority + this.heuristicBoard[y - 1][x];
        moveSet.enqueue([y - 1, x], priority);
      }
    }
    // diagonal top-right
    if (y - 1 >= 0 && x + 1 < 8 && board[y - 1][x + 1][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y - 1][x + 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y - 1][x + 1]);
        priority = priority + this.heuristicBoard[y - 1][x + 1];
        moveSet.enqueue([y - 1, x + 1], priority);
      }
    }
    // right
    if (x + 1 < 8 && board[y][x + 1][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y][x + 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y][x + 1]);
        priority = priority + this.heuristicBoard[y][x + 1];
        moveSet.enqueue([y, x + 1], priority);
      }
    }
    // diagonal bottom-right
    if (x + 1 < 8 && y + 1 < 8 && board[y + 1][x + 1][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y + 1][x + 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y + 1][x + 1]);
        priority = priority + this.heuristicBoard[y + 1][x + 1];
        moveSet.enqueue([y + 1, x + 1], priority);
      }
    }
    // down
    if (y + 1 < 8 && board[y + 1][x][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y + 1][x] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y + 1][x]);
        priority = priority + this.heuristicBoard[y + 1][x];
        moveSet.enqueue([y + 1, x], priority);
      }
    }
    // diagonal bottom-left
    if (x - 1 >= 0 && y + 1 < 8 && board[y + 1][x - 1][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y + 1][x - 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y + 1][x - 1]);
        priority = priority + this.heuristicBoard[y + 1][x - 1];
        moveSet.enqueue([y + 1, x - 1], priority);
      }
    }
    // left
    if (x - 1 >= 0 && board[y][x - 1][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y][x - 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y][x - 1]);
        priority = priority + this.heuristicBoard[y][x - 1];
        moveSet.enqueue([y, x - 1], priority);
      }
    }
    // diagonal top-left
    if (x - 1 >= 0 && y - 1 >= 0 && board[y - 1][x - 1][0] != "b") {
      canMove = true;
      for (let i = 0; i < 16; i++) {
        if (whitePieceArray[i].isAlive) {
          if (whitePieceArray[i].attackBoard[y + 1][x - 1] != "") {
            canMove = false;
            break;
          }
        }
      }
      if (canMove) {
        priority = 0;
        priority = pieceWorth(board[y - 1][x - 1]);
        priority = priority + this.heuristicBoard[y - 1][x - 1];
        moveSet.enqueue([y - 1, x - 1], priority);
      }
    }
    return moveSet;
  }
}
class BlackQueen extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[0][3] = "bQ1";
      this.x = 300;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 2) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 3) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 4) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 5) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 6) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 7) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 8) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      ];
    } else if (num == 9) {
      this.x;
      this.y;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 7;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
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
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      y--;
    }
    // diagonal top-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y - 1;
    while (x < 8 && y >= 0) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      x++;
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      x++;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      x++;
      y++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      x--;
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      x--;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bQueenAttack";
        break;
      }
      this.attackBoard[y][x] = "bQueenAttack";
      x--;
      y--;
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // down
    if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY + 1;
      // count each space up until new position. If contact with piece in-between, reset
      // do not count original position of piece or landing square
      while (count <= newMoveY - 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      // if landing square is blank
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      }
      // if landing square is taken, capture if opponent piece
      else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // right
    else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX + 1;
      while (count <= newMoveX - 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // up
    else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY - 1;
      while (count >= newMoveY + 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // left
    else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX - 1;
      while (count >= newMoveX + 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-right
    else if (
      newMoveX > oldMoveX &&
      newMoveY < oldMoveY &&
      newMoveX - oldMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY - 1;
      while (countX <= newMoveX - 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-right
    else if (
      newMoveX > oldMoveX &&
      newMoveY > oldMoveY &&
      newMoveX - oldMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY + 1;
      while (countX <= newMoveX - 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY > oldMoveY &&
      oldMoveX - newMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY + 1;
      while (countX >= newMoveX + 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY < oldMoveY &&
      oldMoveX - newMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY - 1;
      while (countX >= newMoveX + 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    // up
    let x = this.x / 100;
    let y = this.y / 100;
    y = y - 1;
    while (y >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        // taking a piece will have more priority (evaluate first) (also adding heuristic/ piece placement board)
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y--;
    }
    // diagonal top-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y - 1;
    while (x < 8 && y >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y--;
    }
    return moveSet;
  }
}
class BlackBishop extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[0][2] = "bB1";
      this.x = 200;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 8;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
        [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
        [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
        [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
      ];
    } else if (num == 2) {
      board[0][5] = "bB2";
      this.x = 500;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 8;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
        [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
        [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
        [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
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
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "bBishopAttack";
      x++;
      y--;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "bBishopAttack";
      x++;
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "bBishopAttack";
      x--;
      y++;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bBishopAttack";
        break;
      }
      this.attackBoard[y][x] = "bBishopAttack";
      x--;
      y--;
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // diagonal top-right
    if (
      newMoveX > oldMoveX &&
      newMoveY < oldMoveY &&
      newMoveX - oldMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY - 1;
      while (countX <= newMoveX - 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-right
    else if (
      newMoveX > oldMoveX &&
      newMoveY > oldMoveY &&
      newMoveX - oldMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX + 1;
      let countY = oldMoveY + 1;
      while (countX <= newMoveX - 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX++;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal bottom-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY > oldMoveY &&
      oldMoveX - newMoveX == newMoveY - oldMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY + 1;
      while (countX >= newMoveX + 1 && countY <= newMoveY - 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // diagonal top-left
    else if (
      newMoveX < oldMoveX &&
      newMoveY < oldMoveY &&
      oldMoveX - newMoveX == oldMoveY - newMoveY
    ) {
      let countX = oldMoveX - 1;
      let countY = oldMoveY - 1;
      while (countX >= newMoveX + 1 && countY >= newMoveY + 1) {
        if (board[countY][countX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        countX--;
        countY--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    // diagonal top-right
    let x = this.x / 100;
    let y = this.y / 100;
    x = x + 1;
    y = y - 1;
    while (x < 8 && y >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y--;
    }
    // diagonal bottom-right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    y = y + 1;
    while (x < 8 && y < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
      y++;
    }
    // diagonal bottom-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y + 1;
    while (x >= 0 && y < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y++;
    }
    // diagonal top-left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    y = y - 1;
    while (x >= 0 && y >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
      y--;
    }
    return moveSet;
  }
}
class BlackKnight extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[0][1] = "bKn1";
      this.x = 100;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 9;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
        [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
        [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
        [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
        [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
        [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
      ];
    } else if (num == 2) {
      board[0][6] = "bKn2";
      this.x = 600;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 9;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
        [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
        [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
        [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
        [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
        [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
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
      this.attackBoard[y - 2][x + 1] = "bKnightAttack";
    }
    // top-right horizontal
    if (y - 1 >= 0 && x + 2 < 8) {
      this.attackBoard[y - 1][x + 2] = "bKnightAttack";
    }
    // bottom-right horizontal
    if (y + 1 < 8 && x + 2 < 8) {
      this.attackBoard[y + 1][x + 2] = "bKnightAttack";
    }
    // bottom-right vertical
    if (y + 2 < 8 && x + 1 < 8) {
      this.attackBoard[y + 2][x + 1] = "bKnightAttack";
    }
    // bottom-left vertical
    if (y + 2 < 8 && x - 1 >= 0) {
      this.attackBoard[y + 2][x - 1] = "bKnightAttack";
    }
    // bottom-left horizontal
    if (y + 1 < 8 && x - 2 >= 0) {
      this.attackBoard[y + 1][x - 2] = "bKnightAttack";
    }
    // top-left horizontal
    if (y - 1 >= 0 && x - 2 >= 0) {
      this.attackBoard[y - 1][x - 2] = "bKnightAttack";
    }
    // top-left vertical
    if (y - 2 >= 0 && x - 1 >= 0) {
      this.attackBoard[y - 2][x - 1] = "bKnightAttack";
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    if (
      board[newMoveY][newMoveX] == "" ||
      board[newMoveY][newMoveX][0] == "w"
    ) {
      // bottom-right horizontal
      if (oldMoveX + 2 == newMoveX && oldMoveY + 1 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // bottom-right vertical
      else if (oldMoveX + 1 == newMoveX && oldMoveY + 2 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // bottom-left vertical
      else if (oldMoveX - 1 == newMoveX && oldMoveY + 2 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // bottom-left horizontal
      else if (oldMoveX - 2 == newMoveX && oldMoveY + 1 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-left horizontal
      else if (oldMoveX - 2 == newMoveX && oldMoveY - 1 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-left vertical
      else if (oldMoveX - 1 == newMoveX && oldMoveY - 2 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-right vertical
      else if (oldMoveX + 1 == newMoveX && oldMoveY - 2 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      }
      // top-right horizontal
      else if (oldMoveX + 2 == newMoveX && oldMoveY - 1 == newMoveY) {
        if (
          this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
        ) {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        } else {
          this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
        }
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    let x = this.x / 100;
    let y = this.y / 100;
    // top-right vertical
    if (y - 2 >= 0 && x + 1 < 8 && board[y - 2][x + 1][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y - 2][x + 1]);
      priority = priority + this.heuristicBoard[y - 2][x + 1];
      moveSet.enqueue([y - 2, x + 1], priority);
    }
    // top-right horizontal
    if (y - 1 >= 0 && x + 2 < 8 && board[y - 1][x + 2][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y - 1][x + 2]);
      priority = priority + this.heuristicBoard[y - 1][x + 2];
      moveSet.enqueue([y - 1, x + 2], priority);
    }
    // bottom-right horizontal
    if (y + 1 < 8 && x + 2 < 8 && board[y + 1][x + 2][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y + 1][x + 2]);
      priority = priority + this.heuristicBoard[y + 1][x + 2];
      moveSet.enqueue([y + 1, x + 2], priority);
    }
    // bottom-right vertical
    if (y + 2 < 8 && x + 1 < 8 && board[y + 2][x + 1][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y + 2][x + 1]);
      priority = priority + this.heuristicBoard[y + 2][x + 1];
      moveSet.enqueue([y + 2, x + 1], priority);
    }
    // bottom-left vertical
    if (y + 2 < 8 && x - 1 >= 0 && board[y + 2][x - 1][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y + 2][x - 1]);
      priority = priority + this.heuristicBoard[y + 2][x - 1];
      moveSet.enqueue([y + 2, x - 1], priority);
    }
    // bottom-left horizontal
    if (y + 1 < 8 && x - 2 >= 0 && board[y + 1][x - 2][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y + 1][x - 2]);
      priority = priority + this.heuristicBoard[y + 1][x - 2];
      moveSet.enqueue([y + 1, x - 2], priority);
    }
    // top-left horizontal
    if (y - 1 >= 0 && x - 2 >= 0 && board[y - 1][x - 2][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y - 1][x - 2]);
      priority = priority + this.heuristicBoard[y - 1][x - 2];
      moveSet.enqueue([y - 1, x - 2], priority);
    }
    // top-left vertical
    if (y - 2 >= 0 && x - 1 >= 0 && board[y - 2][x - 1][0] != "b") {
      priority = 0;
      priority = pieceWorth(board[y - 2][x - 1]);
      priority = priority + this.heuristicBoard[y - 2][x - 1];
      moveSet.enqueue([y - 2, x - 1], priority);
    }
    return moveSet;
  }
}
class BlackRook extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[0][0] = "bR1";
      this.x = 0;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 10;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 2) {
      board[0][7] = "bR2";
      this.x = 700;
      this.y = 0;
      this.prevX = this.x;
      this.prevY = this.y;
      this.transpositionNum = 10;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
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
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bRookAttack";
        break;
      }
      this.attackBoard[y][x] = "bRookAttack";
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bRookAttack";
        break;
      }
      this.attackBoard[y][x] = "bRookAttack";
      x++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bRookAttack";
        break;
      }
      this.attackBoard[y][x] = "bRookAttack";
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0) {
      if (
        (!(board[y][x] == "wK") && board[y][x][0] == "b") ||
        board[y][x][0] == "w"
      ) {
        this.attackBoard[y][x] = "bRookAttack";
        break;
      }
      this.attackBoard[y][x] = "bRookAttack";
      x--;
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // down
    if (newMoveY > oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY + 1;
      // count each space up until new position. If contact with piece in-between, reset
      // do not count original position of piece or landing square
      while (count <= newMoveY - 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      // if landing square is blank
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      }
      // if landing square is taken, capture if opponent piece
      else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // right
    else if (newMoveX > oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX + 1;
      while (count <= newMoveX - 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count++;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // up
    else if (newMoveY < oldMoveY && newMoveX == oldMoveX) {
      let count = oldMoveY - 1;
      while (count >= newMoveY + 1) {
        if (board[count][oldMoveX] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    }
    // left
    else if (newMoveX < oldMoveX && newMoveY == oldMoveY) {
      let count = oldMoveX - 1;
      while (count >= newMoveX + 1) {
        if (board[oldMoveY][count] != "") {
          this.x = this.prevX;
          this.y = this.prevY;
          return;
        }
        count--;
      }
      if (board[newMoveY][newMoveX] == "") {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else if (
        board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackForBlack(newMoveX, newMoveY, oldMoveX, oldMoveY)
      ) {
        this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    // up
    let x = this.x / 100;
    let y = this.y / 100;
    y = y - 1;
    while (y >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y--;
    }
    // right
    x = this.x / 100;
    y = this.y / 100;
    x = x + 1;
    while (x < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x++;
    }
    // down
    x = this.x / 100;
    y = this.y / 100;
    y = y + 1;
    while (y < 8 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      y++;
    }
    // left
    x = this.x / 100;
    y = this.y / 100;
    x = x - 1;
    while (x >= 0 && board[y][x][0] != "b") {
      priority = 0;
      if (board[y][x][0] == "w") {
        priority = pieceWorth(board[y][x]);
        priority = priority + this.heuristicBoard[y][x];
        moveSet.enqueue([y, x], priority);
        break;
      }
      priority = this.heuristicBoard[y][x];
      moveSet.enqueue([y, x], priority);
      x--;
    }
    return moveSet;
  }
}
class BlackPawn extends Piece {
  constructor(num) {
    super();
    if (num == 1) {
      board[1][0] = "bP1";
      this.x = 0;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 2) {
      board[1][1] = "bP2";
      this.x = 100;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 3) {
      board[1][2] = "bP3";
      this.x = 200;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 4) {
      board[1][3] = "bP4";
      this.x = 300;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 5) {
      board[1][4] = "bP5";
      this.x = 400;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 6) {
      board[1][5] = "bP6";
      this.x = 500;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 7) {
      board[1][6] = "bP7";
      this.x = 600;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
    } else if (num == 8) {
      board[1][7] = "bP8";
      this.x = 700;
      this.y = 100;
      this.prevX = this.x;
      this.prevY = this.y;
      this.canEnPassant = false;
      this.justDoubleJumped = false;
      this.transpositionNum = 11;
      this.attackBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.moveBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];
      this.heuristicBoard = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
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
      this.attackBoard[y + 1][x + 1] = "bPawnAttack";
    }
    // diagonal bottom-left
    if (y + 1 < 8 && x - 1 >= 0) {
      this.attackBoard[y + 1][x - 1] = "bPawnAttack";
    }
    if (y == 1) {
      if (board[y + 1][x] == "") {
        this.moveBoard[y + 1][x] = "bPawnMove";
        if (board[y + 2][x] == "") {
          this.moveBoard[y + 2][x] = "bPawnMove";
        }
      }
    } else {
      if (y + 1 < 8 && board[y + 1][x] == "") {
        this.moveBoard[y + 1][x] = "bPawnMove";
      }
    }
  }
  logic(newMoveX, newMoveY) {
    let oldMoveX = floor(this.prevX / 100);
    let oldMoveY = floor(this.prevY / 100);
    // attacking opponent?
    if (
      (board[newMoveY][newMoveX] != "" &&
        this.isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY)) ||
      this.canPawnEnPassant(newMoveX, newMoveY, oldMoveX, oldMoveY)
    ) {
      this.setNewMove(newMoveX, newMoveY, oldMoveX, oldMoveY);
    } else if (board[newMoveY][newMoveX] == "") {
      // initial position. Can jump two spots (making sure spot in between is empty)
      if (
        oldMoveY == 1 &&
        oldMoveY + 2 == newMoveY &&
        oldMoveX == newMoveX &&
        board[oldMoveY + 1][oldMoveX] == ""
      ) {
        if (
          (newMoveX - 1 >= 0 && board[newMoveY][newMoveX - 1][1] == "P") ||
          (newMoveX + 1 < 8 && board[newMoveY][newMoveX + 1][1] == "P")
        ) {
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
      } else {
        this.x = this.prevX;
        this.y = this.prevY;
      }
    } else {
      this.x = this.prevX;
      this.y = this.prevY;
    }
  }
  isLegalAttackPawn(newMoveX, newMoveY, oldMoveX, oldMoveY) {
    if (
      oldMoveY + 1 == newMoveY &&
      (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)
    ) {
      for (let i = 0; i < 16; i++) {
        // make sure that it is opponent piece
        if (whitePieceArray[i].isAlive) {
          if (board[newMoveY][newMoveX] == whiteIdentityArray[i]) {
            board[newMoveY][newMoveX] = "";
            whitePieceArray[i].isAlive = false;
            zobrist =
              zobrist ^
              transpositionBoard[newMoveY][newMoveX][
                whitePieceArray[i].transpositionNum
              ];
            whitePieceArray[i].attackBoard = this.resetTypeBoards(
              whitePieceArray[i].attackBoard
            );
            if (i >= 8) {
              whitePieceArray[i].moveBoard = this.resetTypeBoards(
                whitePieceArray[i].moveBoard
              );
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
    if (
      oldMoveY + 1 == newMoveY &&
      (oldMoveX + 1 == newMoveX || oldMoveX - 1 == newMoveX)
    ) {
      for (let i = 8; i < 16; i++) {
        // make sure that it is opponent piece
        if (whitePieceArray[i].isAlive) {
          if (
            this.canEnPassant &&
            whitePieceArray[i].justDoubleJumped &&
            board[newMoveY - 1][newMoveX] == whiteIdentityArray[i]
          ) {
            board[newMoveY + 1][newMoveX] = "";
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
  pieceMoves() {
    let moveSet = new PriorityQueue();
    let priority;
    let x = this.x / 100;
    let y = this.y / 100;
    // diagonal bottom-right
    if (y + 1 < 8 && x + 1 < 8 && board[y + 1][x + 1][0] == "w") {
      priority = 0;
      priority = pieceWorth(board[y + 1][x + 1]);
      priority = priority + this.heuristicBoard[y + 1][x + 1];
      moveSet.enqueue([y + 1, x + 1], priority);
    }
    // diagonal bottom-left
    if (y + 1 < 8 && x - 1 >= 0 && board[y + 1][x - 1][0] == "w") {
      priority = 0;
      priority = pieceWorth(board[y + 1][x - 1]);
      priority = priority + this.heuristicBoard[y + 1][x - 1];
      moveSet.enqueue([y + 1, x - 1], priority);
    }
    if (y == 1) {
      if (board[y + 1][x] == "") {
        priority = 0;
        priority = this.heuristicBoard[y + 1][x];
        moveSet.enqueue([y + 1, x], priority);
        if (board[y + 2][x] == "") {
          priority = 0;
          priority = this.heuristicBoard[y + 2][x];
          moveSet.enqueue([y + 2, x], priority);
        }
      }
    } else {
      if (y + 1 < 8 && board[y + 1][x] == "") {
        priority = 0;
        priority = this.heuristicBoard[y + 1][x];
        moveSet.enqueue([y + 1, x], priority);
      }
    }
    return moveSet;
  }
}

class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    // return true if stack is empty
    return this.items.length == 0;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(coordinates, priority) {
    let qElement = new QElement(coordinates, priority);
    let contain = false;
    for (let i = 0; i < this.items.length; i++) {
      if (qElement.priority > this.items[i].priority) {
        // at position 'i' add the coordinates (qElement and its priority)
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    // removes first element of array (shift() returns that removed element)
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  rear() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length == 0;
  }
}

class QElement {
  constructor(coordinates, priority) {
    this.coordinates = coordinates;
    this.priority = priority;
  }
  peek() {
    return this.coordinates;
  }
}
