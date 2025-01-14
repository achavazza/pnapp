<script setup>
import { ref, computed } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { AnimatePresence, Motion } from 'motion-v'

import TimerComponent from "../components/Timer.vue";
import { useTimerStore } from "../stores/timer";


const timerStore = useTimerStore();
const timers    = computed(() => timerStore.timers);
const colors    = computed(() => timerStore.colors);
const thisTime  = computed(() => timerStore.thisTime);
const thisColor = computed(() => timerStore.thisColor);
const newTimer  = computed(() => timerStore.newTimer);

const formatter = ref('mm:ss');
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
        <div>
            <AnimatePresence multiple as="ul" class="grid-wrapper">
                <Motion 
                as="li"
                v-for="(timer, i) in timers" :key="timer.id"
                v-show="timer.visible" 
                :initial="{ scale: 0 }"
                :animate="{ scale: 0.5, scale: 1 }"
                :ease="anticipate"
                :exit="{ scale:1.5, scale: 0 }" :class="`grid grid-${i}`" :data-id="timer.id">
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
                
            </Motion>
            <li :class="`grid grid-${timers.length}`">
                <div class="tile"  :style="`background:${colors[bgcolor = timers.length % colors.length]}`" :key="timers.length">
                    <div class="tile-contents">
                        <input class="input" type="text" inputmode="numeric"  :value="val" @blur="focusOut($event)" @focus="focusIn($event)" />
                    </div>
                    <div class="tile-contents controls controls-add">
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
            </AnimatePresence>
        </div>
    </div>
    <Transition name="pop">
        <TimerComponent v-if="thisTime" :timer="thisTime" :color="thisColor"/>
    </Transition>
</template>

<style>

</style>
