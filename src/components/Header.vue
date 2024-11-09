<template>
  <header class="header">
    <nav class="nav-container">
      <RouterLink to="/" class="logo"> Writing Assistant </RouterLink>
      <div class="nav-links">
        <!-- <RouterLink to="/" class="nav-link">Home</RouterLink> -->
        <!-- <RouterLink to="/converter" class="nav-link">Converter</RouterLink> -->
        <!-- <RouterLink to="/about" class="nav-link">About</RouterLink> -->
        <a
          href="https://github.com/Amaan-Samar/chinese-writing-assistant"
          target="_blank"
          class="nav-link"
        >
          GitHub
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<!-- <style scoped>
.header {
  max-width: 1200px;
  width: 1000px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}
</style> -->
<style scoped>
.header {
  max-width: 1200px;
  width: 100%; /* Changed to 100% for better responsiveness */
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem; /* Increased size for better visibility */
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem; /* Space between links */
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem; /* Consistent padding */
  border-radius: 4px;
  transition:
    background-color 0.3s,
    color 0.3s; /* Added color transition */
}

.nav-link:hover {
  background-color: #34495e; /* Darker shade on hover */
}

/* Media Queries for Responsiveness */
@media (max-width: 1024px) {
  /* Tablet and smaller desktops */
  .logo {
    font-size: 1.6rem; /* Slightly smaller logo */
  }

  .nav-link {
    padding: 0.5rem; /* Adjust padding for smaller screens */
  }
}

@media (max-width: 768px) {
  /* Mobile devices */
  .nav-container {
    flex-direction: column; /* Stack items vertically */
    align-items: flex-start; /* Align items to the start */
  }

  .nav-links {
    flex-direction: column; /* Stack links vertically */
    gap: 0.5rem; /* Reduce gap between links */
    width: 100%; /* Full width for mobile navigation */
  }

  .nav-link {
    width: 100%; /* Make links full width */
    text-align: center; /* Center text in links */
  }
}
</style>
