'use client';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
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
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';
import IconSelect from '@/components/molecules/IconSelect/IconSelect';
import { accountTypes } from '@/constants/content';
import { SerializedBudgetAccount } from '@/types/budget';

export default function BudgetAccountForm({
  account = null,
}: {
  account?: SerializedBudgetAccount | null;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(account?.title || '');
  const [description, setDescription] = useState(account?.description || '');
  const [monthlyLimit, setMonthlyLimit] = useState(account?.monthlyLimit?.toString() || '0');
  const [type, setType] = useState(account?.type.toString() || 'Debit');
  const [icon, setIcon] = useState(account?.icon || '');
  const [currentBalance, setCurrentBalance] = useState(account?.currentBalance?.toString() || '');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    const loadingToastId = toast.loading(`Hand tight - we are deleting ${account?.title}...`);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/budgetAccount/${account?.id}`, { method: 'DELETE' });
        const responseData = await response.json();

        if (responseData.errorMessage) {
          toast.error(responseData.errorMessage, { id: loadingToastId });
        } else if (responseData.success) {
          router.refresh();
          toast.success('Budget Account deleted!', { duration: 5000, id: loadingToastId });
          handleClose();
        } else {
          toast.error('Something went wrong...', { id: loadingToastId });
        }
      } catch (e) {
        console.error('Error while deletion budget account', e);
        toast.error('Something went wrong...', { id: loadingToastId });
      }
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const loadingToastId = toast.loading(
      `Hand tight - we are ${account ? 'updating' : 'creating'} budget account for ya...`,
    );

    startTransition(async () => {
      try {
        const response = await fetch(
          account ? `/api/budgetAccount/${account.id}` : '/api/budgetAccount',
          {
            method: account ? 'PUT' : 'POST',
            body: JSON.stringify({
              title,
              description,
              icon,
              monthlyLimit,
              type,
              currentBalance,
            }),
          },
        );
        const responseData = await response.json();

        if (responseData.errorMessage) {
          toast.error(responseData.errorMessage, { id: loadingToastId });
        } else if (responseData.success) {
          router.refresh();
          toast.success(
            `Budget Account ${account?.title ? account.title : title} ${account ? 'updated' : 'created'}!`,
            {
              duration: 5000,
              id: loadingToastId,
            },
          );
          handleClose();
        } else {
          toast.error('Something went wrong...', { id: loadingToastId });
        }
      } catch (e) {
        console.error('Error while creating / updating budget account', e);
        toast.error('Something went wrong...', { id: loadingToastId });
      }
    });
  };

  return (
    <>
      {account ? (
        <IconButton
          onClick={handleClickOpen}
          aria-label="edit"
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          endIcon={<AddIcon />}
        >
          Budget Account
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{account ? `Edit ${account.title}` : 'Create Budget Account'}</DialogTitle>
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
          <IconSelect
            icon={icon}
            setIcon={setIcon}
          />
          <TextField
            id="currentBalance"
            name="currentBalance"
            margin="dense"
            label="Current Balance"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={0}
            required
            value={currentBalance}
            onChange={e => setCurrentBalance(e.target.value)}
            disabled={isPending}
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
        <DialogActions sx={{ justifyContent: account ? 'space-between' : 'flex-end' }}>
          {account && (
            <IconButton
              onClick={handleDelete}
              color="error"
              type="button"
              disabled={isPending}
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}
          <Box>
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
              {account ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
