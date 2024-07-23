<script setup>
  import Home from '@/views/Home.vue'
</script>

<template>
	<div id="body">
    <Home />
  </div>
</template>


<style>
@font-face {
  font-family: "Cabin";
  src: local("Cabin"),
   url(../src/assets/fonts/Cabin/Cabin-VariableFont_wdth\,wght.ttf) format("truetype");
}
/* 
@font-face {
  font-family: "Azeret";
  src: local("Azeret"),
   url(../src/assets/fonts/Azeret_Mono/AzeretMono-VariableFont_wght.ttf) format("truetype");
}
@font-face {
  font-family: "DMMono";
  src: local("DMMono"), url(../src/assets/fonts/DMMono/DMMono-Light.ttf) format("truetype");
}
*/
@font-face {
  font-family: 'Material Symbols Rounded';
  /* font-family: 'Material Symbols Outlined'; */
  font-style: normal;
  font-weight: 400;
  src: local("Material Icons"), url(../src/assets/fonts/MaterialIcons/MaterialIconsRound-Regular.otf) format('truetype');
  /*src: local("Material Icons"), url(../src/assets/fonts/MaterialIcons/sykg-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190Fjzag.woff2) format('woff2');*/
  /*src: local("Material Icons"), url(../src/assets/fonts/MaterialIcons/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHOej.woff2) format('woff2');*/
  /*src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v35/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2) format('woff2');*/
}
</style>
