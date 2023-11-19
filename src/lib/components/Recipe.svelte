<script>
  export let recipe;

  console.log(recipe);
</script>

<div class="flex flex-col p-2">
  <div class="flex flex-col items-center">
    <h1 class="text-2xl text-center">{recipe.title}</h1>
    <p class="italic p-2">{recipe.description}</p>
  </div>
  <div class="lg:flex justify-evenly">
    <div class="lg:w-1/3">
      <h2 class="text-xl underline">Ingredients</h2>
      <ul class="p-4">
        {#each recipe.ingredients as ingredient}
          <li class="list-disc">{ingredient}</li>
        {/each}
      </ul>
    </div>
    <div class="lg:w-1/3">
      <h2 class="text-xl underline">Instructions</h2>
      <ol class="p-4">
        {#each recipe.instructions as instruction}
          <li class="list-decimal py-2">{instruction}</li>
        {/each}
      </ol>
    </div>
  </div>
  <!-- <div>
    <ul class="flex justify-evenly">
      {#each recipe.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>
  </div> -->
</div>
