<script>
    import { RouterLink } from 'vue-router';

    export default {
    props: {
        btnText: String,
        btnColor : String,
    },
    components: { RouterLink }
}
</script>

<template>
    <RouterLink to="/game" :style="[btnColor ? {'backgroundColor' : btnColor} : {}]"> {{ btnText }} </RouterLink>
</template>

<style scoped>
    a {
        text-decoration: none;
        border: 2px solid #441d76;
        padding: 10px 40px;
        font-size: 45px;
        font-weight: 700;
        border-radius: 16px;
        color: whitesmoke;
        background-color: #b155c1;
        position: relative;
        transition: .2s all ease-in-out;
        transform-style: preserve-3d;
    }

    a:after {
        position: absolute;
        content: "";
        background-color: #8b23b6;
        width: 100%;
        top: 0;
        left: 0;
        height: 76px;
        border-radius: inherit;
        z-index: -1;
        transition: .2s all ease-in-out;
        transform: translate3d(0, 10px, -1px); 
        /* #b155b169 */
        box-shadow: 0px 0px 0px 2px #441d76;
    }

    a:hover {
        transform: translate(0, 3px);
    }

    a:active {
        transform: translate(0, 10px);
    }

    a:hover::after {
        box-shadow: 0px 0px 0px 2px #441d76;
        transform: translate3d(0, 7px, -1px);
    }

    a:active::after {
        box-shadow: 0px 0px 0px 0px #441d76;
        transform: translate3d(0, 0, 0);
    }
    
</style>