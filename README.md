# Portfolio & Blog - Neo Brutalism

Benvenuto nel mio spazio personale. Questa repository ospita il mio portfolio interattivo (basato sul mio CV) e un blog dove raccolgo considerazioni, scritti e appunti.

Tutta la piattaforma è sviluppata come una **Single Page Application (SPA)** in **puro HTML, CSS e JavaScript**, senza la necessità di tool di build, npm, o framework complessi. Il design segue la filosofia del **Neo Brutalism**.

## 🚀 Come testare in locale

Poiché stiamo usando Javascript per fare il fetch dei file Markdown e del JSON (via `fetch()`), se apri direttamente il file `index.html` facendo doppio click, il browser bloccherà il caricamento per regole di sicurezza CORS (Cross-Origin Resource Sharing).

Per vedere il sito funzionante sul tuo computer, hai bisogno di un server HTTP locale.

Se hai Python installato, puoi lanciare questo comando dal terminale nella cartella principale del progetto:

```bash
python3 -m http.server 8000
```
Dopodiché, apri il browser all'indirizzo [http://localhost:8000](http://localhost:8000).

## 📝 Come aggiungere un articolo al Blog

1. Vai nella cartella `blog/` e crea un nuovo file con estensione `.md` (es: `il-mio-nuovo-post.md`).
2. Usa la sintassi del Frontmatter all'inizio del file per definire titolo, data, sommario e **lingua**. Ad esempio:
    ```markdown
    ---
    title: "Il mio nuovo post"
    date: "2026-06-01"
    summary: "Una breve descrizione che apparirà nella lista degli articoli."
    lang: "it"
    ---
    Qui inizi a scrivere l'articolo in Markdown...
    ```
   *(Nota: Se ometti il campo `lang`, il sistema assumerà che l'articolo sia in italiano `it`).*
3. Salva il file. Ricorda di creare anche la versione tradotta (es. `my-new-post.md` con `lang: "en"`)!
4. Per far sì che l'articolo compaia nel sito, **devi aggiornare l'indice dei post**. Dal terminale, esegui:
    ```bash
    python3 scripts/update_blog_index.py
    ```
    Lo script andrà ad aggiornare automaticamente il file `blog/posts.json` leggendo il tuo nuovo file!

## 👔 Come aggiornare il CV (Profilo)

Tutte le informazioni relative alle tue esperienze lavorative, skill e certificazioni si trovano "scolpite" direttamente nell'HTML. 

Per aggiornarle:
1. Apri `index.html` con un editor di codice.
2. Cerca la sezione `<section id="section-cv">`.
3. Troverai le varie card ( `<div class="card">` ) relative a "Esperienza Lavorativa", "Istruzione", "Skills", ecc.
4. Troverai il testo sdoppiato con le classi `<span class="lang-it">` e `<span class="lang-en">`. 
5. Modifica il testo all'interno dei tag HTML di **entrambe** le lingue e salva. Le modifiche saranno visibili immediatamente.