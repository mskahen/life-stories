# Tell Me a Story

Daily question page with a red Record button. Recordings are saved to a Google Drive folder called "Mom's Stories".

## Files
- `index.html` - the page (host on GitHub Pages)
- `apps-script/Code.gs` - receives recordings and saves them to Drive

## Setup
1. Go to script.google.com, click New project, and paste in `apps-script/Code.gs`.
2. Run the `authorize` function once and approve Drive access.
3. Deploy > New deployment > type Web app. Execute as: Me. Who has access: Anyone. Copy the Web app URL.
4. Put that URL in `UPLOAD_URL` near the top of the script in `index.html`.
5. Publish `index.html` with GitHub Pages and send the link to Mom.

## Changing the start date
`START` in `index.html` sets Day 1.
