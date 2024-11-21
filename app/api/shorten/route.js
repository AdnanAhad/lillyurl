import dbConnect from "../../../utils/dbConnect";
import Url from "../../../models/Url";

export async function POST(req) {
  await dbConnect();

  const { originalUrl } = await req.json();

  const newUrl = new Url({ originalUrl });
  await newUrl.save();

  return new Response(JSON.stringify({ shortUrl: newUrl.shortUrl }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
