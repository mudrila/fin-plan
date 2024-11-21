'use client';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import MainForm from './AccountActionForm';
import {
  SerializedBudgetAccount,
  SerializedGoal,
  TypedIncomeAccount,
  TypedSpendAccount,
} from '@/types/budget';

export default function AccountTransactionFrom({
  budgetAccounts,
  incomeAccounts,
  goalAccounts,
  spendingAccounts,
}: {
  budgetAccounts: SerializedBudgetAccount[];
  incomeAccounts: TypedIncomeAccount[];
  goalAccounts: SerializedGoal[];
  spendingAccounts: TypedSpendAccount[];
}) {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const fromAccounts = [...incomeAccounts, ...budgetAccounts, ...goalAccounts];
  const toAccounts = [...goalAccounts, ...budgetAccounts, ...spendingAccounts];

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
                value={fromAccountId}
                onChange={e => setFromAccountId(e.target.value)}
                required
              >
                {fromAccounts.map(fromAccount => (
                  <MenuItem
                    key={fromAccount.id}
                    value={fromAccount.id}
                  >
                    {fromAccount.title}
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
                value={toAccountId}
                onChange={e => setToAccountId(e.target.value)}
                required
              >
                {toAccounts
                  .filter(toAccount => {
                    const fromAccount = fromAccounts.find(account => account.id === fromAccountId);

                    if (!fromAccount) return false;

                    if (
                      fromAccount.type === 'Income' &&
                      (toAccount.type === 'Debit' || toAccount.type === 'Credit')
                    ) {
                      return true;
                    }

                    if (
                      ['Debit', 'Credit', 'Debt', 'Goal'].includes(fromAccount.type) &&
                      ['Debit', 'Credit', 'Debt', 'Goal'].includes(toAccount.type)
                    ) {
                      return true;
                    }
                    if (
                      ['Debit', 'Credit', 'Debt'].includes(fromAccount.type) &&
                      toAccount.type === 'Spending Category'
                    ) {
                      return true;
                    }

                    return false;
                  })
                  .map(toAccount => (
                    <MenuItem
                      key={toAccount.id}
                      value={toAccount.id}
                    >
                      {toAccount.title}
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
          bodyData: {
            fromAccountId,
            toAccountId,
            amount,
            description,
            fromAccountType: fromAccounts.find(acc => acc.id === fromAccountId)?.type,
            toAccountType: toAccounts.find(acc => acc.id === toAccountId)?.type,
          },
          successMessage: 'Transaction completed successfully!',
          errorMessage: 'Error while making transaction',
          loadingMessage: 'Hand tight - we are making transaction',
        }}
      />
    </>
  );
}
