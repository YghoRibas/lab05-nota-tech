import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom"
import Page from "src/modules/@shared/components/page"
import FormProvider from "src/modules/@shared/providers/form-provider";
import { Nfse } from "src/modules/dashboard/domain/entities/nfse"
import nfseService from "src/modules/dashboard/services/nfse-service";
import { SchemaType } from "src/modules/@shared/domain/utils/schema-type";
import { Button, Card } from "@mui/material";
import NfseDetails from "src/modules/dashboard/components/nfse/edit-add/nfse-details";
import { useSnackbar } from "notistack";

export default function NfseEditAddPage() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit')

  const subtitle = isEdit ?
    'Editar' : 'Criar';

  const [nfse, setNfse] = useState<Nfse>();

  useEffect(() => {
    if (!isEdit) return;

    nfseService.get(Number(id))
      .then(setNfse)
  }, [])

  const nfseSchema = Yup.object({
    test: Yup.object({
      name: Yup
        .string()
    })
  });

  type NfseSchemaType = SchemaType<typeof nfseSchema>

  const methods = useForm({
    resolver: yupResolver(nfseSchema),
    defaultValues: {}
  })

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    if (!nfse) return;
  }, [nfse])

  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = (values: NfseSchemaType) => {
    // isEdit ? 
    //   nfseService.edit(({
    //     ...values,
    //     id: Number(id),
    //     test: { name: '' }
    //   })) : 
    //   nfseService.create(({
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
          <NfseDetails id={Number(id)} />
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