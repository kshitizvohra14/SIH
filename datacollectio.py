import requests
import os
import time

# Replace with your Pixabay API key
API_KEY = "45140451-f63f32d47ad0fa9a55444b5ee"

# List of breeds
breed_list = [
    'Banni buffalo', 'Bhadawari buffalo', 'Chhattisgarhi buffalo', 'Chilika buffalo',
    'Dharwadi buffalo', 'Gojri buffalo', 'Jaffarabadi buffalo', 'Kalahandi buffalo',
    'Luit (Swamp) buffalo', 'Manda buffalo', 'Marathwadi buffalo', 'Mehsana buffalo',
    'Murrah buffalo', 'Nagpuri buffalo', 'Nili-Ravi buffalo', 'Pandharpuri buffalo',
    'Surti buffalo', 'Toda buffalo',
    'Alambadi cow', 'Amrit Mahal cow', 'Bachaur cow', 'Badri cow', 'Bargur cow',
    'Binjharpuri cow', 'Dangi cow', 'Deoni cow', 'Devni (Deoni-type local) cow',
    'Gangatiri cow', 'Gaolao cow', 'Ghumusari cow', 'Gir cow', 'Gujamavu cow',
    'Hallikar cow', 'Hariana cow', 'Kangayam cow', 'Kankrej cow', 'Kasaragod cow',
    'Khasi cow', 'Kherigarh cow', 'Khillar cow', 'Kosali cow', 'Krishna Valley cow',
    'Krishnagiri cow', 'Ladakhi cow', 'Malvi cow', 'Manapari cow', 'Mewati cow',
    'Motu cow', 'Nagori cow', 'Nimari cow', 'Ongole cow', 'Ponwar cow', 'Pulikulam cow',
    'Punganur cow', 'Purnea cow', 'Rathi cow', 'Red Sindhi cow', 'Sahiwal cow',
    'Siri cow', 'Sunandini cow', 'Tarai cow', 'Tharparkar cow', 'Umblachery cow', 'Vechur cow'
]

images_per_breed = 8
base_dir = "breed_images"
os.makedirs(base_dir, exist_ok=True)

def download_image(url, path):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        with open(path, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

total_downloaded = 0

for breed in breed_list:
    breed_folder = os.path.join(base_dir, breed.replace(' ', '_').replace('(', '').replace(')', ''))
    os.makedirs(breed_folder, exist_ok=True)
    print(f"Downloading images for {breed}...")

    # Pixabay API request
    url = f"https://pixabay.com/api/?key={API_KEY}&q={breed.replace(' ', '+')}&image_type=photo&per_page={images_per_breed}"
    data = requests.get(url).json()

    for i, img in enumerate(data.get('hits', [])):
        img_url = img['webformatURL']
        image_path = os.path.join(breed_folder, f"{breed.replace(' ', '_')}_{i+1}.jpg")
        if download_image(img_url, image_path):
            total_downloaded += 1
        time.sleep(0.5)  # polite delay

print(f"Downloaded {total_downloaded} images successfully!")
