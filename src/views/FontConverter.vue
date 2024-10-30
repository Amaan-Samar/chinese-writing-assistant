<!-- <template>
  <div class="converter-container">
    <div class="input-section">
      <h2>Enter Chinese Text</h2>
      <textarea
        v-model="text"
        placeholder="Enter Chinese text here..."
        class="text-input"
      ></textarea>

      <div class="controls">
        <div class="font-selector">
          <label for="font-select">Select Font:</label>
          <select id="font-select" v-model="selectedFont" class="select-input">
            <option value="kaiti">Kaiti</option>
            <option value="tegakizatsu">tegakizatsu</option>
            <option value="stroke5">Stroke5</option>
            <option value="regular">Regular</option>
          </select>
        </div>

        <div class="size-selector">
          <label for="size-select">Font Size:</label>
          <select id="size-select" v-model="fontSize" class="select-input">
            <option value="24">Small</option>
            <option value="32">Medium</option>
            <option value="48">Large</option>
          </select>
        </div>
      </div>
    </div>

    <div class="output-section">
      <h2>Display</h2>
      <div
        class="text-display"
        :style="{
          fontFamily: getFontFamily,
          fontSize: `${fontSize}px`,
        }"
      >
        {{ text || '示例文字 (Sample Text)' }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'FontConverter',
  setup() {
    const text = ref('')
    const selectedFont = ref('kaiti')
    const fontSize = ref(32)

    const fonts = {
      kaiti: "'Kaiti', '楷体', serif",
      tegakizatsu: "'tegakizatsu', serif",
      stroke5: "'Stroke5', serif",
      regular: "'SimSun', '宋体', serif",
    }

    const getFontFamily = computed(() => fonts[selectedFont.value])

    return {
      text,
      selectedFont,
      fontSize,
      getFontFamily,
    }
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'tegakizatsu';
  src: url('/fonts/tegakizatsu.ttf') format('truetype');
}
@font-face {
  font-family: 'kaiti';
  src: url('/fonts/kaiti.ttf') format('truetype');
}

.converter-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
}

.input-section,
.output-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-input {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.font-selector,
.size-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.select-input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.text-display {
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .converter-container {
    grid-template-columns: 1fr;
  }
}
</style> -->

<template>
  <div class="converter-wrapper">
    <!-- Font Controls Section -->
    <div class="controls-section">
      <div class="controls-container">
        <div class="font-selector">
          <label for="font-select">Select Font:</label>
          <select id="font-select" v-model="selectedFont" class="select-input">
            <option value="kaiti">Kaiti</option>
            <option value="tegakizatsu">tegakizatsu</option>
            <option value="stroke5">Stroke5</option>
            <option value="regular">Regular</option>
          </select>
        </div>

        <div class="size-selector">
          <label for="size-select">Font Size:</label>
          <select id="size-select" v-model="fontSize" class="select-input">
            <option value="24">Small</option>
            <option value="32">Medium</option>
            <option value="48">Large</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Top Row with Input and Display -->
      <div class="input-display-row">
        <!-- Input Area -->
        <div class="text-section">
          <h2>Input Chinese Text</h2>
          <textarea
            v-model="inputText"
            placeholder="Enter Chinese text here..."
            class="text-input"
          ></textarea>
        </div>

        <!-- Converted Font Area -->
        <div class="text-section">
          <h2>Selected Font Display</h2>
          <div
            class="text-display"
            :style="{
              fontFamily: getFontFamily,
              fontSize: `${fontSize}px`,
            }"
          >
            {{ inputText || '示例文字 (Sample Text)' }}
          </div>
        </div>
      </div>

      <!-- Comparison Area - Full Width -->
      <div class="comparison-section">
        <h2>Comparison View</h2>
        <div class="comparison-display">
          <template v-if="inputText">
            <div
              v-for="(block, index) in textBlocks"
              :key="index"
              class="comparison-block"
            >
              <p class="block-number">Block {{ index + 1 }}</p>
              <div
                class="converted-text"
                :style="{
                  fontFamily: getFontFamily,
                  fontSize: `${fontSize}px`,
                }"
              >
                {{ block }}
              </div>
              <div
                class="original-text"
                :style="{
                  fontFamily: fonts.regular,
                  fontSize: `${fontSize}px`,
                }"
              >
                {{ block }}
              </div>
            </div>
          </template>
          <div v-else class="placeholder-text">
            Enter text to see the comparison
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'FontConverter',
  setup() {
    const inputText = ref('')
    const selectedFont = ref('kaiti')
    const fontSize = ref(32)

    const fonts = {
      kaiti: "'Kaiti', '楷体', serif",
      tegakizatsu: "'tegakizatsu', serif",
      stroke5: "'Stroke5', serif",
      regular: "'SimSun', '宋体', serif",
    }

    const getFontFamily = computed(() => fonts[selectedFont.value])

    const textBlocks = computed(() => {
      if (!inputText.value) return []

      // Split text into sentences using multiple delimiters
      const sentences =
        inputText.value.match(/[^。.!?！？]+[。.!?！？]+/g) || []

      // Handle any remaining text that doesn't end with a delimiter
      const remainingText = inputText.value.match(/[^。.!?！？]+$/)
      if (remainingText) {
        sentences.push(remainingText[0])
      }

      return sentences.filter(sentence => sentence.trim())
    })

    return {
      inputText,
      selectedFont,
      fontSize,
      getFontFamily,
      textBlocks,
      fonts,
    }
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'tegakizatsu';
  src: url('/fonts/tegakizatsu.ttf') format('truetype');
}
@font-face {
  font-family: 'kaiti';
  src: url('/fonts/kaiti.ttf') format('truetype');
}

.converter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  /* max-width: 1400px; */
  margin: 0 auto;
}

.controls-section {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.controls-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-display-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-section {
  width: 100%;
}

.text-input {
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
}

.text-display {
  min-height: 300px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: pre-wrap;
  background-color: white;
}

.comparison-display {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.comparison-block {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.block-number {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.converted-text {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
}

.original-text {
  color: #666;
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
}

.font-selector,
.size-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.select-input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  min-width: 150px;
}

.placeholder-text {
  color: #999;
  text-align: center;
  padding: 2rem;
}

@media (max-width: 1024px) {
  .input-display-row {
    width: 100%;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .controls-container {
    flex-direction: row; /* Keeps controls in a row on mobile */
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .font-selector,
  .size-selector {
    flex: 1;
    min-width: 200px;
  }
}
</style>
