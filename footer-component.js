// Check if footer should be shown on current page
function shouldShowFooter() {
    const currentPath = window.location.pathname;
    
    // Pages WITHOUT footer (main + 5 categories)
    const excludedPages = [
        '/',
        '/health-supplements/',
        '/health-products/', 
        '/anti-aging-hacks/',
        '/brain-supplements/',
        '/weight-loss-supplements/'
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
                    <li><a href="/anti-aging-hacks/">⚡ Anti-Aging Hacks</a></li>
                    <li><a href="/weight-loss-supplements/">🏃 Weight Loss Supplements</a></li>
                    <li><a href="/health-products/">🛡️ Health Products</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>🔥 Popular Articles</h3>
                <ul>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <li><a href="/womens-energy-decline-menopause/">⚡ Women's Energy Decline Menopause: Complete Recovery Guide</a></li>
                    <li><a href="/why-always-tired-after-40/">⚡ Why Am I Always Tired After 40? The Real Reasons & Solutions</a></li>
                    <li><a href="/what-is-the-keto-diet-for-people-over-50/">What Is The Keto Diet For People Over 50: Complete Age-Speci</a></li>
                    <li><a href="/the-keto-snacks-cookbook/">The Keto Snacks Cookbook: 50+ Quick & Easy Low-Carb Recipes</a></li>
                    <li><a href="/the-keto-diet-for-fat-burning/">The Keto Diet For Fat Burning: Complete Science-Based Guide</a></li>
                    <li><a href="/natural-energy-restoration-methods/">⚡ Natural Energy Restoration Methods: The Complete Guide to Re</a></li>
                    <li><a href="/nad-decline-after-40-effects/">🔬 NAD Decline After 40: Effects on Health and Aging</a></li>
                    <li><a href="/the-essential-keto-cookbook/">The Essential Keto Cookbook: Complete Recipe Collection for </a></li>
                    <li><a href="/reducing-inflammation-with-keto/">Reducing Inflammation with Keto: Complete Science-Based Anti</a></li>
                    <li><a href="/mitochondrial-supplements-research/">Mitochondrial Supplements Research: The Science-Backed Guide</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>ℹ️ Information</h3>
                <div class="footer-info">
                    <p><strong>© 2025 Health Supplements Hub</strong></p>
                    <p>🎯 Science-backed health solutions for life after 40</p>
                    <p>⚠️ Information does not replace medical consultation</p>
                    <p>🤝 Affiliate links: DigitalStore24</p>
                    <p>📊 Analytics: Google Analytics + Microsoft Clarity</p>
                    <p class="footer-note">Always consult your healthcare provider before starting any supplement regimen</p>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-container">
                <p>This website is for informational purposes only. Individual results may vary. Consult your doctor before use.</p>
            </div>
        </div>
    </footer>
    
    <style>
    .site-footer {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-top: 3px solid #007bff;
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
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 40px;
        padding: 0 20px;
    }
    
    .footer-section h3 {
        color: #212529;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        border-bottom: 2px solid #007bff;
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
        margin-bottom: 12px;
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
        font-size: 15px;
        line-height: 1.4;
    }
    
    .footer-section a:hover {
        color: #007bff;
        text-decoration: underline;
        transform: scale(1.02);
    }
    
    .footer-info p {
        margin: 10px 0;
        line-height: 1.6;
        font-size: 14px;
    }
    
    .footer-info .footer-note {
        font-style: italic;
        color: #6c757d;
        font-size: 13px;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #dee2e6;
    }
    
    .footer-bottom {
        background: rgba(0,123,255,0.1);
        margin-top: 30px;
        padding: 15px 0;
        text-align: center;
        border-top: 1px solid #dee2e6;
    }
    
    .footer-bottom p {
        margin: 0;
        color: #6c757d;
        font-size: 13px;
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
            font-size: 14px;
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
