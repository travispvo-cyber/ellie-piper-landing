"""
Resize storybook images to uniform dimensions with padding.
Preserves original aspect ratio, adds soft background padding.
"""
from PIL import Image
import os

# Configuration
STORYBOOK_DIR = os.path.dirname(os.path.abspath(__file__))
TARGET_WIDTH = 1180
TARGET_HEIGHT = 800
BACKGROUND_COLOR = (253, 242, 245)  # Soft pink (#fdf2f5)

def resize_with_padding(img_path, target_w, target_h, bg_color):
    """Resize image to fit within target dimensions, add padding to center."""
    img = Image.open(img_path)
    orig_w, orig_h = img.size

    # Calculate scale to fit within target (maintain aspect ratio)
    scale = min(target_w / orig_w, target_h / orig_h)
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)

    # Resize the image
    img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Create new image with background color
    new_img = Image.new('RGB', (target_w, target_h), bg_color)

    # Calculate position to center the image
    x = (target_w - new_w) // 2
    y = (target_h - new_h) // 2

    # Paste resized image onto background
    if img_resized.mode == 'RGBA':
        new_img.paste(img_resized, (x, y), img_resized)
    else:
        new_img.paste(img_resized, (x, y))

    return new_img

def main():
    print(f"Resizing images to {TARGET_WIDTH}x{TARGET_HEIGHT}...")
    print(f"Background color: {BACKGROUND_COLOR}")
    print("-" * 50)

    # Process scene images (01-10), skip cover
    for i in range(1, 11):
        filename = f"scene-{i:02d}.png"
        filepath = os.path.join(STORYBOOK_DIR, filename)

        if not os.path.exists(filepath):
            print(f"  {filename}: NOT FOUND")
            continue

        # Get original size
        orig_size = Image.open(filepath).size

        # Resize and save
        resized = resize_with_padding(filepath, TARGET_WIDTH, TARGET_HEIGHT, BACKGROUND_COLOR)
        resized.save(filepath, 'PNG', optimize=True)

        print(f"  {filename}: {orig_size} -> {TARGET_WIDTH}x{TARGET_HEIGHT}")

    print("-" * 50)
    print("Done! All scene images are now uniform.")

if __name__ == "__main__":
    main()
