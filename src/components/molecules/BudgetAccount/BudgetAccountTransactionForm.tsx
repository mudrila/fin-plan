'use client';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import MainForm from './Form';
import { SerializedBudgetAccount } from '@/types/budget';

export default function BudgetAccountTransactionFrom({
  accounts,
}: {
  accounts: SerializedBudgetAccount[];
}) {
  const [fromBudgetAccountId, setFromBudgetAccountId] = useState('');
  const [toBudgetAccountId, setToBudgetAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <MainForm
        button={
          <Button
            endIcon={<AddIcon />}
            variant="outlined"
          >
            Make transaction
          </Button>
        }
        title="Make transaction"
        content={
          <>
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
              >
                {accounts
                  .filter(account => {
                    const fromAccount = accounts.find(
                      account => account.id === fromBudgetAccountId,
                    );
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
                        account.type === 'Debt' ||
                        account.type === 'Goal')
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
            />

            <TextField
              label="Description (Optional)"
              fullWidth
              margin="normal"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </>
        }
        dialogButtonText="Submit"
        submitData={{
          url: '/api/transaction/',
          method: 'POST',
          bodyData: { fromBudgetAccountId, toBudgetAccountId, amount, description },
          successMessage: 'Transaction completed successfully!',
          errorMessage: 'Error while making transaction',
          loadingMessage: 'Hand tight - we are making transaction',
        }}
      />
    </>
  );
}
