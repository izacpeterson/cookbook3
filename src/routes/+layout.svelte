<script>
  import "../app.css";
  import { signIn, currentUser } from "$lib/firebase.js";
  import { onMount } from "svelte";
  export let data;

  onMount(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  });
</script>

{#if data.uid}
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
