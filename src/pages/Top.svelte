<script lang="ts">
  import SeachImagesForm from '../components/SearchImagesForm.svelte'
  import { makeImagesStore, initVal } from '../store/pexels'

  let images = initVal();
  function updateUsers(data) {
    images = data;
    console.log('images', images)
  }

  let word: string = '';
  const emitChild = (event) => {
    word = event.detail.text

    let store = makeImagesStore(event.detail.text);
    store.subscribe(updateUsers);
  }

</script>

<main>
  <SeachImagesForm on:word={emitChild} />
  <div>{word}</div>
  {#if images.photos.length === 0}
    該当する写真がありません。
  {/if}
  {#each images.photos as image}
    <img src={image.src.small} alt="img" />
  {/each}
</main>

<style>
</style>