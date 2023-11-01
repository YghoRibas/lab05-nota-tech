import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Page from "src/modules/@shared/components/page";
import { Payment } from "src/modules/dashboard/domain/entities/payment";
import paymentService from "src/modules/dashboard/services/payment-service";

export default function PaymentView() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const [payment, setPayment] = useState<Payment>();

  useEffect(() => {
    paymentService.get(Number(id))
      .then(setPayment)
  }, [])

  return (
    <Page title={`Payment | Visualizar`}>
      <Card sx={{ mb: 3 }}>
        Testando
      </Card>
    </Page>
  )
}