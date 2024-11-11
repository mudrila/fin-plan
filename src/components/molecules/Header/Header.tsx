'use client';

import { Logout } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { MouseEvent, useState } from 'react';

export default function Header() {
  const { push } = useRouter();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const session = useSession();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElement(null);
  };

  const handleNavigateToSettings = () => {
    handleCloseUserMenu();
    push('/app/account');
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            alt={session.data?.user?.name || 'User'}
            src={session.data?.user?.image || ''}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={Boolean(anchorElement)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleNavigateToSettings}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}
