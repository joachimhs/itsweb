<script>
    import {frontSections, fetchFrontSections} from "$lib/stores/FrontSectionsStore";
    import SvelteMarkdown from 'svelte-markdown'

    import { afterUpdate, onMount } from 'svelte';

    onMount(async () => {
        await fetchFrontSections(true);
    });

</script>

{#if $frontSections}
    {#each $frontSections as frontSection}
        {#if frontSection.type === 'main-section'}
            <section class="main-section">
                <h1>{frontSection.title}</h1>

                <SvelteMarkdown source={frontSection.markdown} />
            </section>
        {/if}
        {#if frontSection.type === 'image-separator'}
            <section class="image-section">
                <img src={frontSection.image} />
            </section>
        {/if}
    {/each}
{/if}