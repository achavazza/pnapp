<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, watch } from 'vue'
import { useDateFormat, usePermission } from '@vueuse/core'
import { useTimerStore } from "../stores/timer";

import TimerComponent from "../components/Timer.vue";
//import timeInput from "../components/timeInput.vue";

import { getNotification } from '@/composables/getNotifications'
const {notifyMe, permission} = getNotification()



const timerStore = useTimerStore();

//console.log(timerStore.timers)
//const timer = ref([30,20,15,10])
const timers    = timerStore.timers
const colors    = timerStore.colors
let store       = computed(() => timerStore)
let thisTime    = computed(() => timerStore.thisTime)
let thisColor   = computed(() => timerStore.thisColor)
let newTimer    = computed(() => timerStore.newTimer)
//let newTimer    = computed(() => timerStore.newTimer)

const formatter = ref('m:ss')
const formatted = (i) => useDateFormat(i*1000, formatter)
const newFormat = computed(() => useDateFormat(timerStore.newTimer*1000, formatter).value)


const setTimer = (i) => {
    //console.log(i)
    timerStore.thisTime  = timers[i] ? timers[i] : 10
    timerStore.thisColor = colors[i] ? colors[i] : colors[0]
}

const addTimer = (value) => {
    timerStore.addTimer(value)
}

const remove = (value) => {
    //thisTime = null
    timerStore.remove(value)
}

const incrementTimer = (value) => {
    timerStore.newTimer += 10
}

const decrementTimer = (value) => {
    if(timerStore.newTimer > 0){
        timerStore.newTimer -= 10
    }
}

let val = newFormat
const focusIn = (v) => {
    val = timerStore.newTimer
    v.target.value = val
}

const focusOut = (v) => {
    timerStore.setNewTimer(parseInt(v.target.value))
    val = formatted(timerStore.newTimer).value
    v.target.value = val
}

const isNumber = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
    } else {
        return true;
    }
}

onMounted(() => {
    //usePermission('push')
	if (permission) {
	notifyMe();
	}
})
</script>
<template>
	<div class="wrapper">
		<!-- <div :class="`grid grid-${i}`" v-for="(i, index) in 7" :key="index" :data-id="i"> -->
		<div :class="`grid grid-${i}`" v-for="(i, index) in timers.length" :key="index" :data-id="i">
			<div class="tile"  @click.stop="setTimer(index)" :style="`background-color:${colors[index % colors.length]}`">
			<!-- <a href="#" class="tile" @click="setTimer(index)" :style="`background-color:${store.colors[index]}`"> -->
				<div class="tile-contents">
					<!-- {{store.timers[index]}} -->
					<span class="number">{{formatted(timers[index]).value}}</span>
					<!-- {{formatted(store.timers[index]).value}} -->
					<!-- {{store.colors[index]}} -->
					<!-- {{i}} -->
				</div>
				<div class="tile-contents controls">
					<!-- <button class="button" @click="remove(index)" :style="`color:${store.colors[index % store.colors.length]}`"> -->
					<button class="button button-alt" @click.stop="remove(index)" :style="`color:${store.colors[index % store.colors.length]}`">
						<span class="material-symbols-outlined">
							close
						</span>
					</button>
				</div>
			</div>
		</div>
		<div class="grid">
			<div class="tile" :style="`background:${colors[bgcolor = timers.length % (colors.length)]}`">
				<div class="tile-contents">
					<!-- <timeInput :timer="newTimer"/>  -->
					<!-- <input class="input" type="text" v-model="formatter" @blur="focusOut" @focus="focusIn" /> -->
					<input class="input" type="text" :value="val" @blur="focusOut($event)" @focus="focusIn($event)" />
					<!-- <input class="input" type="number" @keypress="isNumber($event)" v-model="newTimer" @blur="focusOut($event)" @focus="focusIn($event)" /> -->
					<!-- {{thisTime}} {{thisColor}} -->
				</div>
				<div class="tile-contents controls">
					<div>
						<button class="button" @click="addTimer(newTimer)">
							<span class="material-symbols-outlined">
								add
							</span>
						</button>
					</div>
					<div>
						<button class="button button-alt" @click="decrementTimer()"  :style="`color:${colors[bgcolor]}`">
							<span class="material-symbols-outlined">
								arrow_back
							</span>
						</button>
						<button class="button button-alt" @click="incrementTimer()"  :style="`color:${colors[bgcolor]}`">
							<span class="material-symbols-outlined">
								arrow_forward
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Transition>
		<TimerComponent v-if="thisTime" :timer="thisTime" :color="thisColor"/>
	</Transition>
</template>