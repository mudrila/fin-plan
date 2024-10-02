'use client';
import * as Icons from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  useMediaQuery,
} from '@mui/material';
import { CSSProperties } from 'react';
import { useState } from 'react';
import { FixedSizeList } from 'react-window';
import theme from '@/theme';

interface IconSelectProps {
  icon: string;
  setIcon: (e: string) => void;
}

export function IconRenderrer({ iconName }: { iconName: string }) {
  const IconComponent = Icons[iconName as keyof typeof Icons];
  return IconComponent ? <IconComponent /> : null;
}

export function IconSelect({ icon, setIcon }: IconSelectProps) {
  const handleIconClick = (iconName: string) => {
    setIcon(iconName);
    setIconModalOpen(false);
  };

  const handleOpenIconModal = () => {
    setIconModalOpen(true);
  };

  const handleCloseIconModal = () => {
    setIconModalOpen(false);
  };

  const [iconModalOpen, setIconModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const iconList = Object.keys(Icons);

  const iconsPerRow = isMobile ? 6 : 12;

  const IconRow = ({ index, style }: { index: number; style: CSSProperties }) => {
    const startIndex = index * iconsPerRow;
    const endIndex = Math.min(startIndex + iconsPerRow, iconList.length);
    const iconsForRow = iconList.slice(startIndex, endIndex);

    return (
      <Box
        style={style}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {iconsForRow.map(iconName => (
          <IconButton
            key={iconName}
            onClick={() => handleIconClick(iconName)}
            title={iconName}
          >
            <IconRenderrer iconName={iconName} />
          </IconButton>
        ))}
      </Box>
    );
  };

  return (
    <FormControl
      fullWidth
      margin="dense"
      variant="outlined"
    >
      <InputLabel id="icon-label">Icon</InputLabel>
      <Select
        id="icon"
        name="icon"
        label="Icon"
        labelId="icon-label"
        fullWidth
        value={icon || ''}
        onClick={handleOpenIconModal}
        readOnly
        inputProps={{
          readOnly: true,
        }}
        startAdornment={icon ? <IconRenderrer iconName={icon} /> : null}
      />

      <Dialog
        open={iconModalOpen}
        onClose={handleCloseIconModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select an Icon</DialogTitle>
        <DialogContent>
          <FixedSizeList
            height={400}
            width="100%"
            itemSize={35}
            itemCount={iconList.length}
          >
            {IconRow}
          </FixedSizeList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIconModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
