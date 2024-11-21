'use client';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { BudgetAccountType } from '@prisma/client';
import { ReactElement, useState } from 'react';
import MainForm from './AccountActionForm';
import IconSelect from '@/components/molecules/IconSelect/IconSelect';
import { budgetAccountTypes } from '@/constants/content';
import {
  SerializedBudgetAccount,
  SerializedGoal,
  TypedIncomeAccount,
  TypedSpendAccount,
} from '@/types/budget';

function hasCurrentBalance(
  account: SerializedBudgetAccount | SerializedGoal | TypedIncomeAccount | TypedSpendAccount,
): account is SerializedBudgetAccount | SerializedGoal {
  return 'currentBalance' in account;
}

export default function AccountForm({
  account = null,
  trigger,
  initialAccountType = BudgetAccountType.Debit,
  mainText,
  secondText,
  url,
}: {
  account?:
    | SerializedBudgetAccount
    | SerializedGoal
    | TypedIncomeAccount
    | TypedSpendAccount
    | null;
  trigger?: ReactElement;
  initialAccountType?: BudgetAccountType | 'Goal' | 'Income' | 'Spending Category';
  mainText: string;
  secondText: string;
  url: string;
}) {
  const [title, setTitle] = useState(account?.title || '');
  const [description, setDescription] = useState(account?.description || '');
  const [type, setType] = useState(account?.type.toString() || initialAccountType);
  const [icon, setIcon] = useState(account?.icon || '');
  const [currentBalance, setCurrentBalance] = useState(
    account && hasCurrentBalance(account) ? account.currentBalance?.toString() || '0' : '0',
  );
  const [monthlyTarget, setMonthlyTarget] = useState(
    account?.type === 'Goal' ? account.monthlyTarget?.toString() || '0' : '0',
  );

  const renderFieldsBasedOnType = () => {
    switch (type) {
      case 'Goal':
        return (
          <>
            <TextField
              id="monthlyTarget"
              name="monthlyTarget"
              margin="dense"
              label="Monthly Target"
              type="number"
              fullWidth
              variant="outlined"
              required
              value={monthlyTarget}
              onChange={e => setMonthlyTarget(e.target.value)}
            />
            <TextField
              id="currentBalance"
              name="currentBalance"
              margin="dense"
              label="Current Balance"
              type="number"
              fullWidth
              variant="outlined"
              required
              value={currentBalance}
              onChange={e => setCurrentBalance(e.target.value)}
            />
          </>
        );
      case 'Credit':
      case 'Debit':
      case 'Debt':
        return (
          <>
            <TextField
              id="currentBalance"
              name="currentBalance"
              margin="dense"
              label="Current Balance"
              type="number"
              fullWidth
              variant="outlined"
              required
              value={currentBalance}
              onChange={e => setCurrentBalance(e.target.value)}
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
                required
                value={type}
                onChange={e => setType(e.target.value as BudgetAccountType)}
              >
                {budgetAccountTypes.map(option => (
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MainForm
        button={
          trigger ? (
            trigger
          ) : account ? (
            <IconButton
              aria-label="edit"
              color="primary"
            >
              <EditIcon />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              endIcon={<AddIcon />}
            >
              {mainText}
            </Button>
          )
        }
        title={account ? `Edit ${account.title}` : `Create ${mainText}`}
        content={
          <>
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
            />
            <IconSelect
              icon={icon}
              setIcon={setIcon}
            />
            {renderFieldsBasedOnType()}
          </>
        }
        deleteButton={account ? true : false}
        accountTitle={account?.title}
        dialogButtonText={account ? 'Save' : 'Create'}
        submitData={{
          url: account ? `/api/${url}/${account.id}` : `/api/${url}`,
          method: account ? 'PUT' : 'POST',
          bodyData:
            account?.type === 'Goal'
              ? { title, description, icon, currentBalance, monthlyTarget: '0' }
              : account?.type === 'Income' || account?.type === 'Spending Category'
                ? { title, description, icon }
                : { title, description, icon, type, currentBalance },
          successMessage: `${mainText} ${account?.title ? account.title : title} ${account ? 'updated' : 'created'}!`,
          errorMessage: `Error while creating/updating ${secondText}`,
          loadingMessage: `Hand tight - we are ${account ? 'updating' : 'creating'} ${secondText} for ya...`,
        }}
        deleteTitle={mainText}
      />
    </>
  );
}
