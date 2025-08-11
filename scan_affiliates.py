#!/usr/bin/env python3
"""
Сканер партнёрских ссылок
Находит ВСЕ уникальные партнёрские домены на вашем сайте
"""

import os
import re
from urllib.parse import urlparse
from collections import defaultdict
import json

def find_all_external_links():
    """Найти все внешние ссылки во всех HTML файлах"""
    
    # Словарь: домен -> {страницы, где встречается}
    domains = defaultdict(set)
    
    # Словарь: домен -> примеры ссылок
    domain_examples = defaultdict(list)
    
    # Счётчики
    total_links = 0
    total_pages = 0
    
    print("🔍 Сканирование всех HTML файлов...")
    print("=" * 60)
    
    # Проходим по всем HTML файлам
    for root, dirs, files in os.walk('.'):
        # Пропускаем системные папки
        if any(skip in root for skip in ['.git', '.github', 'node_modules']):
            continue
            
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                total_pages += 1
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Находим все ссылки (href и onclick)
                    # Паттерн для href
                    href_pattern = r'href=["\']([^"\']+)["\']'
                    href_links = re.findall(href_pattern, content, re.IGNORECASE)
                    
                    # Паттерн для onclick и JavaScript
                    onclick_pattern = r'(?:window\.open|window\.location|location\.href|redirectToOffer)\s*\(\s*["\']([^"\']+)["\']'
                    onclick_links = re.findall(onclick_pattern, content, re.IGNORECASE)
                    
                    # Объединяем все найденные ссылки
                    all_links = href_links + onclick_links
                    
                    for link in all_links:
                        # Пропускаем внутренние ссылки
                        if link.startswith('#') or link.startswith('/') or link.startswith('../'):
                            continue
                        
                        # Пропускаем mailto и tel
                        if link.startswith('mailto:') or link.startswith('tel:'):
                            continue
                        
                        # Парсим URL
                        if link.startswith('http'):
                            total_links += 1
                            parsed = urlparse(link)
                            domain = parsed.netloc.lower()
                            
                            # Убираем www.
                            if domain.startswith('www.'):
                                domain = domain[4:]
                            
                            # Пропускаем ваш собственный домен
                            if 'danilichev.info' in domain or 'github' in domain:
                                continue
                            
                            # Добавляем в словари
                            if domain:
                                domains[domain].add(filepath.replace('./', ''))
                                
                                # Сохраняем пример ссылки (максимум 3 примера)
                                if len(domain_examples[domain]) < 3:
                                    domain_examples[domain].append(link)
                
                except Exception as e:
                    print(f"⚠️ Ошибка при обработке {filepath}: {e}")
    
    # Сортируем домены по популярности
    sorted_domains = sorted(domains.items(), key=lambda x: len(x[1]), reverse=True)
    
    # Выводим результаты
    print(f"\n📊 СТАТИСТИКА:")
    print(f"   Просканировано страниц: {total_pages}")
    print(f"   Найдено внешних ссылок: {total_links}")
    print(f"   Уникальных доменов: {len(domains)}")
    print("=" * 60)
    
    # Определяем вероятные партнёрские домены
    affiliate_keywords = [
        'shop', 'store', 'buy', 'affiliate', 'partner', 'offer',
        'promo', 'deal', 'sale', 'discount', 'amazon', 'digistore',
        'clickbank', 'shareasale', 'commission', 'ref', 'aff',
        'enhanced', 'nutritional', 'supplement', 'vitamin', 'health',
        'fitness', 'keto', 'diet', 'weight', 'muscle'
    ]
    
    probable_affiliates = []
    possible_affiliates = []
    
    print("\n🎯 НАЙДЕННЫЕ ДОМЕНЫ (отсортированы по популярности):\n")
    
    for domain, pages in sorted_domains:
        page_count = len(pages)
        examples = domain_examples[domain]
        
        # Проверяем, похож ли домен на партнёрский
        is_probable = any(keyword in domain.lower() for keyword in affiliate_keywords)
        
        # Проверяем наличие партнёрских параметров в примерах
        has_aff_params = any(
            'aff=' in ex or 'ref=' in ex or 'affiliate' in ex or 
            'partner' in ex or 'utm_' in ex or 'click' in ex 
            for ex in examples
        )
        
        if is_probable or has_aff_params:
            probable_affiliates.append(domain)
            status = "⭐ ПАРТНЁРСКИЙ"
        else:
            possible_affiliates.append(domain)
            status = "❓ Возможно партнёрский"
        
        print(f"{status}: {domain}")
        print(f"   📄 Встречается на {page_count} страницах")
        print(f"   📎 Примеры ссылок:")
        for ex in examples[:2]:  # Показываем максимум 2 примера
            if len(ex) > 100:
                ex = ex[:100] + "..."
            print(f"      • {ex}")
        print()
    
    # Генерируем конфигурацию для affiliate-tracking.js
    print("=" * 60)
    print("\n📝 КОНФИГУРАЦИЯ ДЛЯ affiliate-tracking.js:\n")
    print("// Скопируйте этот массив в ваш affiliate-tracking.js")
    print("const AFFILIATE_URLS = [")
    
    # Сначала добавляем вероятные партнёрские
    for domain in probable_affiliates:
        print(f"    '{domain}',")
        if not domain.startswith('www.'):
            print(f"    'www.{domain}',")
    
    print("    ")
    print("    // Возможные партнёрские (проверьте и удалите лишние)")
    for domain in possible_affiliates[:10]:  # Показываем топ-10
        print(f"    // '{domain}',")
    
    print("];")
    
    # Сохраняем полный отчёт в JSON
    report = {
        "scan_date": str(os.popen('date').read().strip()),
        "total_pages": total_pages,
        "total_external_links": total_links,
        "unique_domains": len(domains),
        "probable_affiliates": probable_affiliates,
        "all_domains": {
            domain: {
                "pages_count": len(pages),
                "pages": list(pages)[:10],  # Максимум 10 страниц для примера
                "examples": domain_examples[domain]
            }
            for domain, pages in sorted_domains
        }
    }
    
    with open('affiliate_scan_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print("\n💾 Полный отчёт сохранён в affiliate_scan_report.json")
    print("=" * 60)
    
    # Выводим инструкции
    print("\n📋 ЧТО ДЕЛАТЬ ДАЛЬШЕ:")
    print("1. Просмотрите список доменов выше")
    print("2. Скопируйте AFFILIATE_URLS в ваш affiliate-tracking.js")
    print("3. Удалите домены, которые НЕ являются партнёрскими")
    print("4. Добавьте домены, которые я мог пропустить")
    print("5. Запустите обновление сайта для применения изменений")
    
    return probable_affiliates

if __name__ == "__main__":
    find_all_external_links()
