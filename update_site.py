import os
import datetime
import re

SITE_URL = "https://www.danilichev.info"

FAVICON_HTML = '''    <!-- Favicon -->
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Health Supplements Hub" />
<link rel="manifest" href="/site.webmanifest" />'''

def get_page_title(file_path):
    """Извлекает title из HTML файла"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Ищем <title>...</title>
        title_match = re.search(r'<title[^>]*>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if title_match:
            title = title_match.group(1).strip()
            # Убираем общую часть сайта из title
            title = re.sub(r'\s*-\s*Health Supplements Hub.*$', '', title)
            title = re.sub(r'\s*\|\s*Health Supplements Hub.*$', '', title)
            return title[:60]  # Ограничиваем длину
        
        # Если title нет, пытаемся взять из h1
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        if h1_match:
            h1_text = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
            return h1_text[:60]
        
        # Если ничего нет, генерируем из URL
        dir_name = os.path.basename(os.path.dirname(file_path))
        return dir_name.replace('-', ' ').title()
        
    except Exception as e:
        print(f"Ошибка чтения title из {file_path}: {e}")
        return "Unknown Page"

def scan_content_pages():
    """Сканирует только контентные страницы в папках (исключает .html файлы)"""
    
    # Исключаемые папки (главная + 5 категорий)
    excluded_dirs = {
        'health-supplements', 'health-products', 'anti-aging-hacks', 
        'brain-supplements', 'weight-loss-supplements'
    }
    
    content_pages = []
    
    # ТОЛЬКО папки с index.html (статьи со слешем /)
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        if root == '.':
            continue
            
        dir_name = os.path.basename(root)
        if dir_name in excluded_dirs:
            continue
            
        if 'index.html' in files:
            file_path = os.path.join(root, 'index.html')
            url_path = '/' + os.path.relpath(root, '.').replace('\\', '/') + '/'
            title = get_page_title(file_path)
            
            # Получаем дату последнего изменения
            mod_time = os.path.getmtime(file_path)
            mod_date = datetime.datetime.fromtimestamp(mod_time)
            
            content_pages.append({
                'url': url_path,
                'title': title,
                'file_path': file_path,
                'mod_date': mod_date
            })
            print(f"📄 Найдена статья: {url_path} - {title}")
    
    # НЕ сканируем .html файлы - это технические страницы
    
    # Сортируем по дате изменения (новые сверху)
    content_pages.sort(key=lambda x: x['mod_date'], reverse=True)
    
    print(f"🔍 Найдено {len(content_pages)} контентных страниц (только папки со слешем)")
    return content_pages

def update_footer_component():
    """Обновляет footer-component.js с актуальным списком статей"""
    
    content_pages = scan_content_pages()
    
    # Берем топ-10 самых свежих статей для футера
    popular_articles = content_pages[:10]
    
    # Генерируем HTML для популярных статей
    popular_html = ""
    for page in popular_articles:
        # Добавляем эмодзи для некоторых популярных статей
        title = page['title']
        if 'mitochondrial' in title.lower() and 'formula' in title.lower():
            title = f"🚀 {title}"
        elif any(word in title.lower() for word in ['tired', 'fatigue', 'energy']):
            title = f"⚡ {title}"
        elif 'brain' in title.lower():
            title = f"🧠 {title}"
        elif 'nad' in title.lower():
            title = f"🔬 {title}"
            
        popular_html += f'                    <li><a href="{page["url"]}">{title}</a></li>\n'
    
    # Читаем текущий footer-component.js
    footer_file = 'footer-component.js'
    
    try:
        with open(footer_file, 'r', encoding='utf-8') as f:
            footer_content = f.read()
    except FileNotFoundError:
        print(f"❌ Файл {footer_file} не найден!")
        return False
    
    # Находим секцию "Popular Articles" и заменяем её
    pattern = r'(<h3>🔥 Popular Articles</h3>\s*<ul>\s*)(.*?)(\s*</ul>)'
    
    new_popular_section = f'\\g<1>{popular_html.rstrip()}\\g<3>'
    
    new_footer_content = re.sub(pattern, new_popular_section, footer_content, flags=re.DOTALL)
    
    # Проверяем, что замена произошла
    if new_footer_content == footer_content:
        print("⚠️ Секция Popular Articles не найдена или не изменилась")
        return False
    
    # Сохраняем обновленный файл
    with open(footer_file, 'w', encoding='utf-8') as f:
        f.write(new_footer_content)
    
    print(f"✅ Footer обновлен! Добавлено {len(popular_articles)} популярных статей")
    
    # Выводим список обновленных статей
    print("📋 Обновленный список популярных статей:")
    for i, page in enumerate(popular_articles, 1):
        print(f"   {i}. {page['title']} → {page['url']}")
    
    return True

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
    print("=" * 50)
    
    print("\n1️⃣ Обновление футера...")
    update_footer_component()
    
    print("\n2️⃣ Генерация sitemap...")
    generate_sitemap()
    
    print("\n3️⃣ Проверка favicon...")
    check_and_add_favicon()
    
    print("\n4️⃣ Добавление футера на страницы...")
    add_footer_to_content_pages()
    
    print("\n" + "=" * 50)
    print("✅ Обновление сайта завершено!")
    print("🎯 Футер автоматически обновлен с актуальными статьями")

if __name__ == "__main__":
    main()
