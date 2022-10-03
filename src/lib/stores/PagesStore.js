import { writable, get } from 'svelte/store';

export let pages = writable();
export let currentPage = writable();
let pagesFetched = false;

export async function fetchPages(refetch) {
    if (refetch === true) {
        pagesFetched = false;
    }

    if (!pagesFetched) {
        pagesFetched = true;
        const rawResponse = await fetch('/api/pages.json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let content = await rawResponse.json();

        for (let index = 0; index < content.pages.length; index++) {
            let section = content.pages[index];

            let md = await fetchMarkdown(section.contentMarkdown);

            if (md) {
                section.markdown = md;
            }
        }

        console.log("setting pages");
        pages.set(content.pages);
    }
}

export async function getFetchedPage(pageId) {
    console.log("getting page: " + pageId);
    let fetchedPages = get(pages);

    for (let index = 0; index < fetchedPages.length; index++) {
        if (fetchedPages[index].id === pageId) {
            currentPage.set(fetchedPages[index]);
        }
    }
}

async function fetchMarkdown(filename) {
    let mdContent = null;

    if (filename) {
        const rawResponse = await fetch('/markdown/' + filename, {
            method: 'GET',
            headers: {
                'Accept': 'application/text',
                'Content-Type': 'application/text'
            }
        });

        mdContent = await rawResponse.text();
    }

    return mdContent;
}