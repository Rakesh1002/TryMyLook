import requests
import os
from urllib.parse import urljoin
import concurrent.futures

def download_file(url, output_dir):
    try:
        filename = url.split('/')[-1]
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200 and response.headers.get('content-type', '').startswith('image/'):
            output_path = os.path.join(output_dir, filename)
            with open(output_path, 'wb') as f:
                f.write(response.content)
            print(f"✓ Downloaded: {filename}")
            return True
        return False
    except Exception as e:
        print(f"✗ Error with {url}: {str(e)}")
        return False

def discover_and_download():
    base_url = "https://s15-def.ap4r.com/bs2/upload-ylab-stunt-sgp/kling/tryon/model/v4/"
    output_dir = "downloaded_images/models/male"
    os.makedirs(output_dir, exist_ok=True)

    # Common image extensions and prefixes to try
    extensions = ['.png', '.jpg', '.jpeg', '.webp']
    prefixes = ['','男模特',]
    
    # Generate possible URLs
    urls_to_try = []
    
    # Try simple numbered files
    for i in range(1, 50):  # Adjust range as needed
        for ext in extensions:
            for prefix in prefixes:
                filename = f"{prefix}{i}{ext}"
                urls_to_try.append(urljoin(base_url, filename))
    
    # Try month-based naming
    months = range(1, 13)
    for month in months:
        for day in range(1, 32):
            for ext in extensions:
                filename = f"{month:02d}{day:02d}{ext}"
                urls_to_try.append(urljoin(base_url, filename))
    
    print(f"Attempting to discover files...")
    
    # Use ThreadPoolExecutor for parallel downloads
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(download_file, url, output_dir) for url in urls_to_try]
        concurrent.futures.wait(futures)
    
    print("\nDownload attempts completed!")
    
    # Count successful downloads
    successful = sum(1 for f in futures if f.result())
    print(f"\nSuccessfully downloaded {successful} files to {output_dir}/")

if __name__ == "__main__":
    discover_and_download()
