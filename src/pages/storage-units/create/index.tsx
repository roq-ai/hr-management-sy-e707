import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createStorageUnit } from 'apiSdk/storage-units';
import { storageUnitValidationSchema } from 'validationSchema/storage-units';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { StorageUnitInterface } from 'interfaces/storage-unit';

function StorageUnitCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StorageUnitInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStorageUnit(values);
      resetForm();
      router.push('/storage-units');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StorageUnitInterface>({
    initialValues: {
      unit_number: 0,
      size: '',
      availability_status: false,
      rent_price: 0,
      last_maintenance_date: new Date(new Date().toDateString()),
      business_id: (router.query.business_id as string) ?? null,
    },
    validationSchema: storageUnitValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Storage Units',
              link: '/storage-units',
            },
            {
              label: 'Create Storage Unit',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Storage Unit
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Unit Number"
            formControlProps={{
              id: 'unit_number',
              isInvalid: !!formik.errors?.unit_number,
            }}
            name="unit_number"
            error={formik.errors?.unit_number}
            value={formik.values?.unit_number}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('unit_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.size}
            label={'Size'}
            props={{
              name: 'size',
              placeholder: 'Size',
              value: formik.values?.size,
              onChange: formik.handleChange,
            }}
          />

          <FormControl
            id="availability_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.availability_status}
          >
            <FormLabel htmlFor="switch-availability_status">Availability Status</FormLabel>
            <Switch
              id="switch-availability_status"
              name="availability_status"
              onChange={formik.handleChange}
              value={formik.values?.availability_status ? 1 : 0}
            />
            {formik.errors?.availability_status && (
              <FormErrorMessage>{formik.errors?.availability_status}</FormErrorMessage>
            )}
          </FormControl>

          <NumberInput
            label="Rent Price"
            formControlProps={{
              id: 'rent_price',
              isInvalid: !!formik.errors?.rent_price,
            }}
            name="rent_price"
            error={formik.errors?.rent_price}
            value={formik.values?.rent_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('rent_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_maintenance_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Maintenance Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_maintenance_date ? new Date(formik.values?.last_maintenance_date) : null}
              onChange={(value: Date) => formik.setFieldValue('last_maintenance_date', value)}
            />
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'business_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/storage-units')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'storage_unit',
    operation: AccessOperationEnum.CREATE,
  }),
)(StorageUnitCreatePage);
