import os

GA4_CODE = '''    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HMDTQL1LWD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HMDTQL1LWD');
</script>'''

def process_html_file(file_path):
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old GA4 code first
        if 'GA_MEASUREMENT_ID' in content:
            print(f"  Removing old GA4 template code")
            lines = content.split('\n')
            new_lines = []
            skip_lines = False
            
            for line in lines:
                if '<!-- Google tag (gtag.js) -->' in line:
                    skip_lines = True
                    continue
                elif skip_lines and '</script>' in line:
                    skip_lines = False
                    continue
                elif not skip_lines:
                    new_lines.append(line)
            
            content = '\n'.join(new_lines)
        
        if 'gtag' in content and 'G-HMDTQL1LWD' in content:
            print(f"  GA4 already exists with correct ID, skipping")
            return False
        
        if '</head>' not in content:
            print(f"  No </head> tag found")
            return False
        
        new_content = content.replace('</head>', f'{GA4_CODE}\n</head>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  GA4 tracking added successfully")
        return True
        
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    print("Adding GA4 tracking code to all HTML pages...")
    
    updated_files = []
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                
                if process_html_file(file_path):
                    updated_files.append(file_path)
    
    print(f"Total files updated: {len(updated_files)}")
    
    if updated_files:
        print(f"Updated files:")
        for file_path in updated_files:
            print(f"  - {file_path}")

if __name__ == "__main__":
    main()
