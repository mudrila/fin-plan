'use client';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, TextField } from '@mui/material';
import { SpendingCategory } from '@prisma/client';
import { ReactElement, useState } from 'react';
import MainForm from '../AccountActionForm';
import IconSelect from '@/components/molecules/IconSelect/IconSelect';

export default function SpendingCategoryAccountForm({
  account = null,
  trigger,
}: {
  account?: SpendingCategory | null;
  trigger?: ReactElement;
}) {
  const [title, setTitle] = useState(account?.title || '');
  const [description, setDescription] = useState(account?.description || '');
  const [icon, setIcon] = useState(account?.icon || '');

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
              Spending Category
            </Button>
          )
        }
        title={account ? `Edit ${account.title}` : 'Create Spending Category'}
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
          </>
        }
        deleteButton={account ? true : false}
        accountTitle={account?.title}
        dialogButtonText={account ? 'Save' : 'Create'}
        submitData={{
          url: account ? `/api/spendingCategory/${account.id}` : '/api/spendingCategory',
          method: account ? 'PUT' : 'POST',
          bodyData: { title, description, icon },
          successMessage: `Spending Category ${account?.title ? account.title : title} ${account ? 'updated' : 'created'}!`,
          errorMessage: 'Error while creating/updating spending category',
          loadingMessage: `Hand tight - we are ${account ? 'updating' : 'creating'} spending category for ya...`,
        }}
        deleteTitle="Spending Category"
      />
    </>
  );
}
