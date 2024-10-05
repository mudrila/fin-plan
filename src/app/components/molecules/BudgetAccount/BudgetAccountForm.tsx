'use client';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import BudgetAccountDialog from './BudgetAccountDialog';

export default function BudgetAccountForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('0');
  const [type, setType] = useState('Debit');
  const [icon, setIcon] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
        router.refresh();
        toast.success('Your budget account created!', { duration: 5000 });
        handleClose();
      } else {
        toast.error('Something went wrong...');
      }
    });
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
        <BudgetAccountDialog
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          icon={icon}
          setIcon={setIcon}
          monthlyLimit={monthlyLimit}
          setMonthlyLimit={setMonthlyLimit}
          type={type}
          setType={setType}
          isPending={isPending}
        />
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
