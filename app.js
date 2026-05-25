document.addEventListener('DOMContentLoaded', () => {
    const navCv = document.getElementById('nav-cv');
    const navBlog = document.getElementById('nav-blog');
    
    const sectionCv = document.getElementById('section-cv');
    const sectionBlog = document.getElementById('section-blog');
    const sectionArticle = document.getElementById('section-article');
    
    const blogList = document.getElementById('blog-list');
    const articleContent = document.getElementById('article-content');
    const backToBlog = document.getElementById('back-to-blog');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Dark Mode Logic ---
    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    }

    // Initialize theme based on localStorage or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(false); // Default a chiaro
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(!isDark);
    });

    // --- Navigation Logic ---
    function hideAllSections() {
        sectionCv.classList.remove('active');
        sectionBlog.classList.remove('active');
        sectionArticle.classList.remove('active');
        navCv.classList.remove('active');
        navBlog.classList.remove('active');
    }

    // Gestione click "Profilo / CV"
    navCv.addEventListener('click', () => {
        hideAllSections();
        sectionCv.classList.add('active');
        navCv.classList.add('active');
    });

    // Gestione click "Blog"
    navBlog.addEventListener('click', () => {
        hideAllSections();
        sectionBlog.classList.add('active');
        navBlog.classList.add('active');
        loadBlogList();
    });

    // Gestione pulsante torna indietro da un articolo
    backToBlog.addEventListener('click', () => {
        hideAllSections();
        sectionBlog.classList.add('active');
        navBlog.classList.add('active');
    });

    // Variabile per evitare di ricaricare il JSON ogni volta se già caricato
    let postsLoaded = false;

    async function loadBlogList() {
        if (postsLoaded) return;
        
        try {
            const response = await fetch('blog/posts.json');
            if (!response.ok) {
                throw new Error('Impossibile caricare i post');
            }
            const posts = await response.json();
            
            blogList.innerHTML = ''; // Svuota il contenitore
            
            if (posts.length === 0) {
                blogList.innerHTML = '<p>Nessun articolo disponibile al momento.</p>';
                return;
            }

            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'blog-post-card';
                card.innerHTML = `
                    <h3>${post.title}</h3>
                    <div class="blog-date">${post.date}</div>
                    <p>${post.summary || 'Leggi l\'articolo...'}</p>
                `;
                
                card.addEventListener('click', () => {
                    loadArticle(post.file);
                });
                
                blogList.appendChild(card);
            });
            
            postsLoaded = true;
            
        } catch (error) {
            console.error('Errore durante il caricamento del blog:', error);
            blogList.innerHTML = '<p>Errore nel caricamento degli articoli. Assicurati che posts.json esista e sia valido.</p>';
        }
    }

    async function loadArticle(filename) {
        hideAllSections();
        sectionArticle.classList.add('active');
        navBlog.classList.add('active'); // Mantiene evidenziato il tab blog
        
        articleContent.innerHTML = '<p>Caricamento articolo...</p>';
        
        try {
            const response = await fetch(`blog/${filename}`);
            if (!response.ok) {
                throw new Error('Impossibile caricare il file markdown');
            }
            
            const markdownText = await response.text();
            
            // Usa marked.js per convertire MD in HTML
            // Togliamo eventuale frontmatter se presente (opzionale, ma utile se c'è)
            const cleanMarkdown = markdownText.replace(/^---[\s\S]*?---/, '').trim();
            
            articleContent.innerHTML = marked.parse(cleanMarkdown);
            
        } catch (error) {
            console.error('Errore durante il rendering dell\'articolo:', error);
            articleContent.innerHTML = '<p>Errore nel caricamento dell\'articolo.</p>';
        }
    }
});
