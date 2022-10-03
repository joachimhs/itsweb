import { writable, get } from 'svelte/store';

export let frontSections = writable();
let frontSectionsFetched = false;

export async function fetchFrontSections(refetch) {
    if (refetch === true) {
        frontSectionsFetched = false;
    }

    if (!frontSectionsFetched) {
        frontSectionsFetched = true;
        const rawResponse = await fetch('/api/front-sections.json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let content = await rawResponse.json();

        for (let index = 0; index < content.frontSections.length; index++) {
            let section = content.frontSections[index];

            let md = await fetchMarkdown(section.contentMarkdown);

            if (md) {
                section.markdown = md;
            }
        }

        frontSections.set(content.frontSections);
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