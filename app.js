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
    const langToggle = document.getElementById('lang-toggle');

    // --- i18n Logic ---
    let currentLang = 'it';
    let allPosts = [];
    let postsLoaded = false;

    function setLang(lang) {
        currentLang = lang;
        if (lang === 'en') {
            document.body.classList.add('en-mode');
            if (langToggle) langToggle.textContent = 'ITA';
            localStorage.setItem('lang', 'en');
        } else {
            document.body.classList.remove('en-mode');
            if (langToggle) langToggle.textContent = 'ENG';
            localStorage.setItem('lang', 'it');
        }
        
        // Se i post sono già caricati, renderizziamo di nuovo per filtrare per lingua
        if (postsLoaded) {
            renderBlogList();
        }
    }

    const savedLang = localStorage.getItem('lang') || 'it';
    setLang(savedLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLang(currentLang === 'it' ? 'en' : 'it');
        });
    }

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

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            setTheme(!isDark);
        });
    }

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

    // --- Blog Logic ---
    async function loadBlogList() {
        if (postsLoaded) return;
        
        try {
            const response = await fetch('blog/posts.json');
            if (!response.ok) {
                throw new Error('Impossibile caricare i post');
            }
            allPosts = await response.json();
            postsLoaded = true;
            
            renderBlogList();
            
        } catch (error) {
            console.error('Errore durante il caricamento del blog:', error);
            blogList.innerHTML = '<p class="lang-it">Errore nel caricamento degli articoli.</p><p class="lang-en">Error loading articles.</p>';
        }
    }

    function renderBlogList() {
        blogList.innerHTML = ''; // Svuota il contenitore
        
        const filteredPosts = allPosts.filter(post => {
            const postLang = post.lang || 'it';
            return postLang === currentLang;
        });
        
        if (filteredPosts.length === 0) {
            blogList.innerHTML = currentLang === 'it' 
                ? '<p>Nessun articolo disponibile al momento in questa lingua.</p>'
                : '<p>No articles available in this language at the moment.</p>';
            return;
        }

        filteredPosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-post-card';
            card.innerHTML = `
                <h3>${post.title}</h3>
                <div class="blog-date">${post.date}</div>
                <p>${post.summary || '...'}</p>
            `;
            
            card.addEventListener('click', () => {
                loadArticle(post.file);
            });
            
            blogList.appendChild(card);
        });
    }

    async function loadArticle(filename) {
        hideAllSections();
        sectionArticle.classList.add('active');
        navBlog.classList.add('active'); // Mantiene evidenziato il tab blog
        
        articleContent.innerHTML = currentLang === 'it' ? '<p>Caricamento articolo...</p>' : '<p>Loading article...</p>';
        
        try {
            const response = await fetch(`blog/${filename}`);
            if (!response.ok) {
                throw new Error('Impossibile caricare il file markdown');
            }
            
            const markdownText = await response.text();
            
            // Usa marked.js per convertire MD in HTML
            const cleanMarkdown = markdownText.replace(/^---[\s\S]*?---/, '').trim();
            articleContent.innerHTML = marked.parse(cleanMarkdown);
            
        } catch (error) {
            console.error('Errore durante il rendering dell\'articolo:', error);
            articleContent.innerHTML = currentLang === 'it' 
                ? '<p>Errore nel caricamento dell\'articolo.</p>'
                : '<p>Error loading article.</p>';
        }
    }
});
