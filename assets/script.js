/* ============================================
   MILTON CASTAÑEDA — i18n + interacciones
   ============================================ */

(function() {
  'use strict';

  // Detectar idioma guardado o usar español por defecto
  const STORAGE_KEY = 'mc_lang';
  const DEFAULT_LANG = 'es';

  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function setSavedLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    // Mostrar/ocultar elementos según idioma
    document.querySelectorAll('[data-lang]').forEach(el => {
      if (el.dataset.lang === lang) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // Actualizar botones activos
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
    });

    // Actualizar atributo aria
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.setLang === lang);
    });
  }

  // Inicializar al cargar
  document.addEventListener('DOMContentLoaded', function() {
    const initialLang = getSavedLang();
    applyLang(initialLang);

    // Listeners para botones
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', function() {
        const lang = this.dataset.setLang;
        setSavedLang(lang);
        applyLang(lang);
      });
    });
  });

  // Smooth reveal on scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
  }
})();
