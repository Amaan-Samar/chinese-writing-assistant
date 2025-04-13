<template>
  <div class="converter-wrapper">
    <!-- <div class="controls-section">
      <div class="controls-container">
        <div class="font-selector">
          <select id="font-select" v-model="selectedFont" class="select-input">
            <option value="kaiti">Kaiti</option>
            <option value="kaiti">Kaiti</option>
            <option value="tegakizatsu">Tegakizatsu</option>
            <option value="regular">Regular</option>
            <option value="cwTeXMing_Medium">cwTeXMing_Medium</option>
            <option value="Han_Sans_CN_Light">Han_Sans_CN_Light</option>
            <option value="GenJyuuGothic">GenJyuuGothic</option>
          </select>
        </div>
        <div class="size-selector">
          <select id="size-select" v-model="fontSize" class="select-input">
            <option value="8">Extra Small</option>
            <option value="12">Small</option>
            <option value="24">Medium</option>
            <option value="36">Large</option>
            <option value="48">Extra Large</option>
          </select>
        </div>
      </div>
    </div>  -->

    <div class="main-content">
      <div class="input-display-row">
        <div class="text-section" :style="{fontFamily: getFontFamily, fontSize: `${fontSize}px` }">
          <textarea v-model="inputText" placeholder="Enter Chinese text here..." class="text-input w-full resize-none" @input="adjustHeight" ref="textarea"></textarea>
          <button @click="clearOrPasteText" class="toggle-button">
            {{ inputText.trim() ? 'Clear' : 'Paste' }}
          </button>
        </div>
      </div>
      <!-- <ChineseTextToSpeech style="max-width: 1200px;" :text="inputText" /> -->

      <div v-if="inputText.trim()" class="comparison-section">
        <div class="comparison-display relative">
            <!-- <button @click="copyToClipboard(getAllText(), 'parent')" class="copy-btn parent-copy-btn" title="Copy all text">
              <component :is="copiedStates.parent ? 'CopiedIcon' : 'CopyIcon'" />
            </button> -->
          <template v-if="comparisonData && Object.keys(comparisonData).length">
            <div v-for="(block, sentenceId) in comparisonData" :key="sentenceId" class="comparison-block relative">
              <!-- <p class="block-number">B {{ parseInt(sentenceId) + 1 }}</p> -->

              <!-- <button @click="copyToClipboard(getBlockText(block.lines), `block-${sentenceId}`)" class="copy-btn block-copy-btn" title="Copy block">
                <component :is="copiedStates[`block-${sentenceId}`] ? 'CopiedIcon' : 'CopyIcon'" />
              </button> -->
              
              <!-- 1 -->
              <!-- <div class="line-container">
                <div v-for="(line, lineIndex) in block.lines" :key="lineIndex" class="text-line relative">
                  <button @click="copyToClipboard(line.text, `line-${sentenceId}-${lineIndex}`)" class="copy-btn line-copy-btn" title="Copy line">
                    <component :is="copiedStates[`line-${sentenceId}-${lineIndex}`] ? 'CopiedIcon' : 'CopyIcon'" />
                  </button>
                  
                  
                  <div class="character-container">
                    <ChineseTextToSpeech style="max-width: 1200px;" :text="line.text" />
                    <div v-for="(char, charIndex) in line.text" 
                        :key="charIndex" 
                        class="character-column" 
                        :class="{ punctuation: isPunctuation(char) }">

                        <div class="pinyin-text" v-if="!isPunctuation(char)" 
                            :style="{ 
                              fontFamily: getFontFamily, 
                              fontSize: `${fontSize * 0.8}px` }">
                          {{ getPinyinForChar(char) }}
                        </div>

                      <div class="character converted-text" 
                          :style="{ 
                            fontFamily: getFontFamily,
                            fontSize: `${fontSize}px` }">
                        {{ char }}
                      </div>
                    </div>
                  </div>

                  <div class="line-pinyin" :style="{ fontFamily: getFontFamily, fontSize: `${fontSize * 0.8}px` }">
                    {{ line.pinyin }}
                  </div>

                </div>
              </div> -->
              
              <!-- 2 -->
              <!-- Display sentence-level pinyin -->
              <!-- <div class="line-container">
                <div v-for="(line, lineIndex) in block.lines" :key="lineIndex" class="text-line relative">
                  <div class="line-characters" :style="{ fontFamily: getFontFamily, fontSize: `${fontSize}px` }">
                    {{ line.text }}
                  </div>

                  <div class="line-pinyin" :style="{ fontFamily: getFontFamily, fontSize: `${fontSize * 0.8}px` }">
                    {{ line.pinyin }}
                  </div>
                </div>
              </div> -->

              <!-- 3 -->
              <div class="line-container">
                <div v-for="(line, lineIndex) in block.lines" :key="lineIndex" class="text-line relative">
                  <div class="line-characters-and-pinyin" :style="{ fontFamily: getFontFamily, fontSize: `${fontSize}px` }">
                    <span v-for="(pair, pairIndex) in line.textAndPinyin" :key="pairIndex">
                      <span class="character" :style="{fontWeight: '700' }">{{ pair[0] }}</span>
                      <span class="pinyin" :style="{fontSize: `${fontSize * 0.8}px`, display: showPinyin ? 'inline' : 'none' }">{{ pair[1] }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="floating-controls" :class="{ 'mobile': isMobile}">
                <!-- <button
                  class="clear-text-btn"
                  :class="{ 'mobile': isMobile }"
                  @click="clearText"
                >
                  Clear
                </button> -->
                <button
                  class="toggle-pinyin-btn"
                  :class="{ 'mobile': isMobile }"
                  @click="togglePinyin"
                  :style="buttonStyle"
                  ref="floatingBtn"
                  >
                  {{ showPinyin ? 'Hide' : 'Show' }}
                </button>
              </div>
              <!-- @mousedown="startDrag"
              @touchstart="startDrag" -->


            </div>
            <div 
              class="scroll-spacer"
              :style="{
                minHeight: `calc(66vh - ${fontSize * 2}px)`  // Adjust based on your font size
              }"
            ></div>

          </template>
          
          <div v-else class="placeholder-text">
            Enter Chinese text here
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CopyIcon from './icons/CopyIcon.vue';
import CopiedIcon from './icons/CopiedIcon.vue';
import ChineseTextToSpeech from './ChineseTextToSpeech.vue'; 
import { ref, computed, watch, reactive, onMounted, onBeforeUnmount} from 'vue';
import { pinyin } from 'pinyin-pro';



export default {
  components: {
    ChineseTextToSpeech,
    CopiedIcon,
    CopyIcon,
  },
  name: 'FontConverter',
  setup() {
    const inputText = ref('');
    const fontSize = ref(20 );
    const selectedFont = ref('Han_Sans_CN_Light');
    // const selectedFont = ref('kaiti');
    const textarea = ref(null);
    const dragTimer = ref(null);
    const DRAG_DELAY = 2000;
    const copiedStates = reactive({});
    const COPIED_ICON_DURATION = 3000;

    // Add new variables for floating button
    const showPinyin = ref(true);
    const isDragging = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const translateX = ref(0);
    const translateY = ref(0);
    const isMobile = ref(false);
    const floatingBtn = ref(null);

        // Add new methods for floating button
    const togglePinyin = () => {
      showPinyin.value = !showPinyin.value;
    };

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 768;
      // Reset position when screen size changes
      translateX.value = 0;
      translateY.value = 0;
    };

    const startDrag = (e) => {
      if (e.type === 'click') return;
      // isDragging.value = true;
      const event = e.touches ? e.touches[0] : e;
      startX.value = event.clientX - translateX.value;
      startY.value = event.clientY - translateY.value;

      if (dragTimer.value) {
        clearTimeout(dragTimer.value);
        dragTimer.value = null;
      }

      if (e.touches) {
        dragTimer.value = setTimeout(()=> {
          isDragging.value = true;
          dragTimer.value = null;
        }, DRAG_DELAY);
      } else {
        isDragging.value = null;
      }
      
      if (e.preventDefault){
        e.preventDefault();
      }
    };

    const stopDrag = () => {
      if (dragTimer.value) {
        dragTimer.value = null;
      }
      isDragging.value = false;
    };

    const handleDrag = (e) => {
      if (!isDragging.value) return;

      const event = e.touches ? e.touches[0] : e;

      translateX.value = event.clientX - startX.value;
      translateY.value = event.clientY - startY.value;

      //only call preventDefault if it exists
      if (e.preventDefault){
        e.preventDefault();
      }
    };

    const buttonStyle = computed(() => {
      return {
        transform: `translate(${translateX.value}px, ${translateY.value}px)`
      };
    });

    onMounted(() => {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchend', stopDrag);
    });

    onBeforeUnmount(() => {
      // Clear the timer when the component is destroyed
      if (dragTimer.value) {
        clearTimeout(dragTimer.value);
      }
      // Clean up event listeners
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    });

    const fonts = {
      kaiti: "'Kaiti', serif",
      tegakizatsu: "'tegakizatsu', serif",
      regular: "'SimSun', serif",
      cwTeXMing_Medium: "'cwTeXMing_Medium', serif",
      Han_Sans_CN_Light: "'Han_Sans_CN_Light', serif",
      GenJyuuGothic: "'GenJyuuGothic', serif",
    };

    const getFontFamily = computed(() => fonts[selectedFont.value]);

    const textBlocks = computed(() => {
      if (!inputText.value) return [];

      const sentences =
        inputText.value.match(/[^。.!?！？]+[。.!?！？]+/g) || [];
      const remainingText = inputText.value.match(/[^。.!?！？]+$/);

      if (remainingText) {
        sentences.push(remainingText[0]);
      }
      return sentences.filter(sentence => sentence.trim());
    });
 
    const pasteFromClipboard = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        inputText.value = clipboardText;
      } catch (error) {
        console.error('Failed to read clipboard contents: ', error);
      }
    };

    const clearText = () => {
      inputText.value = '';

      if (textarea.value) {
        setTimeout(() => {
          textarea.value.style.height = 'auto';
          textarea.value.style.height = '40px';
        },0);
      }
    };

    const clearOrPasteText = () => {
      if (inputText.value.trim()) {
        // If there's text, clear it
        inputText.value = '';
        
        // Reset the textarea height
        if (textarea.value) {
          setTimeout(() => {
            textarea.value.style.height = 'auto';
            textarea.value.style.height = '40px';
          }, 0);
        }
      } else {
        // If empty, paste from clipboard
        pasteFromClipboard();
      }
    };

    const splitIntoLines = text => {
      const parts = text.split('，');
      return parts
        .map((line, index) => {
          if (index < parts.length - 1 || text.endsWith('，')) {
            return line.trim() + '，';
          } else {
            return line.trim();
          }
        })
        .filter(line => line);
    };

    const comparisonData = computed(() => {
      if (!inputText.value) return {};
      
      const sentences =
        inputText.value.match(/[^。.!?！？]+[。.!?！？]+/g) || [];
      const remainingText = inputText.value.match(/[^。.!?！？]+$/);
      
      if (remainingText) {
        sentences.push(remainingText[0]);
      }
      
      const result = {};
      
      sentences.filter(sentence => sentence.trim()).forEach((sentence, index) => {
        const sentenceId = index;
        result[sentenceId] = {
          lines: {},
          sentencePinyin: getPinyinForSentence(sentence)
        };
        
        const lines = splitIntoLines(sentence);     
        lines.forEach((line, lineIndex) => {
          const lineId = lineIndex;
          result[sentenceId].lines[lineId] = {
            text: line,
            pinyin: getPinyinForSentence(line),
            textAndPinyin: getPinyinAndChar(line)
          };
        });
      });
      
      return result;
    });

    const isPunctuation = char => {
      const punctuationRegex = /[《》【】（）！？。，、：；'"『』「」]/;
      return punctuationRegex.test(char);
    };

    const getPinyinForChar = char => {
      if (isPunctuation(char)) return '';
      return pinyin(char, {
        toneType: 'symbol',
        type: 'array',
        nonZh: 'consecutive',
      })[0];
    };

    const getPinyinForSentence = sentence => {
      if (!sentence) return '';
      
      return pinyin(sentence);
    };

    const getPinyinAndChar = sentence => {
    if (!sentence) return [];
    
    const chars = sentence.split('');
    if (!showPinyin.value) return chars.map(char => [char, '']);

    try {
        // First extract only Chinese characters for pinyin conversion
        const chineseChars = chars.filter(c => /[\u4e00-\u9fa5]/.test(c)).join('');
        const pinyinString = pinyin(chineseChars);
        const pinyinSyllables = pinyinString.split(' ');
        
        let pinyinIndex = 0;
        return chars.map(char => {
            if (/[\u4e00-\u9fa5]/.test(char) && pinyinIndex < pinyinSyllables.length) {
                return [char, pinyinSyllables[pinyinIndex++]];
            }
            return [char, '']; // No pinyin for non-Chinese characters
        });
        
    } catch (error) {
        console.error('Error processing pinyin:', error);
        return chars.map(char => [char, '']);
    }
};


    const adjustHeight = () => {
      if (textarea.value) {
        textarea.value.style.height = 'auto'; // Reset height to auto

        // if there's no text, set a default height
        if (!inputText.value.trim()) {
          textarea.value.style.height = '40px';
        }else {
          textarea.value.style.height = `${textarea.value.scrollHeight}px`;
        }
      }
    };

    watch(inputText, adjustHeight);

    const copyToClipboard = (text, buttonId) => {
      navigator.clipboard.writeText(text)
        .then(() => {
          // Set this specific button to "copied" state
          copiedStates[buttonId] = true;
          
          // Set a timeout to revert back to the copy icon after COPIED_ICON_DURATION
          setTimeout(() => {
            copiedStates[buttonId] = false;
          }, COPIED_ICON_DURATION);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    };
    
    const showCopySuccess = () => {
      const toast = document.createElement('div');
      toast.textContent = 'Copied to clipboard!';
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 2000);
      }, 10);
    };
    
    const getAllText = () => {
      let allText = '';
      if (comparisonData) {
        for (const sentenceId in comparisonData) {
          const lines = comparisonData[sentenceId];
          for (const line of lines) {
            allText += line + '\n';
          }
        }
      }
      return allText.trim();
    };
    
    const getBlockText = (lines) => {
      return Object.values(lines).map(line => line.text).join('，');
    };

    return {
      clearOrPasteText,
      pasteFromClipboard,
      copyToClipboard,
      showCopySuccess,
      getAllText,
      getBlockText,
      inputText,
      selectedFont,
      fontSize,
      getFontFamily,
      textBlocks,
      comparisonData,
      fonts,
      splitIntoLines,
      isPunctuation,
      getPinyinForChar,
      adjustHeight,
      textarea,
      copiedStates,
      clearText,

      showPinyin,
      togglePinyin,
      isMobile,
      floatingBtn,
      startDrag,
      buttonStyle,
    };
  },
};
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


@font-face {
  font-family: 'cwTeXMing_Medium';
  src: url('/fonts/cwTeXMing_Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'GenJyuuGothic';
  src: url('/fonts/GenJyuuGothic.ttf') format('truetype');
}
@font-face {
  font-family: 'Han_Sans_CN_Light';
  src: url('/fonts/Han_Sans_CN_Light.otf') format('truetype');
}
.clear-text-btn {
  width: 40px;
  height: 40px;
  background-color: #ffecec;
  border-color: #ffcbcb;
  padding: 8px 12px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
  transform: all 0.2s ease;
}

.clear-text-btn:hover {
  background-color: #f0f0f0;
}
.floating-controls{
  position: fixed;
  width: 70px;
  height: auto;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  top: 20px;
  right: 20px;
}
.floating-controls.mobile {
  /* Mobile position */
  top: auto;
  left: auto;
  bottom: 20px;
  right: 20px;
}
.floating-controls:active {
  transform: scale(0.95) translate(var(--tx, 0), var(--ty, 0));
}
.toggle-pinyin-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7a91ff;
  color: white;
  border: none;
  cursor: pointer;
  /* box-shadow: #2cbb6333 0 -25px 18px -14px inset,#2cbb6326 0 1px 2px,#2cbb6326 0 2px 4px,#2cbb6326 0 4px 8px,#2cbb6326 0 8px 16px,#2cbb6326 0 16px 32px; */
  box-shadow: #5960c533 0 -25px 18px -14px inset, #5960c526 0 1px 2px, #5960c526 0 2px 4px, 
  #5960c526 0 4px 8px, #5960c526 0 8px 16px, #5960c526 0 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px;
  font-size: 12px;  box-shadow: #4a51b359 0 -25px 18px -14px inset, #4a51b340 0 1px 2px, #4a51b340 0 2px 4px,
  #4a51b340 0 4px 8px, #4a51b340 0 8px 16px, #4a51b340 0 16px 32px;
  z-index: 1000;
  user-select: none;
  touch-action: none;
  transition: transform 0.1s ease;  
  /* top: 20px;
  right: 20px; */
}

.toggle-pinyin-btn:hover {
  background-color: #545bc0;
  box-shadow: #4a51b359 0 -25px 18px -14px inset, #4a51b340 0 1px 2px, #4a51b340 0 2px 4px,
  #4a51b340 0 4px 8px, #4a51b340 0 8px 16px, #4a51b340 0 16px 32px;
  /* box-shadow: #2cbb6359 0 -25px 18px -14px inset,#2cbb6340 0 1px 2px,#2cbb6340 0 2px 4px,#2cbb6340 0 4px 8px,#2cbb6340 0 8px 16px,#2cbb6340 0 16px 32px; */
  transform: scale(1.05) rotate(-1deg);
}
/* .toggle-pinyin-btn.mobile {
  top: auto;
  left: auto;
  bottom: 20px;
  right: 20px;
} */
.toggle-pinyin-btn:active {
  background-color: #4a51b3;
  transform: scale(0.95) translate(var(--tx, 0), var(--ty, 0));
}

.toggle-button {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #7a91ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.toggle-button:hover {
  background-color: #545bc0;
}
.relative {
  position: relative;
}

.copy-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(240, 240, 240, 0.8);
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, background-color 0.2s;
  z-index: 10;
}

.copy-btn:hover {
  opacity: 1;
  background-color: rgba(220, 220, 220, 0.9);
}

.parent-copy-btn {
  top: 10px;
  right: 10px;
  padding: 6px;
}

.block-copy-btn {
  top: 10px;
  right: 10px;
  padding: 5px;
}

.line-copy-btn {
  top: 5px;
  right: 5px;
  padding: 4px;
}

/* Optional: Add styles for toast notification */
.copy-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}

.copy-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
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
  /* padding-bottom: 10px; */
  background-color: white;
  z-index: 10;
  /* padding: 1rem; */
  /* border-bottom: 1px solid #eee; */
  /* box-shadow: 0 3px 24px rgba(0, 0, 0, 0.08); */
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
  /* padding-top: 10px; */
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
  padding-left: 1.5rem;
  border-radius: 4px;
  font-size: 16px;
  outline: none; 
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
}

.line-container {
  display: flex;
  flex-direction: column;
}

.text-line {
  display: block;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 0.25rem;
}

.character-container {
  display: flex;
  flex-wrap: wrap;
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
  /* margin-bottom: 0.5rem; */
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

  .toggle-pinyin-btn:not(.mobile) {
    top: auto;
    left: auto;
    bottom: 20px;
    right: 20px;
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
