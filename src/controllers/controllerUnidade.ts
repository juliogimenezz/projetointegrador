import { Request, Response } from "express"
import { ServiceUnidades } from "../services/servicesUnidade"

const service = new ServiceUnidades()

export class ControllerUnidade {
  async create(request: Request, response: Response) {
    const { descricao_unidade, carga_horaria_unidade, ordem, fk_curso } = request.body
    const result = await service.create(descricao_unidade, carga_horaria_unidade, ordem, fk_curso)
    if (result instanceof Error) {
      return response.status(409).json(result.message)
    }
    return response.status(200).json(result)
  }

  async readAll(request: Request, response: Response) {
    const result = await service.readAll()
    if (result.length < 1) {
      return response.status(204).json("Nenhuma unidade Cadastrada")
    }
    return response.status(200).json(result)
  }

  async readOne(request: Request, response: Response) {
    const { id_unidade } = request.params
    const result = await service.readOne({ id_unidade })
    if (result instanceof Error) {
      return response.status(404).json(result.message)
    }
    return response.status(200).json(result)
  }

  async update(request: Request, response: Response) {
    const { id_unidade } = request.params
    const { descricao_unidade, carga_horaria_unidade, ordem, fk_curso } = request.body
    const result = await service.update(
      id_unidade,
      descricao_unidade,
      carga_horaria_unidade,
      ordem,
      fk_curso
    )
    if (result instanceof Error) {
      return response.status(404).json(result.message)
    }
    return response.json(200).json(result)
  }

  async delete(request: Request, response: Response) {
    const { id_unidade } = request.params
    const result = await service.delete(id_unidade)
    if (result instanceof Error) {
      return response.status(404).json(result.message)
    }
    return response.status(300).json(result)
  }
  async filterTime(request: Request, response: Response) {
    const { carga_horaria_unidade } = request.params
    const result = await service.filterTime(carga_horaria_unidade)
    if (result.length < 1) {
      return response.status(204).json("Nenhuma carga horária encontrada!")
    }
    return response.status(200).json(result)
  }
  async filterCurso(request: Request, response: Response) {
    const { fk_curso } = request.params
    const result = await service.filterCurso(fk_curso)
    if (result instanceof Error) {
      return response.status(300).json(result.message)
    }
    return response.status(200).json(result)
  }
}
