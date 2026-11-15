const fs = require('fs');
const cssToAppend = `

/* ==========================================================================
   13. OFFCANVAS DRAWER & MODAL SYSTEM (BLOCKSY DAILY NEWS MOBILE SPEC)
   ========================================================================== */
.ct-offcanvas-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 9998;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.ct-offcanvas-overlay.is-active {
  opacity: 1;
  visibility: visible;
}

.ct-offcanvas-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background-color: var(--color-bg);
  color: var(--color-text-main);
  z-index: 9999;
  box-shadow: 4px 0 24px rgba(0,0,0,0.35);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.ct-offcanvas-drawer.is-active {
  transform: translateX(0);
}

.ct-offcanvas-header {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
  color: #FFFFFF;
}

.ct-offcanvas-title {
  font-family: var(--font-editorial);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

.ct-offcanvas-close {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
}

.ct-offcanvas-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.ct-offcanvas-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.ct-offcanvas-nav li {
  border-bottom: 1px solid var(--color-border);
}

.ct-offcanvas-nav a {
  display: block;
  padding: 12px 6px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-main);
  text-decoration: none;
  transition: color 0.15s ease, padding-left 0.15s ease;
}

.ct-offcanvas-nav a:hover {
  color: var(--color-primary-red);
  padding-left: 8px;
}

.ct-offcanvas-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
`;

fs.appendFileSync('preview/style.css', cssToAppend);
fs.appendFileSync('rashtrarang-theme/style.css', cssToAppend);
console.log('Appended offcanvas drawer styles to both CSS files.');
