import Page from "src/modules/@shared/components/page"
import { Nfse } from "src/modules/dashboard/domain/entities/nfse"
import useDefaultRenderer, { ColumnOf } from "src/modules/@shared/components/list-pagination/renderers/default/default-renderer"
import useListPagination from "src/modules/@shared/hooks/use-list-pagination"
import nfseService from "src/modules/dashboard/services/nfse-service"
import ListPagination from "src/modules/@shared/components/list-pagination"
import { RenderNfseRow } from "src/modules/dashboard/components/nfse/list/render-nfse-row"

export default function NfseListPage(){
  const columns: Array<ColumnOf<Nfse>> = [
    {
      key: 'identificacao.numero',
      label: 'Codigo',
      align: 'left',
      width: '15%'
    },
    {
      key: 'status',
      label: 'Status',
      align: 'left',
      width: '10%'
    },
    {
      key: 'tomador.razaosocial',
      label: 'Razão Social Tomador',
      align: 'left',
      width: '25%'
    },
    {
      key: 'prestador.razaosocial',
      label: 'Razão Social Prestador',
      align: 'left',
      width: '25%'
    },
    {
      key: 'identificacao.competencia',
      label: 'Competencia',
      align: 'left',
      width: '10%'
    },
    {
      key: null,
      label: 'Acoes',
      align: 'right',
      width: '15%'
    }
  ]

  const pagination = useListPagination<Nfse>({
    getter: nfseService.list.bind(nfseService),
    defaultOrder: 'desc',
    defaultOrderBy: 'id'
   })

  const { generator } = useDefaultRenderer({ 
    renderTableRow: (props) => 
      <RenderNfseRow 
        key={props.element.id}
        {...props} 
      />,
    defaultDense: false,
    columns
  })

  return (
    <Page title="Nota Tech | Lista">
      <ListPagination<Nfse>
        {...pagination}
        renderer={generator}
      />
    </Page>
  )
}