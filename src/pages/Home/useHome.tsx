/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios'
import { ChangeEvent, useState, useCallback } from 'react'
import UseDebounce from '../../hooks/useDebounceSearch'

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
      // setIsLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos`)

      setEstabelecimentos(response.data)
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
  async function getData (value: string) {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos?search=${value}`)
    // setIsLoading(true)
    setEstabelecimentos(response.data)
    setHasError(false)
    setIsLoading(false)
  }

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
