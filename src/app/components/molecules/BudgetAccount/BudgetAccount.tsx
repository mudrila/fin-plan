'use client'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { accountTypes } from '@/constants/content';

export default function BudgetAccountForm() {
  const [open, setOpen] = useState(false);

  const session = useSession();
  const userId = session.data?.user?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.message('Hand tight - we are creating budget account for ya...');
		
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');
    const icon = formData.get('icon');
    const monthlyLimit = formData.get('monthlyLimit');
    const type = formData.get('type');

    const response = await fetch('/api/budgetAccount/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        icon,
        monthlyLimit,
        type,
        userId,
      }),
    });
    const data = await response.json();

    if (data.errorMessage) {
      toast.error(data.errorMessage);
    } else if (!data.error) {
      toast.success(data.message);
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        Create Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>To create an account, please enter your data here.</DialogContentText>
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
          />
          <TextField
            id="description"
            name="description"
            margin="dense"
            label="Description (Optional)"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="icon"
            name="icon"
            margin="dense"
            label="Icon (Optional)"
            type="text"
            fullWidth
            variant="outlined"
          />
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
          />
          <TextField
            id="type"
            name="type"
            margin="dense"
            label="Type"
            select
            fullWidth
            defaultValue="Debit"
            variant="outlined"
            required
          >
            {accountTypes.map(option => (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
