import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom"
import Page from "src/modules/@shared/components/page"
import FormProvider from "src/modules/@shared/providers/form-provider";
import { Payment } from "src/modules/dashboard/domain/entities/payment"
import paymentService from "src/modules/dashboard/services/payment-service";
import { SchemaType } from "src/modules/@shared/domain/utils/schema-type";
import { Button, Card } from "@mui/material";
import PaymentDetails from "src/modules/dashboard/components/payment/edit-add/payment-details";
import { useSnackbar } from "notistack";

export default function PaymentEditAddPage() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit')

  const subtitle = isEdit ?
    'Editar' : 'Criar';

  const [payment, setPayment] = useState<Payment>();

  useEffect(() => {
    if (!isEdit) return;

    paymentService.get(Number(id))
      .then(setPayment)
  }, [])

  const paymentSchema = Yup.object({
    test: Yup.object({
      name: Yup
        .string()
    })
  });

  type PaymentSchemaType = SchemaType<typeof paymentSchema>

  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {}
  })

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    if (!payment) return;
  }, [payment])

  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = (values: PaymentSchemaType) => {
    // isEdit ? 
    //   paymentService.edit(({
    //     ...values,
    //     id: Number(id),
    //     test: { name: '' }
    //   })) : 
    //   paymentService.create(({
    //     ...values,
    //     test: { name: '' }
    //   }));

    enqueueSnackbar({ 
      message: `${isEdit ? 'Editado' : 'Criado'} com sucesso`,
      transitionDuration: 500 
    })
  }

  return (
    <Page title={`Nota Tech | ${subtitle}`}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleOnSubmit)}>
        <Card sx={{ mb: 3 }}>
          <PaymentDetails id={Number(id)} />
        </Card>

        <Button
          size="large"
          type="submit"
          variant="contained"
          sx={{ 
            background: 'red',
            '&:hover': {
              background: 'rgb(183, 24, 51)'
            }
          }}
        >
          Salvar
        </Button>
      </FormProvider>
    </Page>
  )
}