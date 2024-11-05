<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
// import FontConverter from './components/FontConverter.vue'
import Footer from './components/Footer.vue'
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
}

.main-content {
  flex: 1; /* Uncomment this to make it take available vertical space */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
}
</style>
