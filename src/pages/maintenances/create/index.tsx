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

import { createMaintenance } from 'apiSdk/maintenances';
import { maintenanceValidationSchema } from 'validationSchema/maintenances';
import { StorageUnitInterface } from 'interfaces/storage-unit';
import { getStorageUnits } from 'apiSdk/storage-units';
import { MaintenanceInterface } from 'interfaces/maintenance';

function MaintenanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MaintenanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMaintenance(values);
      resetForm();
      router.push('/maintenances');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MaintenanceInterface>({
    initialValues: {
      maintenance_date: new Date(new Date().toDateString()),
      maintenance_type: '',
      description: '',
      cost: 0,
      storage_unit_id: (router.query.storage_unit_id as string) ?? null,
    },
    validationSchema: maintenanceValidationSchema,
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
              label: 'Maintenances',
              link: '/maintenances',
            },
            {
              label: 'Create Maintenance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Maintenance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="maintenance_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Maintenance Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.maintenance_date ? new Date(formik.values?.maintenance_date) : null}
              onChange={(value: Date) => formik.setFieldValue('maintenance_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.maintenance_type}
            label={'Maintenance Type'}
            props={{
              name: 'maintenance_type',
              placeholder: 'Maintenance Type',
              value: formik.values?.maintenance_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Cost"
            formControlProps={{
              id: 'cost',
              isInvalid: !!formik.errors?.cost,
            }}
            name="cost"
            error={formik.errors?.cost}
            value={formik.values?.cost}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<StorageUnitInterface>
            formik={formik}
            name={'storage_unit_id'}
            label={'Select Storage Unit'}
            placeholder={'Select Storage Unit'}
            fetcher={getStorageUnits}
            labelField={'size'}
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
              onClick={() => router.push('/maintenances')}
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
    entity: 'maintenance',
    operation: AccessOperationEnum.CREATE,
  }),
)(MaintenanceCreatePage);
