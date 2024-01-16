<script>
    import SquareTile from "../components/SquareTile.vue"
    import Button from "../components/Button.vue";

    export default {
        data() {
            return {
                game_over : false,
                game_result : '',
                restart : false
            }
        },

        components : {
            SquareTile,
            Button
        },

        methods : {
            stopGame(result, winnerComb) {
                const gameArea = this.$refs.gameArea;
                gameArea.style.pointerEvents = 'none';

                this.game_over = true;
                this.game_result = result;

                if(winnerComb) {
                    this.drawWinLine(winnerComb)
                }
            },

            resetGame() {
                this.restart = true;
                this.game_over = false;
                this.game_result = '';

                const gameArea = this.$refs.gameArea;
                gameArea.classList = ['game-area'];
                gameArea.style.pointerEvents = 'all';
            },

            drawWinLine(winnerComb) {
                const gameAreaCL = this.$refs.gameArea.classList;

                if(winnerComb[0] <= 0) {

                    if(winnerComb[2] <= 2) {
                        gameAreaCL.add('first-row-line');
                    } else if (winnerComb[2] <= 6) {
                        gameAreaCL.add('first-column-line');
                    } else {
                        gameAreaCL.add('diag-right-line');
                    }

                } else if (winnerComb[0] <= 1) {

                    gameAreaCL.add('second-column-line');

                } else if (winnerComb[0] <= 2) {

                    if(winnerComb[2] <= 6) {
                        gameAreaCL.add('diag-left-line');
                    } else {
                        gameAreaCL.add('third-column-line');
                    }

                } else if(winnerComb[0] <= 3) {

                    gameAreaCL.add('second-row-line');

                } else {
                    
                    gameAreaCL.add('third-row-line');
                }
            }
        }
    }
</script>

<template>
    <div class="game-area" ref="gameArea">
        <SquareTile @stop-game="stopGame" ref="gameTile" :tileCount="9" :restart="restart" @restart-game="restart = false"/>
    </div>
    <div v-if="game_over" class="game-state">
        <p v-if="game_result === 'Draw'">Draw</p>
        <p v-else>Winner is <span>{{ game_result }}</span></p>
        <Button btnText="Play again" @click="resetGame"/>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    .game-area {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        position: relative;
        overflow: hidden;
        font-family: 'Permanent Marker', cursive;
    }

    .game-state > p {
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        color: whitesmoke;
    }

    .game-state > p > span {
        font-family: 'Permanent Marker', cursive;
    }

    .game-area::after {
        content: "";
        width: 100%;
        height: 5px;
        background-color: black;
        position: absolute;
        display: none;
    }

    .game-area.diag-right-line::after {
        display: block;
        transform: skewY(45deg);
        transform-origin: top left;
    }

    .game-area.diag-left-line::after {
        display: block;
        transform: skewY(-45deg);
        transform-origin: top right;
    }

    .game-area.first-row-line::after {
        display: block;
        grid-row-start: 1;
        grid-row-end: 2;
        align-self: center;
    }

    .game-area.second-row-line::after {
        display: block;
        grid-row-start: 2;
        grid-row-end: 3;
        align-self: center;
    }

    .game-area.third-row-line::after {
        display: block;
        grid-row-start: 3;
        grid-row-end: 4;
        align-self: center;
    }

    .game-area.first-column-line::after {
        display: block;
        grid-column-start: 1;
        grid-column-end: 2;
        width: 5%;
        height: 100vh;
        justify-self: center;
    }

    .game-area.second-column-line::after {
        display: block;
        grid-column-start: 2;
        grid-column-end: 3;
        width: 5%;
        height: 100vh;
        justify-self: center;
    }

    .game-area.third-column-line::after {
        display: block;
        grid-column-start: 3;
        grid-column-end: 4;
        width: 5%;
        height: 100vh;
        justify-self: center;
    }

</style>