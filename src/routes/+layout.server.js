export async function load({ cookies }) {
  const uid = cookies.get("uid");

  return { uid };
}
