<script setup>
import { ref, computed } from 'vue';
import { useDateFormat } from '@vueuse/core';

import TimerComponent from "../components/Timer.vue";
import { useTimerStore } from "../stores/timer";

const timerStore = useTimerStore();
const timers    = computed(() => timerStore.timers);
const colors    = computed(() => timerStore.colors);
const thisTime  = computed(() => timerStore.thisTime);
const thisColor = computed(() => timerStore.thisColor);
const newTimer  = computed(() => timerStore.newTimer);

const formatter = ref('m:ss');
const formatted = (i) => useDateFormat(i * 1000, formatter);
const newFormat = computed(() => useDateFormat(timerStore.newTimer * 1000, formatter).value);

/*
const setTimer = (id) => {
    const timer = timerStore.timers.find(timer => timer.id === id);
    if (timer) {
        timerStore.thisTime = timer.duration;
        timerStore.thisColor = colors[timerStore.timers.indexOf(timer) % colors.length];
    }
};
*/

const setTimer       = (id) => timerStore.setTimer(id);
const incrementTimer = () => timerStore.incrementTimer();
const decrementTimer = () => timerStore.decrementTimer();

const removeTimer = (id) => timerStore.removeTimer(id);
const addTimer = (value) => timerStore.addTimer(value);


// para el input
let val = newFormat;
const focusIn = (v) => {
    val = timerStore.newTimer;
    v.target.value = val;
};

const focusOut = (v) => {
    timerStore.setNewTimer(parseInt(v.target.value));
    val = formatted(timerStore.newTimer).value;
    v.target.value = val;
};

const isNumber = (evt) => {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
    } else {
        return true;
    }
};

</script>

<template>
    <div class="wrapper">
        <ul class="grid-wrapper">
            <TransitionGroup name="list">
                <li v-for="(timer, i) in timers" :key="timer.id" :class="`grid grid-${i}`" :data-id="timer.id">
                    <div class="tile" @click.stop="setTimer(timer.id)" :style="`background-color:${colors[timers.indexOf(timer) % colors.length]}`">
                        <div class="tile-contents">
                            <span class="number">{{ formatted(timer.duration).value }}</span>
                        </div>
                        <div class="tile-contents controls">
                            <button class="button button-alt" @click.stop="removeTimer(timer.id)" :style="`color:${colors[timers.indexOf(timer) % colors.length]}`">
                                <span class="material-symbols-outlined"> close </span>
                            </button>
                        </div>
                    </div>
                </li>
            </TransitionGroup>
            <li :class="`grid grid-${timers.length+1}`">
                <div class="tile"  :style="`background:${colors[bgcolor = timers.length % colors.length]}`" :key="timers.length+1">
                    <div class="tile-contents">
                        <input class="input" type="text" :value="val" @blur="focusOut($event)" @focus="focusIn($event)" />
                    </div>
                    <div class="tile-contents controls">
                        <button class="button" :disabled="(val == '0:00' ? true : null)" @click="addTimer(newTimer)">
                            <span class="material-symbols-outlined"> add </span>
                        </button>
                        <button class="button button-alt" @click="decrementTimer()" :style="`color:${colors[bgcolor]}`">
                            <span class="material-symbols-outlined"> arrow_back </span>
                        </button>
                        <button class="button button-alt" @click="incrementTimer()" :style="`color:${colors[bgcolor]}`">
                            <span class="material-symbols-outlined"> arrow_forward </span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <Transition name="pop">
        <TimerComponent v-if="thisTime" :timer="thisTime" :color="thisColor"/>
    </Transition>
</template>

<style>
.grid{
    position: relative;
    border-radius:30px;
}
.grid:before,
.grid:after{
    content: '';
    position: absolute;
    background: white;
    width:10px;
    height: 10px;
    border-radius: 50%;
    z-index: 1;
    /*
    top:50%;
    left:50%;
    transform: translate(0,0) scale(1);
    */
    transform: scale(10);
    transition: all 200ms ease-out;
    opacity: 0;
}
.grid:before{
    top:50%;
    left:50%;
}
.grid:after{
    right:50%;
    bottom:50%;
}
.list-enter-active,
.list-leave-active,
.list-enter-active .tile,
.list-leave-active .tile {
    transition: all 200ms ease-out;
}
/*
.list-leave-active .tile{
    transition: all 200ms ease-in-out;
	height:0%;
	width:0%;
}*/
.list-enter .tile,
.list-enter-to .tile,
.list-leave-from .tile {
	opacity: 1;
    transform: scale(0.95);
}
.list-leave-active{
    border:2px solid rgba(255,255,255,1);
    
}
.list-leave-from{
    border-color: rgba(255,255,255,0);
}
.list-enter-from .tile,
.list-leave-to  .tile{
    opacity: 0;
    transform: scale(1.01);
}

.list-leave-active:before{
    /*transform: translate(-50px,-10px) scale(0.75);*/
    top:20%;
    left:30%;
    opacity: 1;
    transform: scale(5);
}
.list-leave-active:after{
    /*transform: translate(50px,10px) scale(1.5);*/
    bottom:20%;
    right:30%;
    transform: scale(2);
    opacity: 1;
}
.list-leave-from:before,
.list-leave-to:before{
    opacity: 1;
}

/* 
&:before {
    content: '';
    position: absolute;
    background: white;
    width:10px;
    height: 10px;
    top: 35%;
    left: 45%;
    border-radius: 50%;
}
&:after {
    content: '';
    position: absolute;
    background: white;
    width: 5px;
    height: 5px;
    bottom: 35%;
    right: 45%;
    border-radius: 50%;
}
*/


.pop-enter-active,
.pop-leave-active {
    transition: all 200ms ease-in-out;
    transform: scale(1);
}

.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: scale(1.05);
}
</style>
