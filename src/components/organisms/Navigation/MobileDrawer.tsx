import { ChevronLeft } from '@mui/icons-material';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledLink } from '@/components/atoms/Link/StyledNextLink';
import ThemeModeSwitch from '@/components/atoms/ThemeModeSwitch/ThemeModeSwitch';

const drawerWidth = 180;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface MobileDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

export default function MobileDrawer({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: MobileDrawerProps) {
  const theme = useTheme();
  return (
    <SwipeableDrawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          ...theme.applyStyles('dark', {
            backgroundColor: '#090b19',
          }),
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <StyledLink
            href="/app"
            passHref
          >
            <ListItemButton>
              <SpaceDashboardIcon />
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </StyledLink>
        </ListItem>

        <ListItem disablePadding>
          <StyledLink
            href="/app/budget"
            passHref
          >
            <ListItemButton>
              <DonutSmallIcon />
              <ListItemText primary="Budget" />
            </ListItemButton>
          </StyledLink>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ThemeModeSwitch /> <ListItemText primary="Switch mode" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </SwipeableDrawer>
  );
}
