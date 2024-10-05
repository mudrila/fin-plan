import { DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import IconSelect from '@/app/components/molecules/IconSelect/IconSelect';
import { accountTypes } from '@/constants/content';
import { BudgetAccountDialogProps } from '@/types/budget';

export default function BudgetAccountDialog({
  title,
  setTitle,
  description,
  setDescription,
  icon,
  setIcon,
  monthlyLimit,
  setMonthlyLimit,
  type,
  setType,
  isPending,
}: BudgetAccountDialogProps) {
  return (
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
  );
}
