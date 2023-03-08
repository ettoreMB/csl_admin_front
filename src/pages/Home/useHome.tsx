/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ChangeEvent, useState, useCallback, useEffect } from 'react'
import UseDebounce from '../../hooks/useDebounceSearch'
import EstabelecimentosServices from '../../services/EstabelecimentosServices'

export default function UseHome () {
  const [searchTerm, setSearchTerm] = useState('')
  const [estabelecimentos, setEstabelecimentos] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(true)
  const { debaunceValue } = UseDebounce(searchTerm, 400)

  function handleModal () {
    setModalIsVisible(!modalIsVisible)
  }

  function handleSearchTerm (event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      const estabeleciemntos = await EstabelecimentosServices.listAll()
      setEstabelecimentos(estabeleciemntos)
      setHasError(false)
      setIsLoading(false)
    } catch (error) {
      setHasError(true)
      setIsLoading(false)
    }
  }, [])

  function handleTryAgain () {
    loadData()
  }

  const getData = useCallback(async (value: string) => {
    const response = await EstabelecimentosServices.searchEstabelecimento(value)
    setIsLoading(true)
    setEstabelecimentos(response.data)
    setHasError(false)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (debaunceValue) {
      getData(debaunceValue)
    }
    if (debaunceValue === '') {
      loadData()
    }
    return () => {}
  }, [debaunceValue, loadData, getData])
  return {
    searchTerm,
    estabelecimentos,
    isLoading,
    hasError,
    debaunceValue,
    modalIsVisible,
    handleModal,
    handleSearchTerm,
    handleTryAgain,
    loadData,
    getData
  }
}
