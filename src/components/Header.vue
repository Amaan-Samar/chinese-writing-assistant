<template>
  <header class="header">
    <nav class="nav-container">
      <router-link to="/" class="logo"> Chinese Writing Assistant </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <a
          href="https://github.com/yourusername/chinese-writing-assistant"
          target="_blank"
          class="nav-link"
        >
          GitHub
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
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
</style>
