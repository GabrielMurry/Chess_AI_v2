# Chess AI v2
Version 2 of my chess AI in javascript using p5.js.
## The AI Algorithm
1. Minimax algorithm 
2. Alpha-beta pruning 
3. Heuristic boards to help prioritize move ordering which optimizes alpha-beta pruning
4. Transposition table using zobrist keys and hashing
## Purpose
The purpose of building a another version of my Chess AI is to learn how to optimize the algorithm and write cleaner code. In my first version, I implemented only the minimax algorithm, but the disorganization of the code and inadequate labeling prevented me from further progressing the AI. With this new version, I learned to properly organize my files and classes, use inheritence to my advantage, and comment/label my code (and variable names) in a way that is clean and understandable. This allowed me to dive deeper into higher level optimizations, such as alpha-beta pruning, heuristic boards, and a transposition table. This transposition table sets each indiviudal board configuration to its own zobrist key, hashes this key, and uses the bitwise operator XOR (exclusive or) which performs a logical operation after every new board configuration, which makes calculating new zobrist keys extremely efficient.
## Future 
My plan for the future is to recreate another chess AI from scratch, but implement a front-end framework, such as React, and a back-end where all the  calculations take place (preferreably in C++ which is a fast and efficient language - due to no intermediary translation required at runtime, unlike javascript or other languages).
