/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import UseDebounce from '../hooks/useDebounceSearch'

export default function Home2 () {
  const [searchTerm, setSearchTerm] = useState('')
  const [estabelecimentos, setEstabelecimentos] = useState<any>([])
  const { debaunceValue } = UseDebounce(searchTerm, 1000)
  function handleSearchTerm (e: any) {
    setSearchTerm(e.target.value)
  }

  async function handleTeste () {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos?cnpj=${searchTerm}`)
    setEstabelecimentos(response.data)
  }
  const load = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos?cnpj`)
    setEstabelecimentos(response.data)
  }, [])

  const getData = useCallback(async (toSearch: string) => {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos?cnpj=${toSearch}`)
    setEstabelecimentos(response.data)
  }, [])

  useEffect(() => {
    async function loadData () {
      await load()
    }
    console.log('rodou load')
    loadData()
  }, [load])

  useEffect(() => {
    async function loadData () {
      await getData(debaunceValue)
    }
    if (debaunceValue) {
      loadData()
      console.log('rodiu debaunce')
    } else {
      return () => { console.log('nao rodiu debaunce') }
    }
  }, [debaunceValue, searchTerm, getData])
  return (
    <>
      <span>Entrada</span>
      <input value={searchTerm} onChange={handleSearchTerm}/>
      <button onClick={handleTeste}>Clicar</button>
      {estabelecimentos?.map((est: any) => (
        <span key={est.CNPJ}>{est?.CNPJ},</span>
      ))}

    </>
  )
}
