import { useState } from "react";

import { type RouterOutput } from "../pages/api/trpc/[trpc]";

import {
  Box, Card, CardContent, CardMedia, Icon, Skeleton, Typography, type BoxProps, type CardProps, type IconProps, type TypographyProps
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ShowMoreProps extends IconProps {
    expand: boolean;
}

const ShowMore = styled((props: ShowMoreProps) => {
        const { expand, children, sx, ...other } = props;
        return (
          <Icon 
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...sx
            }}
            {...other}
          >
            {children}
          </Icon>
        );
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
    }),
}));

const CollapseElement = ({
  icon,
  sx,
  ...props
}: {
  icon?: JSX.Element
} & TypographyProps) => {
  return (
    <Typography 
      variant="body1"
      color="text.primary"
      sx={{
        display: "flex",
        marginBottom: 1,
        maxWidth: "100%",
        ...sx
      }}
      {...props}
    >
      {icon &&
        <Icon
          sx={{
            position: "relative",
            bottom: 5,
            marginRight: 1,
          }}
        >
          {icon}
        </Icon>
      }
      {props.children}
    </Typography>
  )
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export default function RestaurantCard({
    data, 
    sx,
    ...props
}: { data: ArrayElement<RouterOutput["yelp"]["search"]["data"]["businesses"]> } & CardProps) {

    const [ expanded, setExpanded ] = useState(false)

    const _data = {
      "alias": "asheville-pizza-and-brewing-company-asheville",
      "categories": [
        {
          "alias": "pizza",
          "title": "Pizza"
        },
        {
          "alias": "breweries",
          "title": "Breweries"
        }
      ],
      "coordinates": {
        "latitude": 35.622192,
        "longitude": -82.553698
      },
      "display_phone": "(828) 254-1281",
      "distance": 4361.505343084764,
      "id": "IIjwLCESPEm0Q8fWGYxaOw",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/BeGAGA22YSJBW47NSSI-Cg/o.jpg",
      "is_closed": false,
      "location": {
        "address1": "675 Merrimon Ave",
        "address2": "",
        "address3": "",
        "city": "Asheville",
        "country": "US",
        "display_address": [
          "675 Merrimon Ave",
          "Asheville, NC 28804"
        ],
        "state": "NC",
        "zip_code": "28804"
      },
      "name": "Asheville Pizza & Brewing Company",
      "phone": "+18282541281",
      "price": "$$",
      "rating": 4,
      "review_count": 501,
      "transactions": [
        "delivery"
      ],
      "url": "https://www.yelp.com/biz/asheville-pizza-and-brewing-company-asheville?adjust_creative=AAUeh8IM-yIYE84_grq3og&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=AAUeh8IM-yIYE84_grq3og"
    }

    const handleExpandClick = () => {
        setExpanded(state => !state)
    }

    const distanceInMiles = Math.round((data.distance/1609.344) * 10)/10

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            image={_data.image_url}
            title={_data.name}
            sx={{ height: 140 }}
          />
            <CardContent>
            <Typography variant="h5" gutterBottom>
              {_data.name}
            </Typography>
            </CardContent>
        </Card>
    )
}

export function SkeletonRestaurantCard(props: BoxProps) {
  return (
    <Box {...props}>
      <Skeleton 
        width={345}
        height={50}
        sx={{
          maxWidth: "90vw"
        }}
      />
      <Skeleton 
        width={345}
        height={200}
        sx={{
          maxWidth: "90vw",
          position: "relative",
          bottom: 20
        }}
      />
    </Box>
  )
}