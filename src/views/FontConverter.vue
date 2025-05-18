<template>
  <div class="converter-wrapper">
    <div class="main-content">
      <FontControls
        v-model="fontSize"
        :defaultFontSize="15"
      />
      <div class="input-display-row">
        <div class="text-section" :style="{fontFamily: getFontFamily, fontSize: `${fontSize}px` }">
          <textarea v-model="inputText" placeholder="Enter Chinese text here..." class="text-input w-full resize-none" @input="adjustHeight" ref="textarea"></textarea>
          <button @click="clearOrPasteText" class="paste-btn">
            {{ inputText.trim() ? 'Clear' : 'Paste' }}
          </button>
        </div>
      </div>

      <FloatingControls 
        v-if="inputText.trim()"
        :showPinyin="showPinyin"
        @clear="clearText"
        @toggle-pinyin="togglePinyin"
      />

      <!-- <ChineseTextToSpeech style="max-width: 1200px;" :text="inputText" /> -->
  

      <div v-if="inputText.trim()" class="comparison-section">
        <div class="comparison-display relative">
          <template v-if="comparisonData && Object.keys(comparisonData).length">
            <div v-for="(block, sentenceId) in comparisonData" :key="sentenceId" class="comparison-block relative">
              <!-- Original display with multiple lines -->
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

              <!-- Flattened display in a single line -->
              <div class="line-container">
                <div class="text-line relative">
                  <div class="line-characters-and-pinyin" :style="{ fontFamily: getFontFamily, fontSize: `${fontSize}px` }">
                    <span v-for="(pair, pairIndex) in flattenBlockLines(block)" :key="pairIndex">
                      <span class="character" :style="{fontWeight: '700' }">{{ pair[0] }}</span>
                      <span class="pinyin" :style="{fontSize: `${fontSize * 0.8}px`, display: showPinyin ? 'inline' : 'none' }">{{ pair[1] }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div 
              class="scroll-spacer"
              :style="{
                minHeight: `calc(66vh - ${fontSize * 2}px)`  // Adjust based on your font size
              }"
            ></div>
          </template>
          
          <!-- <div v-else class="placeholder-text">
            Enter Chinese text here
          </div> -->
        </div>
      </div>
      <!-- <div v-if="inputText.trim()" class="comparison-section">
        <div class="comparison-display relative">
          <template v-if="comparisonData && Object.keys(comparisonData).length">
            <div v-for="(block, sentenceId) in comparisonData" :key="sentenceId" class="comparison-block relative">
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
      </div> -->
    </div>
  </div>
</template>
<script>
import CopyIcon from './icons/CopyIcon.vue';
import CopiedIcon from './icons/CopiedIcon.vue';
import ChineseTextToSpeech from './ChineseTextToSpeech.vue'; 
import FloatingControls from './FloatingControls.vue';
import { ref, computed, watch, reactive} from 'vue';
import { pinyin } from 'pinyin-pro';
import FontControls from './FontControls.vue';



export default {
  components: {
    ChineseTextToSpeech,
    CopiedIcon,
    FloatingControls,
    FontControls,
    CopyIcon,
  },
  name: 'FontConverter',
  setup() {
    const inputText = ref('');
    const fontSize = ref(15);
    const selectedFont = ref('Han_Sans_CN_Light');
    // const selectedFont = ref('kaiti');
    const textarea = ref(null);
    const copiedStates = reactive({});
    const COPIED_ICON_DURATION = 3000;
    const showPinyin = ref(true);

    const togglePinyin = () => {
      showPinyin.value = !showPinyin.value;
    };

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
      const newlineParts = text.split(/\r?\n/);
      
      return newlineParts.flatMap(part => {
        const commaParts = part.split('，');
        return commaParts
          .map((line, index) => {
            if (index < commaParts.length - 1 || part.endsWith('，')) {
              return line.trim() + '，';
            } else {
              return line.trim();
            }
          })
          .filter(line => line);
      });
    };

    const flattenBlockLines = (blockObject) => {
      const flattenedPairs = [];
      
      if (!blockObject || !blockObject.lines) {
        return flattenedPairs;
      }
      
      Object.values(blockObject.lines).forEach(line => {
        if (line.textAndPinyin && Array.isArray(line.textAndPinyin)) {
          line.textAndPinyin.forEach(pair => {
            flattenedPairs.push(pair);
          });
        }
      });
      return flattenedPairs;
    };

    const comparisonData = computed(() => {
      if (!inputText.value) return {};
      
      // First extract URLs so they don't get split by punctuation
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const textWithPlaceholders = inputText.value.replace(urlRegex, (url) => {
        return ` URL_PLACEHOLDER_${url.length} `; // Replace URL with a unique placeholder
      });
      
      // Split by both punctuation AND line breaks
      const segments = [];
      const lines = textWithPlaceholders.split(/\r?\n/);
      
      lines.forEach(line => {
        // Split each line by punctuation
        const lineSentences = line.match(/[^。.!?！？]+[。.!?！？]+/g) || [];
        const remainingText = line.match(/[^。.!?！？]+$/);
        
        if (remainingText) {
          lineSentences.push(remainingText[0]);
        }
        
        segments.push(...lineSentences);
      });
      
      const result = {};
      
      segments.filter(segment => segment.trim()).forEach((segment, index) => {
        // Restore URLs in each segment
        const restoredSegment = segment.replace(/URL_PLACEHOLDER_(\d+)/g, () => {
          const matches = segment.match(/URL_PLACEHOLDER_(\d+)/g);
          for (const match of matches) {
            const urlLength = parseInt(match.split('_')[2]);
            const url = inputText.value.match(urlRegex).find(u => u.length === urlLength);
            if (url) return url;
          }
          return '';
        });
        
        const sentenceId = index;
        result[sentenceId] = {
          lines: {},
          sentencePinyin: getPinyinForSentence(restoredSegment)
        };
        
        // const lines = restoredSegment.split(/\r?\n/).filter(l => l.trim());
        const lines = splitIntoLines(restoredSegment);
        lines.forEach((line, lineIndex) => {
          result[sentenceId].lines[lineIndex] = {
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
            return [char, ''];
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
      flattenBlockLines,

      showPinyin,
      togglePinyin,
    };
  },
};
</script>
<style scoped>
.line-characters-and-pinyin{
 padding: 5px 10px;
 text-wrap: wrap;
 width: 100%;
 display: flex;
 flex-wrap: wrap;
}
.paste-btn {  
  padding: 8px 16px;
  margin-top: 5px;
  font-size: 14px;
  background-color: #7a91ff;
  font-weight: 800;
  border-radius: 4px;
  box-shadow: #5E5DF0 0 10px 20px -10px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  outline: 0 solid transparent;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.paste-btn:hover {
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
}

.input-display-row {
  margin: 5px;
  padding: 5px;
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.text-section {
  width: 100%;
  padding: 0 0.2rem;
}

.text-input {
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 16px;
  outline: none; 
  background: rgba(255, 255, 255, 0.7);
}

.text-display {
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: pre-wrap;
}

.comparison-section {
  max-width: 1200px;
  margin: 0 auto; 
  padding: 0 0.5rem;
}

.comparison-display {
  max-width: 100%;
}

.line-container {
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
}

.text-line {
  display: block;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.25rem;
  padding: 0.5rem;
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
textarea::placeholder {
  font-weight: 700; /* Make it bold */
  color: #cccccc; /* Light gray color */
  opacity: 1; /* Ensure full visibility */
}

/* These are needed for cross-browser compatibility */
textarea::-webkit-input-placeholder { /* Chrome/Safari/Opera */
  font-weight: 700;
  color: #cccccc;
}

textarea::-moz-placeholder { /* Firefox */
  font-weight: 700;
  color: #cccccc;
  opacity: 1;
}

textarea:-ms-input-placeholder { /* IE/Edge */
  font-weight: 700;
  color: #cccccc;
}

textarea:-moz-placeholder { /* Firefox older versions */
  font-weight: 700;
  color: #cccccc;
  opacity: 1;
}

@media (max-width: 1024px) {
  .input-display-row {
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
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
    right: 10px;
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