import os
import json
import re

BLOG_DIR = '../blog'
POSTS_JSON = os.path.join(BLOG_DIR, 'posts.json')

def extract_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    data = {}
    if match:
        frontmatter = match.group(1)
        for line in frontmatter.split('\n'):
            if ':' in line:
                key, val = line.split(':', 1)
                data[key.strip()] = val.strip().strip('"').strip("'")
    return data

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    blog_dir_abs = os.path.abspath(os.path.join(script_dir, BLOG_DIR))
    
    posts = []
    
    for filename in os.listdir(blog_dir_abs):
        if filename.endswith('.md'):
            filepath = os.path.join(blog_dir_abs, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            frontmatter = extract_frontmatter(content)
            
            # Use frontmatter or fallback to filename/default
            title = frontmatter.get('title', filename.replace('-', ' ').replace('.md', '').title())
            date = frontmatter.get('date', 'N/A')
            summary = frontmatter.get('summary', 'Leggi l\'articolo...')
            lang = frontmatter.get('lang', 'it')
            
            posts.append({
                'title': title,
                'date': date,
                'summary': summary,
                'lang': lang,
                'file': filename
            })
            
    # Sort by date descending
    posts.sort(key=lambda x: x['date'], reverse=True)
    
    posts_json_path = os.path.join(blog_dir_abs, 'posts.json')
    with open(posts_json_path, 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=4, ensure_ascii=False)
        
    print(f"✅ Indice del blog aggiornato con successo! Trovi {len(posts)} articoli in {posts_json_path}")

if __name__ == '__main__':
    main()
