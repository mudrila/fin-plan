import prisma from "./prisma"

async function getBudgetAccount(id:string) {
	const budgetAccount = await prisma.budgetAccount.findFirst({
    where: { id },
  });

	return budgetAccount;
}

export async function getBudgetAccountTitle(id: string) {
	const budgetAccount = await getBudgetAccount(id);

	return budgetAccount?.title
};

export async function getBudgetAccountType(id: string) {
	const budgetAccount = await getBudgetAccount(id);

	return String(budgetAccount?.type)
};
