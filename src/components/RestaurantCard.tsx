import React from "react"

import { type RouterOutput } from "../pages/api/trpc/[trpc]"

import {
    Box
} from "@mui/material"

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export default function RestaurantCard({
    data
}: { data: ArrayElement<RouterOutput["yelp"]["search"]["data"]["businesses"]> }) {
    return (
        <h1>{data.name}</h1>
    )
}