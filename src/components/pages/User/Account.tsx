'use client';

import { Check, Delete } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FormEvent, useRef, useState, useTransition, useMemo } from 'react';
import { toast } from 'sonner';
import EmailInput from '@/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/components/molecules/Inputs/PasswordInput/PasswordInput';

interface AccountProps {
  userName: string;
  userEmail: string;
  userImage: string | null;
}

export default function Account({ userName, userEmail, userImage }: AccountProps) {
  const theme = useTheme();
  const [base64Image, setBase64Image] = useState(userImage);
  const [openDelete, setOpenDelete] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isFormChanged = useMemo(() => {
    return name !== userName || email !== userEmail || password !== '' || base64Image !== userImage;
  }, [name, email, password, userName, userEmail, base64Image, userImage]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const loadingToastId = toast.loading(`Hand tight - we are updating your data`);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/account`, {
          method: 'PUT',
          body: JSON.stringify({
            name,
            email,
            password,
            image: base64Image,
          }),
        });
        const responseData = await response.json();

        if (responseData.errorMessage) {
          toast.error(responseData.errorMessage, { id: loadingToastId });
        } else if (responseData.success) {
          router.refresh();
          toast.success('Your data updated!', { duration: 5000, id: loadingToastId });
        } else {
          toast.error('Something went wrong...', { id: loadingToastId });
        }
      } catch (e) {
        console.error('Error while updating account', e);
        toast.error('Something went wrong...', { id: loadingToastId });
      }
    });
  };

  const handleSelectImageInput = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleSubmitDelete = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/account`, { method: 'DELETE' });
      const responseData = await response.json();

      if (responseData.errorMessage) {
        toast.error(responseData.errorMessage);
      } else if (responseData.success) {
        toast.info('Your account deleted', { duration: 5000 });
        signOut();
      } else {
        toast.error('Something went wrong...');
      }
    } catch (e) {
      console.error('Error while deleting account', e);
      toast.error('Something went wrong...');
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: theme.breakpoints.values.sm }}>
        <CardHeader title="Manage account" />
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            gap={2}
          >
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <IconButton onClick={handleSelectImageInput}>
                <Avatar
                  alt={userName}
                  src={base64Image || ''}
                  sx={{ width: 100, height: 100 }}
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  hidden
                  ref={imageInputRef}
                  accept="image/*"
                />
              </IconButton>
            </Box>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isPending}
            />
            <EmailInput
              value={email}
              errorMessage={emailError}
              onError={setEmailError}
              onChange={e => setEmail(e.target.value)}
              disabled={isPending}
              required={false}
            />
            <PasswordInput
              onError={setPasswordError}
              onChange={e => setPassword(e.target.value)}
              valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
              value={password}
              showPasswordStrength={false}
              disabled={isPending}
              required={false}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            endIcon={<Check />}
            disabled={!!passwordError || !!emailError || isPending || !isFormChanged}
          >
            Update Account
          </Button>
          <Button
            variant="outlined"
            onClick={handleClickDelete}
            endIcon={<Delete />}
            color="error"
            disabled={isPending}
          >
            Delete account
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmitDelete,
        }}
      >
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All your data will be deleted and you will not be able to
            recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
