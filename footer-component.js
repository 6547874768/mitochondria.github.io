// Check if footer should be shown on current page
function shouldShowFooter() {
    const currentPath = window.location.pathname;
    
    // Футер НЕ показываем только на этих страницах
    const excludedPages = [
        '/404.html',
        '/sitemap.html'
    ];
    
    return !excludedPages.includes(currentPath);
}

// Footer HTML content
function getFooterHTML() {
    return `
    <footer class="site-footer">
        <!-- ПОИСКОВЫЙ БЛОК -->
        <div class="footer-search-section">
            <div class="footer-search-container">
                <h3>🔍 Поиск по сайту</h3>
                <div class="search-box">
                    <form action="https://www.google.com/search" method="get" target="_blank" class="search-form">
                        <input type="hidden" name="sitesearch" value="danilichev.info">
                        <input type="text" name="q" placeholder="Найдётся всё... Например: testosterone, keto recipes, brain supplements" class="search-input" required>
                        <button type="submit" class="search-button">🔍 Найти</button>
                    </form>
                </div>
                <p class="search-hint">Поиск через Google по всему сайту danilichev.info</p>
            </div>
        </div>
        
        <div class="footer-container">
            <div class="footer-section">
                <h3>📋 Navigation</h3>
                <ul>
                    <li><a href="/">🏠 Home</a></li>
                    <li><a href="/health-supplements/">💊 Health Supplements</a></li>
                    <li><a href="/brain-supplements/">🧠 Brain Supplements</a></li>
                    <li><a href="/anti-aging-hacks/">✨ Anti-Aging Hacks</a></li>
                    <li><a href="/weight-loss-supplements/">⚖️ Weight Loss Supplements</a></li>
                    <li><a href="/health-products/">🧪 Health Products</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>🔥 Popular Articles</h3>
                <ul>
                    <li><a href="/womens-energy-decline-menopause/">⚡ Women's Energy Decline</a></li>
                    <li><a href="/why-always-tired-after-40/">⚡ Why Always Tired After 40</a></li>
                    <li><a href="/alpha-strength/">💪 Alpha Strength Stack</a></li>
                    <li><a href="/best-brain-supplements/">🧠 Best Brain Supplements</a></li>
                    <li><a href="/mitochondrial-supplements-research/">🔬 Mitochondrial Research</a></li>
                    <li><a href="/nad-decline-after-40-effects/">⚡ NAD+ Decline After 40</a></li>
                    <li><a href="/keto-for-weight-loss-over-40/">🏃 Keto Weight Loss 40+</a></li>
                    <li><a href="/mens-fatigue-solutions-over-40/">💊 Men's Fatigue Solutions</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>🌐 Follow Us</h3>
                <ul class="social-links">
                    <li><a href="https://www.facebook.com" rel="nofollow noopener" target="_blank">📘 Facebook</a></li>
                    <li><a href="https://www.twitter.com" rel="nofollow noopener" target="_blank">🐦 Twitter (X)</a></li>
                    <li><a href="https://www.instagram.com" rel="nofollow noopener" target="_blank">📷 Instagram</a></li>
                    <li><a href="https://www.youtube.com" rel="nofollow noopener" target="_blank">📺 YouTube</a></li>
                    <li><a href="https://www.pinterest.com" rel="nofollow noopener" target="_blank">📌 Pinterest</a></li>
                    <li><a href="https://www.linkedin.com" rel="nofollow noopener" target="_blank">💼 LinkedIn</a></li>
                    <li><a href="https://www.reddit.com/r/supplements" rel="nofollow noopener" target="_blank">🤖 Reddit</a></li>
                    <li><a href="https://www.tiktok.com" rel="nofollow noopener" target="_blank">🎵 TikTok</a></li>
                </ul>
                <p style="font-size: 12px; color: #6c757d; margin-top: 15px; font-style: italic;">
                    Social profiles coming soon! Follow for health tips & updates.
                </p>
            </div>
            
            <div class="footer-section">
                <h3>📚 Legal & Policies</h3>
                <ul>
                    <li><a href="/privacy-policy.html">🔒 Privacy Policy</a></li>
                    <li><a href="/terms-of-use.html">📜 Terms of Use</a></li>
                    <li><a href="/disclaimer.html">⚠️ Medical Disclaimer</a></li>
                    <li><a href="/affiliate-disclosure.html">🤝 Affiliate Disclosure</a></li>
                    <li><a href="/editorial-policy.html">✍️ Editorial Policy</a></li>
                    <li><a href="/about-us.html">👥 About Us</a></li>
                    <li><a href="/contact-us.html">📧 Contact Us</a></li>
                    <li><a href="/sitemap.html">🗺️ Sitemap</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>ℹ️ Information</h3>
                <div class="footer-info">
                    <p><strong>© 2025 Danilichev.info</strong></p>
                    <p>🎯 Science-backed health solutions for life after 40</p>
                    <p>⚠️ Information does not replace medical consultation</p>
                    <p>🤝 Affiliate partners: 47+ programs tracked</p>
                    <p>📊 Analytics: GA4 + Microsoft Clarity</p>
                    <p>✅ SSL Secured | GDPR Compliant</p>
                    <p class="footer-note">Always consult your healthcare provider before starting any supplement regimen. Individual results may vary. Not intended to diagnose, treat, cure, or prevent any disease.</p>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-container">
                <p>This website is for informational purposes only. Statements have not been evaluated by the FDA. Individual results may vary.</p>
                <p style="margin-top: 10px; font-size: 11px; opacity: 0.7;">
                    © 2025 Danilichev.info | All Rights Reserved | Powered by GitHub Pages | 180+ Articles | 47 Affiliate Partners
                </p>
            </div>
        </div>
    </footer>
    
    <style>
    .site-footer {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-top: 3px solid #10b981;
        margin-top: 60px;
        color: #495057;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }
    
    /* ПОИСКОВЫЙ БЛОК */
    .footer-search-section {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        padding: 30px 0;
        border-bottom: 2px solid #047857;
    }
    
    .footer-search-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
        text-align: center;
    }
    
    .footer-search-section h3 {
        color: #ffffff;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
    }
    
    .search-box {
        margin: 20px 0;
    }
    
    .search-form {
        display: flex;
        gap: 10px;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .search-input {
        flex: 1;
        padding: 12px 20px;
        font-size: 16px;
        border: none;
        border-radius: 50px;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: box-shadow 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    
    .search-button {
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 50px;
        background: #fbbf24;
        color: #1f2937;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
    }
    
    .search-button:hover {
        background: #f59e0b;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .search-hint {
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        margin-top: 15px;
        font-style: italic;
    }
    
    /* ОСТАЛЬНОЙ ФУТЕР */
    .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 30px;
        padding: 40px 20px;
    }
    
    .footer-section h3 {
        color: #212529;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        border-bottom: 2px solid #10b981;
        padding-bottom: 8px;
        display: flex;
        align-items: center;
    }
    
    .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .footer-section li {
        margin-bottom: 10px;
        transition: transform 0.2s ease;
    }
    
    .footer-section li:hover {
        transform: translateX(5px);
    }
    
    .footer-section a {
        color: #6c757d;
        text-decoration: none;
        transition: all 0.3s ease;
        display: inline-block;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .footer-section a:hover {
        color: #10b981;
        text-decoration: underline;
    }
    
    /* Стиль для соцсетей */
    .social-links a {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .social-links a:hover {
        color: #059669;
        font-weight: 600;
    }
    
    .footer-info p {
        margin: 8px 0;
        line-height: 1.6;
        font-size: 13px;
    }
    
    .footer-info .footer-note {
        font-style: italic;
        color: #6c757d;
        font-size: 12px;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #dee2e6;
    }
    
    .footer-bottom {
        background: rgba(16, 185, 129, 0.1);
        margin-top: 0;
        padding: 15px 0;
        text-align: center;
        border-top: 1px solid #dee2e6;
    }
    
    .footer-bottom p {
        margin: 0;
        color: #6c757d;
        font-size: 12px;
    }
    
    @media (max-width: 1024px) {
        .footer-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }
    
    @media (max-width: 768px) {
        .search-form {
            flex-direction: column;
        }
        
        .search-button {
            width: 100%;
        }
        
        .footer-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            padding: 30px 15px;
        }
        
        .site-footer {
            margin-top: 40px;
        }
        
        .footer-section h3 {
            font-size: 16px;
        }
        
        .footer-section a {
            font-size: 13px;
        }
    }
    
    @media (max-width: 480px) {
        .footer-search-section h3 {
            font-size: 20px;
        }
        
        .search-input {
            font-size: 14px;
            padding: 10px 15px;
        }
        
        .search-button {
            font-size: 14px;
            padding: 10px 20px;
        }
        
        .footer-container {
            grid-template-columns: 1fr;
            padding: 20px 10px;
        }
        
        .footer-section {
            text-align: center;
        }
        
        .footer-section li:hover {
            transform: none;
        }
    }
    </style>`;
}

// Add footer if needed
if (shouldShowFooter()) {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertAdjacentHTML('beforeend', getFooterHTML());
    });
}

// Additional check for AJAX-loaded pages
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (shouldShowFooter() && !document.querySelector('.site-footer')) {
            document.body.insertAdjacentHTML('beforeend', getFooterHTML());
        }
    });
} else {
    if (shouldShowFooter() && !document.querySelector('.site-footer')) {
        document.body.insertAdjacentHTML('beforeend', getFooterHTML());
    }
}
