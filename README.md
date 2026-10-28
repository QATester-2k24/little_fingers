# Little Learners

Five toddler games in one app: ABC Fun, Fruit Fun, Counting Stars, My Body, Colors.
No frameworks, no image downloads - everything is drawn in code, so it loads instantly.

## Put it online (GitHub Pages)
1. Create a new GitHub repo and upload everything in this folder (keep the `assets` folder).
2. Repo -> Settings -> Pages -> Source: "Deploy from a branch" -> `main` / root -> Save.
3. Open `https://YOUR-USERNAME.github.io/YOUR-REPO/` on your laptop, iPad or phone.

## Install like an app
- iPad/iPhone (Safari): Share -> Add to Home Screen
- Android (Chrome): menu -> Install app

After the first visit it works offline.

## Your ABC background
Save your background picture as `assets/abc-bg.jpg` (JPG, ideally under 400 KB, about 1600x900).
Until then the ABC screen shows a sunny sky-and-meadow background.
Tip: the `blob:` link from ChatGPT only works in your own browser tab, so download the image first.

## Fruit Fun look
To match your reference style, save its fruit pictures into `assets/` and swap the emoji in the `FR` list in `index.html`.

## Offline
Open the site once while online. A green "Saved! Works without internet now" message appears, and after that every game works with no internet.
On iPad/iPhone, use Share -> Add to Home Screen so it opens like an app.
When you upload a new version to GitHub, open it once while online and it updates itself.

## Child lock
Open a game and hold the lock button (top-right) for 1.5 seconds. The child is stuck in that game (no Home button, Back/refresh blocked, screen stays on, full screen).
Hold the unlock button for 2 seconds and answer the sum to unlock.
A website can't block the device's own buttons. For a full lock use Guided Access (iPad/iPhone), App pinning (Android) or F11/--kiosk (Chrome laptop).
