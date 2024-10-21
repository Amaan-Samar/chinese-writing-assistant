<template>
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
            <option value="kaiti">楷体 (KaiTi)</option>
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
      kaiti: "'KaiTi', '楷体', serif",
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
  font-family: 'KaiTi';
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
</style>
