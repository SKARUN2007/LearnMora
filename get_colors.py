import sys
from PIL import Image
from collections import Counter

img = Image.open('/Users/skarunamuthan/LearnMora/public/logo.png').convert('RGB')
pixels = list(img.getdata())

# Filter out background/grays
colors = [p for p in pixels if not (p[0] > 240 and p[1] > 240 and p[2] > 240)]
colors = [p for p in colors if max(p) - min(p) > 20] # Must have some saturation

c = Counter(colors)
print("Most common colors:")
for color, count in c.most_common(10):
    hex_color = '#%02x%02x%02x' % color
    print(f"{hex_color}: {count}")

