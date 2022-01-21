<script lang="ts">
  import FullScreen from "./lib/FullScreen.svelte";
  import { onMount } from "svelte";

  let container: HTMLDivElement;
  let lastStamp = 0;
  const timeout = 1000;
  let offset = 0;
  onMount(() => {
    document.addEventListener("mousewheel", (e: WheelEvent) => {
      const thisStamp = Date.now();
      const height = window.innerHeight;
      if (thisStamp - lastStamp > timeout && e.deltaY > 15 && offset < 3) {
        offset++;
        container.scrollTo({
          top: offset * height,
          behavior: 'smooth',
        })
        lastStamp = thisStamp;
      } else if (thisStamp - lastStamp > timeout && e.deltaY < -15 && offset > 0) {
        offset--;
        container.scrollTo({
          top: offset * height,
          behavior: 'smooth',
        })
        lastStamp = thisStamp;
      }
    })
    let start = null;
    container.addEventListener("touchstart", (e: TouchEvent) => {
      if (start === null) {
        start = e.changedTouches[0].clientY;
      }
    });
    container.addEventListener("touchend", (e: TouchEvent) => {
      const thisStamp = Date.now();
      const height = window.innerHeight;
      const clientY = e.changedTouches[0].clientY
      if (thisStamp - lastStamp > timeout && start - clientY > 150 && offset < 3) {
        offset++;
        container.scrollTo({
          top: offset * height,
          behavior: 'smooth',
        })
        lastStamp = thisStamp;
      } else if (thisStamp - lastStamp > timeout && start - clientY < -150 && offset > 0) {
        offset--;
        container.scrollTo({
          top: offset * height,
          behavior: 'smooth',
        })
        lastStamp = thisStamp;
      }
    })
  });
</script>

<div>
  <!-- <Counter /> -->
  <!-- <Rxjs /> -->
  <div bind:this={container} class="container">
    <FullScreen Title="Full Screen 1" backgroundColor="skyblue" />
    <FullScreen Title="Full Screen 2" backgroundColor="pink" />
    <FullScreen Title="Full Screen 3" backgroundColor="gold" />
  </div>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  .container {
    overflow: hidden;
    height: 100vh;
  }
</style>
