// Affiliate Tracking Script для Health Supplements Hub
// Отслеживание кликов по партнерским ссылкам DigitalStore24

(function() {
    'use strict';
    
    // Проверяем, что GA4 загружен
    if (typeof gtag === 'undefined') {
        console.warn('GA4 gtag не найден. Affiliate tracking отключен.');
        return;
    }
    
    // URL партнерских ссылок DigitalStore24
    const AFFILIATE_URLS = [
        'digistore24.com',
        'www.digistore24.com',
        'ds24.com'
    ];
    
    // Функция для определения типа страницы
    function getPageCategory() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') return 'homepage';
        if (path.includes('health-supplements')) return 'supplements';
        if (path.includes('health-products')) return 'products';
        if (path.includes('anti-aging')) return 'anti-aging';
        if (path.includes('brain-supplements')) return 'brain';
        if (path.includes('weight-loss')) return 'weight-loss';
        if (path.includes('advanced-mitochondrial-formula')) return 'landing';
        return 'article';
    }
    
    // Функция для определения названия продукта
    function getProductName() {
        const title = document.title;
        const h1 = document.querySelector('h1');
        
        if (title.includes('Advanced Mitochondrial Formula')) return 'Advanced Mitochondrial Formula';
        if (h1 && h1.textContent.includes('Advanced Mitochondrial Formula')) return 'Advanced Mitochondrial Formula';
        
        return 'Health Supplement'; // default
    }
    
    // Функция для отправки события в GA4
    function trackAffiliateClick(clickElement, affiliateUrl) {
        const eventData = {
            'affiliate_url': affiliateUrl,
            'product_name': getProductName(),
            'page_category': getPageCategory(),
            'page_title': document.title,
            'page_url': window.location.href,
            'click_text': clickElement.textContent.trim() || 'No text',
            'timestamp': new Date().toISOString()
        };
        
        // Отправляем событие click_affiliate в GA4
        gtag('event', 'click_affiliate', eventData);
        
        // Дублируем как конверсионное событие
        gtag('event', 'conversion', {
            'send_to': 'G-HMDTQL1LWD',
            'event_category': 'affiliate',
            'event_label': eventData.product_name,
            'value': 1
        });
        
        // Логируем в консоль для отладки
        console.log('Affiliate click tracked:', eventData);
    }
    
    // Функция для проверки, является ли URL партнерским
    function isAffiliateUrl(url) {
        return AFFILIATE_URLS.some(domain => url.includes(domain));
    }
    
    // Основная функция инициализации
    function initAffiliateTracking() {
        // Находим все ссылки на странице
        const allLinks = document.querySelectorAll('a[href]');
        
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Проверяем, является ли ссылка партнерской
            if (href && isAffiliateUrl(href)) {
                // Добавляем обработчик клика только если его еще нет
                if (!link.dataset.affiliateTracked) {
                    link.addEventListener('click', function(event) {
                        trackAffiliateClick(this, href);
                        
                        // Небольшая задержка для обеспечения отправки события
                        setTimeout(() => {
                            // Событие отправлено, ссылка откроется естественным образом
                        }, 100);
                    });
                    
                    // Помечаем ссылку как обработанную
                    link.dataset.affiliateTracked = 'true';
                    
                    console.log('Affiliate link found and tracked:', href);
                }
            }
        });
        
        // Также отслеживаем JavaScript-функции (например, redirectToOffer)
        trackJavaScriptRedirects();
    }
    
    // Функция для отслеживания JavaScript редиректов
    function trackJavaScriptRedirects() {
        // Перехватываем функцию redirectToOffer если она существует
        if (typeof window.redirectToOffer === 'function') {
            const originalFunction = window.redirectToOffer;
            
            window.redirectToOffer = function() {
                // Отслеживаем клик с правильной партнерской ссылкой
                trackAffiliateClick(
                    { textContent: 'JavaScript Redirect' },
                    'https://www.digistore24.com/redir/576637/danilichev/'
                );
                
                // Вызываем оригинальную функцию
                return originalFunction.apply(this, arguments);
            };
            
            console.log('JavaScript redirect tracking enabled');
        }
    }
    
    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAffiliateTracking);
    } else {
        initAffiliateTracking();
    }
    
    // Отслеживание динамически добавленных ссылок
    const observer = new MutationObserver(function(mutations) {
        let hasNewLinks = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Проверяем новые ссылки
                        const newLinks = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
                        if (newLinks.length > 0 || (node.tagName === 'A' && node.href)) {
                            hasNewLinks = true;
                        }
                    }
                });
            }
        });
        
        if (hasNewLinks) {
            initAffiliateTracking();
        }
    });
    
    // Наблюдаем за изменениями в DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Affiliate Tracking Script loaded successfully');
    
})();
