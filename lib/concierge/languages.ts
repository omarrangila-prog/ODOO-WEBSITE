/**
 * Languages the concierge can offer. Each entry carries the ElevenLabs agent language code, the spoken first
 * message and the interface strings.
 *
 * Translations were drafted for launch and need a native speaker's review before a language is advertised in
 * production. `NEXT_PUBLIC_CONCIERGE_LANGUAGES` (comma-separated ids, e.g. "en-GB,en-US,ur,ar,nl") limits the
 * selector; when unset, previews show every language and production shows only English.
 */
export type ConciergeLangId = 'en-GB' | 'en-US' | 'ur' | 'ar' | 'nl' | 'fr' | 'de' | 'es' | 'it' | 'tr' | 'hi';

/** ElevenLabs agent language codes (a subset of the SDK's Language union). */
export type AgentLanguage = 'en' | 'ur' | 'ar' | 'nl' | 'fr' | 'de' | 'es' | 'it' | 'tr' | 'hi';

export interface ConciergeStrings {
  bubble: string;
  meet: string;
  heading: string;
  aiNote: string;
  firstMessage: string;
  startVoice: string;
  endVoice: string;
  typePlaceholder: string;
  send: string;
  suggestions: [string, string, string, string, string, string];
  connecting: string;
  listening: string;
  speaking: string;
  thinking: string;
  privacy: string;
}

export interface ConciergeLanguage {
  id: ConciergeLangId;
  /** Name in its own language, for the selector. */
  label: string;
  agentLanguage: AgentLanguage;
  htmlLang: string;
  dir: 'ltr' | 'rtl';
  t: ConciergeStrings;
}

const EN: ConciergeStrings = {
  bubble: 'Welcome! May I help you?',
  meet: 'Meet your AI guide',
  heading: 'ODOOVATIONS AI Concierge',
  aiNote: 'I’m an AI assistant, not a member of staff.',
  firstMessage:
    'Hello, welcome to ODOOVATIONS! It’s lovely to have you here. I’m your AI guide. Would you like to explore our services, or tell me a little about your business?',
  startVoice: 'Talk to me',
  endVoice: 'End voice chat',
  typePlaceholder: 'Type your question…',
  send: 'Send',
  suggestions: ['Tell me about Odoo', 'What can you automate?', 'Explore your services', 'How much does ERP cost?', 'Show me your work', 'Speak to your team'],
  connecting: 'Connecting…',
  listening: 'Listening',
  speaking: 'Speaking',
  thinking: 'Thinking…',
  privacy:
    'This assistant runs on ElevenLabs. Your voice and messages are sent to ElevenLabs to produce answers. Please don’t share passwords or payment details.',
};

export const conciergeLanguages: ConciergeLanguage[] = [
  { id: 'en-GB', label: 'English (UK)', agentLanguage: 'en', htmlLang: 'en-GB', dir: 'ltr', t: EN },
  { id: 'en-US', label: 'English (US)', agentLanguage: 'en', htmlLang: 'en-US', dir: 'ltr', t: EN },
  {
    id: 'ur', label: 'اردو', agentLanguage: 'ur', htmlLang: 'ur', dir: 'rtl',
    t: {
      bubble: 'خوش آمدید! کیا میں آپ کی مدد کر سکتی ہوں؟',
      meet: 'اپنی AI گائیڈ سے ملیں',
      heading: 'ODOOVATIONS AI کنسیئرج',
      aiNote: 'میں ایک AI اسسٹنٹ ہوں، عملے کی رکن نہیں۔',
      firstMessage: 'السلام علیکم، ODOOVATIONS میں خوش آمدید! میں آپ کی AI گائیڈ ہوں۔ کیا آپ ہماری خدمات دیکھنا چاہیں گے، یا مجھے اپنے کاروبار کے بارے میں کچھ بتائیں گے؟',
      startVoice: 'مجھ سے بات کریں',
      endVoice: 'آواز والی گفتگو ختم کریں',
      typePlaceholder: 'اپنا سوال لکھیں…',
      send: 'بھیجیں',
      suggestions: ['Odoo کے بارے میں بتائیں', 'آپ کیا خودکار بنا سکتے ہیں؟', 'اپنی خدمات دکھائیں', 'ERP کی لاگت کتنی ہے؟', 'اپنا کام دکھائیں', 'آپ کی ٹیم سے بات کرنی ہے'],
      connecting: 'رابطہ ہو رہا ہے…',
      listening: 'سن رہی ہوں',
      speaking: 'بول رہی ہوں',
      thinking: 'سوچ رہی ہوں…',
      privacy: 'یہ اسسٹنٹ ElevenLabs پر چلتا ہے۔ جواب دینے کے لیے آپ کی آواز اور پیغامات ElevenLabs کو بھیجے جاتے ہیں۔ براہِ کرم پاس ورڈ یا ادائیگی کی معلومات شیئر نہ کریں۔',
    },
  },
  {
    id: 'ar', label: 'العربية', agentLanguage: 'ar', htmlLang: 'ar', dir: 'rtl',
    t: {
      bubble: 'مرحباً! هل يمكنني مساعدتك؟',
      meet: 'تعرّف على مرشدتك الذكية',
      heading: 'مساعدة ODOOVATIONS الذكية',
      aiNote: 'أنا مساعدة ذكاء اصطناعي ولست موظفة.',
      firstMessage: 'مرحباً بكم في ODOOVATIONS! أنا مرشدتك الذكية. هل تودّ استكشاف خدماتنا، أم تخبرني قليلاً عن عملك؟',
      startVoice: 'تحدّث معي',
      endVoice: 'إنهاء المحادثة الصوتية',
      typePlaceholder: 'اكتب سؤالك…',
      send: 'إرسال',
      suggestions: ['أخبرني عن Odoo', 'ماذا يمكنكم أتمتته؟', 'استعرض خدماتكم', 'كم تكلفة نظام ERP؟', 'أرني أعمالكم', 'أريد التحدث مع فريقكم'],
      connecting: 'جارٍ الاتصال…',
      listening: 'أستمع',
      speaking: 'أتحدث',
      thinking: 'أفكّر…',
      privacy: 'تعمل هذه المساعدة عبر ElevenLabs. تُرسَل رسائلك وصوتك إلى ElevenLabs لإعداد الإجابات. يُرجى عدم مشاركة كلمات المرور أو بيانات الدفع.',
    },
  },
  {
    id: 'nl', label: 'Nederlands', agentLanguage: 'nl', htmlLang: 'nl', dir: 'ltr',
    t: {
      bubble: 'Welkom! Kan ik u helpen?',
      meet: 'Maak kennis met uw AI-gids',
      heading: 'ODOOVATIONS AI-concierge',
      aiNote: 'Ik ben een AI-assistent, geen medewerker.',
      firstMessage: 'Hallo, welkom bij ODOOVATIONS! Ik ben uw AI-gids. Wilt u onze diensten verkennen, of vertelt u me iets over uw bedrijf?',
      startVoice: 'Praat met mij',
      endVoice: 'Spraakgesprek beëindigen',
      typePlaceholder: 'Typ uw vraag…',
      send: 'Versturen',
      suggestions: ['Vertel me over Odoo', 'Wat kunt u automatiseren?', 'Bekijk uw diensten', 'Wat kost een ERP?', 'Laat uw werk zien', 'Spreek met uw team'],
      connecting: 'Verbinden…',
      listening: 'Luistert',
      speaking: 'Spreekt',
      thinking: 'Denkt na…',
      privacy: 'Deze assistent draait op ElevenLabs. Uw stem en berichten worden naar ElevenLabs gestuurd om antwoorden te maken. Deel geen wachtwoorden of betaalgegevens.',
    },
  },
  {
    id: 'fr', label: 'Français', agentLanguage: 'fr', htmlLang: 'fr', dir: 'ltr',
    t: {
      bubble: 'Bienvenue ! Puis-je vous aider ?',
      meet: 'Rencontrez votre guide IA',
      heading: 'Concierge IA ODOOVATIONS',
      aiNote: 'Je suis une assistante IA, pas une employée.',
      firstMessage: 'Bonjour et bienvenue chez ODOOVATIONS ! Je suis votre guide IA. Souhaitez-vous découvrir nos services, ou me parler un peu de votre entreprise ?',
      startVoice: 'Parlez-moi',
      endVoice: 'Terminer la conversation vocale',
      typePlaceholder: 'Écrivez votre question…',
      send: 'Envoyer',
      suggestions: ['Parlez-moi d’Odoo', 'Que pouvez-vous automatiser ?', 'Voir vos services', 'Combien coûte un ERP ?', 'Montrez-moi vos réalisations', 'Parler à votre équipe'],
      connecting: 'Connexion…',
      listening: 'À l’écoute',
      speaking: 'Parle',
      thinking: 'Réflexion…',
      privacy: 'Cette assistante fonctionne avec ElevenLabs. Votre voix et vos messages sont envoyés à ElevenLabs pour produire les réponses. Ne partagez ni mots de passe ni données de paiement.',
    },
  },
  {
    id: 'de', label: 'Deutsch', agentLanguage: 'de', htmlLang: 'de', dir: 'ltr',
    t: {
      bubble: 'Willkommen! Darf ich Ihnen helfen?',
      meet: 'Lernen Sie Ihre KI-Begleiterin kennen',
      heading: 'ODOOVATIONS KI-Concierge',
      aiNote: 'Ich bin eine KI-Assistentin, keine Mitarbeiterin.',
      firstMessage: 'Hallo und willkommen bei ODOOVATIONS! Ich bin Ihre KI-Begleiterin. Möchten Sie unsere Leistungen entdecken oder mir etwas über Ihr Unternehmen erzählen?',
      startVoice: 'Mit mir sprechen',
      endVoice: 'Sprachgespräch beenden',
      typePlaceholder: 'Ihre Frage eingeben…',
      send: 'Senden',
      suggestions: ['Erzählen Sie mir von Odoo', 'Was können Sie automatisieren?', 'Leistungen ansehen', 'Was kostet ein ERP?', 'Zeigen Sie mir Ihre Arbeit', 'Mit Ihrem Team sprechen'],
      connecting: 'Verbindung wird hergestellt…',
      listening: 'Hört zu',
      speaking: 'Spricht',
      thinking: 'Denkt nach…',
      privacy: 'Diese Assistentin läuft über ElevenLabs. Ihre Stimme und Nachrichten werden an ElevenLabs gesendet, um Antworten zu erzeugen. Bitte teilen Sie keine Passwörter oder Zahlungsdaten.',
    },
  },
  {
    id: 'es', label: 'Español', agentLanguage: 'es', htmlLang: 'es', dir: 'ltr',
    t: {
      bubble: '¡Bienvenido! ¿Puedo ayudarle?',
      meet: 'Conozca a su guía de IA',
      heading: 'Conserje de IA de ODOOVATIONS',
      aiNote: 'Soy una asistente de IA, no una empleada.',
      firstMessage: '¡Hola y bienvenido a ODOOVATIONS! Soy su guía de IA. ¿Le gustaría conocer nuestros servicios o contarme un poco sobre su empresa?',
      startVoice: 'Hable conmigo',
      endVoice: 'Terminar la conversación de voz',
      typePlaceholder: 'Escriba su pregunta…',
      send: 'Enviar',
      suggestions: ['Hábleme de Odoo', '¿Qué pueden automatizar?', 'Ver sus servicios', '¿Cuánto cuesta un ERP?', 'Muéstreme su trabajo', 'Hablar con su equipo'],
      connecting: 'Conectando…',
      listening: 'Escuchando',
      speaking: 'Hablando',
      thinking: 'Pensando…',
      privacy: 'Esta asistente funciona con ElevenLabs. Su voz y sus mensajes se envían a ElevenLabs para generar respuestas. No comparta contraseñas ni datos de pago.',
    },
  },
  {
    id: 'it', label: 'Italiano', agentLanguage: 'it', htmlLang: 'it', dir: 'ltr',
    t: {
      bubble: 'Benvenuto! Posso aiutarla?',
      meet: 'Conosca la sua guida IA',
      heading: 'Concierge IA di ODOOVATIONS',
      aiNote: 'Sono un’assistente IA, non una dipendente.',
      firstMessage: 'Buongiorno e benvenuto in ODOOVATIONS! Sono la sua guida IA. Vuole scoprire i nostri servizi o raccontarmi qualcosa della sua azienda?',
      startVoice: 'Parli con me',
      endVoice: 'Termina la conversazione vocale',
      typePlaceholder: 'Scriva la sua domanda…',
      send: 'Invia',
      suggestions: ['Mi parli di Odoo', 'Cosa potete automatizzare?', 'Vedere i servizi', 'Quanto costa un ERP?', 'Mostratemi i vostri lavori', 'Parlare con il team'],
      connecting: 'Connessione…',
      listening: 'In ascolto',
      speaking: 'Sta parlando',
      thinking: 'Sto pensando…',
      privacy: 'Questa assistente funziona con ElevenLabs. La sua voce e i suoi messaggi vengono inviati a ElevenLabs per generare le risposte. Non condivida password o dati di pagamento.',
    },
  },
  {
    id: 'tr', label: 'Türkçe', agentLanguage: 'tr', htmlLang: 'tr', dir: 'ltr',
    t: {
      bubble: 'Hoş geldiniz! Size yardımcı olabilir miyim?',
      meet: 'Yapay zekâ rehberinizle tanışın',
      heading: 'ODOOVATIONS Yapay Zekâ Asistanı',
      aiNote: 'Ben bir yapay zekâ asistanıyım, çalışan değilim.',
      firstMessage: 'Merhaba, ODOOVATIONS’a hoş geldiniz! Ben yapay zekâ rehberinizim. Hizmetlerimizi keşfetmek mi istersiniz, yoksa bana işinizden biraz bahseder misiniz?',
      startVoice: 'Benimle konuşun',
      endVoice: 'Sesli görüşmeyi bitir',
      typePlaceholder: 'Sorunuzu yazın…',
      send: 'Gönder',
      suggestions: ['Bana Odoo’yu anlatın', 'Neleri otomatikleştirebilirsiniz?', 'Hizmetlerinizi görün', 'ERP ne kadar tutar?', 'Çalışmalarınızı gösterin', 'Ekibinizle görüşmek istiyorum'],
      connecting: 'Bağlanıyor…',
      listening: 'Dinliyor',
      speaking: 'Konuşuyor',
      thinking: 'Düşünüyor…',
      privacy: 'Bu asistan ElevenLabs üzerinde çalışır. Yanıt üretmek için sesiniz ve mesajlarınız ElevenLabs’e gönderilir. Lütfen şifre veya ödeme bilgisi paylaşmayın.',
    },
  },
  {
    id: 'hi', label: 'हिन्दी', agentLanguage: 'hi', htmlLang: 'hi', dir: 'ltr',
    t: {
      bubble: 'स्वागत है! क्या मैं आपकी मदद कर सकती हूँ?',
      meet: 'अपनी AI गाइड से मिलें',
      heading: 'ODOOVATIONS AI कंसीयर्ज',
      aiNote: 'मैं एक AI सहायक हूँ, स्टाफ़ की सदस्य नहीं।',
      firstMessage: 'नमस्ते, ODOOVATIONS में आपका स्वागत है! मैं आपकी AI गाइड हूँ। क्या आप हमारी सेवाएँ देखना चाहेंगे, या मुझे अपने व्यवसाय के बारे में कुछ बताएँगे?',
      startVoice: 'मुझसे बात करें',
      endVoice: 'वॉइस बातचीत समाप्त करें',
      typePlaceholder: 'अपना सवाल लिखें…',
      send: 'भेजें',
      suggestions: ['Odoo के बारे में बताइए', 'आप क्या ऑटोमेट कर सकते हैं?', 'अपनी सेवाएँ दिखाइए', 'ERP की लागत कितनी है?', 'अपना काम दिखाइए', 'आपकी टीम से बात करनी है'],
      connecting: 'कनेक्ट हो रहा है…',
      listening: 'सुन रही हूँ',
      speaking: 'बोल रही हूँ',
      thinking: 'सोच रही हूँ…',
      privacy: 'यह सहायक ElevenLabs पर चलता है। जवाब बनाने के लिए आपकी आवाज़ और संदेश ElevenLabs को भेजे जाते हैं। कृपया पासवर्ड या भुगतान की जानकारी साझा न करें।',
    },
  },
];

/** The languages this deployment offers, per NEXT_PUBLIC_CONCIERGE_LANGUAGES (see the note above). */
export function enabledLanguages(): ConciergeLanguage[] {
  const raw = process.env.NEXT_PUBLIC_CONCIERGE_LANGUAGES;
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
  const ids = raw ? raw.split(',').map((s) => s.trim()) : isProd ? ['en-GB', 'en-US'] : conciergeLanguages.map((l) => l.id);
  const list = conciergeLanguages.filter((l) => ids.includes(l.id));
  return list.length ? list : conciergeLanguages.slice(0, 1);
}

/** Pick a language from the browser's preferences, falling back to UK English. */
export function languageFromBrowser(prefs: readonly string[], offered: ConciergeLanguage[]): ConciergeLanguage {
  for (const p of prefs) {
    const lower = p.toLowerCase();
    const exact = offered.find((l) => l.htmlLang.toLowerCase() === lower);
    if (exact) return exact;
    const base = lower.split('-')[0];
    const loose = offered.find((l) => l.agentLanguage === base);
    if (loose) return base === 'en' ? offered.find((l) => l.id === 'en-GB') ?? loose : loose;
  }
  return offered.find((l) => l.id === 'en-GB') ?? offered[0]!;
}

export const getLanguage = (id: string | null | undefined) => conciergeLanguages.find((l) => l.id === id);
