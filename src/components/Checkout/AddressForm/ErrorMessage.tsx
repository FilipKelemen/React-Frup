import {FC} from 'react';
import Typography from '@mui/material/Typography'
import {FieldError} from 'react-hook-form'

const ErrorMessage: FC<{error: FieldError | undefined}> = ({ error }) => {
  return (
    <>
      {error && <Typography marginTop={0.1} fontSize={'small'}>{error.message}</Typography>}
    </>
  );
};

export default ErrorMessage;