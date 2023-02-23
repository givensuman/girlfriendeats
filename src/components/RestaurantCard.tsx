import { useState } from "react"

import { type RouterOutput } from "../pages/api/trpc/[trpc]"

import {
    Box, 
    Card, CardHeader, CardMedia, CardContent, CardActions,
    Collapse,
    Chip, Badge, Icon,
    Typography,
    Button,
    Link,
    Divider,
    Skeleton,
} from "@mui/material"
import { type IconProps, type TypographyProps, type CardProps, type BoxProps } from "@mui/material"
import {  
  ExpandMore, 
  Star, StarBorder, StarHalf,
  Phone, Business, Web,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

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

    const handleExpandClick = () => {
        setExpanded(state => !state)
    }

    const distanceInMiles = Math.round((data.distance/1609.344) * 10)/10

    return (
        <Card
            sx={{ 
              maxWidth: "90vw",
              width: 345,
              my: 3, 
              overflow: "visible", 
              ...sx 
            }}
            {...props}
        >      
        <CardHeader
          title={data.name}
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
                {data.categories.map((category, i) => (
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
        <CardMedia
          component="img"
          height="194"
          image={data.image_url}
          alt="Paella dish"
          onClick={() => window.open(data.url, "_blank")}
          sx={{
            cursor: "pointer"
          }}
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
              {[...Array(Math.floor(data.rating))].map((_, i) => (
                <Icon key={i}>
                  <Star />
                </Icon>
              ))}
              {(Math.ceil(data.rating) - Math.floor(data.rating)) >= 0.5 && 
                <Icon>
                  <StarHalf />
                </Icon>
              }
              {[...Array(5 - Math.ceil(data.rating))].map((_, i) => (
                <Icon key={i}>
                  <StarBorder />
                </Icon>
              ))}
              <Typography ml={1} fontSize={15} sx={{
                position: "relative",
                top: 2
              }}>
                {`(${data.review_count})`}
              </Typography>
            </Typography>
            <Typography mt={1}>
              {data.price}
            </Typography>
            <Typography mt={1}>
              {`${distanceInMiles} mile${distanceInMiles !== 1 ? "s" : ""}`}
            </Typography>
          </Typography>
        </CardContent>
        <CardActions 
          disableSpacing
          sx={{
            paddingTop: 0,
          }}
        >
          <Button
            onClick={handleExpandClick}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
          <ShowMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </ShowMore>
          </Button>
        </CardActions>
        <Collapse 
          in={expanded} 
          timeout="auto" 
          unmountOnExit
        >
          <Divider />
          <CardContent>
            <Typography
              variant="body1"
              component="div"
            >
              <CollapseElement>
                <Typography
                sx={{
                  position: "relative",
                  left: 20
                }}
                my={1}
                component="div"
              >
                <Badge 
                  badgeContent={data.is_closed
                    ? "Closed"
                    : "Open"
                  }
                  color={data.is_closed
                    ? "error"
                    : "success"
                  }
                />
              </Typography>
            </CollapseElement>
              <CollapseElement icon={<Phone />}>
                {data.display_phone}
              </CollapseElement>
              <CollapseElement icon={<Business />}>
                {data.location.display_address.join(", ")}
              </CollapseElement>
              <CollapseElement icon={<Web />}>
                <Link 
                  width="90%"
                  sx={{ cursor: "pointer" }}
                  href={data.url}
                >
                  <Typography 
                    noWrap
                    component="div"
                  >
                    {data.url.slice(12, data.url.length)}
                  </Typography>
                </Link>
              </CollapseElement>
              <CollapseElement>
                  {data.transactions.map((transaction, i) => (
                      <Chip 
                          key={i}
                          label={transaction.slice(0, 1).toUpperCase() + transaction.slice(1, transaction.length)}
                          sx={{
                            mr: 0.3,
                            marginY: 0.15
                          }}
                      />
                  ))}
              </CollapseElement>
            </Typography>    
          </CardContent>
        </Collapse>
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