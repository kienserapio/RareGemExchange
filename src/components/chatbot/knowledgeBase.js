/**
 * knowledgeBase.js
 * ────────────────────────────────────────────────────────────────────────────
 * Decision-tree knowledge base for the Rare Gem Exchange concierge chatbot.
 *
 * This file is DATA ONLY — no logic. It models a deeply nested conversational
 * tree as a flat map of node keys → node objects, plus the static prepared
 * questions ("quick replies") and the keyword → intent map consumed by the
 * pure helpers in `chatbotEngine.js`.
 *
 * Copy is written in an ultra-premium, trustworthy estate / private-banking
 * tone appropriate to investment-grade coloured gemstone trading.
 * ────────────────────────────────────────────────────────────────────────────
 */

/**
 * A single node in the conversational decision tree.
 * @typedef {Object} ChatNode
 * @property {string}   id           Stable identifier (matches its map key).
 * @property {string}   label        Short button text used when this node is
 *                                    surfaced as a child quick reply.
 * @property {string}   message      The concierge's structured response. May
 *                                    contain `\n` newlines for paragraphs /
 *                                    bulleted lists (rendered with pre-wrap).
 * @property {string[]} quickReplies Ordered list of child node keys offered
 *                                    after this node's message is shown.
 */

/**
 * A selectable prepared question.
 * @typedef {Object} QuickReply
 * @property {string} key   The destination node key in {@link KNOWLEDGE_BASE}.
 * @property {string} label The button text shown to the user.
 */

/** The conversation always begins (and "Main Menu" returns) here. */
export const ROOT_KEY = 'root';

/**
 * The full decision tree.
 * @type {Record<string, ChatNode>}
 */
export const KNOWLEDGE_BASE = {
  root: {
    id: 'root',
    label: 'Main Menu',
    message:
      "Welcome to the Rare Gem Exchange — a private atelier for investment-grade coloured gemstones and rare collectible stones.\n\nI am your dedicated concierge. How may I assist with your acquisition, valuation, or authentication inquiry today?",
    // On the welcome screen we surface the curated INITIAL_QUICK_REPLIES below
    // rather than these keys; they are listed here for completeness / fallback.
    quickReplies: ['buying', 'selling', 'authenticity'],
  },

  /* ── Buying / Acquisition ─────────────────────────────────────────────── */

  buying: {
    id: 'buying',
    label: 'Acquiring Gems',
    message:
      "Our acquisition desk curates a discreet portfolio of Fine Gems, Rare Stones, and Investment-Grade material — each piece vetted by our gemmological committee and reserved for qualified collectors and institutions.\n\nWhich aspect of acquisition may I detail for you?",
    quickReplies: ['inventory', 'certification', 'caratSizes', 'privateViewing', 'humanSupport'],
  },

  inventory: {
    id: 'inventory',
    label: 'Available Inventory',
    message:
      "Our current register spans certified Burmese and Mozambican rubies, Kashmir and Ceylon sapphires, Colombian emeralds, and exceptional alexandrites — alongside select rarities such as Paraiba tourmaline and padparadscha sapphire.\n\nLive inventory is held off-market and disclosed under non-disclosure agreement. Shall I prepare a curated portfolio aligned to your mandate?",
    quickReplies: ['gems', 'certification', 'caratSizes', 'privateViewing', 'humanSupport'],
  },

  gems: {
    id: 'gems',
    label: 'Specific Gemstones',
    message:
      "Each gem family is sourced to a singular standard:\n\n•  Ruby — Burmese 'pigeon's blood', no-heat preferred.\n•  Sapphire — Kashmir cornflower and Ceylon royal blue.\n•  Emerald — Colombian (Muzo / Chivor), minor traditional treatment.\n•  Alexandrite — Brazilian and Russian, with pronounced colour change.\n\nWould you like certification details or a private viewing of a particular stone?",
    quickReplies: ['certification', 'caratSizes', 'privateViewing', 'inventory', 'humanSupport'],
  },

  certification: {
    id: 'certification',
    label: 'Certification (GRS / SSEF)',
    message:
      "Every stone is accompanied by independent reports from the world's preeminent laboratories — SSEF, Gubelin, GRS, and AGL — documenting species, country of origin, and any treatment.\n\nFor investment-grade material we provide a complete provenance dossier and, where merited, premium colour grading (such as 'pigeon's blood' or 'royal blue'). Which would you like to explore?",
    quickReplies: ['grading', 'originVerification', 'inventory', 'humanSupport'],
  },

  caratSizes: {
    id: 'caratSizes',
    label: 'Carat & Sizing',
    message:
      "Investment-grade stones in our register typically range from 3 to 20-plus carats, with landmark pieces exceeding 30 carats reserved for institutional and private-estate clients.\n\nRarity — and therefore value per carat — escalates sharply with size, clarity, and untreated status. May I source a specific weight or budget bracket on your behalf?",
    quickReplies: ['inventory', 'certification', 'privateViewing', 'humanSupport'],
  },

  privateViewing: {
    id: 'privateViewing',
    label: 'Private Viewings',
    message:
      "Private viewings are conducted strictly by appointment at our secured suites in Geneva, Hong Kong, and New York — or via fully insured courier presentation at a venue of your choosing.\n\nEach viewing is confidential and typically arranged within 48 to 72 hours. Shall I have a concierge contact you to schedule?",
    quickReplies: ['escrow', 'inventory', 'humanSupport'],
  },

  /* ── Selling / Liquidation ────────────────────────────────────────────── */

  selling: {
    id: 'selling',
    label: 'Selling & Liquidation',
    message:
      "We assist private collectors, estates, and institutions in liquidating exceptional stones through discreet private treaty and our vetted global network of buyers.\n\nThe process begins with a confidential valuation. Shall I outline valuation, the documentation required, or the full appraisal timeline?",
    quickReplies: ['valuation', 'documentation', 'appraisalProcess', 'humanSupport'],
  },

  valuation: {
    id: 'valuation',
    label: 'Submit for Valuation',
    message:
      "To open a valuation, our gemmologists conduct a preliminary review from high-resolution imagery and any existing laboratory reports, followed by an in-person or laboratory examination.\n\nThere is no obligation, and every submission is held in the strictest confidence. Shall I detail the documentation required to begin?",
    quickReplies: ['documentation', 'appraisalProcess', 'escrow', 'humanSupport'],
  },

  documentation: {
    id: 'documentation',
    label: 'Required Documentation',
    message:
      "To expedite an accurate appraisal, we request:\n\n•  Any existing laboratory reports (SSEF, Gubelin, GRS, AGL).\n•  Proof of provenance or prior purchase records.\n•  Precise carat weight and measurements, if known.\n•  Clear photographs in both natural and incandescent light.\n\nNothing is required upfront beyond imagery — full documentation follows once we proceed. Would you like to begin a submission?",
    quickReplies: ['valuation', 'appraisalProcess', 'humanSupport'],
  },

  appraisalProcess: {
    id: 'appraisalProcess',
    label: 'Appraisal Process',
    message:
      "Our appraisal unfolds across three discreet stages:\n\n1.  Preliminary review (24–48 hrs) from imagery and reports.\n2.  Independent laboratory verification of species, origin, and treatment.\n3.  A formal valuation reflecting current private-treaty market levels.\n\nUpon your approval, settlement is completed through regulated escrow. Shall I introduce you to an estate representative?",
    quickReplies: ['valuation', 'escrow', 'humanSupport'],
  },

  /* ── Authenticity & Trust ─────────────────────────────────────────────── */

  authenticity: {
    id: 'authenticity',
    label: 'Authenticity & Trust',
    message:
      "Trust is the foundation of the exchange. Every transaction is underwritten by independent grading, rigorous origin verification, and fully insured, escrow-protected logistics.\n\nWhich pillar of our assurance framework may I detail?",
    quickReplies: ['grading', 'originVerification', 'escrow', 'humanSupport'],
  },

  grading: {
    id: 'grading',
    label: 'Investment-Grade Grading',
    message:
      "Investment-grade designation is reserved for stones of exceptional clarity, saturation, and provenance — typically untreated and of significant carat weight.\n\nEach grade is corroborated by at least two independent laboratories, ensuring the valuation withstands institutional scrutiny and secondary-market resale. Would you like origin or escrow details?",
    quickReplies: ['originVerification', 'escrow', 'certification', 'humanSupport'],
  },

  originVerification: {
    id: 'originVerification',
    label: 'Origin & Provenance',
    message:
      "Geographic origin profoundly influences value — a Kashmir sapphire or Burmese ruby commands a substantial premium over comparable material from other locales.\n\nWe verify origin through advanced spectroscopic analysis at SSEF and Gubelin, and document the full chain of ownership wherever it can be established. May I present certified pieces or arrange a viewing?",
    quickReplies: ['certification', 'inventory', 'privateViewing', 'humanSupport'],
  },

  escrow: {
    id: 'escrow',
    label: 'Secure Escrow & Logistics',
    message:
      "Every settlement is conducted through a regulated, neutral escrow institution — funds are released only once you have independently verified the stone and its documentation.\n\nTransport is entrusted to specialist fine-art logistics partners under full all-risk insurance and discreet custody. Shall I connect you with a representative to begin?",
    quickReplies: ['authenticity', 'privateViewing', 'humanSupport'],
  },

  /* ── Human handoff ────────────────────────────────────────────────────── */

  humanSupport: {
    id: 'humanSupport',
    label: 'Speak to a Representative',
    message:
      "It would be our privilege to assist you personally. Our estate representatives are available by appointment for confidential consultation.\n\n•  Email — concierge@raregemexchange.com\n•  Private line — +41 22 000 0000 (Geneva)\n\nKindly share your preferred means of contact and a representative will respond within one business day.",
    quickReplies: ['root'],
  },
};

/**
 * Static prepared questions shown the moment the chat opens (and again on the
 * fallback path). Labels are bespoke phrasings; each maps directly to a node.
 * @type {QuickReply[]}
 */
export const INITIAL_QUICK_REPLIES = [
  { key: 'selling', label: 'How do I sell a rare stone?' },
  { key: 'inventory', label: 'View investment-grade inventory' },
  { key: 'certification', label: 'Are your gems certified?' },
  { key: 'privateViewing', label: 'Book a private viewing' },
  { key: 'escrow', label: 'How does escrow work?' },
];

/**
 * Extra quick reply appended on the fallback (no-match) path so the user can
 * always reach a human.
 * @type {QuickReply}
 */
export const HUMAN_SUPPORT_REPLY = {
  key: 'humanSupport',
  label: 'Speak to an estate representative',
};

/**
 * Ordered keyword → node map for free-text intent matching. Order matters:
 * on a score tie, the earlier entry wins, so higher-signal intents are listed
 * first. All keywords are lowercase and diacritic-free to match the output of
 * `normalizeText` in the engine.
 * @type {Record<string, string[]>}
 */
export const KEYWORD_MAP = {
  selling: [
    'sell', 'selling', 'sold', 'liquidate', 'liquidating', 'liquidation',
    'appraise', 'appraisal', 'valuation', 'valuate', 'value', 'worth',
    'consign', 'consignment', 'divest', 'estimate',
  ],
  buying: [
    'buy', 'buying', 'purchase', 'purchasing', 'acquire', 'acquisition',
    'inventory', 'available', 'availability', 'stock', 'collection',
    'browse', 'catalogue', 'catalog', 'portfolio', 'shop',
  ],
  gems: [
    'emerald', 'emeralds', 'ruby', 'rubies', 'sapphire', 'sapphires',
    'alexandrite', 'alexandrites', 'diamond', 'diamonds', 'spinel',
    'paraiba', 'padparadscha', 'tourmaline',
  ],
  privateViewing: [
    'viewing', 'appointment', 'visit', 'showing', 'book', 'booking',
    'schedule', 'meeting', 'consultation', 'consult',
  ],
  certification: [
    'certificate', 'certified', 'certify', 'certification', 'grs', 'ssef',
    'gubelin', 'agl', 'report', 'laboratory', 'grading', 'graded', 'grade',
  ],
  escrow: [
    'escrow', 'secure', 'security', 'logistics', 'shipping', 'ship',
    'delivery', 'insured', 'insurance', 'transit', 'custody', 'settlement',
  ],
  authenticity: [
    'authentic', 'authenticity', 'origin', 'provenance', 'trust',
    'trustworthy', 'genuine', 'real', 'legitimate', 'verify', 'verification',
  ],
  caratSizes: ['carat', 'carats', 'size', 'sizes', 'weight'],
  root: ['hello', 'hi', 'hey', 'greetings', 'menu', 'start', 'options', 'home'],
  humanSupport: [
    'representative', 'human', 'agent', 'person', 'contact', 'advisor',
    'concierge', 'call', 'phone', 'email', 'speak', 'talk', 'support',
  ],
};
