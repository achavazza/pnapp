<template>
  <div id="timer">
    <div class="frame" :style="`border-color: ${color}`">
      <!-- <h2 class="title" :style="`clip-path:inset(${time.progress}% 0 0 0);`"><span>{{time.formatted}}</span></h2> -->
      <div class="info">
        <!-- <div>
          <div>{{timer}}</div>
          <div>{{color}}</div>
          <div>{{time.progress}}</div>
          <div>{{props}}</div>
          <div>{{time.countDown}}</div>
          <div>{{isActive}}</div>
        </div> -->
        <span v-if="timer > time.counter">
          <button class="button" v-if="isActive" @click="pause" :style="`background:${color}`">
            <span class="material-symbols-outlined">pause</span>
          </button>
          <button class="button" v-if="!isActive" @click="resume" :style="`background:${color}`">
            <span class="material-symbols-outlined">play_arrow</span>
          </button>
        </span>
        <button class="button" @click="exit" :style="`background:${color}`">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <div class="bar" :style="`height:${time.progress}%;background-color:${color}`">
        <h2 class="title"><span>{{time.formatted}}</span></h2>
      </div>
      <h2 class="title title-back" :style="`color:${color}`"><span>{{time.formatted}}</span></h2>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
//import { useIntervalFn, useDateFormat, useWebNotification } from '@vueuse/core';
import { useTimerStore } from '../stores/timer';
import { storeToRefs } from 'pinia';

const props = defineProps({
  timer: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const timerStore = useTimerStore();
const { thisTime } = storeToRefs(timerStore);

const time = reactive({
  counter: 0,
  countDown: props.timer,
  progress: computed(() => (time.counter * 100) / props.timer),
  formatted: computed(() => useDateFormat(time.countDown * 1000, 'm:ss').value),
});

/* const { isSupported, show, onClick, onClose } = useWebNotification({
  title: 'Tiempo',
  dir: 'auto',
  lang: 'es',
  renotify: true,
  tag: 'PNApp',
  icon: './img/icons/favicon-32x32.png',
  vibrate: 4,
}); */

const { pause, resume, isActive } = useIntervalFn(() => {
  time.counter++;
  if (time.counter >= props.timer) {
    pause();
    setTimeout(() => {
      if (isSupported) {
        show();
      }
    }, 1000);
  }
  time.countDown--;
}, 1000);

const exit = () => {
  thisTime.value = null;
};

onClose(() => {
  //console.log('close');
  thisTime.value = null;
});

onClick(() => {
  //console.log('click');
  thisTime.value = null;
});
</script>

<style scoped>
/* Add your styles here */
</style>
