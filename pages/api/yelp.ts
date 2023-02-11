// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const milesToMeters = (miles: number) => miles * 1609

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { location, category, range, price  } = req.query

  await fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=${category}&radius=${milesToMeters(Number(range))}&price=${price}&limit=50`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${process.env.API_KEY}`
    }
  })
    .then(res => res.json())
    .then(data => res.send(data))
}
