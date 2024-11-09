<template>
  <header class="header">
    <nav class="nav-container">
      <RouterLink to="/" class="logo">
        <img
          src="/pen.svg"
          style="width: 40px; height: 40px; margin-bottom: -8px"
          alt="Company Logo"
        />
        <span style="color: #656ee0"> Little</span>Hanzi
      </RouterLink>
      <div class="nav-links">
        <!-- <img src="/ooo.png" alt="Company Logo" class="logo-image" /> -->
        <!-- <a
          href="https://github.com/Amaan-Samar/chinese-writing-assistant"
          target="_blank"
          class="nav-link"
        >
          GitHub
        </a>  -->
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  /* max-width: 100%; */
  width: 100%;
  background-color: white;
  padding: 1rem;
  z-index: 10;
  box-shadow: 0 3px 24px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: black;
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
  transition:
    background-color 0.3s,
    color 0.3s;
}

.nav-link:hover {
  background-color: #2c74e8;
}

/* Media Queries for Responsiveness */
@media (max-width: 1024px) {
  .logo {
    font-size: 1.6rem;
  }

  .nav-link {
    padding: 0.5rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: center;
  }
}
</style>
