/* =====================================================================
   CV - Tristan Muller
   Traduction français / anglais (même fonctionnement que le portfolio)

   Fonctionnement
   - Le français est écrit directement dans index.html (langue par défaut).
   - Chaque texte traduisible porte data-i18n="clé" (contenu HTML)
     ou data-i18n-attr="attribut:clé" (alt, aria-label...).
   - Ce fichier ne contient que l'anglais : le français est relu dans la
     page au chargement, il n'est donc écrit qu'à un seul endroit.
   - Le choix est mémorisé (localStorage) et transmis au portfolio via ?lang=en.
   - Le PDF (bouton « Télécharger ») sort dans la langue affichée.
   ===================================================================== */

(() => {
  'use strict';

  const STORAGE_KEY = 'tm-lang';
  const LINKED_SITE = 'https://tristanmuller007.github.io/Portfolio/'; // le portfolio s'ouvre dans la même langue

  /* ---------- Textes en anglais ---------- */
  const EN = {
    /* Barre d'outils */
    "toolbar.pdf": "Download PDF",

    /* Contact */
    "contact.phone": "+33 7 49 49 81 37",
    "contact.portfolio": "Online portfolio",
    "contact.city": "Bourg-en-Bresse, France",
    "contact.licence": "Full driving licence · own car",

    /* Compétences */
    "skills.tech": "Technical skills",
    "skills.t1": "HTML / CSS, JavaScript, PHP, APIs",
    "skills.t2": "SQL (MySQL), data modelling",
    "skills.t3": "Java, C++, Python",
    "skills.t4": "Git / GitHub, Qt, JUnit, Linux",
    "skills.t5": "AI-assisted development (Claude)",
    "skills.soft": "Soft skills",
    "skills.s1": "Gathering and analysing needs",
    "skills.s2": "Explaining things to non-technical people",
    "skills.s3": "Self-reliance, prioritising tasks",
    "skills.s4": "Attention to detail, quality control",
    "skills.s5": "Teamwork and coaching",

    /* Langues */
    "lang.title": "Languages",
    "lang.en": "English",
    "lang.native": "Native",
    "lang.fr": "French",
    "lang.bilingual": "Bilingual",
    "lang.es": "Spanish",

    /* Centres d'intérêt */
    "int.title": "Interests",
    "int.karate": "Karate",
    "int.k1": "African Champion 2018",
    "int.k2": "South African Champion 2015 - 2020",
    "int.k3": "World Championships, Sweden 2019",
    "int.t1": "South African Champion 2016 - 2019",
    "int.other": "Other interests",
    "int.o1": "Competitive handball",
    "int.o2": "Sports associations",
    "int.o3": "AI and automation",
    "int.o4": "Video games",

    /* Formation */
    "edu.title": "Education",
    "edu.but": "BUT Informatique - 3-year CS Bachelor's",
    "edu.but.school": "Claude Bernard University (IUT Lyon 1), France",
    "edu.but.text": "2025 - 2028 · Web, databases, testing",
    "edu.bac": "Baccalauréat STI2D - French high-school diploma (engineering &amp; technology)",
    "edu.bac.school": "Lycée de la Plaine de l'Ain, France",

    /* En-tête */
    "head.sub": "Computer Science student · IUT Lyon 1, France",
    "head.status": "<i></i>Internship / work placement · 12 April - 18 June 2027",

    /* Profil */
    "profile.title": "Profile &amp; motivation",
    "profile.text": "Former <strong>African Karate Champion</strong>: I bring the <strong>discipline</strong> and <strong>precision</strong> of top-level sport to everything I do. As a Computer Science student, I build <strong>complete web applications</strong>, from database to interface. Now looking for an internship.",

    /* Expérience professionnelle */
    "exp.title": "Professional experience",
    "j1.title": "Production Operator <em>(temp)</em>",
    "j1.date": "July 2026",
    "j1.where": "Caps Packaging · plastic bottles · Ain, France",
    "j1.l1": "Ran several blow-moulding machines on my own in an industrial plant.",
    "j1.l2": "Checked quality every 2 to 4 hours and tracked production.",
    "j2.title": "Farm Worker",
    "j2.date": "Summer 2025",
    "j2.where": "D. Gutzwiller Group · Domaine du Grand Kohlberg, Alsace, France",
    "j2.l1": "Mowed and maintained over 60 hectares of green areas.",
    "j2.l2": "Drove tractors and carried out preventive maintenance.",
    "j3.title": "Cheese Maturing Operator",
    "j3.date": "Summer 2023",
    "j3.where": "Fromagerie Antony · Vieux-Ferrette, Alsace, France",
    "j3.l1": "Checked the quality of the cheeses against strict standards.",
    "j3.l2": "Matured the cheeses, then prepared and shipped customer orders.",
    "j4.title": "Tennis Coach",
    "j4.where": "MTG Tennis · Cape Town, South Africa",
    "j4.l1": "Coached and trained over 30 young players per season.",
    "j4.l2": "Organised and ran the weekly training sessions.",
    "j5.title": "Waiter",
    "j5.date": "Summers 2020 and 2021",
    "j5.where": "Sótano Seafood &amp; Sushi · Cape Town, South Africa",
    "j5.l1": "Served customers and took orders in a busy restaurant, and set the room up before each service.",

    /* Projets */
    "projects.title": "Academic projects",
    "p1.title": "Web tool - Clients &amp; invoicing",
    "p1.tag": "Team of 4 · 8 months",
    "p1.text": "Secure client portal for project tracking, tickets and invoices. Data model, role-based access and external APIs.",
    "p2.title": "Connect Four over Wi-Fi",
    "p2.tag": "ESP32 · Pair work",
    "p2.text": "Wired two ESP32 boards with LED matrices and push buttons. Coded ESP-NOW comms, turn-based play and win detection.",
    "p3.title": "Restaurant website",
    "p3.tag": "HTML / CSS · Pair work",
    "p3.text": "Analysed the client brief and designed the site structure. Built and tested an 11-page responsive site, focusing on layout and usability.",
    "p4.title": "Interactive gamebook",
    "p4.tag": "C++ / Qt · Team of 3",
    "p4.text": "Desktop app to write and play a choose-your-own-adventure book, with export to a website.",

    /* Textes alternatifs */
    "a11y.photo": "Photo of Tristan Muller"
  };

  /* ---------- Métadonnées de la page ---------- */
  const META = {
    fr: {
      title:       document.title,
      description: document.querySelector('meta[name="description"]').content,
    },
    en: {
      title:       'CV - Tristan Muller',
      description: 'CV of Tristan Muller, Computer Science student at IUT Lyon 1, France.',
    },
  };

  /* ---------- Sauvegarde du français d'origine ---------- */
  const textNodes = [...document.querySelectorAll('[data-i18n]')];
  const attrNodes = [...document.querySelectorAll('[data-i18n-attr]')];

  textNodes.forEach((el) => { el.dataset.fr = el.innerHTML; });
  // data-i18n-attr peut lister plusieurs attributs : "alt:clé1;title:clé2"
  const pairs = (el) => el.dataset.i18nAttr.split(';').map((pair) => pair.split(':'));
  const frAttrs = new Map(attrNodes.map((el) => [
    el, Object.fromEntries(pairs(el).map(([attr]) => [attr, el.getAttribute(attr)])),
  ]));

  /* ---------- Langue de départ ----------
     1. ?lang=en ou ?lang=fr dans l'adresse
     2. dernier choix du visiteur
     3. langue du navigateur (français si le navigateur est en français) */
  function initialLanguage() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (e) { /* stockage indisponible (navigation privée...) */ }

    return (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  /* ---------- Application d'une langue ---------- */
  function setLanguage(lang, save) {
    const en = lang === 'en';

    textNodes.forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = en && EN[key] !== undefined ? EN[key] : el.dataset.fr;
    });

    attrNodes.forEach((el) => {
      pairs(el).forEach(([attr, key]) => {
        el.setAttribute(attr, en && EN[key] !== undefined ? EN[key] : frAttrs.get(el)[attr]);
      });
    });

    document.documentElement.lang = lang;
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]').content = META[lang].description;

    // Les liens vers l'autre site gardent la langue choisie
    document.querySelectorAll(`a[href^="${LINKED_SITE}"]`).forEach((a) => {
      a.href = en ? `${LINKED_SITE}?lang=en` : LINKED_SITE;
    });

    // État des boutons FR / EN
    document.querySelectorAll('.lang-switch [data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });

    if (save) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignoré */ }
    }

    window.i18n.lang = lang;
  }

  /* ---------- Démarrage ---------- */
  window.i18n = { lang: 'fr' };

  document.querySelectorAll('.lang-switch [data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang, true));
  });

  const start = initialLanguage();
  if (start !== 'fr') setLanguage(start, false);
})();
