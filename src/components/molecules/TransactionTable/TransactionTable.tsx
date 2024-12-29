import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import AccountTransaction from '@/components/molecules/Accounts/AccountTransactionForm';
import {
  SerializedBudgetAccount,
  SerializedGoal,
  TypedIncomeAccount,
  TypedSpendAccount,
} from '@/types/budget';

interface EnrichedTransaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  fromTitle?: string;
  toTitle?: string;
  fromType?: string;
  toType?: string;
  fromAccountId: string;
  toAccountId: string;
}

interface TransactionTableProps {
  transactions: EnrichedTransaction[];
  budgetAccounts: SerializedBudgetAccount[];
  incomeAccounts: TypedIncomeAccount[];
  goalAccounts: SerializedGoal[];
  spendingAccounts: TypedSpendAccount[];
}

export default function TransactionTable({
  transactions,
  budgetAccounts,
  incomeAccounts,
  spendingAccounts,
  goalAccounts,
}: TransactionTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 4 }}
    >
      <Table aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
              >
                Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
              >
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
              >
                From
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
              >
                To
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
              >
                Type
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
              >
                Edit
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => {
            const { id, createdAt, amount, fromTitle, toTitle, fromType, toType } = transaction;
            let transactionType = '';

            if (transaction.fromType === 'Income') {
              transactionType = 'Income';
            } else if (fromType === 'Debt' && ['Debit', 'Credit'].includes(toType!)) {
              transactionType = 'Borrowing';
            } else if (['Debit', 'Credit', 'Goal'].includes(fromType!) && toType === 'Debt') {
              transactionType = 'Repaying';
            } else if (
              ['Debit', 'Credit', 'Goal', 'Debt'].includes(fromType!) &&
              ['Debit', 'Credit', 'Goal', 'Debt'].includes(toType!)
            ) {
              transactionType = 'Transfer';
            } else if (
              ['Debit', 'Credit', 'Debt'].includes(fromType!) &&
              toType === 'Spending Category'
            ) {
              transactionType = 'Spending';
            }

            return (
              <TableRow key={id}>
                <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
                <TableCell>${amount.toFixed(2)}</TableCell>
                <TableCell>{fromTitle}</TableCell>
                <TableCell>{toTitle}</TableCell>
                <TableCell>
                  <Chip
                    label={transactionType}
                    color={
                      transactionType === 'Income' || transactionType === 'Repaying'
                        ? 'success'
                        : transactionType === 'Borrowing'
                          ? 'warning'
                          : transactionType === 'Transfer'
                            ? 'info'
                            : transactionType === 'Spending'
                              ? 'default'
                              : undefined
                    }
                  />
                </TableCell>
                <TableCell>
                  <AccountTransaction
                    budgetAccounts={budgetAccounts}
                    incomeAccounts={incomeAccounts}
                    spendingAccounts={spendingAccounts}
                    goalAccounts={goalAccounts}
                    propAmount={transaction.amount}
                    propDescription={transaction.description}
                    fromId={transaction.fromAccountId}
                    toId={transaction.toAccountId}
                    transactionId={transaction.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
