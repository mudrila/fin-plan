'use client';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { cloneElement, FormEvent, ReactElement, ReactNode, useMemo, useState } from 'react';
import { submitFunction } from '@/utils/api';

interface MainFormProps {
  button: ReactElement<ButtonProps, 'button'>;
  title: string;
  content: ReactNode;
  dialogButtonText: string;
  submitData: {
    url: string;
    method: string;
    bodyData: object;
    successMessage: string;
    errorMessage: string;
    loadingMessage: string;
  };
  deleteButton?: ReactNode;
  accountId?: string;
  accountTitle?: string;
}

export default function MainForm({
  button,
  title,
  content,
  deleteButton,
  dialogButtonText,
  submitData,
  accountId,
  accountTitle,
}: MainFormProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    await submitFunction(
      `/api/budgetAccount/${accountId}`,
      'DELETE',
      {},
      'Budget Account deleted!',
      'Error while deleting budget account',
      `Hand tight - we are deleting ${accountTitle}...`,
      () => router.refresh(),
      handleClose,
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await submitFunction(
      submitData.url,
      submitData.method,
      submitData.bodyData,
      submitData.successMessage,
      submitData.errorMessage,
      submitData.loadingMessage,
      () => router.refresh(),
      handleClose,
    );
  };

  const dialogTrigger = useMemo(() => cloneElement(button, { onClick: handleClickOpen }), [button]);

  return (
    <>
      {dialogTrigger}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: deleteButton ? 'space-between' : 'flex-end',
            padding: '16px',
          }}
        >
          {deleteButton ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={handleDelete}
                color="error"
                type="button"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          ) : null}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={handleClose}
              type="reset"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              {dialogButtonText}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
