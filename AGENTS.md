# Regole per gli Agenti AI

Questa repository ospita il Portfolio e Blog di Vincenzo Maria Stanzione.

## Architettura e Principi
1. **Puro HTML/CSS/JS**: L'applicazione è una Single Page Application (SPA) creata senza framework frontend complessi (niente React, Angular, Vue) e senza build step (niente Webpack, Vite, o generatori statici come Jekyll). 
2. **Neo Brutalism**: Il CSS (`style.css`) segue i principi del Neo Brutalism: 
   - Colori sgargianti.
   - Bordi spessi e neri.
   - Ombre solide (senza blur).
3. **Gestione del Blog**: 
   - Gli articoli sono salvati in formato Markdown (`.md`) all'interno della cartella `blog/`.
   - Il rendering da MD ad HTML avviene lato client utilizzando `marked.js` importato via CDN in `index.html`.
   - L'elenco degli articoli è indicizzato nel file `blog/posts.json`. 
   - **IMPORTANTE:** Ogni volta che si aggiunge o rimuove un articolo dalla cartella `blog/`, è necessario lanciare lo script `scripts/update_blog_index.py` per rigenerare `posts.json`. La web-app legge questo file per capire quali articoli mostrare.

## Struttura delle Cartelle
- `/`: Root del progetto, contiene l'HTML, il CSS e il JS per la logica SPA.
- `/blog`: Contiene gli articoli in Markdown e il file indice `posts.json`.
- `/scripts`: Contiene script di utilità, come `update_blog_index.py`.
- `/images`: Contiene file multimediali come l'immagine di profilo (`profile.png`).

## Modifiche al CV e Immagini
Le informazioni del CV (Esperienze, Istruzione, ecc.) sono inserite in formato raw all'interno di `index.html` (nella sezione `#section-cv`). Per aggiornare il CV, modifica direttamente il markup di quella sezione. 
L'immagine di profilo si trova in `images/profile.png`. Eventuali operazioni di ritaglio o manipolazione vanno fatte direttamente su questo file mantenendo il nome.

## Dark Mode
Il sito supporta una Dark Mode gestita tramite il pulsante `#theme-toggle` in `index.html`. 
- La logica in `app.js` assegna o rimuove la classe `.dark-mode` al tag `body` e salva la preferenza nel `localStorage` (chiave `theme`). 
- Di default l'applicazione parte in modalità chiara se non vi è alcuna preferenza salvata.
- Le variabili colore (incluse le versioni modificate per la dark mode, es. verde neon opaco, ciano e fucsia) sono definite nel file `style.css`.

## Internazionalizzazione (i18n) e Traduzioni
L'applicazione supporta il bilinguismo (Italiano/Inglese).
- **Testi Interfaccia/CV**: Gestiti tramite classi CSS in `index.html`. Ogni testo ha una versione `<span class="lang-it">` e una `<span class="lang-en">`. 
- **Blog**: Gestito tramite il campo `lang: it` o `lang: en` nel Frontmatter dei file Markdown. `app.js` filtra i risultati in base alla lingua attiva (salvata in `localStorage` chiave `lang`).
- **🚨 REGOLA OBBLIGATORIA**: Ogni volta che l'utente chiede di modificare o aggiungere un'esperienza al CV, DEVI apportare la modifica in entrambe le lingue simultaneamente. Allo stesso modo, se l'utente chiede di scrivere o aggiornare un post sul blog in una lingua, DEVI creare o aggiornare automaticamente anche la versione tradotta nell'altra lingua. Non aspettare che te lo chieda esplicitamente.
