import { FastifyPluginAsync } from "fastify";
import Repository from "../../repositories/";
import { create } from "./create";
import { CreateNfsePayload } from "../../interfaces/createNfsePayload";
import { list } from "./list";
import listSchema from "../../schemas/list.json";
import { cancel } from "./cancel";

const nfses: FastifyPluginAsync = async (app, _opts): Promise<void> => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     NFSe:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         identificacao:
   *           $ref: '#/components/schemas/IdentificacaoNfse'
   *         prestador:
   *           $ref: '#/components/schemas/Tomador'
   *         tomador:
   *           $ref: '#/components/schemas/Tomador'
   *         servico:
   *           $ref: '#/components/schemas/Servico'
   *         status:
   *           type: string
   *           enum: *NfseStatus
   *       required:
   *       - id
   *       - identificacao
   *       - tomador
   *       - servico
   *       - companyId
   *       - status
   *
   *     CreateNfsePayload:
   *       type: object
   *       properties:
   *         companyId:
   *           $ref: '#/components/schemas/ID'
   *         identificacao:
   *           $ref: '#/components/schemas/IdentificacaoNfse'
   *         tomador:
   *           $ref: '#/components/schemas/Tomador'
   *         servico:
   *           $ref: '#/components/schemas/Servico'
   *       required:
   *       - companyId
   *       - identificacao
   *       - tomador
   *       - servico
   *     ID:
   *       type: string
   *       format: uuid
   *     Tomador:
   *       type: object
   *       properties:
   *         identificacao:
   *           $ref: "#/components/schemas/Identificacao"
   *         razaosocial:
   *           type: string
   *         endereco:
   *           $ref: "#/components/schemas/Endereco"
   *         contato:
   *           $ref: "#/components/schemas/Contato"
   *     Identificacao:
   *       type: object
   *       properties:
   *         cpfcnpj:
   *           type: string
   *           pattern: "([0-9]{2}?[0-9]{3}?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}?[0-9]{3}?[0-9]{3}?[0-9]{2})"
   *         inscricaomunicipal:
   *           type: string
   *       required:
   *         - cpfcnpj
   *     Contato:
   *       type: object
   *       properties:
   *         telefone:
   *           type: string
   *         email:
   *           type: string
   *       required:
   *         - telefone
   *         - email
   *     Endereco:
   *       type: object
   *       properties:
   *        endereco:
   *          type: string
   *        numero:
   *          type: string
   *        complemento:
   *          type: string
   *        bairro:
   *          type: string
   *        codigoMunicipio:
   *          type: string
   *        cidade:
   *          type: string
   *        uf:
   *          type: string
   *        cep:
   *          type: string
   *       required:
   *        - endereco
   *        - codigoMunicipio
   *     Valores:
   *       type: object
   *       properties:
   *         valorServicos:
   *           type: number
   *         valorDeducoes:
   *           type: number
   *         valorPis:
   *           type: number
   *         valorCofins:
   *           type: number
   *         valorInss:
   *           type: number
   *         valorIr:
   *           type: number
   *         valorCsll:
   *           type: number
   *         issRetido:
   *           type: boolean
   *         valorIss:
   *           type: number
   *         outrasRetencoes:
   *           type: number
   *         baseCalculo:
   *           type: number
   *         aliquota:
   *           type: number
   *         valorLiquidoNfse:
   *           type: number
   *         valorIssRetido:
   *           type: number
   *         descontoCondicionado:
   *           type: number
   *         descontoIncondicionado:
   *           type: number
   *       required:
   *         - valorServicos
   *         - baseCalculo
   *     Servico:
   *       type: object
   *       properties:
   *         valores:
   *           $ref: "#/components/schemas/Valores"
   *         itemListaServico:
   *           type: string
   *         codigoCnae:
   *           type: string
   *         codigoTributacaoMunicipio:
   *           type: string
   *         discriminacao:
   *           type: string
   *         codigoMunicipio:
   *           type: string
   *       required:
   *         - codigoMunicipio
   *         - discriminacao
   *         - valores
   *         - itemListaServico
   *     IdentificacaoNfse:
   *       type: object
   *       properties:
   *         numero:
   *           type: string
   *         naturezaOperacao:
   *           type: string
   *         regimeEspecialTributacao:
   *           type: string
   *           enum:
   *             - Microempresa municipal
   *             - Estimativa
   *             - Sociedade de profissionais
   *             - Cooperativa
   *         optanteSimplesNacional:
   *           type: boolean
   *         incetivadorCultural:
   *           type: boolean
   *         competencia:
   *           type: string
   *           format: date-time
   */

  /**
   * @swagger
   * definitions:
   *   KeyTypes:
   *     type: string
   *     enum: &KEY_TYPES
   *     - CPF
   *     - CNPJ
   *     - EMAIL
   *     - TELEFONE
   *     - CHAVE_ALEATORIA
   *   Status:
   *     type: string
   *     enum: &STATUS
   *     - VALIDADO
   *     - RASCUNHO
   *   NfseStatus:
   *     type: string
   *     enum: &NfseStatus
   *     - ENVIADO
   *     - EMITIDO
   *     - CANCELADO
   *     - ERROR
   *   Tomador:
   *     type: object
   *     properties:
   *       identificacao:
   *         $ref: "#/components/schemas/Identificacao"
   *       razaosocial:
   *         type: string
   *       endereco:
   *         $ref: "#/components/schemas/Endereco"
   *       contato:
   *         $ref: "#/components/schemas/Contato"
   *   Identificacao:
   *     type: object
   *     properties:
   *       cpfcnpj:
   *         type: string
   *         pattern: "([0-9]{2}?[0-9]{3}?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}?[0-9]{3}?[0-9]{3}?[0-9]{2})"
   *       inscricaomunicipal:
   *         type: string
   *     required:
   *       - cpfcnpj
   *   Contato:
   *     type: object
   *     properties:
   *       telefone:
   *         type: string
   *       email:
   *         type: string
   *     required:
   *       - telefone
   *       - email
   *   Endereco:
   *     type: object
   *     properties:
   *      endereco:
   *        type: string
   *      numero:
   *        type: string
   *      complemento:
   *        type: string
   *      bairro:
   *        type: string
   *      codigoMunicipio:
   *        type: string
   *      cidade:
   *        type: string
   *      uf:
   *        type: string
   *      cep:
   *        type: string
   *    required:
   *      - endereco
   *      - codigoMunicipio
   *   Valores:
   *     type: object
   *     properties:
   *       valorServicos:
   *         type: number
   *       valorDeducoes:
   *         type: number
   *       valorPis:
   *         type: number
   *       valorCofins:
   *         type: number
   *       valorInss:
   *         type: number
   *       valorIr:
   *         type: number
   *       valorCsll:
   *         type: number
   *       issRetido:
   *         type: boolean
   *       valorIss:
   *         type: number
   *       outrasRetencoes:
   *         type: number
   *       baseCalculo:
   *         type: number
   *       aliquota:
   *         type: number
   *       valorLiquidoNfse:
   *         type: number
   *       valorIssRetido:
   *         type: number
   *       descontoCondicionado:
   *         type: number
   *       descontoIncondicionado:
   *         type: number
   *     required:
   *       - valorServicos
   *       - baseCalculo
   *   Servico:
   *     type: object
   *     properties:
   *       valores:
   *         $ref: "#/components/schemas/Valores"
   *       itemListaServico:
   *         type: string
   *       codigoCnae:
   *         type: string
   *       codigoTributacaoMunicipio:
   *         type: string
   *       discriminacao:
   *         type: string
   *       codigoMunicipio:
   *         type: string
   *     required:
   *       - codigoMunicipio
   *       - discriminacao
   *       - valores
   *       - itemListaServico
   *   IdentificacaoNfse:
   *     type: object
   *     properties:
   *       naturezaOperacao:
   *         type: string
   *       regimeEspecialTributacao:
   *         type: string
   *         enum:s
   *           - Microempresa municipal
   *           - Estimativa
   *           - Sociedade de profissionais
   *           - Cooperativa
   *       optanteSimplesNacional:
   *         type: boolean
   *       incetivadorCultural:
   *         type: boolean
   *       competencia:
   *         type: string
   *         format: date-time
   */
  app.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    const nfse = await Repository.find(req.params.id);
    reply.send(nfse);
  });

  app.get("/", { schema: { querystring: listSchema } }, list);
  app.post<{ Body: CreateNfsePayload }>("/", create);
  app.post("/:id/cancel", cancel);
};

export default nfses;
