<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'
</script>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
}
</style>
