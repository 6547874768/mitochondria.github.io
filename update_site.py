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
    
    # СТАТИЧЕСКИЕ СТРАНИЦЫ С ПРАВИЛЬНЫМИ ПРИОРИТЕТАМИ
    pages = [
        # Main Homepage
        {'url': '/', 'priority': '1.0', 'changefreq': 'weekly'},
        
        # Product Landing Page
        {'url': '/advanced-mitochondrial-formula/', 'priority': '0.95', 'changefreq': 'monthly'},
        
        # Category Pages
        {'url': '/health-supplements/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/health-products/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/anti-aging-hacks/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/brain-supplements/', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/weight-loss-supplements/', 'priority': '0.9', 'changefreq': 'weekly'},
        
        # Content Articles
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
        {'url': '/womens-energy-decline-menopause/', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/low-energy-warning-signs-over-40/', 'priority': '0.8', 'changefreq': 'monthly'},
        
        # КРИТИЧЕСКИ ВАЖНЫЕ ТЕХНИЧЕСКИЕ СТРАНИЦЫ для YMYL-сайтов
        {'url': '/about-us/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/contact-us/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/disclaimer/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/privacy-policy/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/terms-of-use/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/editorial-policy/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/affiliate-disclosure/', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/sitemap/', 'priority': '0.6', 'changefreq': 'weekly'},
    ]
    
    # AUTO-DETECTION для новых страниц
    print("🔍 Scanning for new pages...")
    
    # 1. Поиск папок с index.html
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        if root == '.':
            continue
        
        if 'index.html' in files:
            dir_path = os.path.relpath(root, '.')
            url_path = '/' + dir_path.replace('\\', '/') + '/'
            
            if not any(page['url'] == url_path for page in pages):
                print(f"📄 New page found (folder): {url_path}")
                pages.append({
                    'url': url_path,
                    'priority': '0.8',
                    'changefreq': 'monthly'
                })
    
    # 2. Поиск .html файлов в корне (кроме index.html и 404.html)
    for file in os.listdir('.'):
        if file.endswith('.html') and file not in ['index.html', '404.html']:
            url_path = '/' + file
            
            if not any(page['url'] == url_path for page in pages):
                print(f"📄 New page found (HTML file): {url_path}")
                # Технические страницы - приоритет 0.7, остальные - 0.8
                priority = '0.7' if file in [
                    'affiliate-disclosure.html', 'contact-us.html', 'disclaimer.html',
                    'editorial-policy.html', 'privacy-policy.html', 'terms-of-use.html',
                    'sitemap.html', 'about-us.html'
                ] else '0.8'
                
                pages.append({
                    'url': url_path,
                    'priority': priority,
                    'changefreq': 'monthly'
                })
    
    # GENERATE XML
    xml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

    <!-- Main Homepage -->'''
    
    # Sort by priority (highest first)
    pages_sorted = sorted(pages, key=lambda x: float(x['priority']), reverse=True)
    
    current_priority = None
    for page in pages_sorted:
        full_url = SITE_URL + page['url']
        
        # Add section comments
        if current_priority != page['priority']:
            current_priority = page['priority']
            if page['priority'] == '0.95':
                xml_content += '\n\n    <!-- Product Landing Page -->'
            elif page['priority'] == '0.9':
                xml_content += '\n\n    <!-- Category Pages -->'
            elif page['priority'] == '0.8':
                xml_content += '\n\n    <!-- Content Articles -->'
            elif page['priority'] == '0.7':
                xml_content += '\n\n    <!-- CRITICAL TECHNICAL PAGES for YMYL compliance -->'
            elif page['priority'] == '0.6':
                xml_content += '\n\n    <!-- Site Navigation -->'
        
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
    
    print(f"✅ Sitemap updated with {len(pages)} pages")
    
    # Count by type
    technical_pages = [p for p in pages if p['priority'] == '0.7']
    content_pages = [p for p in pages if p['priority'] == '0.8']
    print(f"📊 Technical pages: {len(technical_pages)}")
    print(f"📊 Content pages: {len(content_pages)}")
    print(f"📊 Total pages: {len(pages)}")

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

def add_footer_to_content_pages():
    """Add footer component to content pages (exclude main + 5 categories)"""
    
    # Pages WITHOUT footer (main + 5 categories)
    excluded_pages = {
        './index.html',
        './health-supplements/index.html',
        './health-products/index.html', 
        './anti-aging-hacks/index.html',
        './brain-supplements/index.html',
        './weight-loss-supplements/index.html',
        './404.html'
    }
    
    footer_script = '<script src="/footer-component.js"></script>'
    updated_files = []
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file).replace('\\', '/')
                normalized_path = './' + file_path if not file_path.startswith('./') else file_path
                
                # Skip excluded pages
                if normalized_path in excluded_pages:
                    print(f"⏭️ Skipping: {file_path} (excluded)")
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Check if footer already exists
                    if 'footer-component.js' in content:
                        print(f"✅ Footer already exists: {file_path}")
                        continue
                    
                    # Check if </body> exists
                    if '</body>' not in content:
                        print(f"⚠️ No </body> found in: {file_path}")
                        continue
                    
                    # Add footer script before </body>
                    new_content = content.replace('</body>', f'{footer_script}\n</body>')
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    updated_files.append(file_path)
                    print(f"➕ Footer added to: {file_path}")
                    
                except Exception as e:
                    print(f"❌ Error processing {file_path}: {e}")
    
    if updated_files:
        print(f"🦶 Footer added to {len(updated_files)} content pages")
    else:
        print("🦶 All content pages already have footer")

def main():
    print("🚀 Starting site update...")
    generate_sitemap()
    check_and_add_favicon()
    add_footer_to_content_pages()
    print("✅ Update completed!")

if __name__ == "__main__":
    main()
