import { defineStore } from 'pinia';
import { ref, reactive, toRefs } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useSound } from '@vueuse/sound';
import pop1 from '@/assets/sounds/multi-pop-1-188165.mp3';
import pop2 from '@/assets/sounds/infographic-pop-3-197869.mp3';
import pop3 from '@/assets/sounds/pop-sound-effect-197846.mp3';
import pop4 from '@/assets/sounds/bloop-1-184019.mp3';
import alarm from '@/assets/sounds/ringtone-126505.mp3';


export const useTimerStore = defineStore('timer', () => {
    const state = reactive({
        timers: [
            { id: uuidv4(), duration: 2400, visible: true},
            { id: uuidv4(), duration: 1800, visible: true },
            { id: uuidv4(), duration: 1500, visible: true },
            { id: uuidv4(), duration: 1200, visible: true },
            { id: uuidv4(), duration: 900 , visible: true },
            { id: uuidv4(), duration: 5   , visible: true },
        ],
        colors: ["#c2e9f8", "#cac3f7", "#fdf6c2", "#f8caee", "#c6e3a3"],
        thisTime: null,
        newTimer: 60,
        thisColor: null,
    });
    const volume = ref(0.75);
    const { play: popRemove } = useSound(pop1, { interrupt: true });
    const { play: popAdd    } = useSound(pop2, { interrupt: true });
    const { play: popClick  } = useSound(pop3, {volume, interrupt: true});
    const { play: popTimer  } = useSound(pop4, { interrupt: true });
    const { play: alarmTimer, stop: alarmStop } = useSound(alarm, { interrupt: true, loop: true });
    
    const setTimer = (id) => {
        const timer = state.timers.find(timer => timer.id === id);
        if (timer) {
            state.thisTime  = timer.duration;
            state.thisColor = state.colors[state.timers.indexOf(timer) % state.colors.length];
            popTimer();
        }
    };

    const addTimer = (value) => {
        state.timers.push({ id: uuidv4(), duration: value, visible: true });
        popAdd();
    };
    
    const removeTimer = (id) => {
        const timerIndex = state.timers.findIndex(t => t.id === id); // Find index reactively
        if (timerIndex !== -1) {
            state.timers[timerIndex].visible = false; // Update visibility
            popRemove(); // Play the sound
            // Optionally remove the timer after some delay if needed
            setTimeout(() => {
                state.timers =  state.timers.filter(t => t.id !== id);
            }, 300); // Adjust delay to match transition duration
        }
    };

    const setNewTimer = (value) => {
        state.newTimer = value
    };

    const incrementTimer = () => {
        state.newTimer += 10;
        popClick();
    };
    
    const decrementTimer = () => {
        if (state.newTimer > 0) {
            state.newTimer -= 10;
            popClick();
        }
    };
    
    const exit = () => {
        state.thisTime = null;
        alarmStop();
    };

    return {
        ...toRefs(state),
        addTimer,
        setTimer,
        removeTimer,
        setNewTimer,
        incrementTimer,
        decrementTimer,
        exit,
        alarmTimer
    };
});
