<script>
  import { addRecipe, currentUser } from "$lib/firebase.js";

  let title = "";
  let description = "";
  let ingredients = [];
  let newIngredient = "";
  let instructions = [];
  let newInstruction = "";
  let tags = "";
</script>

<form
  on:submit|preventDefault={() => {
    console.log("submit");
    addRecipe({
      title,
      description,
      ingredients,
      instructions,
      tags: tags.split(",").map((tag) => tag.trim()),
      user: $currentUser.uid,
    });
  }}
  class="flex flex-col gap-4 p-4"
>
  <h1>New Recipe</h1>

  <div class="form-control w-full max-w-xs">
    <lablel class="label">
      <h2 class="label-text">Title</h2>
    </lablel>
    <input type="text" bind:value={title} placeholder="title" class="input input-bordered w-full" />
  </div>

  <div class="form-control w-full max-w-xs">
    <lablel class="label">
      <h2 class="label-text">Description</h2>
    </lablel>
    <input type="text" bind:value={description} placeholder="description" class="input input-bordered w-full" />
  </div>

  <div class="form-control w-full max-w-xs">
    <lablel class="label">
      <h2 class="label-text">Ingredients</h2>
    </lablel>
    <ul>
      {#each ingredients as ingredient}
        <li>{ingredient}</li>
      {/each}
    </ul>
    <div>
      <input type="text" placeholder="Add ingredient" bind:value={newIngredient} class="input input-bordered" />
      <button
        type="button"
        on:click={() => {
          ingredients = [...ingredients, newIngredient];
          newIngredient = "";
        }}
        class="btn btn-secondary btn-circle"
      >
        add
      </button>
    </div>
  </div>

  <div class="form-control w-full max-w-xs">
    <lablel class="label">
      <h2 class="label-text">Instructions</h2>
    </lablel>
    <ol>
      {#each instructions as instruction}
        <li>{instruction}</li>
      {/each}
    </ol>
    <div>
      <input type="text" placeholder="Add instruction" bind:value={newInstruction} class="input input-bordered" />
      <button
        type="button"
        on:click={() => {
          instructions = [...instructions, newInstruction];
          newInstruction = "";
        }}
        class="btn btn-secondary btn-circle">add</button
      >
    </div>
  </div>

  <div>
    <lablel class="label">
      <h2 class="label-text">Tags</h2>
    </lablel>
    <input type="text" bind:value={tags} placeholder="Seperate by comma. Ex. Dessert, pie, apple" class="input input-bordered w-full" />
  </div>

  <button type="submit" class="btn btn-primary">Add Recipe</button>
</form>
