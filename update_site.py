import os
import datetime
import re

SITE_URL = "https://www.danilichev.info"

# ========== КОНФИГУРАЦИЯ ==========
GA4_ID = "G-HMDTQL1LWD"
CLARITY_PROJECT_ID = "sdzy2un6sn"  # ← ВАШ CLARITY ID УЖЕ ВСТАВЛЕН!

# Favicon HTML
FAVICON_HTML = '''    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />'''

# Google Analytics 4
GA4_HTML = f'''    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={GA4_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', '{GA4_ID}');
    </script>'''

# Microsoft Clarity
CLARITY_HTML = f'''    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){{
            c[a]=c[a]||function(){{(c[a].q=c[a].q||[]).push(arguments)}};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        }})(window, document, "clarity", "script", "{CLARITY_PROJECT_ID}");
    </script>'''

# Affiliate Tracking
AFFILIATE_HTML = '''    <script src="/affiliate-tracking.js"></script>'''

# Footer Component
FOOTER_HTML = '''    <script src="/footer-component.js"></script>'''

# ========== УТИЛИТЫ ==========

def get_all_html_files():
    """Получить все HTML файлы в проекте"""
    html_files = []
    
    # КРИТИЧЕСКИ ВАЖНЫЕ ФАЙЛЫ - НИКОГДА НЕ ТРОГАЕМ
    protected_files = [
        'robots.txt',
        'CNAME',
        '.htaccess',
        '_headers',
        'site.webmanifest'
    ]
    
    for root, dirs, files in os.walk('.'):
        # Пропускаем системные папки
        if any(skip in root for skip in ['.git', '.github', 'node_modules']):
            continue
        for file in files:
            # ТОЛЬКО HTML файлы
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                # Дополнительная проверка на защищённые файлы
                if not any(protected in filepath for protected in protected_files):
                    html_files.append(filepath)
    return html_files

def is_content_page(filepath):
    """Проверить, является ли файл контентной страницей"""
    # Страницы, которые НЕ должны получать футер
    excluded_pages = [
        'sitemap.html',  # Карта сайта - не нужен футер
        '404.html'       # Страница ошибки - минимализм лучше
    ]
    
    # Проверяем исключения
    for page in excluded_pages:
        if page in filepath:
            return False
    
    # ВСЁ ОСТАЛЬНОЕ получает футер
    # (включая главную, категории, контент и даже privacy/terms)
    return True

# ========== ФУНКЦИИ ДОБАВЛЕНИЯ КОМПОНЕНТОВ ==========

def add_component_to_head(content, component_html, component_name):
    """Добавить компонент в <head> если его там нет"""
    # Проверяем наличие компонента
    if component_name == "GA4" and GA4_ID in content:
        return content, False
    elif component_name == "Clarity" and "clarity" in content:
        return content, False
    elif component_name == "Favicon" and "favicon" in content.lower():
        return content, False
    
    # Добавляем перед закрывающим </head>
    head_close = content.find('</head>')
    if head_close != -1:
        new_content = content[:head_close] + f"\n{component_html}\n" + content[head_close:]
        return new_content, True
    
    return content, False

def add_component_to_body(content, component_html, component_name):
    """Добавить компонент перед </body> если его там нет"""
    # Проверяем наличие
    if component_name == "Affiliate" and "affiliate-tracking.js" in content:
        return content, False
    elif component_name == "Footer" and "footer-component.js" in content:
        return content, False
    
    # Добавляем перед закрывающим </body>
    body_close = content.find('</body>')
    if body_close != -1:
        new_content = content[:body_close] + f"\n{component_html}\n" + content[body_close:]
        return new_content, True
    
    return content, False

# ========== ГЛАВНЫЕ ФУНКЦИИ ОБРАБОТКИ ==========

def process_all_pages():
    """Обработать все HTML страницы и добавить недостающие компоненты"""
    html_files = get_all_html_files()
    updated_files = []
    
    print(f"🔍 Найдено {len(html_files)} HTML файлов")
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = []
        
        # 1. Favicon (для всех страниц)
        content, added = add_component_to_head(content, FAVICON_HTML, "Favicon")
        if added:
            changes.append("Favicon")
        
        # 2. Google Analytics 4 (для всех страниц)
        content, added = add_component_to_head(content, GA4_HTML, "GA4")
        if added:
            changes.append("GA4")
        
        # 3. Microsoft Clarity (для всех страниц)
        content, added = add_component_to_head(content, CLARITY_HTML, "Clarity")
        if added:
            changes.append("Clarity")
        
        # 4. Affiliate Tracking (для всех страниц)
        # Правильный путь для вложенных папок
        affiliate_path = AFFILIATE_HTML
        if '/' in filepath and filepath != './index.html':
            affiliate_path = affiliate_path.replace('"/affiliate-tracking.js"', '"../affiliate-tracking.js"')
        
        content, added = add_component_to_body(content, affiliate_path, "Affiliate")
        if added:
            changes.append("Affiliate")
        
        # 5. Footer Component (только для контентных страниц)
        if is_content_page(filepath):
            # Правильный путь для вложенных папок
            footer_path = FOOTER_HTML
            if '/' in filepath:
                footer_path = footer_path.replace('"/footer-component.js"', '"../footer-component.js"')
            
            content, added = add_component_to_body(content, footer_path, "Footer")
            if added:
                changes.append("Footer")
        
        # Сохраняем если были изменения
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_files.append(f"{filepath}: {', '.join(changes)}")
            print(f"✅ Обновлен: {filepath} ({', '.join(changes)})")
    
    return updated_files

def generate_sitemap():
    """Генерация sitemap.xml"""
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Главная страница
    xml_content += f'''  <url>
    <loc>{SITE_URL}/</loc>
    <lastmod>{datetime.datetime.now().strftime('%Y-%m-%d')}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n'''
    
    # Все HTML файлы
    for filepath in get_all_html_files():
        if filepath == './index.html':
            continue
        
        # Определяем приоритет
        if any(cat in filepath for cat in ['health-supplements', 'brain-supplements', 
                                           'keto-recipes', 'weight-loss', 'anti-aging-hacks']):
            priority = '0.9'
        elif is_content_page(filepath):
            priority = '0.8'
        else:
            priority = '0.7'
        
        # Преобразуем путь в URL
        url_path = filepath.replace('./', '/').replace('\\', '/').replace('/index.html', '/')
        
        xml_content += f'''  <url>
    <loc>{SITE_URL}{url_path}</loc>
    <lastmod>{datetime.datetime.now().strftime('%Y-%m-%d')}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
  </url>\n'''
    
    xml_content += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(xml_content)
    
    print("✅ Sitemap.xml обновлен")

# ========== ГЛАВНАЯ ФУНКЦИЯ ==========

def main():
    print("🚀 Запуск полной автоматизации сайта...")
    print("=" * 50)
    
    # Проверка конфигурации
    print(f"✅ Google Analytics ID: {GA4_ID}")
    print(f"✅ Microsoft Clarity ID: {CLARITY_PROJECT_ID}")
    print("=" * 50)
    
    # Обработка всех страниц
    updated_files = process_all_pages()
    
    # Генерация sitemap
    generate_sitemap()
    
    # Итоги
    print("=" * 50)
    if updated_files:
        print(f"✅ Обновлено файлов: {len(updated_files)}")
        for file_info in updated_files[:10]:  # Показываем первые 10
            print(f"   {file_info}")
        if len(updated_files) > 10:
            print(f"   ... и еще {len(updated_files) - 10} файлов")
    else:
        print("✅ Все файлы уже содержат необходимые компоненты")
    
    print("=" * 50)
    print("✅ Автоматизация завершена успешно!")

if __name__ == "__main__":
    main()
