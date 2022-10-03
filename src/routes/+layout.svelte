<script>
    import '../app.css';
    import {fetchPages} from "$lib/stores/PagesStore";
    import { onMount } from 'svelte';

    export const prerender = true;

    onMount(async () => {
        await fetchPages(true);
    });
</script>

<header>
    <a href="/">
        <div class="header-logo"></div>
    </a>
</header>

<slot></slot>