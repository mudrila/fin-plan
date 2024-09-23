import { ChevronLeft } from '@mui/icons-material';
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const drawerWidth = 180;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: block;
`;

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
              <ListItemIcon>D</ListItemIcon>
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
              <ListItemIcon>B</ListItemIcon>
              <ListItemText primary="Budget" />
            </ListItemButton>
          </StyledLink>
        </ListItem>
      </List>
      <Divider />
    </SwipeableDrawer>
  );
}
