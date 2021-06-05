import { Link, Typography } from "@material-ui/core";
import React from "react";


const Copyright = (): JSX.Element => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                owned by Lino Lazar
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;