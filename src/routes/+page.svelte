<script>
  import NewRecipe from "$lib/components/NewRecipe.svelte";
  import RecipeList from "$lib/components/RecipeList.svelte";

  export let data;
</script>

<!-- <NewRecipe /> -->

<RecipeList recipes={data.recipes} />

<div class="flex fixed w-full p-4 bottom-0">
  <a href="/new" class="btn btn-primary w-full max-w-48">New Recipe</a>
</div>
