import { Router } from "express";
import { CriaEmpresaController } from "./modules/empresa/criaEmpresa/CriaEmpresaController";
import { BuscaEmpresaController } from "./modules/empresa/buscaEmpresa/BuscaEmpresaController";
import { EditaEmpresaController } from "./modules/empresa/editaEmpresa/EditaEmpresaController";
import { DeletaEmpresaController } from "./modules/empresa/deletaEmpresa/DeletaEmpresaController";

const routes = Router()

const criaEmpresaController = new CriaEmpresaController()
const buscaEmpresaController = new BuscaEmpresaController()
const editaEmpresaController = new EditaEmpresaController()
const deletaEmpresaController = new DeletaEmpresaController()

routes.post('/empresa/criar', criaEmpresaController.handle)
routes.get('/empresa/buscar', buscaEmpresaController.handle)
routes.put('/empresa/editar/:id', editaEmpresaController.handle)
routes.delete('/empresa/deletar/:id', deletaEmpresaController.handle)

export { routes }