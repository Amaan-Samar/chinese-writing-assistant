<template>
  <header class="header">
    <nav class="nav-container">
      <div class="logo_wrapper">
        <RouterLink to="/" class="logo">
          <img class="logo_img"
            src="/pen.svg"
            alt="Company Logo"
          />
          <span 
          style="color: #656ee0"
          > Little</span>Hanzi
        </RouterLink>

      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  width: 100%;
  background-color: white;
  padding: 1rem;
  z-index: 12;
  box-shadow: 0 3px 24px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo_img{
  width: 30px;
  height: 30px;
  margin-bottom: -6px;

}
.logo_wrapper {
  width: 100%; 
}
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.05); /* Scale the button up by 5% on hover */
}

@media (max-width: 1024px) {
  .logo_wrapper {
    width: auto; 
    display: flex; 
    justify-content: center; 
    padding: .5rem; 
    border-radius: .5rem; 
    transition: background-color .3s; 
    cursor: pointer; 
   }
  .logo {
     font-size: 1rem;
     display: inline-flex;
     gap:.5rem; 
   }
}

@media (max-width: 768px) {
   .nav-container {
      flex-direction: column; 
      align-items: center;
   }
}
</style>
