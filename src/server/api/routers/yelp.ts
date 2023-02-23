import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const API_URL = "https://api.yelp.com/v3/businesses/search?sort_by=best_match"

const DataShape = z.object({
    businesses: z.array(z.object({
        alias: z.string(),
        categories: z.array(z.object({
            alias: z.string(),
            title: z.string()
        })),
        coordinates: z.object({
            latitude: z.number(),
            longitude: z.number()
        }),
        display_phone: z.string(),
        distance: z.number(),
        id: z.string(),
        image_url: z.string().url(),
        is_closed: z.boolean(),
        location: z.object({
            address1: z.string().nullish(),
            address2: z.string().nullish(),
            address3: z.string().nullish(),
            city: z.string(),
            country: z.string(),
            display_address: z.array(z.string()),
            state: z.string(),
            zip_code: z.string(),
        }),
        name: z.string(),
        phone: z.string(),
        price: z.string(),
        rating: z.number(),
        review_count: z.number(),
        transactions: z.array(z.string()),
        url: z.string().url()
    }))
})

export const yelpRouter = createTRPCRouter({
    search : publicProcedure
        .input(z.object({
            cursor: z.number().nullish(),
            term: z.string(),
            radius: z.string(),
            price: z.string()
        }).and(z.discriminatedUnion("useCoords", [
            z.object({
                useCoords: z.literal(false),
                location: z.string()
            }),
            z.object({
                useCoords: z.literal(true),
                latitude: z.string(),
                longitude: z.string()
            })
        ])))
        .output(z.object({
                nextCursor: z.number().nullish(),
                data: DataShape
            })
        )
        .query(async ({ input }) => {

            const limit = 20
            const { cursor } = input

            let nextCursor: typeof cursor | undefined = cursor
    
            const locationString = input.useCoords 
                ? `latitude=${input.latitude}&longitude=${input.longitude}`
                : `location=${input.location}`
    
            const radiusInMeters = Math.floor(Number(input.radius) * 1609.344)
                
            const data = await fetch([
                API_URL,
                `term=${input.term}`,
                `radius=${radiusInMeters}`,
                `price=${input.price}`,
                locationString,
                `limit=${limit}`,
                `offset=${nextCursor ?? 0}`

            ].join("&"), {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.YELP_API_KEY}`
                }
            })
                .then(res => res.json())

            if (nextCursor) {
                nextCursor += limit
            } else {
                nextCursor = limit
            }

            return {
                data,
                nextCursor,
                // ...DataShape.safeParse(data)?.error.format()
            }
        })
});
