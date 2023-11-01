import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Page from "src/modules/@shared/components/page";
import { Nfse } from "src/modules/dashboard/domain/entities/nfse";
import nfseService from "src/modules/dashboard/services/nfse-service";

export default function NfseView() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const [nfse, setNfse] = useState<Nfse>();

  useEffect(() => {
    nfseService.get(Number(id))
      .then(setNfse)
  }, [])

  return (
    <Page title={`Nfse | Visualizar`}>
      <Card sx={{ mb: 3 }}>
        Testando
      </Card>
    </Page>
  )
}