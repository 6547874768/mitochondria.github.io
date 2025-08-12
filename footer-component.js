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
        <!-- SEARCH BLOCK -->
        <div class="footer-search-section">
            <div class="footer-search-container">
                <h3>🔍 Search This Site</h3>
                <div class="search-box">
                    <form action="https://www.google.com/search" method="get" target="_blank" class="search-form">
                        <input type="hidden" name="sitesearch" value="danilichev.info">
                        <input type="text" name="q" placeholder="Search... e.g., testosterone, keto recipes, brain supplements" class="search-input" required>
                        <button type="submit" class="search-button">🔍 Search</button>
                    </form>
                </div>
                <p class="search-hint">Search powered by Google across all danilichev.info content</p>
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
                <h3>📤 Share & Connect</h3>
                <ul class="social-links">
                    <!-- Share buttons for current page -->
                    <li><a href="#" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'fb-share','width=550,height=450');return false;">📘 Share on Facebook</a></li>
                    <li><a href="#" onclick="window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title)+' - Great health info!','tw-share','width=550,height=450');return false;">🐦 Tweet This Page</a></li>
                    <li><a href="#" onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(location.href),'li-share','width=550,height=450');return false;">💼 Share on LinkedIn</a></li>
                    <li><a href="#" onclick="window.open('https://pinterest.com/pin/create/button/?url='+encodeURIComponent(location.href)+'&description='+encodeURIComponent(document.title),'pin-share','width=750,height=550');return false;">📌 Pin This</a></li>
                    <li><a href="javascript:window.print()">🖨️ Print/Save as PDF</a></li>
                    
                    <!-- Separator -->
                    <li style="border-top: 1px solid #dee2e6; padding-top: 10px; margin-top: 10px; font-weight: 600; color: #047857;">
                        Join Health Communities:
                    </li>
                    
                    <!-- Real communities relevant to your content -->
                    <li><a href="https://www.reddit.com/r/keto/" rel="nofollow noopener" target="_blank">🥑 r/Keto (2.9M members)</a></li>
                    <li><a href="https://www.reddit.com/r/Supplements/" rel="nofollow noopener" target="_blank">💊 r/Supplements (400k)</a></li>
                    <li><a href="https://www.reddit.com/r/fitness30plus/" rel="nofollow noopener" target="_blank">💪 r/Fitness30Plus</a></li>
                    <li><a href="https://www.reddit.com/r/Biohackers/" rel="nofollow noopener" target="_blank">🧬 r/Biohackers (450k)</a></li>
                </ul>
                <p style="font-size: 12px; color: #6c757d; margin-top: 15px; font-style: italic;">
                    Share our content & join 5M+ health enthusiasts
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
                    © 2025 Danilichev.info | All Rights Reserved | Powered by GitHub Pages & Cloudflare | 170+ Articles | 47 Affiliate Partners
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
    
    /* GLASS EFFECT SEARCH BLOCK */
    .footer-search-section {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 30px 0;
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-bottom: 2px solid rgba(16, 185, 129, 0.3);
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    }
    
    /* Water droplets effect */
    .footer-search-section::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 20% 80%, transparent 0%, transparent 50%, rgba(16, 185, 129, 0.05) 50%, rgba(16, 185, 129, 0.05) 52%, transparent 52%, transparent 100%),
                    radial-gradient(circle at 80% 20%, transparent 0%, transparent 50%, rgba(16, 185, 129, 0.05) 50%, rgba(16, 185, 129, 0.05) 52%, transparent 52%, transparent 100%),
                    radial-gradient(circle at 40% 40%, transparent 0%, transparent 50%, rgba(16, 185, 129, 0.05) 50%, rgba(16, 185, 129, 0.05) 52%, transparent 52%, transparent 100%);
        background-size: 100px 100px, 150px 150px, 200px 200px;
        animation: droplets 25s linear infinite;
        opacity: 0.4;
    }
    
    @keyframes droplets {
        0% { transform: translate(0, 0) rotate(0deg); }
        100% { transform: translate(30px, 30px) rotate(360deg); }
    }
    
    .footer-search-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
        text-align: center;
        position: relative;
        z-index: 1;
    }
    
    .footer-search-section h3 {
        color: #047857;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        background: rgba(255, 255, 255, 1);
    }
    
    .search-button {
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 50px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    }
    
    .search-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
    }
    
    .search-hint {
        color: rgba(4, 120, 87, 0.8);
        font-size: 14px;
        margin-top: 15px;
        font-style: italic;
    }
    
    /* FOOTER MAIN - 5 COLUMNS */
    .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
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
    
    /* Social links style */
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
    
    /* RESPONSIVE */
    @media (max-width: 1200px) {
        .footer-container {
            grid-template-columns: repeat(3, 1fr);
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
