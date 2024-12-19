<template>
  <div class="converter-wrapper">
    <div class="controls-section">
      <div class="controls-container">
        <div class="font-selector">
          <select id="font-select" v-model="selectedFont" class="select-input">
            <option value="kaiti">Kaiti</option>
            <option value="tegakizatsu">tegakizatsu</option>
            <option value="stroke5">Stroke5</option>
            <option value="regular">Regular</option>
          </select>
        </div>

        <div class="size-selector">
          <select id="size-select" v-model="fontSize" class="select-input">
            <option value="24">Small</option>
            <option value="32">Medium</option>
            <option value="48">Large</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="main-content">
      <div class="input-display-row">
        <div class="text-section">
          <textarea
            v-model="inputText"
            placeholder="Enter Chinese text here..."
            class="text-input"
          ></textarea>
        </div>
      </div>
      <ChineseTextToSpeech
      style="max-width: 1200px;"
       :text="inputText" />

      <div v-if="inputText.trim()" class="comparison-section">
        <h2>Comparison View</h2>
        <div class="comparison-display">
          <template v-if="inputText">
            <div
              v-for="(block, index) in textBlocks"
              :key="index"
              class="comparison-block"
            >
              <p class="block-number">Block {{ index + 1 }}</p>
              <div class="line-container">
                <div
                  v-for="(line, lineIndex) in splitIntoLines(block)"
                  :key="lineIndex"
                  class="text-line"
                >
                  <div class="character-container">
                    <div
                      v-for="(char, charIndex) in line"
                      :key="charIndex"
                      class="character-column"
                      :class="{ punctuation: isPunctuation(char) }"
                    >
                      <div
                        class="character original-text"
                        :style="{
                          fontFamily: fonts.regular,
                          fontSize: `${fontSize}px`,
                        }"
                      >
                        {{ char }}
                      </div>
                      <div class="pinyin-text" v-if="!isPunctuation(char)">
                        {{ getPinyinForChar(char) }}
                      </div>
                      <div
                        class="character converted-text"
                        :style="{
                          fontFamily: getFontFamily,
                          fontSize: `${fontSize}px`,
                        }"
                      >
                        {{ char }}
                      </div>
                    </div>
                  </div>
                </div>
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
import ChineseTextToSpeech from './ChineseTextToSpeech.vue'; // Adjust the path if 
import { ref, computed } from 'vue'
import { pinyin } from 'pinyin-pro'


export default {
  components: {
    ChineseTextToSpeech,
},
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

      const sentences =
        inputText.value.match(/[^。.!?！？]+[。.!?！？]+/g) || []
      const remainingText = inputText.value.match(/[^。.!?！？]+$/)

      if (remainingText) {
        sentences.push(remainingText[0])
      }

      return sentences.filter(sentence => sentence.trim())
    })

    const splitIntoLines = text => {
      return text
        .split('，')
        .map(line => line.trim())
        .filter(line => line)
    }

    const isPunctuation = char => {
      const punctuationRegex = /[《》【】（）！？。，、：；'"『』「」]/
      return punctuationRegex.test(char)
    }

    const getPinyinForChar = char => {
      if (isPunctuation(char)) return ''
      return pinyin(char, {
        toneType: 'symbol',
        type: 'array',
        nonZh: 'consecutive',
      })[0]
    }

    return {
      inputText,
      selectedFont,
      fontSize,
      getFontFamily,
      textBlocks,
      fonts,
      splitIntoLines,
      isPunctuation,
      getPinyinForChar,
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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.controls-section {
  width: 100%;
  position: sticky;
  top: 0;
  padding-bottom: 10px;
  background-color: white;
  z-index: 10;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  box-shadow: 0 3px 24px rgba(0, 0, 0, 0.08);
}

.controls-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1rem;
  justify-items: center;
}

.main-content {
  display: block;
  width: 100%;
  padding-top: 10px;
}

.input-display-row {
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.text-section {
  width: 100%;
}

.text-input {
  width: 100%;
  padding-left: 1.5rem;
  border-radius: 4px;
  font-size: 16px;
}

.text-display {
  min-height: 300px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: pre-wrap;
}
.comparison-section {
  max-width: 1200px;
  margin: 0 auto; 
  padding: 1rem;
}
.comparison-display {
  max-width: 1200px;
  margin: 0 auto; 
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comparison-block {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
}

.line-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.text-line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.25rem;
}

.character-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-start;
}

.character-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: auto;
  padding: 0.25rem;
}

.character-column.punctuation {
  min-width: auto;
}

.character {
  text-align: center;
  line-height: 1.2;
  min-height: auto;
}

.pinyin-text {
  font-size: 0.8em;
  color: #2563eb;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.block-number {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.font-selector,
.size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.font-selector select,
.size-selector select {
  width: 130px;
}

.select-input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 0.5px solid #ddd;
}

.placeholder-text {
  color: #999;
  text-align: center;
  padding: 2rem;
}

@media (max-width: 1024px) {
  .input-display-row {
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  }

  .text-input{
    padding-left: 1.5rem;
  }

  .character-column {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .controls-container {
    flex-direction: row;
    align-items: flex-start;
  }

  .text-input{
    padding-left: 1.5rem;
  }

  .text-input,
  .text-display,
  .comparison-display {
    min-height: auto;
  }

  .comparison-block {
    margin-bottom: 0.5rem;
  }
}
</style>
