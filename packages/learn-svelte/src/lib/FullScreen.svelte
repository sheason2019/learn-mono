<script lang="ts">
  export let backgroundColor = null;
  export let Title = "";
</script>

<div
  class="fullscreen"
  style={"background: " + backgroundColor}
>
  {Title}
</div>

<style>
  .fullscreen {
    widows: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
  }
</style>
