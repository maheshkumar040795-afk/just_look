/* ============================================
   JUST LOOK - CUSTOMIZE YOUR STYLE — shared script
   ============================================ */

/* ---- CONFIG: replace these once you have real details ---- */
const SITE = {
  whatsapp: "916380315297",      // Primary WhatsApp: 63803 15297
  phone: "+916380315297",        // Primary phone: 63803 15297 (alt: 98412 64341)
  email: "justlook.95516@gmail.com",
  address: "M.G.R. Nagar No:2, Kundrathur Main Rd, Astha Lakshmi Nagar, Murugapillai Nagar, Kumananchavadi, Chennai, Kattuppakkam, Tamil Nadu 600056",
  gstin: "33APOPA8381D3ZX",
  mapsEmbed: "https://www.google.com/maps?q=Just+Look+-+Customize+Your+Style,13.0421828,80.1152066&z=17&output=embed"
};

function waLink(message) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ---- Hamburger menu ---- */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Wire up floating + static call buttons and any [data-call] elements
  document.querySelectorAll('[data-call]').forEach(el => el.setAttribute('href', `tel:${SITE.phone}`));
  document.querySelectorAll('[data-wa-generic]').forEach(el => {
    el.setAttribute('href', waLink("Hello Just Look, I'd like to know more about your tailoring & uniform services."));
  });
  document.querySelectorAll('[data-mailto]').forEach(el => el.setAttribute('href', `mailto:${SITE.email}`));

  initFAQ();
  initLightbox();
});

/* ---- Product quick-enquiry buttons ---- */
function enquireProduct(name) {
  const msg = `Hello! I'm interested in "${name}". Could you share pricing and available options?`;
  window.open(waLink(msg), '_blank');
}

/* ---- General contact form -> WhatsApp ---- */
function sendEnquiry(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('enquiryName')?.value.trim();
  const phone = document.getElementById('enquiryPhone')?.value.trim();
  const service = document.getElementById('enquiryService')?.value;
  const msg = document.getElementById('enquiryMsg')?.value.trim();

  if (!name || !phone) { alert('Please fill in your name and phone number.'); return; }

  const text = `Hello Just Look! I'd like to enquire.\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${service || 'General Enquiry'}\nMessage: ${msg || '-'}`;
  window.open(waLink(text), '_blank');
}

/* ---- Bulk order quote form -> WhatsApp ---- */
function sendBulkQuote(e) {
  if (e) e.preventDefault();
  const org = document.getElementById('bulkOrg')?.value.trim();
  const type = document.getElementById('bulkType')?.value;
  const qty = document.getElementById('bulkQty')?.value.trim();
  const name = document.getElementById('bulkName')?.value.trim();
  const phone = document.getElementById('bulkPhone')?.value.trim();

  if (!org || !name || !phone) { alert('Please fill in organisation name, your name and phone number.'); return; }

  const text = `Hello Just Look! I'd like a BULK UNIFORM quotation.\n\nOrganisation: ${org}\nUniform Type: ${type || '-'}\nApprox. Quantity: ${qty || '-'}\nContact Name: ${name}\nPhone: ${phone}`;
  window.open(waLink(text), '_blank');
}

/* ---- Wedding order form -> WhatsApp ---- */
function sendWeddingOrder(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('weddingName')?.value.trim();
  const phone = document.getElementById('weddingPhone')?.value.trim();
  const dressType = document.getElementById('weddingDressType')?.value;
  const date = document.getElementById('weddingDate')?.value.trim();
  const msg = document.getElementById('weddingMsg')?.value.trim();

  if (!name || !phone || !dressType) { alert('Please fill in your name, phone number and select a dress type.'); return; }

  const text = `Hello Just Look! I'd like to place a WEDDING ORDER.\n\nGroom Wedding Dress Type: ${dressType}\nWedding Date: ${date || '-'}\nName: ${name}\nPhone: ${phone}\nAdditional Details: ${msg || '-'}`;
  window.open(waLink(text), '_blank');
}

/* ---- Blazer order builder ---- */
let blazerState = { color: 'Navy Blue', hex: '#1b2a4a', size: '40', qty: 1 };

function selectColor(el, name, hex) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  blazerState.color = name;
  blazerState.hex = hex;
  const preview = document.getElementById('blazerPreview');
  if (preview) preview.style.filter = name === 'Black' ? 'none' : 'hue-rotate(0deg)';
  updateOrderSummary();
}

function selectSize(el, size) {
  document.querySelectorAll('.size-chip').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  blazerState.size = size;
  updateOrderSummary();
}

function changeQty(delta) {
  blazerState.qty = Math.max(1, blazerState.qty + delta);
  const qtyEl = document.getElementById('qtyValue');
  if (qtyEl) qtyEl.textContent = blazerState.qty;
  updateOrderSummary();
}

function updateOrderSummary() {
  const summary = document.getElementById('orderSummary');
  if (summary) {
    summary.innerHTML = `Colour: <strong>${blazerState.color}</strong> &nbsp;|&nbsp; Size: <strong>${blazerState.size}</strong> &nbsp;|&nbsp; Qty: <strong>${blazerState.qty}</strong>`;
  }
}

function generateOrderNumber() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BLZ-${rand}`;
}

function orderBlazerOnWhatsApp(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('orderName')?.value.trim();
  const phone = document.getElementById('orderPhone')?.value.trim();

  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const orderNo = generateOrderNumber();
  const text = `Hello, I would like to order:\n\nOrder Number: ${orderNo}\nColour: ${blazerState.color}\nSize: ${blazerState.size}\nQuantity: ${blazerState.qty}\nName: ${name}\nPhone: ${phone}`;
  window.open(waLink(text), '_blank');
}

/* ---- FAQ accordion ---- */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* ---- Gallery lightbox ---- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
}
