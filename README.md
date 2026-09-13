# 🍏 Green Apple Holidays — Website

A responsive, interactive multi-page website for **Green Apple Holidays** (tourist bus / tempo-traveller & car rentals, Taliparamba · Kannur, Kerala).

## Pages
| File | Page |
|------|------|
| `index.html` | Home — hero, features, featured fleet, packages, reviews |
| `fleet.html` | Full fleet with live category filter |
| `packages.html` | Tour packages + "how it works" |
| `gallery.html` | Photo gallery with lightbox |
| `contact.html` | Booking form with **live fare estimate** → WhatsApp |

## Interactive features
- Sticky/transparent navbar, animated mobile menu
- Scroll-reveal animations & animated stat counters
- Fleet filter chips (Coaches / Travellers / Cars)
- Gallery lightbox (click, arrow keys, Esc)
- Booking form that calculates an estimate and opens a pre-filled WhatsApp message
- Floating WhatsApp button, click-to-call links, Google Map embed

## ▶️ Run it
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000
```
Then visit http://localhost:8000

## 🖼 Photos
Real photos from the Instagram page are included in `assets/` (`post-01.jpg` … `post-12.jpg`)
and already wired into the hero, fleet cards and gallery via `js/data.js`.

Current mapping:
- **Hero** → `post-08.jpg` (coaches lined up) — set in `index.html`
- **Fleet** (`FLEET` array): Zed One → 02 · Boss → 08 · TT-17 → 03 · TT-14 → 06 · 7-Seater → 07 · Luxury Coach → 11
- **Gallery** (`GALLERY` array): 02, 07, 08, 03, 12, 10, 06, 04, 05

To swap or add a photo: drop a file in `assets/`, then set the `photo:` field on the
matching item in `js/data.js` (e.g. `photo: "assets/my-bus.jpg"`). Leave `photo: ""`
to fall back to the built-in SVG illustration. Packages use themed gradients by design —
add a `photo:` to any `PACKAGES` item to use an image instead.

> Note: `post-01.jpg` and `post-09.jpg` are dark video frames and aren't used.
> Instagram serves images at ~640px; re-export from the originals if you want sharper cards.

## ✏️ Edit content
All text/pricing/phone numbers live in `js/data.js` and the HTML files.
Change the WhatsApp number in `js/main.js` (`WHATSAPP` constant).

## Business details used
- 📍 Taliparamba, Kannur, Kerala
- 📞 99474 38291 · 62822 04639
- 📸 instagram.com/greenapple__holidays_official
- Fleet named from the profile: Zed One, Boss, 7 / 14 / 17 seater
