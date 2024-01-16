<script>
    export default {
        props : {
            tileCount : {
                type : Number,
                default : 9
            },

            restart : {
                type : Boolean,
                default : false
            }
        },

        data() {
            return {
                currentColor : "red",
                currentValue : "X",
                winningCombinations : [
                    [0, 1, 2], [0, 4, 8], [0, 3, 6],
                    [1, 4, 7],
                    [2, 4, 6], [2, 5, 8],
                    [3, 4, 5],
                    [6, 7, 8]
                ],

                x_positions : [],
                o_positions : [],

                currentWinnerComb : []
            }
        },

        methods : {
            placeMark(event) {
                const tileValue = event.target.querySelector(".tile-value");
                
                if (tileValue.textContent === '' && this.currentValue === 'X') {

                    tileValue.textContent = this.currentValue;
                    
                    this.changeColor(event.target);
                    this.getPositions(event.target, this.currentValue);

                    this.currentValue = "O";

                } else if (tileValue.textContent === '' && this.currentValue === 'O') {

                    tileValue.textContent = this.currentValue;
                    
                    this.changeColor(event.target);
                    this.getPositions(event.target, this.currentValue);

                    this.currentValue = "X";

                }
            },
            
            changeColor(tile) {

                if (this.currentColor === "red") {

                    tile.style.backgroundColor = this.currentColor;
                    this.currentColor = "blue";

                } else {

                    tile.style.backgroundColor = this.currentColor;
                    this.currentColor = "red";

                }

            },

            getPositions(tile, player) {
                
                if(player === "X") {

                    const xCurrentPos = this.$refs.squareTile.indexOf(tile);
                    this.x_positions.push(xCurrentPos);

                } else if (player === "O") {

                    const oCurrentPos = this.$refs.squareTile.indexOf(tile);
                    this.o_positions.push(oCurrentPos);

                }

                // console.log(`Moves X: ${this.x_positions}`);
                // console.log(`Moves O : ${this.o_positions}`);
            },

            checkWin(positions, player) {

                const winner = this.winningCombinations.some(comb => {
                    let win = 0;

                    positions.forEach(p => {
                        if(comb.includes(p)) win++
                    });

                    if(win >= 3) {
                        // console.log(`${player} - is winner!`);
                        this.currentWinnerComb = [...comb];
                        return true;
                    }
                });

                if(!winner) {
                
                    const checkDraw = this.isDraw(this.$refs.squareTile);
                    if(checkDraw) {
                        this.$emit('stop-game', 'Draw');
                    }

                } else {
                    this.$emit('stop-game', player, this.currentWinnerComb);
                }

            },

            isDraw(gameArea) {

                const emptyTiles = gameArea.filter(tile => {
                    const tileValue = tile.querySelector(".tile-value");

                    return tileValue.textContent === '';
                });

                if (emptyTiles.length <= 0) {
                    return true;
                } else {
                    return false;
                };

            },

            restartGame(gameArea) {
                this.$emit('restart-game');
                this.currentColor = 'red';
                this.currentValue = 'X'
                this.x_positions = [];
                this.o_positions = [];
                this.currentWinnerComb = [];

                gameArea.forEach(tile => {
                    tile.style.backgroundColor = 'gray';
                    const tileValue = tile.querySelector(".tile-value");

                    tileValue.textContent = '';
                })

            }
        },

        watch : {

            x_positions : {

                handler(newPos) {
                    this.checkWin(newPos, "X");
                },
                
                deep : true
            },

            o_positions : {

                handler(newPos) {
                    this.checkWin(newPos, "O");
                },

                deep : true
            },

            restart : function (newPos) {
                if(newPos === true) {
                    this.restartGame(this.$refs.squareTile)
                }
            }

        },

        emits : ['stop-game', 'restart-game']
    }
</script>

<template>
    <div class="tile" v-for="n in tileCount" @click="placeMark" ref="squareTile">
        <span class="tile-value"></span>
    </div>
</template>

<style scoped>
    div {
        width: 100px;
        height: 100px;
        background-color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div:hover {
        cursor: pointer;
    }

    .tile-value {
        font-size: 40px;
        font-weight: 700;
        pointer-events: none;
    }

    .tile.game-over {
        pointer-events: none;
    }
</style>