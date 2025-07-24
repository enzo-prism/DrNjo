#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Create image
width, height = 1200, 630
img = Image.new('RGBA', (width, height), (255, 255, 255, 255))
draw = ImageDraw.Draw(img)

# Create rainbow gradient
for y in range(height):
    for x in range(width):
        # Create rainbow gradient effect
        progress_x = x / width
        progress_y = y / height
        progress = (progress_x + progress_y) / 2
        
        if progress < 0.15:
            r, g, b = int(255 * (1 - progress/0.15) + 254 * (progress/0.15)), int(154 * (1 - progress/0.15) + 207 * (progress/0.15)), int(158 * (1 - progress/0.15) + 239 * (progress/0.15))
        elif progress < 0.30:
            r, g, b = 254, 207, 239
        elif progress < 0.45:
            r, g, b = int(254 * (1 - (progress-0.30)/0.15) + 168 * ((progress-0.30)/0.15)), int(207 * (1 - (progress-0.30)/0.15) + 237 * ((progress-0.30)/0.15)), int(239 * (1 - (progress-0.30)/0.15) + 234 * ((progress-0.30)/0.15))
        elif progress < 0.60:
            r, g, b = int(168 * (1 - (progress-0.45)/0.15) + 254 * ((progress-0.45)/0.15)), int(237 * (1 - (progress-0.45)/0.15) + 214 * ((progress-0.45)/0.15)), int(234 * (1 - (progress-0.45)/0.15) + 227 * ((progress-0.45)/0.15))
        elif progress < 0.75:
            r, g, b = int(254 * (1 - (progress-0.60)/0.15) + 210 * ((progress-0.60)/0.15)), int(214 * (1 - (progress-0.60)/0.15) + 153 * ((progress-0.60)/0.15)), int(227 * (1 - (progress-0.60)/0.15) + 194 * ((progress-0.60)/0.15))
        elif progress < 0.90:
            r, g, b = int(210 * (1 - (progress-0.75)/0.15) + 250 * ((progress-0.75)/0.15)), int(153 * (1 - (progress-0.75)/0.15) + 208 * ((progress-0.75)/0.15)), int(194 * (1 - (progress-0.75)/0.15) + 196 * ((progress-0.75)/0.15))
        else:
            r, g, b = int(250 * (1 - (progress-0.90)/0.10) + 255 * ((progress-0.90)/0.10)), int(208 * (1 - (progress-0.90)/0.10) + 209 * ((progress-0.90)/0.10)), int(196 * (1 - (progress-0.90)/0.10) + 255 * ((progress-0.90)/0.10))
        
        # Apply low opacity
        alpha = int(255 * 0.3)
        draw.point((x, y), (r, g, b, alpha))

# Overlay white gradient for fade effect
overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
overlay_draw = ImageDraw.Draw(overlay)
for y in range(height):
    for x in range(width):
        progress = (x + y) / (width + height)
        alpha = int(255 * (0.8 + 0.1 * progress))
        overlay_draw.point((x, y), (255, 255, 255, alpha))

img = Image.alpha_composite(img, overlay)

# Convert to RGB for final image
final_img = Image.new('RGB', (width, height), (255, 255, 255))
final_img.paste(img, (0, 0), img)

# Save
final_img.save('client/public/og-image.png', 'PNG', optimize=True)
print("OpenGraph image created successfully!")