<script>
  import Header from "./Header.svelte";
  export let recipes;
</script>

<ul class="flex flex-col w-full justify-center items-center p-4">
  <Header>My Cookbook</Header>
  <!-- <h1 class="text-4xl">My Cookbook</h1> -->

  {#each recipes as recipe}
    <li class="m-4">
      <a href={`/recipe/${recipe.id}`} class="text-secondary underline">{recipe.title}</a>
    </li>
  {/each}
</ul>
