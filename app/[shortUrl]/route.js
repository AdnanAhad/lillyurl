import dbConnect from "../../utils/dbConnect";
import Url from "../../models/Url";

export async function GET(req, { params }) {
  const { shortUrl } = params;

  await dbConnect();

  console.log(`Looking for short URL: ${shortUrl}`);

  const urlEntry = await Url.findOne({ shortUrl });

  if (urlEntry) {
    console.log(`Found original URL: ${urlEntry.originalUrl}`);
    return Response.redirect(urlEntry.originalUrl, 302);
  } else {
    console.log("Short URL not found.");
    return new Response(JSON.stringify({ message: "Not Found" }), {
      status: 404,
    });
  }
}
