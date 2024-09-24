'use client';

import { Logout } from '@mui/icons-material';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  ListItemIcon,
  Button,
} from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, MouseEvent } from 'react';

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const session = useSession();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Toolbar disableGutters>
      <Button
        LinkComponent={Link}
        href="/"
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
          textDecoration: 'none',
          fontSize: 18,
        }}
      >
        FinPlan UI
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
          >
            <Avatar
              alt={session.data?.user?.name || 'User'}
              src=""
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Typography sx={{ textAlign: 'center', p: 1 }}>
            Hello, {session.data?.user?.name}
          </Typography>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}
