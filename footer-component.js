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
                    <li><a href="/womens-energy-decline-menopause/">⚡ Women's Energy Decline in Menopause</a></li>
                    <li><a href="/why-always-tired-after-40/">⚡ Why Always Tired After 40</a></li>
                    <li><a href="/alpha-strength/">💪 Alpha Strength Testosterone Stack</a></li>
                    <li><a href="/best-brain-supplements/">🧠 Best Brain Supplements</a></li>
                    <li><a href="/whats-a-good-recipe-for-keto-popcorn-shrimp/">🍤 Keto Popcorn Shrimp Recipe</a></li>
                    <li><a href="/whats-an-easy-coconut-chicken-curry-recipe-for-keto-diet/">🍛 Coconut Chicken Curry Keto</a></li>
                    <li><a href="/mitochondrial-supplements-research/">🔬 Mitochondrial Supplements</a></li>
                    <li><a href="/nad-decline-after-40-effects/">⚡ NAD+ Decline After 40</a></li>
                    <li><a href="/keto-for-weight-loss-over-40/">🏃 Keto Weight Loss Over 40</a></li>
                    <li><a href="/mens-fatigue-solutions-over-40/">💊 Men's Fatigue Solutions</a></li>
                </ul>
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
                    <p>📊 Analytics: Google Analytics + Microsoft Clarity</p>
                    <p>✅ SSL Secured | GDPR Compliant</p>
                    <p class="footer-note">Always consult your healthcare provider before starting any supplement regimen. Results may vary. Not intended to diagnose, treat, cure, or prevent any disease.</p>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-container">
                <p>This website is for informational purposes only. Statements have not been evaluated by the FDA. Individual results may vary.</p>
                <p style="margin-top: 10px; font-size: 11px; opacity: 0.7;">
                    © 2025 Danilichev.info | All Rights Reserved
                </p>
            </div>
        </div>
    </footer>
    
    <style>
    .site-footer {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-top: 3px solid #10b981;
        margin-top: 60px;
        padding: 40px 0 0;
        color: #495057;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }
    
    .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        padding: 0 20px;
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
        margin-top: 30px;
        padding: 15px 0;
        text-align: center;
        border-top: 1px solid #dee2e6;
    }
    
    .footer-bottom p {
        margin: 0;
        color: #6c757d;
        font-size: 12px;
    }
    
    @media (max-width: 768px) {
        .footer-container {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 0 15px;
        }
        
        .site-footer {
            margin-top: 40px;
            padding: 30px 0 0;
        }
        
        .footer-section h3 {
            font-size: 16px;
        }
        
        .footer-section a {
            font-size: 13px;
        }
    }
    
    @media (max-width: 480px) {
        .footer-container {
            padding: 0 10px;
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
