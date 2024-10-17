import { toast } from 'sonner';

export const submitFunction = async (
  url: string,
  method: string,
  bodyData: object,
  successMessage: string,
  errorMessage: string,
  loadingMessage: string,
  onSuccess: () => void,
  handleClose: () => void,
) => {
  const loadingToastId = toast.loading(loadingMessage);

  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(bodyData),
    });
    const responseData = await response.json();

    if (responseData.errorMessage) {
      toast.error(responseData.errorMessage, { id: loadingToastId });
    } else if (responseData.success) {
      toast.success(successMessage, { duration: 5000, id: loadingToastId });
      onSuccess();
      handleClose();
    } else {
      toast.error(errorMessage, { id: loadingToastId });
    }
  } catch (e) {
    console.error(errorMessage, e);
    toast.error(errorMessage, { id: loadingToastId });
  }
};
