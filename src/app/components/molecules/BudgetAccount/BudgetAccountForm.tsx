'use client';
import * as Icons from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  IconButton,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState, useTransition } from 'react';
import { FixedSizeList } from 'react-window';
import { toast } from 'sonner';
import { accountTypes } from '@/constants/content';

export default function BudgetAccountForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('0');
  const [type, setType] = useState('Debit');
  const [icon, setIcon] = useState('');
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const iconList = Object.keys(Icons);
  const iconsPerRow = 12;

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const loadingToastId = toast.info('Hand tight - we are creating budget account for ya...');

    startTransition(async () => {
      const response = await fetch('/api/budgetAccount/create', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          icon,
          monthlyLimit,
          type,
          currentBalance: 0,
        }),
      });
      const responseData = await response.json();
      toast.dismiss(loadingToastId);

      if (responseData.errorMessage) {
        toast.error(responseData.errorMessage);
      } else if (responseData.success) {
        toast.success('Your budget account created!', { duration: 5000 });
        handleClose();
      } else {
        toast.error('Something went wrong...');
      }
    });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent /> : null;
  };

  const IconRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const startIndex = index * iconsPerRow;
    const endIndex = Math.min(startIndex + iconsPerRow, iconList.length);
    const iconsForRow = iconList.slice(startIndex, endIndex);

    return (
      <div style={{ ...style, display: 'flex', justifyContent: 'space-around' }}>
        {iconsForRow.map(iconName => (
          <IconButton
            key={iconName}
            onClick={() => handleIconClick(iconName)}
            title={iconName}
          >
            {renderIcon(iconName)}
          </IconButton>
        ))}
      </div>
    );
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Create Budget Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Budget Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isPending}
          />
          <TextField
            id="description"
            name="description"
            margin="dense"
            label="Description (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isPending}
          />
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
              startAdornment={icon ? renderIcon(icon) : null}
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
          <TextField
            id="monthlyLimit"
            name="monthlyLimit"
            margin="dense"
            label="Monthly Limit"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={0}
            required
            value={monthlyLimit}
            onChange={e => setMonthlyLimit(e.target.value)}
            disabled={isPending}
          />
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
          >
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              id="type"
              name="type"
              labelId="type-label"
              label="Type"
              defaultValue="Debit"
              required
              value={type}
              onChange={e => setType(e.target.value)}
              disabled={isPending}
            >
              {accountTypes.map(option => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            type="reset"
            variant="outlined"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
