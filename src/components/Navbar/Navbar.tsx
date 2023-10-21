import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'
import React from 'react'

const Navbar = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" flexGrow={1}>
                    JS Memory Game
                </Typography>
                <Stack>
                    <Button variant="contained" color="secondary">
                        Jogar
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar