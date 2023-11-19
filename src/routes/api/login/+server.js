export function GET({ url, cookies }) {
  const uid = url.searchParams.get("uid");

  cookies.set("uid", uid, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return new Response(JSON.stringify({ uid }));
}
