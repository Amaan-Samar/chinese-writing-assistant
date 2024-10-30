<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">Chinese Writing Assistant</h3>
        <p class="footer-description">
          Help learners practice Chinese characters with proper stroke order and
          beginner-friendly fonts.
        </p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Quick Links</h4>
        <nav class="footer-links">
          <RouterLink to="/" class="footer-link">Home</RouterLink>
          <RouterLink to="/about" class="footer-link">About</RouterLink>
          <RouterLink to="/converter" class="footer-link">Converter</RouterLink>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-container">
        <p class="copyright">
          © {{ currentYear }} Chinese Writing Assistant. Made with ❤️ for
          Chinese learners.
        </p>
        <div class="social-links">
          <a
            href="https://github.com/Amaan-Samar"
            target="_blank"
            class="social-link"
            title="GitHub"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding-top: 2rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 250px;
}

.footer-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.footer-subtitle {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #bbbbbb;
}

.footer-description {
  color: #bbbbbb;
  line-height: 1.6;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #bbbbbb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  margin-top: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid #3d5266;
}

.footer-bottom .footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #bbbbbb;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #bbbbbb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: white;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-section {
    min-width: 100%;
  }

  .footer-bottom .footer-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
