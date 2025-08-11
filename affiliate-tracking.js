// Universal Affiliate Tracking Script
// Отслеживание кликов по ВСЕМ партнерским ссылкам

(function() {
    'use strict';
    
    // Проверяем, что GA4 загружен
    if (typeof gtag === 'undefined') {
        console.warn('GA4 gtag не найден. Affiliate tracking отключен.');
        return;
    }
    
    // ВСЕ партнерские домены (47 программ)
    const AFFILIATE_URLS = [
        'digistore24.com',
        'www.digistore24.com',
        'claudiacaldwell.com',
        'www.claudiacaldwell.com',
        'advancedbionutritionals.com',
        'www.advancedbionutritionals.com',
        'enhancedlabs24.com',
        'www.enhancedlabs24.com',
        'cognicarepro.com',
        'www.cognicarepro.com',
        'ketobreads.net',
        'www.ketobreads.net',
        'slimpulse.co',
        'www.slimpulse.co',
        'fastleanpro24.com',
        'www.fastleanpro24.com',
        'magbreakthrough.com',
        'www.magbreakthrough.com',
        'ketosolution.net',
        'www.ketosolution.net',
        'vitalforcedetox.com',
        'www.vitalforcedetox.com',
        'renewyourhair.com',
        'www.renewyourhair.com',
        'getnitricboost.net',
        'www.getnitricboost.net',
        'coffeeslimmerpro.com',
        'www.coffeeslimmerpro.com',
        'getkeyslimdrops.cc',
        'www.getkeyslimdrops.cc',
        'partners.primalforce.net',
        'www.partners.primalforce.net',
        'getneurozoom.cc',
        'www.getneurozoom.cc',
        'theflatbellyshake.com',
        'www.theflatbellyshake.com',
        'sonofit24.com',
        'www.sonofit24.com',
        'pxt.pinealxt.com',
        'www.pxt.pinealxt.com',
        'erecprime24.com',
        'www.erecprime24.com',
        'endopeak24.com',
        'www.endopeak24.com',
        'primebiome24.com',
        'www.primebiome24.com',
        'primeperformpro.com',
        'www.primeperformpro.com',
        'pureweightlossnews.com',
        'www.pureweightlossnews.com',
        'liposlend24.com',
        'www.liposlend24.com',
        'gutoptim24.com',
        'www.gutoptim24.com',
        'leptisense.com',
        'www.leptisense.com',
        'getfluxactive.cc',
        'www.getfluxactive.cc',
        'getaizenpower24.com',
        'www.getaizenpower24.com',
        'tryfeelgoodknees.com',
        'www.tryfeelgoodknees.com',
        'allrecipes.site',
        'www.allrecipes.site',
        'honeyburn24.com',
        'www.honeyburn24.com',
        'aeroslim24.com',
        'www.aeroslim24.com',
        'youremfshield.com',
        'www.youremfshield.com',
        'leanbliss24.com',
        'www.leanbliss24.com',
        'patriotslimshot.com',
        'www.patriotslimshot.com',
        'getsumatratonic.com',
        'www.getsumatratonic.com',
        'mitosculpt.com',
        'www.mitosculpt.com',
        'refirmance24.com',
        'www.refirmance24.com',
        'alphadrive24.com',
        'www.alphadrive24.com',
        'seriskin.com',
        'www.seriskin.com',
        'thelungexpandpro24.com',
        'www.thelungexpandpro24.com',
        'tryrespilean.com',
        'www.tryrespilean.com',
        'fastbrainbooster.com',
        'www.fastbrainbooster.com',
        'tryglutless.com',
        'www.tryglutless.com',
        'checkout-ds24.com',
        'www.checkout-ds24.com',
        'ds24.com',
        'www.ds24.com'
    ];
    
    // Функция для определения типа страницы
    function getPageCategory() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') return 'homepage';
        if (path.includes('health-supplements')) return 'supplements';
        if (path.includes('brain-supplements')) return 'brain';
        if (path.includes('keto-recipes')) return 'keto';
        if (path.includes('weight-loss')) return 'weight-loss';
        if (path.includes('anti-aging')) return 'anti-aging';
        if (path.includes('testosterone') || path.includes('alpha')) return 'testosterone';
        if (path.includes('muscle') || path.includes('strength')) return 'muscle';
        return 'article';
    }
    
    // Функция для определения названия продукта из URL
    function getProductName(url) {
        // Enhanced Labs
        if (url.includes('enhancedlabs')) {
            if (url.includes('top-t')) return 'Enhanced Labs Top T';
            if (url.includes('black-ox')) return 'Enhanced Labs Black Ox';
            return 'Enhanced Labs Product';
        }
        
        // Advanced Bio Nutritionals
        if (url.includes('advancedbionutritionals')) {
            if (url.includes('mitochondrial')) return 'Advanced Mitochondrial Formula';
            return 'Advanced Bio Nutritionals Product';
        }
        
        // Keto Products
        if (url.includes('ketobreads')) return 'Keto Breads';
        if (url.includes('ketosolution')) return 'Keto Solution';
        if (url.includes('claudiacaldwell')) return 'Keto Flow';
        
        // Weight Loss
        if (url.includes('slimpulse')) return 'Slim Pulse';
        if (url.includes('leanbliss')) return 'Lean Bliss';
        if (url.includes('tropislim')) return 'TropiSlim';
        
        // Brain Health
        if (url.includes('neurozoom')) return 'NeuroZoom';
        if (url.includes('cognicare')) return 'CogniCare Pro';
        if (url.includes('fastbrainbooster')) return 'Fast Brain Booster';
        
        // Extract from domain
        const domain = url.split('/')[2];
        if (domain) {
            return domain.replace('www.', '').replace('.com', '').replace('.net', '');
        }
        
        return 'Affiliate Product';
    }
    
    // Функция для отправки события в GA4
    function trackAffiliateClick(clickElement, affiliateUrl) {
        const productName = getProductName(affiliateUrl);
        
        const eventData = {
            'affiliate_url': affiliateUrl,
            'product_name': productName,
            'page_category': getPageCategory(),
            'page_title': document.title,
            'page_url': window.location.href,
            'click_text': clickElement.textContent ? clickElement.textContent.trim().substring(0, 100) : 'No text',
            'timestamp': new Date().toISOString()
        };
        
        // Отправляем событие click_affiliate в GA4
        gtag('event', 'click_affiliate', eventData);
        
        // Дублируем как конверсионное событие
        gtag('event', 'conversion', {
            'send_to': 'G-HMDTQL1LWD/affiliate',
            'event_category': 'affiliate',
            'event_label': productName,
            'value': 1
        });
        
        // Логируем в консоль для отладки
        console.log('📊 Affiliate click tracked:', productName, affiliateUrl);
    }
    
    // Функция для проверки, является ли URL партнерским
    function isAffiliateUrl(url) {
        if (!url) return false;
        const urlLower = url.toLowerCase();
        return AFFILIATE_URLS.some(domain => urlLower.includes(domain.toLowerCase()));
    }
    
    // Основная функция инициализации
    function initAffiliateTracking() {
        // Находим все ссылки на странице
        const allLinks = document.querySelectorAll('a[href]');
        let affiliateCount = 0;
        
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Проверяем, является ли ссылка партнерской
            if (href && isAffiliateUrl(href)) {
                affiliateCount++;
                
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
                    link.classList.add('affiliate-link');
                }
            }
        });
        
        if (affiliateCount > 0) {
            console.log(`✅ Найдено партнерских ссылок: ${affiliateCount}`);
        }
        
        // Также отслеживаем JavaScript-функции
        trackJavaScriptRedirects();
    }
    
    // Функция для отслеживания JavaScript редиректов
    function trackJavaScriptRedirects() {
        // Перехватываем функцию redirectToOffer если она существует
        if (typeof window.redirectToOffer === 'function') {
            const originalFunction = window.redirectToOffer;
            
            window.redirectToOffer = function(url) {
                if (isAffiliateUrl(url)) {
                    trackAffiliateClick(
                        { textContent: 'JavaScript Redirect' },
                        url
                    );
                }
                return originalFunction.apply(this, arguments);
            };
        }
        
        // Перехватываем window.open
        const originalOpen = window.open;
        window.open = function(url) {
            if (url && isAffiliateUrl(url)) {
                trackAffiliateClick(
                    { textContent: 'Window Open' },
                    url
                );
            }
            return originalOpen.apply(this, arguments);
        };
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
    
    console.log('✅ Universal Affiliate Tracking v2.0 загружен');
    console.log(`📊 Отслеживаем ${AFFILIATE_URLS.length / 2} партнерских программ`);
    
})();
