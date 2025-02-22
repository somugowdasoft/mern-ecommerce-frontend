import { Button, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

const Footer = () => {
    return (
        <div>
            <Grid className="bg-gray-800 text-white text-center mt-10 py-4" container>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography className="pb-5" variant="h6"> Company </Typography>
                    <div>
                        <Button className="pb-5" variant="h6" > About </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Blog </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Press </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Jobs </Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography className="pb-5" variant="h6"> Solution </Typography>
                    <div>
                        <Button className="pb-5" variant="h6" > Marketing </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Analytics </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Commerce </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Support </Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography className="pb-5" variant="h6"> Documentation </Typography>
                    <div>
                        <Button className="pb-5" variant="h6" > Guides </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > All Status </Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography className="pb-5" variant="h6"> Legal </Typography>
                    <div>
                        <Button className="pb-5" variant="h6" > claim </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Privacy </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" > Terms </Button>
                    </div>
                </Grid>
                <hr className="w-full m-4" />
                <Grid className="pt-4" size={12}>
                    <Typography variant="body2" component="p" align="center">
                        &copy; 2025 ALl rights reseved
                    </Typography>
                    <Typography variant="body2" component="p" align="center">
                        Made with MERN stack
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
