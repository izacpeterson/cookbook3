import { getRecipe } from "$lib/firebase.js";

export async function load({ params }) {
  const recipe = await getRecipe(params.id);
  return {
    id: params.id,
    recipe,
  };
}
