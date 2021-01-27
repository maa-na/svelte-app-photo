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
  {word}
  {#each images.photos as image}
    <p>{image}</p>
    <img src={image.src.small} alt="img" />
  {/each}
</main>

<style>
</style>