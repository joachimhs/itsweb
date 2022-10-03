<script>
    import {currentPage, getFetchedPage, fetchPages} from "$lib/stores/PagesStore";
    import { page } from '$app/stores';

    import { onMount } from 'svelte';
    import SvelteMarkdown from "svelte-markdown";

    onMount(async () => {
        await fetchPages(false);
        await getFetchedPage($page.params.slug);
    });
</script>

{#if $currentPage}
    <div class="page-area">
        <h1>{$currentPage.title}</h1>
        <div class="page-content">
            <SvelteMarkdown source={$currentPage.markdown} />
        </div>
    </div>
{/if}

<style>

</style>