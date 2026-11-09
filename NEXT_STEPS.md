# Remaining work

- Verify review persistence after a page reload and backend restart.
- Verify reviewing one restroom does not change another restroom's reviews.
- Test review validation, failed saves and retries, and duplicate-click prevention in the running application.
- Check review popup keyboard use and mobile layout.
- Decide how submitted review tags appear in restroom details. They currently stay inside individual reviews; existing restroom tags remain unchanged.
- Review and bring over the About page changes from origin/aboutNewTest, including required styles and assets.
- Add a Google Maps directions link using the selected restroom's coordinates.
- Finish restroom details, including showing the address in the map popup and the agreed tag display.
- Check the overall mobile layout.
- Add basic setup documentation and a credential-free .env example.

Failed or empty initial API response messages remain deferred by the user.

Reviews are anonymous, accept integer ratings from 1 to 5, and have optional predefined tags. No login or free-text comments are planned.

Keep code simple and beginner-friendly. Guide with small snippets unless the user explicitly asks for edits. Preserve the current toilet rating images and fractional outlines. Do not add comments to application code unless requested.
