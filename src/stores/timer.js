import { defineStore } from 'pinia';
import { reactive, toRefs, computed } from 'vue';

export const useTimerStore = defineStore('timer', () => {
    const state = reactive({
        timers: [1800, 1200, 900, 5],
        colors: ["#c2e9f8", "#cac3f7", "#fdf6c2", "#f8caee", "#c6e3a3"],
        thisTime: null,
        newTimer: 60,
        thisColor: null,
    });

    const addTimer = (value) => {
        const i = state.colors.length;
        state.timers.push(value);
        //state.colors.push(state.colors[i % 5]);
    };

    const remove = (index) => {
        state.timers.splice(index, 1);
    };

    const setNewTimer = (value) => {
        console.log(value);
        state.newTimer = value;
    };

    return {
        ...toRefs(state),
        addTimer,
        remove,
        setNewTimer,
    };
});
