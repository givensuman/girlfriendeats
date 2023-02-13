import React, { useState } from "react"

import { type RouterOutput } from "../pages/api/trpc/[trpc]"

import {
    Box, 
    Card, CardHeader, CardMedia, CardContent, CardActions,
    Collapse,
    Chip, ListItem,
    IconButton,
    Typography,
} from "@mui/material"
import { type IconButtonProps, type CardProps } from "@mui/material"
import { Favorite, Share, ExpandMore, MoreVert } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

interface ShowMoreProps extends IconButtonProps {
    expand: boolean;
}

const ShowMore = styled((props: ShowMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
    }),
}));

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

    return (
        <Card
            sx={{ maxWidth: 345, my: 3, ...sx }}
            {...props}
        >
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
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
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
          <ShowMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </ShowMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
}