'use client';

import { Menu } from '@mui/icons-material';
import { Box, Drawer, IconButton, Toolbar, useMediaQuery, SwipeableDrawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PropsWithChildren, useState } from 'react';
import Header from '@/components/molecules/Header/Header';
import AppNavigation from '@/components/organisms/Navigation/AppNavigation';
import { AppBar, DRAWER_WIDTH, DrawerHeader } from '@/components/organisms/Navigation/components';

export default function AppLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              display: open ? 'none' : 'inline-flex',
            }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Header />
          </Box>
        </Toolbar>
      </AppBar>
      {isMobile ? (
        <SwipeableDrawer
          anchor="left"
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <AppNavigation
            open={open}
            onClose={handleDrawerClose}
          />
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? DRAWER_WIDTH : `calc(${theme.spacing(7)} + 1px)`,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up('sm')]: {
              width: open ? DRAWER_WIDTH : `calc(${theme.spacing(8)} + 1px)`,
            },
            '& .MuiDrawer-paper': {
              overflowX: 'hidden',
              boxSizing: 'border-box',
              width: open ? DRAWER_WIDTH : `calc(${theme.spacing(7)} + 1px)`,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              [theme.breakpoints.up('sm')]: {
                width: open ? DRAWER_WIDTH : `calc(${theme.spacing(8)} + 1px)`,
              },
            },
          }}
        >
          <AppNavigation
            open={open}
            onClose={handleDrawerClose}
          />
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          transform: open ? `translateX(10px)` : 'translateX(0)',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
