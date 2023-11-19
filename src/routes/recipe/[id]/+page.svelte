<script>
  import Recipe from "$lib/components/Recipe.svelte";

  export let data;

  let recipe = data.recipe;
</script>

<Recipe {recipe} />
