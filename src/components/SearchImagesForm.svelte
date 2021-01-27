<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const emitWord = () => {
    dispatch('word', {
      text: searchWord
    });
  }
  
  export let searchWord: string;
</script>

<main>
  <input type="text" bind:value={searchWord} />
  <button on:click={emitWord}>Search</button>
</main>

<style>
</style>
