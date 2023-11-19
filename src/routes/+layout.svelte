<script>
  import "../app.css";
  import { signIn, currentUser } from "$lib/firebase.js";
  export let data;
</script>

{#if data.uid}
  <header class="flex items-center justify-between p-4 bg-primary text-primary-content">
    <a href="/">
      <h1 class="text-2xl">CookBook</h1>
    </a>
    {#if $currentUser}
      <button class="btn btn-secondary">{$currentUser.displayName.split(" ")[0]}</button>
    {:else}
      <button
        on:click={() => {
          signIn().then((user) => {
            console.log(user);
          });
        }}
        class="btn btn-secondary"
      >
        Sign in
      </button>
    {/if}
  </header>

  <slot />
{:else}
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold">Welcome to MyCookBook</h1>
        <p class="py-6">The modern way to save your favorite recipes</p>
        <button
          on:click={() => {
            signIn().then((user) => {
              console.log(user);
            });
          }}
          class="btn btn-primary">Sign in with Google</button
        >
      </div>
    </div>
  </div>
{/if}
