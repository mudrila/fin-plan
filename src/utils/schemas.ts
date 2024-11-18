import { z } from 'zod';
import { accountTypes } from '@/constants/content';

const budgetAccountTypeEnum = z.enum(accountTypes);
export const budgetAccountSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  type: budgetAccountTypeEnum.default('Debit'),
  currentBalance: z.preprocess(val => Number(val), z.number()),
  userId: z.string().min(1),
});

export const incomeAccountSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  userId: z.string().min(1),
});

export const goalAccountSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  monthlyTarget: z.preprocess(
    val => Number(val),
    z.number().min(0, 'Monthly target must be a positive number'),
  ),
  currentBalance: z.preprocess(val => Number(val), z.number()),
  userId: z.string().min(1),
});
