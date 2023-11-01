import Page from "src/modules/@shared/components/page"
import { Payment } from "src/modules/dashboard/domain/entities/payment"
import useDefaultRenderer, { ColumnOf } from "src/modules/@shared/components/list-pagination/renderers/default/default-renderer"
import useListPagination from "src/modules/@shared/hooks/use-list-pagination"
import paymentService from "src/modules/dashboard/services/payment-service"
import ListPagination from "src/modules/@shared/components/list-pagination"
import { RenderPaymentRow } from "src/modules/dashboard/components/payment/list/render-payment-row"

export default function PaymentListPage(){
  const columns: Array<ColumnOf<Payment>> = [
    {
      key: '_id',
      label: 'Codigo',
      align: 'left',
      width: '15%'
    },
    {
      key: null,
      label: 'Acoes',
      align: 'right',
      width: '15%'
    }
  ]

  const pagination = useListPagination<Payment>({
    getter: paymentService.list.bind(paymentService),
    defaultOrder: 'desc',
    defaultOrderBy: '_id'
   })

  const { generator } = useDefaultRenderer({ 
    renderTableRow: (props) => 
      <RenderPaymentRow 
        key={props.element._id}
        {...props} 
      />,
    defaultDense: false,
    columns
  })

  return (
    <Page title="Nota Tech | Lista">
      <ListPagination<Payment>
        {...pagination}
        renderer={generator}
      />
    </Page>
  )
}