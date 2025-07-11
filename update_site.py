import os
import datetime

SITE_URL = "https://www.danilichev.info"

FAVICON_HTML = '''    <!-- Favicon -->
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Health Supplements Hub" />
<link rel="manifest" href="/site.webmanifest" />'''

def generate_sitemap():
    today = datetime.date.today().strftime('%Y-%m-%d')
    
    pages = [
        {'url': '/', 'priority': '1.0', 'changefreq': 'weekly'},
        {'url': '/advanced-mitochondrial-formula/', 'priority': '0.95', 'changefreq': 'monthly'},
        {'url': '/health-supplements/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/health-products/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/anti-aging-hacks/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/brain-supplements/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/weight-loss-supplements/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/mitochondrial-energy-guide/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/why-always-tired-after-40/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/afternoon-energy-crash-solutions/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/brain-fog-after-40-causes/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/chronic-fatigue-not-aging/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/low-energy-warning-signs/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/nad-decline-after-40-effects/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/mitochondrial-dysfunction-aging-process/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/cellular-energy-production-slowdown/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/mitochondrial-supplements-research/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/best-energy-supplements-after-40/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/nad-boosting-supplements-comparison/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/natural-energy-restoration-methods/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/mens-fatigue-solutions-over-40/', 'priority': '0.8', 'changefreq': 'monthly'},
    ]
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        if root == '.':
            continue
        
        if 'index.html' in files:
            dir_path = os.path.relpath(root, '.')
            url_path = '/' + dir_path.replace('\\', '/') + '/'
            
            if not any(page['url'] == url_path for page in pages):
                print(f"New page found: {url_path}")
                pages.append({
                    'url': url_path,
                    'priority': '0.8',
                    'changefreq': 'monthly'
                })
    
    xml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
'''
    
    pages_sorted = sorted(pages, key=lambda x: float(x['priority']), reverse=True)
    
    for page in pages_sorted:
        full_url = SITE_URL + page['url']
        xml_content += f'''
    <url>
        <loc>{full_url}</loc>
        <lastmod>{today}</lastmod>
        <changefreq>{page['changefreq']}</changefreq>
        <priority>{page['priority']}</priority>
    </url>'''
    
    xml_content += '''

</urlset>'''
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(xml_content)
    
    print(f"Sitemap updated with {len(pages)} pages")

def check_and_add_favicon():
    updated_files = []
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if 'favicon' in content.lower() or 'apple-touch-icon' in content.lower():
                        continue
                    
                    if '</head>' not in content:
                        continue
                    
                    new_content = content.replace('</head>', f'{FAVICON_HTML}\n</head>')
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    updated_files.append(file_path)
                    print(f"Favicon added to: {file_path}")
                    
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    if updated_files:
        print(f"Favicon added to {len(updated_files)} files")
    else:
        print("All files already have favicon")

def main():
    print("Starting site update...")
    generate_sitemap()
    check_and_add_favicon()
    print("Update completed!")

if __name__ == "__main__":
    main()
