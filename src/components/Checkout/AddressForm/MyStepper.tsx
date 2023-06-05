import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import {FC, ReactElement, useState} from 'react'
import AddressForm from './AddressForm'
import {AddressType} from '../../../features/addresses/models/Address'
import {StepIconProps} from '@mui/material'
import {CheckCircle} from '@mui/icons-material'
import BusinessIcon from '@mui/icons-material/Business';
import VillaIcon from '@mui/icons-material/Villa';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const steps = [
    {
      label: 'Delivery Address',
      component: <AddressForm addressType={AddressType.DELIVERY} handleNext={handleNext} activeStep={activeStep} handleBack={handleBack} numberOfSteps={3}/>,
    },
    {
      label: 'Billing Address',
      component: <AddressForm addressType={AddressType.BILLING} handleNext={handleNext} activeStep={activeStep} handleBack={handleBack} numberOfSteps={3}/>,
    },
    {
      label: 'Payment and Delivery',
      component: <Typography>Try out different</Typography>,
    },
  ];

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel optional=
                         {index === 2
                           ? (<Typography variant="caption">Last step</Typography>)
                           : null}
                        onClick={() => {setActiveStep(index)}}
                       StepIconComponent={CustomStepIcons}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{px: {xs:0.5,md:3}, paddingTop: 1.7}}>
                {step.component}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default MyStepper;

const CustomStepIcons:FC<StepIconProps> = ({active,icon,completed} ) => {

  const icons: { [index: string]: ReactElement } = {
    1: completed ? <CheckCircle color={'primary'} /> : <VillaIcon color={active ? 'primary' : 'secondary'}/>,
    2: completed ? <CheckCircle color={'primary'} /> : <BusinessIcon color={active ? 'primary' : 'secondary'}/>,
    3: completed ? <CheckCircle color={'primary'} /> : <LocalShippingIcon color={active ? 'primary' : 'secondary'}/>,
  };

  return (
    <>
      {icons[String(icon)]}
    </>
  )
}
