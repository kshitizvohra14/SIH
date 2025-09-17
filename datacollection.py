from icrawler.builtin import GoogleImageCrawler

breeds = [
    "banni buffalo",
    "bhadwari buffalo",
    "dharwadi buffalo",
    "jafarabadi buffalo",
    "amritmahal cow",
]

for breed in breeds:
    folder = f'images/{breed.replace(" ", "_")}'
    google_crawler = GoogleImageCrawler(storage={'root_dir': folder})
    google_crawler.crawl(keyword=breed, max_num=200)
    print(f"Downloaded 200 images of {breed}")
