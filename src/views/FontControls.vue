<template>
    <!-- <div class="font-controls-wrapper">

      <button 
        @click="toggleControlsPanel" 
        class="control-button"
        :class="{ 'mobile': isMobile }"
      >
        <div class="container" onclick="myFunction(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
      </button>
  
      <div 
        v-if="showControlsPanel" 
        class="controls-overlay"
        @click="closeControlsPanel"
      >
        <div 
          class="controls-panel"
          :class="{ 'mobile': isMobile }"
          @click.stop
        >
          <div class="panel-header">
            <h3>Controls</h3>
            <button @click="closeControlsPanel" class="close-button">
              <span>×</span>
            </button>
          </div>
  
          <div class="controls-grid">
            <div 
              class="control-item"
              @click="toggleFontSizeControls"
            >
              <div class="control-icon">Aa</div>
              <div class="control-label">Font Size</div>
            </div>
          </div>
  
          <div v-if="showFontSizeControls" class="font-size-controls">
            <div class="font-size-header">
              <h4>Font Size</h4>
              <button @click="resetToDefaultSize" class="reset-button">Reset</button>
            </div>
  
            <div class="slider-container">
              <button 
                @click="decrementFontSize" 
                class="size-button decrease"
                :disabled="fontSize <= 8"
              >–</button>
              
              <div class="slider-wrapper">
                <input 
                  type="range" 
                  min="8" 
                  max="100" 
                  v-model.number="fontSize" 
                  class="font-size-slider" 
                />
                <div class="current-size">{{ fontSize }}px</div>
              </div>
              
              <button 
                @click="incrementFontSize" 
                class="size-button increase"
                :disabled="fontSize >= 100"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>
  
<script>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  export default {
    name: 'FontControls',
    props: {
      // Pass the current font size from parent
      modelValue: {
        type: Number,
        default: 15
      },
      // Optional prop to set the default font size
      defaultFontSize: {
        type: Number,
        default: 15
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const fontSize = ref(props.modelValue);
      const showControlsPanel = ref(false);
      const showFontSizeControls = ref(false);
      const isMobile = ref(window.innerWidth <= 768);
      
      // Watch for changes in the font size and emit to parent
      watch(fontSize, (newSize) => {
        emit('update:modelValue', newSize);
      });
      
      // Watch for changes in the prop
      watch(() => props.modelValue, (newValue) => {
        fontSize.value = newValue;
      });
      
      // Toggle main controls panel
      const toggleControlsPanel = () => {
        showControlsPanel.value = !showControlsPanel.value;
        // If we're closing the panel, also close the font controls
        if (!showControlsPanel.value) {
          showFontSizeControls.value = false;
        }
      };
      
      // Close the controls panel
      const closeControlsPanel = () => {
        showControlsPanel.value = false;
        showFontSizeControls.value = false;
      };
      
      // Toggle font size controls visibility
      const toggleFontSizeControls = () => {
        showFontSizeControls.value = !showFontSizeControls.value;
      };
      
      // Increment font size
      const incrementFontSize = () => {
        if (fontSize.value < 100) {
          fontSize.value += 1;
        }
      };
      
      // Decrement font size
      const decrementFontSize = () => {
        if (fontSize.value > 8) {
          fontSize.value -= 1;
        }
      };
      
      // Reset to default size
      const resetToDefaultSize = () => {
        fontSize.value = props.defaultFontSize;
      };
      
      // Handle window resize to set mobile/desktop mode
      const handleResize = () => {
        isMobile.value = window.innerWidth <= 768;
      };
      
      // Handle click outside
      const handleClickOutside = (event) => {
        // This is a backup for closing the panel if the overlay click fails
        const controlsElement = document.querySelector('.controls-panel');
        const controlButton = document.querySelector('.control-button');
        
        if (showControlsPanel.value && 
            controlsElement && 
            !controlsElement.contains(event.target) &&
            controlButton && 
            !controlButton.contains(event.target)) {
          closeControlsPanel();
        }
      };
      
      // Set up event listeners
      onMounted(() => {
        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);
      });
      
      // Clean up event listeners
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('click', handleClickOutside);
      });
      
      return {
        fontSize,
        showControlsPanel,
        showFontSizeControls,
        isMobile,
        toggleControlsPanel,
        closeControlsPanel,
        toggleFontSizeControls,
        incrementFontSize,
        decrementFontSize,
        resetToDefaultSize
      };
    }
  };
  </script>
  
  <style scoped>

    .container {
        display: inline-block;
        cursor: pointer;
    }

    .bar1, .bar2, .bar3 {
        width: 25px;
        height: 1px;
        background-color: #04000049;
        margin: 6px 0;
        transition: 0.4s;
    }

    .change .bar1 {
        transform: translate(0, 11px) rotate(-45deg);
    }

    .change .bar2 {opacity: 0;}

    .change .bar3 {
    transform: translate(0, -11px) rotate(45deg);
    }

  .font-controls-wrapper {
    max-width: 1200px;
    height: 2rem;
    padding: 5px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    z-index: 1200;
  }
  
  .control-button {
    border: none;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1001;
    transition: all 0.3s ease;
  }
  
  .control-button.mobile {
    bottom: 20px;
    right: 20px;
  }
  
  .control-button:not(.mobile) {
    top: 20px;
    right: 20px;
  }
  
  .control-icon {
    font-size: 20px;
    font-weight: bold;
  }
  
  .controls-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1002;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .controls-panel {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
  }
  
  .controls-panel.mobile {
    width: 90%;
    max-width: 400px;
    position: absolute;
    bottom: 80px;
    right: 20px;
  }
  
  .controls-panel:not(.mobile) {
    width: 400px;
    position: relative;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .close-button:hover {
    background-color: #f0f0f0;
  }
  
  .controls-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 20px;
  }
  
  .control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .control-item:hover {
    background-color: #e0e0e0;
  }
  
  .control-item .control-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .control-item .control-label {
    font-size: 14px;
    color: #333;
  }
  
  .font-size-controls {
    padding: 20px;
    border-top: 1px solid #eee;
  }
  
  .font-size-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .font-size-header h4 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  .reset-button {
    padding: 6px 12px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }
  
  .reset-button:hover {
    background-color: #e0e0e0;
  }
  
  .slider-container {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .size-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background-color: #3498db;
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .size-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .size-button:disabled {
    background-color: #b0d1e8;
    cursor: not-allowed;
  }
  
  .slider-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .font-size-slider {
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: #ddd;
    outline: none;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  
  .font-size-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
  }
  
  .font-size-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    border: none;
  }
  
  .current-size {
    text-align: center;
    font-size: 14px;
    color: #666;
  }

  @media (max-width: 768px) {
    .bar1, .bar2, .bar3 {
        width: 2px;
        height: 1px;
    }
}
  </style>