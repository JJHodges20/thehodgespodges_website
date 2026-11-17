# TheHodgesPodges

The home base for build-and-upgrade planners across hobbies. Each hobby gets its own app; this site is where people find them. The first app is the **RC Crawler Build Lab** (`../rc-crawler-hobbyist`), which is still being built.

For now the site is a plain local HTML site: no build step, no server code, no tracking.

## Open it

Double-clicking `index.html` works, but fonts and the hobby drawers behave best when served. From this folder:

```powershell
py -m http.server 8590 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8590>.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page: hero, parts cabinet of hobbies, apps, about |
| `js/catalog.js` | **The list of hobbies and apps.** Edit this to add a hobby or launch an app |
| `js/cabinet.js` | Draws a drawer per hobby and the "Next on the bench" list from the catalog |
| `css/styles.css` | All styling (palette and type at the top) |
| `assets/favicon.svg` | Hex-nut mark |

## Add a hobby

Add an entry to `js/catalog.js`. The cabinet grows a row by itself and always keeps one empty drawer for the next hobby. Hobbies appear in the order of the list (RC crawlers first, then the 2026-11-17 opportunity ranking).

## When the RC Crawler Build Lab launches

1. In `js/catalog.js`, set the `rc-crawlers` entry's `status` to `"live"` and `app.url` to the app's address. The drawer then shows **Open now** and a button to the app.
2. In `index.html`, change the RC Crawler Build Lab card in the Apps section: the tag to `Open now` (class `tag-live`), and replace the "Not open to the public yet" line with a link to the app.

The app itself stays its own project; this site only links to it.

## Later

- **Hosting:** the site is static, so any static host works once it is ready to go public.
- **Affiliate programs:** the business goal is several affiliate programs per hobby, after each hobby's app is built and usable by real hobbyists. Nothing on the site links to retailers yet.
