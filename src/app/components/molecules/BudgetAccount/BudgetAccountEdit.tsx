'use client';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import BudgetAccountDialog from './BudgetAccountDialog';
import { SerializedBudgetAccount } from '@/types/budget';

export default function BudgetAccountEditFrom({ account }: { account: SerializedBudgetAccount }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(account.title);
  const [description, setDescription] = useState(account.description);
  const [monthlyLimit, setMonthlyLimit] = useState(String(account.monthlyLimit));
  const [type, setType] = useState(String(account.type));
  const [icon, setIcon] = useState(String(account.icon));
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

    startTransition(async () => {
      const response = await fetch(`/api/budgetAccount/${account.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description,
          icon,
          monthlyLimit,
          type,
          currentBalance: account.currentBalance,
          id: account.id,
        }),
      });
      const responseData = await response.json();

      if (responseData.errorMessage) {
        toast.error(responseData.errorMessage);
      } else if (responseData.success) {
        router.refresh();
        toast.success('Your budget account updated!', { duration: 5000 });
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
        endIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Edit</DialogTitle>
        <BudgetAccountDialog
          title={title}
          setTitle={setTitle}
          description={description!}
          setDescription={setDescription}
          icon={icon}
          setIcon={setIcon}
          monthlyLimit={monthlyLimit!}
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
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
