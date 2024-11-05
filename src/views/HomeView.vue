<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Master Chinese Writing</h1>
        <p class="hero-subtitle">
          Learn Chinese characters with proper stroke order and
          beginner-friendly fonts
        </p>
        <div class="hero-buttons">
          <router-link to="/converter" class="primary-button">
            Try Converter
          </router-link>
          <a href="#features" class="secondary-button"> Learn More </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <h2 class="section-title">Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>Beginner-Friendly Fonts</h3>
          <p>
            Convert any Chinese text into easy-to-read fonts ideal for learners
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✍️</div>
          <h3>Stroke Order</h3>
          <p>Learn the correct stroke order for writing Chinese characters</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3>Practice Tools</h3>
          <p>Interactive tools to practice writing and memorize characters</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💾</div>
          <h3>Save Progress</h3>
          <p>Keep track of your learning progress and favorite characters</p>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="demo">
      <h2 class="section-title">Try It Out</h2>
      <div class="demo-container">
        <div class="demo-input">
          <h3>Sample Text</h3>
          <div class="text-display original">你好，世界</div>
        </div>
        <div class="demo-output">
          <h3>Converted Text</h3>
          <div
            class="text-display converted"
            style="font-family: KaiTi, '楷体', serif"
          >
            你好，世界
          </div>
        </div>
      </div>
      <div class="demo-cta">
        <router-link to="/converter" class="primary-button">
          Try with Your Own Text
        </router-link>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <h2 class="section-title">How It Works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Input Text</h3>
          <p>Paste any Chinese text you want to practice</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Choose Font</h3>
          <p>Select from our collection of learner-friendly fonts</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Practice</h3>
          <p>Use the converted text to practice writing</p>
        </div>
      </div>
    </section>

    <!-- Get Started Section -->
    <section class="get-started">
      <h2>Ready to Start Learning?</h2>
      <p>Join thousands of learners improving their Chinese writing skills</p>
      <router-link to="/converter" class="primary-button">
        Get Started Now
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 80%;
}

/* Hero Section */
.hero {
  background-color: #2c3e50;
  color: white;
  padding: 4rem 1rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #bbbbbb;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Buttons */
.primary-button {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #3aa876;
}

.secondary-button {
  background-color: transparent;
  border: 2px solid #42b983;
  color: #42b983;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
}

.secondary-button:hover {
  background-color: #42b983;
  color: white;
}

/* Features Section */
.features {
  padding: 4rem 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* Demo Section */
.demo {
  padding: 4rem 1rem;
  background-color: #f8f9fa;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.text-display {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.demo-cta {
  text-align: center;
  margin-top: 2rem;
}

/* How It Works Section */
.how-it-works {
  padding: 4rem 1rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.step {
  text-align: center;
  padding: 2rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-weight: bold;
}

/* Get Started Section */
.get-started {
  padding: 4rem 1rem;
  text-align: center;
  background-color: #2c3e50;
  color: white;
}

.get-started h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.get-started p {
  margin-bottom: 2rem;
  color: #bbbbbb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .demo-container {
    grid-template-columns: 1fr;
  }

  .text-display {
    font-size: 1.5rem;
  }
}
</style>
