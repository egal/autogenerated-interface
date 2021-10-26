import { ActionConstructor } from '@egalteam/framework/compile/index'
export class Table {
  microserviceName: string
  modelName: string
  url: string
  constructor(microserviceName: string, modelName: string, url: string) {
    this.microserviceName = microserviceName
    this.modelName = modelName
    this.url = url
  }
}
