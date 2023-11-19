import { getRecipes } from "../lib/firebase";

export async function load({ cookies }) {
  const uid = cookies.get("uid");
  const recipes = await getRecipes(uid);
  return { recipes };
}
