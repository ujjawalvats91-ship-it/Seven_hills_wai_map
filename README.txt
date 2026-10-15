Seven Hills Wai - landing page
==============================
index.html        page structure (HTML)
css/style.css     all styles
js/script.js      all scripts (hero video scrub, carousel, map, amenities, forms...)
images/map.jpg    satellite map used in the Location section

How to use
- Open index.html in a browser, or upload the whole folder to your hosting.
- Keep the folder structure as it is.
- GSAP animations load from the cdnjs link inside index.html (needs internet).

Things you fill in
- Hero video:  index.html  -> <video id="scrub-video" src="...">
- Plot card photos (Investment Options): index.html -> <img src="" ...> inside each .iv-thumb
- Typeform link for the arrow buttons: js/script.js -> TYPEFORM_URL
- Other section photos referenced in css/style.css (hills.jpg, pool.jpg, gym.jpg, waterfall.jpg ...):
  put those image files in the images/ folder and update the url('...') paths to images/<name>.jpg
