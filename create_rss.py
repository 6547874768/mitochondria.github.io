#!/usr/bin/env python3
import os
import re
from datetime import datetime
from pathlib import Path
import xml.etree.ElementTree as ET
from xml.dom import minidom

def get_article_info(folder_path):
    """Извлекает информацию из HTML файла"""
    index_file = os.path.join(folder_path, 'index.html')
    
    if not os.path.exists(index_file):
        return None
    
    try:
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Извлекаем title
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
        title = title_match.group(1) if title_match else folder_path
        
        # Извлекаем meta description
        desc_match = re.search(r'<meta name="description" content="(.*?)"', content, re.IGNORECASE)
        description = desc_match.group(1) if desc_match else title
        
        # Извлекаем дату публикации из schema.org
        date_match = re.search(r'"datePublished":\s*"(.*?)"', content)
        if date_match:
            pub_date = date_match.group(1)
        else:
            # Если нет даты, используем дату изменения файла
            timestamp = os.path.getmtime(index_file)
            pub_date = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%dT%H:%M:%SZ')
        
        return {
            'title': title,
            'description': description,
            'link': f"https://www.danilichev.info/{folder_path}/",
            'guid': f"https://www.danilichev.info/{folder_path}/",
            'pubDate': pub_date,
            'folder': folder_path
        }
    except Exception as e:
        print(f"Ошибка при обработке {folder_path}: {e}")
        return None

def create_rss_feed():
    """Создает RSS feed из всех статей"""
    
    # Получаем список всех папок
    folders = []
    for item in os.listdir('.'):
        if os.path.isdir(item) and not item.startswith('.') and not item.startswith('_'):
            # Исключаем системные папки
            if item not in ['images', 'css', 'js', 'fonts']:
                folders.append(item)
    
    # Собираем информацию о статьях
    articles = []
    for folder in folders:
        info = get_article_info(folder)
        if info:
            articles.append(info)
    
    # Сортируем по дате (новые первыми)
    articles.sort(key=lambda x: x['pubDate'], reverse=True)
    
    # Берем только последние 50 статей
    articles = articles[:50]
    
    # Создаем RSS структуру
    rss = ET.Element('rss', version='2.0')
    channel = ET.SubElement(rss, 'channel')
    
    # Основная информация о канале
    ET.SubElement(channel, 'title').text = 'Danilichev Health Blog'
    ET.SubElement(channel, 'link').text = 'https://www.danilichev.info/'
    ET.SubElement(channel, 'description').text = 'Evidence-based dental health research and natural supplement optimization'
    ET.SubElement(channel, 'language').text = 'en-us'
    ET.SubElement(channel, 'lastBuildDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
    
    # Добавляем статьи
    for article in articles:
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = article['title']
        ET.SubElement(item, 'link').text = article['link']
        ET.SubElement(item, 'description').text = article['description']
        ET.SubElement(item, 'guid').text = article['guid']
        
        # Форматируем дату для RSS
        try:
            dt = datetime.fromisoformat(article['pubDate'].replace('Z', '+00:00'))
            pub_date_rss = dt.strftime('%a, %d %b %Y %H:%M:%S GMT')
        except:
            pub_date_rss = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
        
        ET.SubElement(item, 'pubDate').text = pub_date_rss
    
    # Преобразуем в красивый XML
    xml_str = ET.tostring(rss, encoding='unicode')
    dom = minidom.parseString(xml_str)
    pretty_xml = dom.toprettyxml(indent="  ")
    
    # Убираем лишнюю первую строку XML declaration
    lines = pretty_xml.split('\n')
    pretty_xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + '\n'.join(lines[1:])
    
    # Сохраняем в файл
    with open('feed.xml', 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    
    print(f"✅ RSS feed создан: {len(articles)} статей добавлено в feed.xml")

if __name__ == "__main__":
    create_rss_feed()
    print("🎉 RSS feed успешно обновлён!")
