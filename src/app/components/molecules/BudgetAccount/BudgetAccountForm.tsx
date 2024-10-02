'use client';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from '@mui/material';
import { BudgetAccount } from '@prisma/client';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { IconSelect, IconRenderrer } from '@/app/components/molecules/IconSelect/IconSelect';
import { accountTypes } from '@/constants/content';

export default function BudgetAccountForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('0');
  const [type, setType] = useState('Debit');
  const [icon, setIcon] = useState('');
  const [isPending, startTransition] = useTransition();

  const [budgetAccounts, setBudgetAccounts] = useState<{
    incomeAccounts: BudgetAccount[];
    debtCreditDebitGoalAccounts: BudgetAccount[];
    spendingCategories: BudgetAccount[];
  } | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const loadingToastId = toast.info('Hand tight - we are creating budget account for ya...');

    startTransition(async () => {
      const response = await fetch('/api/budgetAccount/create', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          icon,
          monthlyLimit,
          type,
          currentBalance: 0,
        }),
      });
      const responseData = await response.json();
      toast.dismiss(loadingToastId);

      if (responseData.errorMessage) {
        toast.error(responseData.errorMessage);
      } else if (responseData.success) {
        toast.success('Your budget account created!', { duration: 5000 });
        handleClose();
      } else {
        toast.error('Something went wrong...');
      }
    });
  };

  useEffect(() => {
    async function getAccounts() {
      const response = await fetch('/api/budgetAccount/get', { method: 'GET' });

      try {
        const data = await response.json();

        const incomeAccounts = data.filter((account: BudgetAccount) => account.type === 'Income');
        const debtCreditDebitGoalAccounts = data.filter((account: BudgetAccount) =>
          ['Debit', 'Credit', 'Debt', 'Goal'].includes(account.type),
        );
        const spendingCategories = data.filter(
          (account: BudgetAccount) => account.type === 'SpendingCategory',
        );

        setBudgetAccounts({
          incomeAccounts,
          debtCreditDebitGoalAccounts,
          spendingCategories,
        });
      } catch (error) {
        console.error('error during parsing json', error);
      }
    }
    getAccounts();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          justifyContent={'space-between'}
          display={'flex'}
        >
          <Typography variant="h5">Your budget accounts</Typography>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            endIcon={<AddIcon />}
          >
            Create Budget Account
          </Button>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        {[
          { accounts: budgetAccounts?.incomeAccounts, title: 'Income Accounts' },
          {
            accounts: budgetAccounts?.debtCreditDebitGoalAccounts,
            title: 'Debt/Credit/Debit/Goal Accounts',
          },
          { accounts: budgetAccounts?.spendingCategories, title: 'Spending Categories' },
        ].map((group, index) => {
          return (
            <Box key={index}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center' }}
              >
                {group.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 1,
                  flexWrap: 'wrap',
                }}
              >
                {group.accounts?.map(account => {
                  return (
                    <Card
                      key={account.id}
                      sx={{ width: 150, height: 150, marginBottom: 1, marginRight: 1 }}
                    >
                      <CardHeader
                        title={
                          account.icon ? (
                            <Box
                              display="flex"
                              alignItems="center"
                            >
                              <IconRenderrer iconName={account.icon} />
                              <Box ml={1}>{account.title}</Box>
                            </Box>
                          ) : (
                            account.title
                          )
                        }
                      />
                      <CardContent>{`Limit: ${account.monthlyLimit}`}</CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          );
        })}
        <Divider />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Budget Account</DialogTitle>
        <DialogContent>
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
            disabled={isPending}
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
            disabled={isPending}
          />
          <IconSelect
            icon={icon}
            setIcon={setIcon}
          />
          <TextField
            id="monthlyLimit"
            name="monthlyLimit"
            margin="dense"
            label="Monthly Limit"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={0}
            required
            value={monthlyLimit}
            onChange={e => setMonthlyLimit(e.target.value)}
            disabled={isPending}
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
              defaultValue="Debit"
              required
              value={type}
              onChange={e => setType(e.target.value)}
              disabled={isPending}
            >
              {accountTypes.map(option => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            type="reset"
            variant="outlined"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
