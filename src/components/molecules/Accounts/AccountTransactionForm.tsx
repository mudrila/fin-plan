'use client';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import MainForm from '@/components/molecules/Accounts/AccountActionForm';
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
  fromId,
  toId,
  propAmount,
  propDescription,
  transactionId,
}: {
  budgetAccounts: SerializedBudgetAccount[];
  incomeAccounts: TypedIncomeAccount[];
  goalAccounts: SerializedGoal[];
  spendingAccounts: TypedSpendAccount[];
  fromId?: string;
  toId?: string;
  propAmount?: number;
  propDescription?: string;
  transactionId?: string;
}) {
  const [fromAccountId, setFromAccountId] = useState(fromId || '');
  const [toAccountId, setToAccountId] = useState(toId || '');
  const [amount, setAmount] = useState(propAmount || '');
  const [description, setDescription] = useState(propDescription || '');

  const fromAccounts = [...incomeAccounts, ...budgetAccounts, ...goalAccounts];
  const toAccounts = [...goalAccounts, ...budgetAccounts, ...spendingAccounts];

  return (
    <>
      <MainForm
        button={
          transactionId ? (
            <IconButton>
              <Edit />
            </IconButton>
          ) : (
            <Button
              endIcon={<AddIcon />}
              variant="outlined"
            >
              Make transaction
            </Button>
          )
        }
        title={transactionId ? 'Edit transaction' : 'Make transaction'}
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
          url: transactionId ? `/api/transaction/${transactionId}` : '/api/transaction/',
          method: transactionId ? 'PUT' : 'POST',
          bodyData: {
            fromAccountId,
            toAccountId,
            amount,
            description,
            fromAccountType: fromAccounts.find(acc => acc.id === fromAccountId)?.type,
            toAccountType: toAccounts.find(acc => acc.id === toAccountId)?.type,
          },
          successMessage: `Transaction ${transactionId ? 'edited' : 'completed'} successfully!`,
          errorMessage: `Error while ${transactionId ? 'editing' : 'making'} transaction`,
          loadingMessage: `Hand tight - we are ${transactionId ? 'editing' : 'making'} transaction`,
        }}
      />
    </>
  );
}
