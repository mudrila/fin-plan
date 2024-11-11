'use client';

import { ChevronLeft } from '@mui/icons-material';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { DrawerHeader } from './components';
import ThemeModeSwitch from '@/components/atoms/ThemeModeSwitch/ThemeModeSwitch';

function NavigationItem({
  href,
  icon,
  text,
  open,
  onClose,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
      onClick={onClose}
    >
      <ListItemButton
        component={NextLink}
        selected={pathname === href}
        href={href}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        {icon}
        <ListItemText
          primary={text}
          sx={{
            opacity: open ? 1 : 0,
            marginLeft: open ? 2 : 0,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function AppNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <NavigationItem
          href="/app"
          icon={<SpaceDashboardIcon />}
          text="Dashboard"
          open={open}
          onClose={onClose}
        />
        <NavigationItem
          href="/app/budget"
          icon={<DonutSmallIcon />}
          text="Budget"
          open={open}
          onClose={onClose}
        />
      </List>
      <Divider />
      <List sx={{ mt: 'auto' }}>
        <Divider />
        <ListItem sx={{ pr: 0, pl: 1.5, maxWidth: '100%', overflowX: 'hidden' }}>
          <ThemeModeSwitch />
        </ListItem>
      </List>
    </>
  );
}
