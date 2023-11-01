import { useEffect, useRef, useState } from "react";

import { type RouterOutput } from "../pages/api/trpc/[trpc]";

import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import {
  Box, Card, CardContent, CardHeader, CardMedia, Chip, Icon, Skeleton, Typography, type BoxProps, type CardProps, type IconProps, type TypographyProps
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ShowMoreProps extends IconProps {
    expand: boolean;
}

const useOnClickOutisde = (ref: React.MutableRefObject<any>, callback: (event?: MouseEvent) => void) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!ref.current.contains(event.target as Node)) {
      callback(event)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref])
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

    const distanceInMiles = Math.round((_data.distance/1609.344) * 10)/10

    const [ isHovered, setIsHovered ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)

    const clickRef = useRef<any>(null)
    useOnClickOutisde(clickRef, () => {
      setIsOpen(false)
    })

    return (
        <Card 
          ref={clickRef}
          sx={{ maxWidth: 345, boxShadow: isHovered ? 10 : 1, cursor: "pointer" }} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <CardMedia
            image={_data.image_url}
            title={_data.name}
            sx={{ height: 140 }}
          />
          {isOpen ? "open" : "closed"}
        <CardHeader
          title={_data.name}
          subheader={<>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexShrink: 0,
                    flexWrap: "wrap",
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    position: "relative",
                    right: 5
                }}
                component="ul"
            >
                {_data.categories.map((category, i) => (
                    <Chip 
                        key={i}
                        label={category.title}
                        size="small"
                        component="li"
                        sx={{
                            mr: 0.3,
                            marginY: 0.15
                        }}
                    />
                ))}
            </Box>
          </>}
        />
        <CardContent sx={{ width: "100%" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center"
              }}
            >
              {[...Array(Math.floor(_data.rating))].map((_, i) => (
                <Icon key={i}>
                  <Star />
                </Icon>
              ))}
              {(Math.ceil(_data.rating) - Math.floor(_data.rating)) >= 0.5 && 
                <Icon>
                  <StarHalf />
                </Icon>
              }
              {[...Array(5 - Math.ceil(_data.rating))].map((_, i) => (
                <Icon key={i}>
                  <StarBorder />
                </Icon>
              ))}
              <Typography ml={1} fontSize={15} sx={{
                position: "relative",
                top: 2
              }}>
                {`(${_data.review_count})`}
              </Typography>
            </Typography>
            <Typography mt={1}>
              {_data.price}
            </Typography>
            <Typography mt={1}>
              {`${distanceInMiles} mile${distanceInMiles !== 1 ? "s" : ""}`}
            </Typography>
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