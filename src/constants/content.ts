export const APP_SHORT_NAME = 'YFP';
export const APP_NAME = 'Your Financial Plan';
export const APP_DESCRIPTION = 'Budgetting and Financial Planning made easy';
export const PROD_DOMAIN = 'https://yfp.io';

export const GITHUB_NAME = 'mudrila';
export const TWITTER_NAME = 'klimenkomud';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

export const accountTypes = [
  'Income',
  'Debt',
  'SpendingCategory',
  'Credit',
  'Debit',
  'Goal',
] as const;
