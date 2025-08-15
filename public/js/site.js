// Site functionality: theme toggle and copy buttons
(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.siteJSInitialized) return;
  window.siteJSInitialized = true;

  // Theme management with improved error handling

  // Copy button for code blocks
  function addCopyButtons() {
    document.querySelectorAll('pre').forEach(function(pre) {
      if (pre.querySelector('.copy-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.onclick = function() {
        var code = pre.querySelector('code');
        if (!code) return;
        var text = code.innerText;
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = 'Copy'; }, 1200);
        }, function() {
          btn.textContent = 'Error';
          setTimeout(function() { btn.textContent = 'Copy'; }, 1200);
        });
      };
      pre.appendChild(btn);
    });
  }

  document.addEventListener('DOMContentLoaded', addCopyButtons);
  function toggleTheme() {
    try {
      const body = document.body;
      const currentTheme = body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update button text with proper accessibility
      const button = document.querySelector('.theme-toggle');
      if (button) {
        button.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
      }
    } catch (e) {
      console.warn('Theme toggle failed:', e);
    }
  }

  function initializeTheme() {
    try {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.body.setAttribute('data-theme', savedTheme);
      
      const button = document.querySelector('.theme-toggle');
      if (button) {
        // Remove any existing event listeners to prevent duplicates
        button.removeEventListener('click', toggleTheme);
        
        button.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', `Switch to ${savedTheme === 'dark' ? 'light' : 'dark'} mode`);
        button.addEventListener('click', toggleTheme);
      } else {
        // Retry if button not found (progressive enhancement)
        setTimeout(initializeTheme, 100);
      }
    } catch (e) {
      console.warn('Theme initialization failed:', e);
    }
  }

  // Enhanced copy functionality with better error handling
  function initializeCopyButtons() {
    try {
      document.querySelectorAll('pre').forEach(function (pre) {
        if (pre.dataset.copyAttached === '1') return;
        pre.dataset.copyAttached = '1';

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.type = 'button';
        btn.innerText = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');

        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
          const text = (pre.innerText || pre.textContent || '').trim();
          if (!text) return;

          // Modern clipboard API with fallback
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              btn.innerText = 'Copied!';
              btn.setAttribute('aria-label', 'Code copied to clipboard');
              setTimeout(function () { 
                btn.innerText = 'Copy'; 
                btn.setAttribute('aria-label', 'Copy code to clipboard');
              }, 1500);
            }).catch(function () { 
              fallbackCopy(text, btn); 
            });
          } else {
            fallbackCopy(text, btn);
          }
        });

        // Position button inside the pre
        pre.style.position = pre.style.position || 'relative';
        pre.appendChild(btn);
      });
    } catch (e) {
      console.warn('Copy button initialization failed:', e);
    }
  }

  function fallbackCopy(text, btn) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      ta.style.opacity = '0';
      ta.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ta);
      ta.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(ta);
      
      if (successful) {
        btn.innerText = 'Copied!';
        btn.setAttribute('aria-label', 'Code copied to clipboard');
        setTimeout(function () { 
          btn.innerText = 'Copy'; 
          btn.setAttribute('aria-label', 'Copy code to clipboard');
        }, 1500);
      }
    } catch (e) {
      console.warn('Fallback copy failed:', e);
    }
  }

  // Initialize everything when DOM is ready
  function init() {
    initializeTheme();
    initializeCopyButtons();
  }

  // Progressive enhancement: work with any loading state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
