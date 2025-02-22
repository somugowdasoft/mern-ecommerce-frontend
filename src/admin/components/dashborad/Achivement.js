import { Button, Card, CardContent, CardMedia, Typography, Box } from "@mui/material"
import image from "../../../asset/admin/achive.png"

const Achivement = ({totalRevenue}) => {
    return (
        <Card sx={{ display: 'flex', height: '100%', alignItems: 'center', bgcolor:"#192A56", color:"white" }}>
            <Box>
                <CardContent sx={{ mr: 6 }}>
                    <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
                        Shopper
                    </Typography>
                    <Typography sx={{ color: "#EAF0F1"}}>
                        Congratulations
                    </Typography>
                    <Typography variant="h5" sx={{my: 2, fontWeight: "bold"}}>
                        {totalRevenue}
                    </Typography>
                    <Button variant="contained" size="small" sx={{ bgcolor: "#BB2CD9"}}> view Sales </Button>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 160, height: 160, pt:3 }}
                image={image}
                alt="Trophy"
            />
            <br />
        </Card>
    );
}

export default Achivement
