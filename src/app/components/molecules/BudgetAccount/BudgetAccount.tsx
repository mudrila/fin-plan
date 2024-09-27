'use client'
import { useState } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	MenuItem
} from '@mui/material';

const accountTypes = ['Income', 'Debt', 'SpendingCategory', 'Credit', 'Debit'];

export default function BudgetAccountForm() {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const title = formData.get('title');
		const description = formData.get('description');
		const icon = formData.get('icon');
		const monthlyLimit = formData.get('monthlyLimit');
		const type = formData.get('type');
		alert(
			`title: ${title}\n
			 description: ${description}\n
			 icon: ${icon} \n
			 monthlyLimit: ${monthlyLimit}\n
			 type: ${type}
			`
		);

		handleClose();
	};

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
				Create Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
					onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create an account, please enter your data here.
          </DialogContentText>
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
              variant="outlined"
              required
							>
              {accountTypes.map((option) => (
                <MenuItem key={option} value={option}>
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
