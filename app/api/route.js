export async function POST(req) {
  // Parse the JSON body from the request
  const body = await req.json();
  let output = "";

  // Log the received data (just for testing purposes)
  console.log('Received data:', body);

  try {
      const response = await fetch(body.Input, {
          method: 'HEAD',
          redirect: 'follow'
      });
      output = response.url;
  } catch (err) {
      console.error(err);
      return new Response(
          JSON.stringify({ error: "Error occurred while fetching the URL." }),
          { status: 500 }
      );
  }

  return new Response(
      JSON.stringify({ 
          message: 'Your destination link is', 
          Output: output, 
          ok: output 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
