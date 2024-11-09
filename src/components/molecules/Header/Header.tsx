'use client';

import { Logout } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Box,
  Toolbar,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import { useState, MouseEvent } from 'react';
import { StyledLink } from '@/components/atoms/Link/StyledNextLink';

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const session = useSession();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
          >
            <Avatar
              alt={session.data?.user?.name || 'User'}
              src={session.data?.user?.image || ''}
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
          <MenuItem href="/app/account">
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <StyledLink href="/app/account">{session.data?.user?.name}</StyledLink>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
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
