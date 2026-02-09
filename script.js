// ====== EDIT THIS (for now) ======
const PAYPAL_URL = "https://www.paypal.com/ncp/payment/9XP6UXG6DGLT2";
const YOUR_EMAIL = "kamelin.13@hotmail.com";
const YOUR_WHATSAPP = "573244398401"; // no +, no spaces
// ================================

function openWhatsApp(message) {
  const url = `https://wa.me/${YOUR_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", () => {
  // Safe setters
  const paypalLink = document.getElementById("paypalLink");
  if (paypalLink) paypalLink.href = PAYPAL_URL;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const showEmail = document.getElementById("showEmail");
  if (showEmail) showEmail.textContent = YOUR_EMAIL;

  const showWhatsApp = document.getElementById("showWhatsApp");
  if (showWhatsApp) showWhatsApp.textContent = `+${YOUR_WHATSAPP}`;

  // =====================
  // WhatsApp buttons (.js-wa)
  // =====================
  document.querySelectorAll(".js-wa").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-plan");

      // If site is in Spanish, send Spanish msg; otherwise English
      const currentLang = localStorage.getItem("lang") || "en";

      const msgEn =
        `Hi! I'm interested in your services.\n` +
        (plan ? `Plan: ${plan}\n` : "") +
        `Business type:\nGoal: more leads / more bookings.\n` +
        `Please send me your plan + pricing.`;

      const msgEs =
        `¡Hola! Estoy interesado(a) en tus servicios.\n` +
        (plan ? `Plan: ${plan}\n` : "") +
        `Tipo de negocio:\nObjetivo: más leads / más reservas.\n` +
        `¿Me puedes enviar el plan y precios?`;

      openWhatsApp(currentLang === "es" ? msgEs : msgEn);
    });
  });

  // =====================
  // Mini form -> WhatsApp
  // =====================
  const miniForm = document.getElementById("miniForm");
  if (miniForm) {
    miniForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(miniForm);

      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const need = data.get("need") || "";

      const currentLang = localStorage.getItem("lang") || "en";

      const textEn =
        `Hi! I'm ${name}.\n` +
        `Email: ${email}\n` +
        `I need help with: ${need}\n` +
        `Can you send me a simple plan and pricing?`;

      const textEs =
        `¡Hola! Soy ${name}.\n` +
        `Email: ${email}\n` +
        `Necesito ayuda con: ${need}\n` +
        `¿Me puedes enviar un plan simple y precios?`;

      openWhatsApp(currentLang === "es" ? textEs : textEn);
      miniForm.reset();
    });
  }

  // =====================
  // Contact form -> email
  // =====================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);

      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const business = data.get("business") || "N/A";
      const goal = data.get("goal") || "";
      const message = data.get("message") || "";

      const subject = `New lead: ${name} — ${goal}`;
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Business type: ${business}\n` +
        `Goal: ${goal}\n\n` +
        `Message:\n${message}\n`;

      const mailto = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      contactForm.reset();
    });
  }

  // =========================
  // LANGUAGE (EN/ES)
  // =========================
  const dict = {
    en: {
      nav_services: "Services",
      nav_process: "Process",
      nav_pricing: "Pricing",
      nav_contact: "Contact",

      hero_kicker: "For service businesses (spas, clinics, beauty, home services & more)",
      hero_title: "More clients, more bookings — with ads + appointment coordination.",
      hero_sub:
        "We run Meta ads (Facebook & Instagram), manage messages, and book appointments. You focus on your business — we handle the system.",

      btn_quote: "Get a Quote",
      btn_services: "See Services",
    },
    es: {
      nav_services: "Servicios",
      nav_process: "Proceso",
      nav_pricing: "Precios",
      nav_contact: "Contacto",

      hero_kicker: "Para negocios de servicios (spas, clínicas, belleza, servicios a domicilio y más)",
      hero_title: "Más clientes, más reservas — con anuncios + coordinación de citas.",
      hero_sub:
        "Creamos anuncios en Meta (Facebook e Instagram), manejamos mensajes y agendamos citas. Tú te enfocas en tu negocio — nosotros en el sistema.",

      btn_quote: "Cotizar por WhatsApp",
      btn_services: "Ver servicios",
    },
  };

  function setLang(lang) {
    // Update text for elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });

    // Toggle active state on language buttons
    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }

  // Click handlers for language buttons
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  // Default language (saved -> browser -> en)
  const saved = localStorage.getItem("lang");
  const browser = (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  setLang(saved || browser);
});
