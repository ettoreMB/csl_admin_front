import { httpClient } from './utils/httpClient'

class EstabelecimentosServices {
  async listAll () {
    const response = await httpClient.get('/estabelecimentos')
    return response.data
  }

  async searchEstabelecimento (value: string) {
    const response = await httpClient.get(`/estabelecimentos?search=${value}`)
    return response.data
  }
}

export default new EstabelecimentosServices()
