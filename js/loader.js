const loader = {
  show(message = 'Loading...') {
      const container = document.getElementById('loaderContainer');
      const textElement = document.getElementById('loaderText');
      textElement.textContent = message;
      container.classList.add('visible');
  },
  
  hide() {
      const container = document.getElementById('loaderContainer');
      container.classList.remove('visible');
  },

  updateText(message) {
      document.getElementById('loaderText').textContent = message;
  }
};

// Show loader when page starts loading
loader.show('Loading...');

// Handle initial page load
let resourcesLoaded = false;
let DOMLoaded = false;

// Check if all resources (images, scripts, etc.) are loaded
window.addEventListener('load', () => {
  resourcesLoaded = true;
  if (DOMLoaded) loader.hide();
});

// Check if DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  DOMLoaded = true;
  if (resourcesLoaded) loader.hide();
});

// Handle dynamic content loading (AJAX example)
function fetchData() {
  loader.show('Fetching data...');
  
  fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => {
          // Process your data
          loader.hide();
      })
      .catch(error => {
          loader.updateText('Error loading data');
          console.error('Error:', error);
          setTimeout(() => loader.hide(), 2000);
      });
}

// Monitor navigation events (for single page applications)
if ('navigation' in window) {
  navigation.addEventListener('navigate', () => {
      loader.show('Navigating...');
  });
}

// Monitor resource loading
const resourceLoader = {
  pending: new Set(),
  
  track(url) {
      this.pending.add(url);
      loader.show(`Loading resources (${this.pending.size} remaining)...`);
  },
  
  complete(url) {
      this.pending.delete(url);
      if (this.pending.size === 0) {
          loader.hide();
      } else {
          loader.updateText(`Loading resources (${this.pending.size} remaining)...`);
      }
  }
};

// Monitor dynamic script loading
const originalCreateElement = document.createElement.bind(document);
document.createElement = function(type) {
  const element = originalCreateElement(type);
  if (type === 'script') {
      element.addEventListener('load', () => {
          resourceLoader.complete(element.src);
      });
      element.addEventListener('error', () => {
          resourceLoader.complete(element.src);
      });
      if (element.src) {
          resourceLoader.track(element.src);
      }
  }
  return element;
};
