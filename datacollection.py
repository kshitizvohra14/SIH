from icrawler.builtin import GoogleImageCrawler

breeds = [
    "Gir cow",
    "Sahiwal cow",
    "Murrah buffalo",
    "Tharparkar cow",
    "Red Sindhi cow"
]

for breed in breeds:
    folder = f'images/{breed.replace(" ", "_")}'
    google_crawler = GoogleImageCrawler(storage={'root_dir': folder})
    google_crawler.crawl(keyword=breed, max_num=200)
    print(f"Downloaded 200 images of {breed}")
