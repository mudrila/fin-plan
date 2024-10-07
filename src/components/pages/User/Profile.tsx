'use client'
import Edit from "@mui/icons-material/Edit";
import { Card, CardHeader, CardContent, Button, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import EmailInput from "@/components/molecules/Inputs/EmailInput/EmailInput";
import PasswordInput from "@/components/molecules/Inputs/PasswordInput/PasswordInput";


interface ProfileProps{
  userName: string,
  userId: string,
}

export default function Profile({userName, userId}: ProfileProps) {
  const [image, setImage] = useState<File>();
  const [base64Image, setBase64Image] = useState('');
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openData, setOpenData] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClickData = () => {
    setOpenData(true);
  }

  const handleCloseData = () => {
    setOpenData(false);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const loadingToastId = toast.loading(
      `Hand tight - we are updating your data`,
    );

    startTransition(async () => {
      try {
        const response = await fetch(`/api/user/${userId}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              name,
              email,
              password,
              image: base64Image,
            }),
          },
        );
        const responseData = await response.json();

        if (responseData.errorMessage) {
          toast.error(responseData.errorMessage, { id: loadingToastId });
        } else if (responseData.success) {
          router.refresh();
          toast.success('Your data updated!', { duration: 5000, id: loadingToastId });
          handleCloseData();
          handleCloseAvatar();
        } else {
          toast.error('Something went wrong...', { id: loadingToastId });
        }
      } catch (e) {
        console.error('Error while updating account', e);
        toast.error('Something went wrong...', { id: loadingToastId });
      }
    });
  }

  const handleClickAvatar = () => {
   setOpenAvatar(true);
  }

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleClickDelete = () => {
    setOpenDelete(true);
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  }

  const handleSubmitDelete = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`/api/user/${userId}`, { method: 'DELETE' },
      );
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
  }

  return (
    <>
    <Card>
      <CardHeader title={`Hello, ${userName}`} />
      <CardContent>
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="start"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={handleClickData}
            endIcon={<Edit />}
          >
            Change name, email and password
          </Button>
          <Button
            variant="outlined"
            onClick={handleClickAvatar}
            endIcon={<Edit />}
          >
            Upload avatar
          </Button>
          <Button
            variant="outlined"
            onClick={handleClickDelete}
            endIcon={<Edit />}
          >
            Delete account
          </Button>
        </Box>
      </CardContent>
    </Card>
    <Dialog
      open={openData}
      onClose={handleCloseData}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Change name, email and password</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseData}
          type="reset"
          variant="outlined"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!!passwordError || !!emailError || isPending}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      open={openAvatar}
      onClose={handleCloseAvatar}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Upload Profile Image</DialogTitle>
      <DialogContent>
        <input type="file" onChange={handleImageChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAvatar}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={!image}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      open={openDelete}
      onClose={handleCloseDelete}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmitDelete,
      }}
    >
      <DialogTitle>Delete your account?</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={isPending} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}