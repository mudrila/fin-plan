'use client';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { SerializedBudgetAccount } from '@/types/budget';

export default function BudgetAccountTransactionFrom({
  accounts,
}: {
  accounts: SerializedBudgetAccount[];
}) {
  const [open, setOpen] = useState(false);

  const [fromBudgetAccountId, setFromBudgetAccountId] = useState('');
  const [toBudgetAccountId, setToBudgetAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log({
      fromBudgetAccountId,
      toBudgetAccountId,
      amount,
      description,
    });
    const loadingToastId = toast.loading('Hand tight - we are making transaction');

    startTransition(async () => {
      try {
        const response = await fetch('/api/transaction/', {
          method: 'POST',
          body: JSON.stringify({
            fromBudgetAccountId,
            toBudgetAccountId,
            amount,
            description,
          }),
        });
        const responseData = await response.json();

        if (responseData.errorMessage) {
          toast.error(responseData.errorMessage, { id: loadingToastId });
        } else if (responseData.success) {
          router.refresh();
          toast.success('Transaction completed successfully!', {
            duration: 5000,
            id: loadingToastId,
          });
          handleClose();
        } else {
          toast.error('Something went wrong...', { id: loadingToastId });
        }
      } catch (e) {
        console.error('Error while making transaction', e);
        toast.error('Something went wrong...', { id: loadingToastId });
      }
    });
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        variant="outlined"
      >
        Make transaction
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Make transaction</DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
          >
            <InputLabel id="from-account-label">From Account</InputLabel>
            <Select
              id="fromAccount"
              name="fromAccount"
              label="From Account"
              labelId="from-account-label"
              value={fromBudgetAccountId}
              onChange={e => setFromBudgetAccountId(e.target.value)}
              required
              disabled={isPending}
            >
              {accounts
                .filter(account => account.type !== 'SpendingCategory')
                .map(account => (
                  <MenuItem
                    key={account.id}
                    value={account.id}
                  >
                    {account.title} - {account.type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
          >
            <InputLabel id="to-account-label">To Account</InputLabel>
            <Select
              id="toAccount"
              name="toAccount"
              label="To Account"
              labelId="to-account-label"
              value={toBudgetAccountId}
              onChange={e => setToBudgetAccountId(e.target.value)}
              required
              disabled={isPending}
            >
              {accounts
                .filter(account => {
                  const fromAccount = accounts.find(account => account.id === fromBudgetAccountId);
                  if (!fromAccount) return false;

                  if (
                    fromAccount.type === 'Income' &&
                    (account.type === 'Debit' || account.type === 'Credit')
                  ) {
                    return true;
                  }

                  if (
                    ['Debit', 'Credit', 'Debt'].includes(fromAccount.type) &&
                    account.type !== 'Income'
                  ) {
                    return true;
                  }

                  if (
                    fromAccount.type === 'Goal' &&
                    (account.type === 'Debit' ||
                      account.type === 'Credit' ||
                      account.type === 'Debt')
                  ) {
                    return true;
                  }

                  if (
                    ['Debit', 'Credit', 'Debt'].includes(fromAccount.type) &&
                    account.type === 'SpendingCategory'
                  ) {
                    return true;
                  }

                  return false;
                })
                .map(account => (
                  <MenuItem
                    key={account.id}
                    value={account.id}
                  >
                    {account.title} - {account.type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            disabled={isPending}
          />

          <TextField
            label="Description (Optional)"
            fullWidth
            margin="normal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isPending}
          />
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
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
