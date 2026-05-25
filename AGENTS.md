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

## Modifiche al CV
Le informazioni del CV (Esperienze, Istruzione, ecc.) sono inserite in formato raw all'interno di `index.html` (nella sezione `#section-cv`). Per aggiornare il CV, modifica direttamente il markup di quella sezione.
