'use client';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, TextField } from '@mui/material';
import { ReactElement, useState } from 'react';
import MainForm from '../AccountActionForm';
import IconSelect from '@/components/molecules/IconSelect/IconSelect';
import { SerializedGoalAccount } from '@/types/budget';

export default function GoalAccountForm({
  account = null,
  trigger,
}: {
  account?: SerializedGoalAccount | null;
  trigger?: ReactElement;
}) {
  const [title, setTitle] = useState(account?.title || '');
  const [description, setDescription] = useState(account?.description || '');
  const [icon, setIcon] = useState(account?.icon || '');
  const [monthlyTarget, setMonthlyTarget] = useState(account?.monthlyTarget?.toString() || '0');
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
              Goal
            </Button>
          )
        }
        title={account ? `Edit ${account.title}` : 'Create Goal'}
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
          </>
        }
        deleteButton={account ? true : false}
        accountTitle={account?.title}
        dialogButtonText={account ? 'Save' : 'Create'}
        submitData={{
          url: account ? `/api/goal/${account.id}` : '/api/goal',
          method: account ? 'PUT' : 'POST',
          bodyData: { title, description, icon, monthlyTarget, currentBalance },
          successMessage: `Goal Account ${account?.title ? account.title : title} ${account ? 'updated' : 'created'}!`,
          errorMessage: 'Error while creating/updating goal account',
          loadingMessage: `Hand tight - we are ${account ? 'updating' : 'creating'} goal account for ya...`,
        }}
        deleteTitle="Goal"
      />
    </>
  );
}
