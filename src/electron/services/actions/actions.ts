import { shell } from 'electron';

/**
 * Opens given URL in OS default browser.
 *
 * @param url the URL to open
 */
function openInBrowser(url: string): void {
    shell.openExternal(url);
}

export { openInBrowser };
