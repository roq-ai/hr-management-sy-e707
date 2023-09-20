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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getMaintenanceById, updateMaintenanceById } from 'apiSdk/maintenances';
import { maintenanceValidationSchema } from 'validationSchema/maintenances';
import { MaintenanceInterface } from 'interfaces/maintenance';
import { StorageUnitInterface } from 'interfaces/storage-unit';
import { getStorageUnits } from 'apiSdk/storage-units';

function MaintenanceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<MaintenanceInterface>(
    () => (id ? `/maintenances/${id}` : null),
    () => getMaintenanceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MaintenanceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMaintenanceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/maintenances');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<MaintenanceInterface>({
    initialValues: data,
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
              label: 'Update Maintenance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Maintenance
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(MaintenanceEditPage);
