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
import MainForm from '../AccountActionForm';
import IconSelect from '@/components/molecules/IconSelect/IconSelect';
import { budgetAccountTypes } from '@/constants/content';
import { SerializedBudgetAccount } from '@/types/budget';

export default function BudgetAccountForm({
  account = null,
  trigger,
  initialAccountType = BudgetAccountType.Debit,
}: {
  account?: SerializedBudgetAccount | null;
  trigger?: ReactElement;
  initialAccountType?: BudgetAccountType;
}) {
  const [title, setTitle] = useState(account?.title || '');
  const [description, setDescription] = useState(account?.description || '');
  const [type, setType] = useState(account?.type.toString() || initialAccountType);
  const [icon, setIcon] = useState(account?.icon || '');
  const [currentBalance, setCurrentBalance] = useState(account?.currentBalance?.toString() || '0');

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
              Budget Account
            </Button>
          )
        }
        title={account ? `Edit ${account.title}` : 'Create Budget Account'}
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
                onChange={e => setType(e.target.value)}
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
        }
        deleteButton={account ? true : false}
        accountTitle={account?.title}
        dialogButtonText={account ? 'Save' : 'Create'}
        submitData={{
          url: account ? `/api/budgetAccount/${account.id}` : '/api/budgetAccount',
          method: account ? 'PUT' : 'POST',
          bodyData: { title, description, icon, type, currentBalance },
          successMessage: `Budget Account ${account?.title ? account.title : title} ${account ? 'updated' : 'created'}!`,
          errorMessage: 'Error while creating/updating budget account',
          loadingMessage: `Hand tight - we are ${account ? 'updating' : 'creating'} budget account for ya...`,
        }}
        deleteTitle="Budget Account"
      />
    </>
  );
}
