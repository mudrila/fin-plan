import { getBudgetAccountTitle, getBudgetAccountType } from "@/utils/getBudgetAccountInfo";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Chip } from "@mui/material";
import { BudgetAccountTransaction, BudgetAccountType } from "@prisma/client";

interface TransactionTableProps {
	transactions: BudgetAccountTransaction[];
  edit?: boolean;
}

export default function TransactionTable({ transactions, edit }: TransactionTableProps){

	return (
		<TableContainer component={Paper} sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 4 }}>
      <Table aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle2" fontWeight="bold">Date</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" fontWeight="bold">Amount</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" fontWeight="bold">From</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" fontWeight="bold">To</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" fontWeight="bold">Type</Typography></TableCell>
            {/* {edit ? (
              <TableCell><Typography variant="subtitle2" fontWeight="bold">Edit</Typography></TableCell>
            ): (
              undefined
            )}                    ADD EDIT*/}
          </TableRow>
        </TableHead>
        <TableBody>
					{transactions.map(async (transaction) => {
            const fromTitle = await getBudgetAccountTitle(transaction.fromBudgetAccountId);
            const toTitle = await getBudgetAccountTitle(transaction.toBudgetAccountId);
						const fromType = await getBudgetAccountType(transaction.fromBudgetAccountId);
						const toType = await getBudgetAccountType(transaction.toBudgetAccountId);

						let transactionType = 'Income';

						if (fromType === 'Income') {
							transactionType = 'Income'
						}
            else if ((fromType === 'Debt') && ['Debit', 'Credit'].includes(toType)) {
              transactionType = 'Borrowing'
            }
            else if (['Debit', 'Credit', 'Goal'].includes(fromType) && (toType === 'Debt')) {
              transactionType = 'Repaying'
            }
            else if (['Debit', 'Credit', 'Goal'].includes(fromType) && ['Debit', 'Credit', 'Goal'].includes(toType)) {
              transactionType = 'Transfer'
            }
            else if (['Debit', 'Credit', 'Debt'].includes(fromType) && (toType === 'Spending Category')) {
              transactionType = 'Spending'
            }

            return (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{fromTitle}</TableCell>
                <TableCell>{toTitle}</TableCell>
                <TableCell>
                <Chip 
                  label={transactionType} 
                  color={
                    transactionType === 'Income' || transactionType === 'Repaying' ? 'success' : 
                    transactionType === 'Borrowing' ? 'warning' : 
                    transactionType === 'Transfer' ? 'info' : 
                    transactionType === 'Spending' ? 'default' : undefined
                  } 
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
