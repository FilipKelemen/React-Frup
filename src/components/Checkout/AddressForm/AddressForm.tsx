import React, {FC} from 'react';
import {AddressFormInformation, AddressType} from '../../../features/addresses/models/Address'
import {useForm, useWatch} from 'react-hook-form'
import Button from '@mui/material/Button'
import {CountryInSelect} from '../../../features/addresses/models/CountryInSelect'
import {useGetCartQuery} from '../../../features/cart/cartAPI/cartAPI'
import {useAppSelector} from '../../../app/store/hooks'
import {selectUserCartId} from '../../../features/authentication/authenticationSlice'
import {useUpdateAddressMutation} from '../../../features/addresses/addressesAPI/addressesAPI'
import {LoadingButton} from '../../../theme/custom-components/LoadingButton'
import NameField from './Fields/NameField'
import EmailField from './Fields/EmailField'
import {COUNTRIES} from '../../../features/addresses/constants'
import CountryField from './Fields/CountryField'
import SubRegionField from './Fields/SubRegionField'
import StreetField from './Fields/StreetField'
import PhoneNumberField from './Fields/PhoneNumberField'
import PostalCodeField from './Fields/PostalCodeField'
import CompanyField from './Fields/CompanyField'
import {Grid} from '@mui/material'

const ITEM_ROW_RULES = { xs:12, md: 6 }

const AddressForm: FC<{addressType: AddressType,handleNext: () => void,handleBack: () => void,activeStep: number,numberOfSteps: number}> = ({addressType,handleNext,handleBack,numberOfSteps,activeStep}) => {
  const cartId = useAppSelector(selectUserCartId)
  const { data: cartCache } = useGetCartQuery(cartId);
  const [updateAddress,{isLoading,isSuccess}] = useUpdateAddressMutation()
   const {handleSubmit, control, formState: {errors}} = useForm<AddressFormInformation>({
     mode: 'onChange',
     defaultValues: {
       country: COUNTRIES.find(country => country.label === cartCache?.cart[`${addressType}Address`]?.country) ?? {phone: '',label:'',code:''}
     }
   });
   const onSubmit = async (addressFormData: AddressFormInformation) => {
     const normalizedAddressFormData = {
       ...addressFormData,
       country: addressFormData.country.label,
     }
     const updatedAddressPromise = updateAddress({cartId,address: normalizedAddressFormData, addressType: addressType})
     //rtk behaves oddly, when a promise rejects with an error, it still thinks it got a valid value
     const resultThatMayBeAnError = await updatedAddressPromise.catch(error => {console.error(error)})
     if(!(resultThatMayBeAnError as {error: any}).error) {
       await new Promise(r => setTimeout(r, 400));
       handleNext()
     }
   }
  const countryValue: CountryInSelect = useWatch({
    control,
    name: 'country',
    defaultValue: COUNTRIES.find(country => country.label === cartCache?.cart[`${addressType}Address`]?.country) ?? {phone: '',label:'',code:''}
  });
  return (
        <form id='hook-form' onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item {...ITEM_ROW_RULES}>
              <NameField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].firstName} nameError={errors.firstName} name='firstName' label='First Name'/>
            </Grid>
            <Grid {...ITEM_ROW_RULES} item>
              <NameField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].lastName} nameError={errors.lastName} name='lastName' label='Last Name'/>
            </Grid>
            <Grid item {...ITEM_ROW_RULES}>
              <EmailField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].email} emailError={errors.email} label={'Email'}/>
            </Grid>
            <Grid {...ITEM_ROW_RULES} item>
              <CountryField control={control} countryErrors={errors.country} label={'Country'}/>
            </Grid>
            <Grid item {...ITEM_ROW_RULES}>
              <SubRegionField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].state} subRegionError={errors.state} name={'state'} label={'State'}/>
            </Grid>
            <Grid item {...ITEM_ROW_RULES}>
              <SubRegionField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].city} subRegionError={errors.city} name={'city'} label={'City'}/>
            </Grid>
            <Grid item xs={12}>
              <StreetField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].completeStreet} streetError={errors.completeStreet} label={'Complete Street'}/>
            </Grid>
            <Grid item {...ITEM_ROW_RULES}>
             <PhoneNumberField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].phoneNumber} countryValue={countryValue} phoneNumberError={errors.phoneNumber} label={'Phone no.'}/>
            </Grid>
            <Grid item {...ITEM_ROW_RULES}>
              <PostalCodeField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].postalCode} postalCodeError={errors.postalCode} label={'Postal Code'}/>
            </Grid>
            <Grid item xs={12}>
              <CompanyField control={control} defaultValue={cartCache?.cart[`${addressType}Address`].company} companyError={errors.company} label={'Company (optional)'}/>
            </Grid>
            <Grid container item xs={12} md={6} gap={{xs:0,md:3}} justifyContent={{xs:'space-between',md:'normal'}} marginX={{sm:8,md:0}} marginTop={2.7}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <LoadingButton buttonProps={{
                  color: 'primary', variant: 'contained', disableElevation: true, type: 'submit', form: 'hook-form'
                }}
                               loading={isLoading}
                               done={isSuccess}>
                  {activeStep === numberOfSteps - 1 ? 'Finish' : 'Continue'}
                </LoadingButton>
            </Grid>
          </Grid>
        </form>
  );
};

export default AddressForm;
