# Código do projeto

### Payment-Service
#### Regras de Negócio
1. Quando criar um pagamento normal, o *status* tem que ser **Processado**.
2. Caso for por meio de Pix, o pagamento vai ser **Processando** e o tipo pagamento *pix*. Quando identificar o pagamento PIX, atualizar para **Processado**.
3. Quando um pagamento for do tipo *pix*, não poderá modificar o valor do pagamento depois de **Processado**.
4. Não vai ser emitido uma NFS-e logo após o registro de um pagamento. Haverá uma ação onde o usuário poderá solicitar que seja gerado uma NFS-e para o pagamento selecionado.
5. Quando solicitado a emissão, o pagamento deverá ter um campo identificando a NFS-e e seu ciclo de vinda.
6. Os pagamentos só serão editáveis ou deletáveis quando não for solicitado a geração de uma NFS-e ou se o *status* da geração for **Error**.


### Company-Service
#### Inteface do Company e Client
```typescript
/** Representa informações de uma empresa. */
export interface Company {
  /**Identificador único da empresa. */
  id: string;
  /**Nome legal da empresa. */
  razaoSocial: string;
  /**Número do Cadastro Nacional da Pessoa Jurídica (CNPJ) da empresa. */
  cnpj: string;
  /**Número de registro municipal da empresa (opcional). */
  registroMunicipal?: string;
  /**Informações sobre o endereço da empresa (do tipo Endereco). */
  endereco: Endereco;
  /**Regime especial de tributação da empresa. */
  regimeEspecialTributacao: RegimeEspecialTributacao;
  /**Indica se a empresa é optante pelo Simples Nacional. */
  optanteSimplesNacional: boolean;
  /**Indica se a empresa é um incentivador cultural. */
  incetivadorCultural: boolean;
  /**Informações de contato da empresa. */
  contato: Contato;
  /**Lista de clientes associados à empresa. */
  clientes: Client[];
}

/**Representa informações de um cliente. */
export interface Client {
  /**ID do cliente */
  id: string;
  /**Nome do cliente. */
  nome: string;
  /**Número do CPF ou CNPJ do cliente. */
  cpfCnpj: string;
  /**Número de registro municipal do cliente (opcional). */
  registroMunicipal?: string;
  /**Informações sobre o endereço do cliente (do tipo Endereco). */
  endereco: Endereco;
  /**Informações de contato do cliente. */
  contato: Contato;
}

/**Representa informações de um endereço. */
export interface Endereco {
  /**Rua ou endereço. */
  endereco?: string;
  /**Número do endereço. */
  numero?: string;
  /**Complemento do endereço. */
  complemento?: string;
  /**Bairro. */
  bairro?: string;
  /**Código do município. */
  codigoMunicipio: string;
  /**Nome da cidade. */
  cidade?: string;
  /**Unidade federativa (estado). */
  uf?: string;
  /**Código de Endereçamento Postal (CEP). */
  cep?: string;
}

/**Representa informações de contato. */
export interface Contato {
  /**Número de telefone de contato. */
  telefone: string;
  /**Endereço de e-mail de contato. */
  email: string;
}
```
