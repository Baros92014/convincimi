const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const NEWSLETTER_LINK = 'https://convincimii.substack.com/subscribe';

const BOOKS = {
  1: {
    name: 'La tua persona ideale',
    link: 'https://drive.google.com/drive/folders/1MQ3K4iMgJfIkq6wmgcBkpGegbs5d984W?usp=drive_link',
    mail1Subject: 'Il tuo libro è qui — La tua persona ideale',
    mail1Body: `<p>Ciao,</p>
<p>il libro è tuo.</p>
<p>Ma prima che tu lo apra, voglio dirti una cosa.</p>
<p>Quello che stai per leggere non ti dirà solo come trovare la persona giusta.<br>
Ti farà capire <strong>perché hai scelto quelle sbagliate</strong>.</p>
<p>E questa, credimi, è una differenza che cambia tutto.</p>
<p>Perché il problema nelle relazioni non è mai la persona che hai davanti.<br>
È il filtro attraverso cui la guardi, il bisogno che ci proietti sopra, il ruolo che le assegni ancora prima di conoscerla davvero.</p>
<p>Finché non capisci quel meccanismo, puoi cambiare quante persone vuoi. Ti ritroverai sempre nello stesso posto.</p>
<p>Questo libro esiste per spezzare quel loop.</p>
<p>Non con la solita teoria spicciola.<br>
Ma con una lettura che ti costringe a guardare le tue relazioni per quello che sono state davvero, non per quello che ti sei raccontato che fossero.</p>
<p>Non è una lettura facile. Alcune cose ti faranno venire voglia di chiudere la pagina a metà.<br>
E quelle sono le più importanti.</p>
<p><strong>Buona lettura.</strong></p>`,
    mail2Subject: 'Il 95% delle tue scelte d\'amore non le controlli tu',
    mail2Body: `<p>Ciao,</p>
<p>c'è una cosa che nessuno ti dice sulle relazioni.</p>
<p><strong>Non sei tu a scegliere di chi ti innamori.</strong></p>
<p>Lo so, sembra impossibile. Eppure la parte conscia del tuo cervello — quella che ragiona, che analizza, che legge queste righe adesso — gestisce circa il <strong>5% delle tue decisioni</strong>. Il restante 95% viene preso da qualcosa che non vedi, non senti e non controlli.</p>
<p>Il tuo inconscio non sceglie chi ti fa bene. <strong>Sceglie chi ti è familiare.</strong></p>
<p>E se cresci in un ambiente in cui l'amore arriva in modo intermittente, va guadagnato, non è mai del tutto sicuro, il tuo inconscio impara che quella è la forma normale dell'amore. Da adulto, ogni volta che incontri qualcuno che replica quella dinamica, senti qualcosa che chiami attrazione, chimica, scintilla.</p>
<p>Il tuo inconscio ha visto qualcosa di familiare e ha detto: <em>questo lo conosco. Quindi è "casa"</em>.</p>
<p>Il problema è che casa, per molti di noi, non era un posto sicuro.</p>
<p>Ecco perché continui ad attrarre le stesse persone con facce diverse. Non è sfortuna. Non è destino. È uno schema che si ripete finché non lo porti in superficie e gli dai un nome.</p>
<p>Questo meccanismo è uno dei tanti che non vengono mai spiegati davvero. Ho aperto una newsletter per farlo — ogni settimana analizzo a fondo i meccanismi inconsci che guidano le tue scelte.</p>
<p>Per chi ha comprato uno dei miei libri è <strong>gratuita</strong>, ma non per molto.<br>
Se vuoi entrare, il momento è adesso.</p>
<p>Ci vediamo dall'altra parte…</p>`,
  },
  2: {
    name: 'La tua relazione ideale',
    link: 'https://drive.google.com/drive/folders/1Br9y1-KWtf-2gTX9yRIHp5Kzj4r_iUsl?usp=drive_link',
    mail1Subject: 'Il tuo libro è qui — La tua relazione ideale',
    mail1Body: `<p>Ciao,</p>
<p>il libro è tuo.</p>
<p>Prima di leggerlo lasciami dire una cosa.</p>
<p>Tutte le relazioni, anche quelle che funzionano, attraversano momenti in cui qualcosa si inceppa. La gelosia che diventa controllo. Un ex che torna e rimette tutto in discussione. Un equilibrio che sembrava solido e poi non lo è più.</p>
<p>Non è una questione di sentimento.<br>
Ma di <strong>meccanismi inconsci che quasi nessuno conosce davvero</strong>.</p>
<p>In questo libro li analizziamo uno per uno. Non per dirti cosa è giusto o sbagliato, ma per darti una visione chiara di quello che succede dentro una coppia quando le cose si complicano, e gli strumenti per gestirlo in modo maturo, prima che il danno diventi irreparabile.</p>
<p>Perché la differenza tra una relazione che dura e una che si rompe, spesso, non è quanto vi amate.</p>
<p><strong>È quanto capite quello che vi sta succedendo.</strong></p>
<p><strong>Buona lettura.</strong></p>`,
    mail2Subject: 'Capire non basta. Ecco cosa serve davvero.',
    mail2Body: `<p>Ciao,</p>
<p>se hai iniziato il libro, probabilmente hai già incontrato qualcosa che ti ha fatto riflettere.</p>
<p>Una frase, un concetto, un meccanismo che hai riconosciuto. Non nelle relazioni degli altri. Nelle tue.</p>
<p>Questo è esattamente il momento più importante — e anche quello più delicato. Perché <strong>capire qualcosa su te stesso non basta</strong>. La comprensione da sola non cambia niente. Cambia qualcosa solo quando inizi a vederla ovunque, nelle scelte che fai, nelle reazioni che hai, nei pattern che si ripetono.</p>
<p>E per vederla ovunque, devi continuare ad andare a fondo.</p>
<p>Ho aperto una newsletter per farlo. Ogni settimana prendo un meccanismo preciso che governa le relazioni e lo analizzo fino in fondo. Lo stesso livello di profondità del libro, ma su temi nuovi e ancora inesplorati.</p>
<p>Per chi ha comprato uno dei miei libri è <strong>gratuita</strong>, ma non per molto.<br>
Se vuoi entrare, il momento è adesso.</p>
<p>Ci vediamo dall'altra parte…</p>`,
  },
  3: {
    name: 'I codici segreti della mente di LUI e LEI',
    link: 'https://drive.google.com/drive/folders/1psdkeVOs5rHiBXAG-9niDdiaO1OWQAsi?usp=drive_link',
    mail1Subject: 'Il tuo libro è qui — I codici segreti della mente di LUI e LEI',
    mail1Body: `<p>Ciao,</p>
<p>il libro è tuo.</p>
<p>Prima di leggerlo però lasciami dire due parole.</p>
<p>Avrai già capito che, a differenza di quello che ci vuole far credere la narrativa comune, uomini e donne sono diversi. Diversi nel modo di pensare, di amare e persino di soffrire.</p>
<p>Ma <strong>diversi non vuol dire incompatibili</strong>. Vuol dire semplicemente che non funzioniamo allo stesso modo.</p>
<p>Quello che stai per leggere è uno dei libri che avrei voluto avere anni fa. Perché parte dalle radici evolutive di queste differenze e arriva al modo in cui uomini e donne si legano, gestiscono il conflitto, esprimono interesse, cercano attenzione. Non per dire "giusto" o "sbagliato", ma per capire davvero come ragiona la mente dell'altro sesso.</p>
<p>Perché la maggior parte delle incomprensioni nelle relazioni non nascono dalla mancanza di sentimenti. Nascono dal fatto che stai interpretando l'altro usando i tuoi schemi, aspettandoti che reagisca come faresti tu.</p>
<p><strong>Quando capisci come funziona davvero, le cose che prima sembravano inspiegabili iniziano ad avere un senso. E da lì, tutto cambia.</strong></p>
<p><strong>Buona lettura.</strong></p>`,
    mail2Subject: 'Perché litigate sempre delle stesse cose',
    mail2Body: `<p>Ciao,</p>
<p>c'è una cosa che nessuno ti spiega sulle relazioni.</p>
<p>Quando litighi con il tuo partner, quasi mai il problema è quello di cui state discutendo.<br>
<strong>Il problema è che state usando due sistemi operativi diversi.</strong></p>
<p>L'uomo e la donna non si sono evoluti nello stesso modo. Per migliaia di anni hanno avuto ruoli, pressioni e sfide radicalmente diverse. E il cervello, che è il prodotto di quella evoluzione, ha sviluppato risposte emotive, priorità e modalità di comunicazione profondamente distinte.</p>
<p>Il cervello maschile si è evoluto per la risoluzione rapida dei problemi, per la gerarchia, per l'azione. Quando la partner gli presenta un problema, lui cerca automaticamente una soluzione. Non perché non ascolti. Perché il suo sistema operativo lo spinge a risolverlo, non a "stare" nel problema.</p>
<p>Il cervello femminile invece si è evoluto per la connessione, per la coesione del gruppo, per la lettura delle emozioni altrui. Quando condivide un problema, spesso non cerca una soluzione. <strong>Cerca qualcuno che la ascolti.</strong></p>
<p>Due persone, due modi diversi di affrontare gli stessi problemi. Eppure finite per farvi del male lo stesso, perché nessuno dei due capisce davvero cosa sta cercando l'altro.</p>
<p>Questo è solo uno dei meccanismi che esploro ogni settimana nella mia newsletter.</p>
<p>Per chi ha comprato uno dei miei libri è <strong>gratuita</strong>, ma non per molto.<br>
Se vuoi entrare, il momento è adesso.</p>
<p>Ci vediamo dall'altra parte…</p>`,
  },
  4: {
    name: 'Guida al potere sociale COMPLETA',
    link: 'https://drive.google.com/drive/folders/1kt6cVUHvLtx5rNeBUrb-Q5_K-I_00agp?usp=drive_link',
    mail1Subject: 'Il tuo libro è qui — Guida al potere sociale COMPLETA',
    mail1Body: `<p>Ciao,</p>
<p>il libro è tuo.</p>
<p>Ti sei mai chiesto cosa differenzia una persona socialmente di successo da una mediocre? Non è la bellezza, né la parlantina. È la <strong>capacità innata di generare attenzione verso di sé e di influenzare gli altri in modo inconscio</strong>.</p>
<p>E la parola chiave è proprio quella: <em>inconscio</em>.</p>
<p>Perché le persone che dominano i contesti sociali, che vengono ascoltate, che ottengono quello che vogliono senza sembrare di chiedere niente, non ci stanno pensando mentre lo fanno. Hanno interiorizzato meccanismi che tu probabilmente non conosci ancora, o conosci ma non sai come attivare.</p>
<p>Nel frattempo tu hai passato anni a fare la cosa giusta, a lavorare sodo, ad "avere ragione", e a guardare altri meno preparati di te prendere lo spazio che avresti meritato tu. Nel lavoro, nelle relazioni, nei contesti sociali che contano.</p>
<p>Non è ingiustizia. <strong>È che nessuno ti ha mai insegnato le regole delle dinamiche sociali.</strong></p>
<p>Questo libro lo fa. Entra nei meccanismi profondi del potere sociale, della persuasione, dell'autorevolezza. Ti mostra cosa comunichi quando non stai parlando, perché certi tuoi comportamenti ti tolgono potere invece di dartelo, e come cambiarlo in modo concreto.</p>
<p>Quando arriverai all'ultima pagina, vedrai cambiato il modo in cui gli altri ti percepiscono…<br>
Perché è cambiato il modo in cui ti percepisci tu stesso.</p>
<p><strong>Buona lettura.</strong></p>`,
    mail2Subject: 'Il momento in cui tutto cambia',
    mail2Body: `<p>Ciao,</p>
<p>se hai iniziato a leggere il libro c'è un momento preciso in cui tutto quello che hai letto inizia a diventare <em>reale</em>.</p>
<p>Non è quando finisci il libro.<br>
È la prima volta che sei in una situazione sociale e ti accorgi di <strong>vedere qualcosa che prima non vedevi</strong>.</p>
<p>Chi sta dominando la conversazione e come lo fa.<br>
Chi sta cedendo spazio senza rendersene conto.<br>
Cosa comunica il modo in cui qualcuno entra in una stanza, risponde a una domanda, gestisce un silenzio.</p>
<p>Quel momento cambia tutto. Perché una volta che vedi quei meccanismi, non riesci più a non vederli. E quando inizi a vederli negli altri, inizi automaticamente a riconoscerli in te stesso.</p>
<p>I comportamenti che ti tolgono potere invece di dartelo.<br>
Le dinamiche in cui cedi autorevolezza senza accorgertene.<br>
I momenti in cui potresti fare la differenza e invece rimani invisibile.</p>
<p>La consapevolezza è il primo passo. Ma da sola non basta.</p>
<p>Ho aperto una newsletter per continuare questo percorso. Dinamiche sociali, persuasione, comportamento interpersonale. Il tipo di contenuto che non trovi in giro perché richiede tempo e profondità per essere sviluppato davvero.</p>
<p>Per chi ha letto uno dei miei libri è <strong>gratuita</strong>, ma non per molto.<br>
Se vuoi entrare, il momento è adesso.</p>
<p>Ci vediamo dall'altra parte…</p>`,
  },
  5: {
    name: 'Convincimi ULTIMATE',
    link: 'https://drive.google.com/drive/folders/1NaVdDIJx0bgboh0iPtFpW6BFU8XPysB8?usp=drive_link',
    mail1Subject: 'Il tuo pacchetto completo è qui — Convincimi',
    mail1Body: `<p>Ciao,</p>
<p>il pacchetto è tuo.</p>
<p>Hai scelto di prendere tutto. E questa non è una scelta casuale.</p>
<p>Significa che non cerchi una risposta a un singolo problema. Cerchi una visione completa — su te stesso, sugli altri, sulle dinamiche che governano le relazioni e i contesti sociali.</p>
<p>Dentro trovi quattro libri che partono da angolazioni diverse ma convergono tutti verso lo stesso punto: <strong>capire davvero cosa muove le persone</strong>, incluso te.</p>
<p>Non c'è un ordine obbligato di lettura. Puoi iniziare da quello che senti più urgente. Ma se vuoi un consiglio, inizia da quello che ti spaventa di più aprire. Di solito è quello che ti serve davvero.</p>
<p><strong>Buona lettura.</strong></p>`,
    mail2Subject: 'Quello che trovi nella newsletter che non trovi altrove',
    mail2Body: `<p>Ciao,</p>
<p>hai preso tutto il pacchetto. Il che significa che capisci il valore di andare a fondo.</p>
<p>Ho aperto una newsletter per fare esattamente questo — ogni settimana prendo un meccanismo preciso che governa le relazioni, le dinamiche sociali o il comportamento umano e lo analizzo fino in fondo. Lo stesso livello di profondità dei libri, su temi nuovi e ancora inesplorati.</p>
<p>Non è content marketing. Non è motivazione. È analisi concreta su come funzionano davvero le persone.</p>
<p>Per chi come te ha preso il pacchetto completo è <strong>gratuita</strong>, ma non per molto.<br>
Se vuoi entrare, il momento è adesso.</p>
<p>Ci vediamo dall'altra parte…</p>`,
  },
};

// ─── HTML EMAIL BUILDER ───────────────────────────────────────────────────────

function buildMail1(book) {
  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fbf6f0;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf6f0;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(24,18,16,0.08);">
  <tr><td style="background:#1A1208;padding:28px 32px;text-align:center;">
    <h1 style="margin:0;font-size:22px;font-weight:700;color:#C9A84C;letter-spacing:-0.5px;">Convincimi</h1>
  </td></tr>
  <tr><td style="padding:32px;">
    <div style="font-size:14px;color:#3A2A1A;line-height:1.8;">
      ${book.mail1Body}
    </div>
    <div style="text-align:center;margin:28px 0 8px;">
      <a href="${book.link}" style="display:inline-block;padding:14px 32px;background:#7B3D1E;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
        Scarica ${book.name} →
      </a>
    </div>
    <p style="font-size:11px;color:#7A6F60;text-align:center;margin:12px 0 0;">Hai problemi con il download? Rispondi a questa email.</p>
  </td></tr>
  <tr><td style="background:#F2F0EB;padding:16px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#7A6F60;">© 2025 Marketing Brothers Ltd — Convincimi</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function buildMail2(book) {
  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fbf6f0;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf6f0;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(24,18,16,0.08);">
  <tr><td style="background:#1A1208;padding:28px 32px;text-align:center;">
    <h1 style="margin:0;font-size:22px;font-weight:700;color:#C9A84C;letter-spacing:-0.5px;">Convincimi</h1>
  </td></tr>
  <tr><td style="padding:32px;">
    <div style="font-size:14px;color:#3A2A1A;line-height:1.8;">
      ${book.mail2Body}
    </div>
    <div style="text-align:center;margin:28px 0 8px;">
      <a href="${NEWSLETTER_LINK}" style="display:inline-block;padding:14px 32px;background:#C9A84C;color:#1A1208;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
        Iscriviti alla newsletter →
      </a>
    </div>
    <p style="font-size:11px;color:#7A6F60;text-align:center;margin:12px 0 0;">Puoi cancellarti quando vuoi. Nessuno spam.</p>
  </td></tr>
  <tr><td style="background:#F2F0EB;padding:16px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#7A6F60;">© 2025 Marketing Brothers Ltd — Convincimi</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// ─── SEND EMAIL ───────────────────────────────────────────────────────────────

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Convincimi <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Resend error: ' + err);
  }
}

// ─── WEBHOOK HANDLER ──────────────────────────────────────────────────────────

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    const metadata = intent.metadata || {};
    const email = metadata.customerEmail || intent.receipt_email;

    if (!email) {
      console.error('No customer email found');
      return res.status(200).json({ received: true });
    }

    const mainBookId = parseInt(metadata.mainBookId);
    const upsellBookId = parseInt(metadata.upsellBookId);

    // Send Mail 1 for main book (with download link)
    if (mainBookId && BOOKS[mainBookId]) {
      const book = BOOKS[mainBookId];
      try {
        await sendEmail(email, book.mail1Subject, buildMail1(book));
        console.log(`Mail 1 sent to ${email} for: ${book.name}`);
      } catch (err) {
        console.error('Mail 1 error:', err.message);
      }
    }

    // If upsell, send download mail for upsell book too
    if (upsellBookId && BOOKS[upsellBookId]) {
      const upsellBook = BOOKS[upsellBookId];
      try {
        await sendEmail(email, upsellBook.mail1Subject, buildMail1(upsellBook));
        console.log(`Upsell mail sent to ${email} for: ${upsellBook.name}`);
      } catch (err) {
        console.error('Upsell mail error:', err.message);
      }
    }

    // Send Mail 2 (newsletter invite) after 10 minutes via delayed approach
    // Since Vercel functions can't delay, we send it immediately but as a separate email
    // For a real delay, use a queue service. Here we send it right after.
    if (mainBookId && BOOKS[mainBookId]) {
      const book = BOOKS[mainBookId];
      try {
        await sendEmail(email, book.mail2Subject, buildMail2(book));
        console.log(`Mail 2 sent to ${email} for: ${book.name}`);
      } catch (err) {
        console.error('Mail 2 error:', err.message);
      }
    }
  }

  return res.status(200).json({ received: true });
};
