import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'

export default function UseDemanda () {
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])
  const [distribuidores, setDistribuidores] = useState([])
  const [demanda, setDemanda] = useState([])

  const [selectedYear, setSelectedYear] = useState('2023')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedCNPJ, setSelectedCNPJ] = useState('')
  console.log(demanda)
  function handleYears (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value)
  }

  function handleMonths (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value)
  }

  function handleCNPJ (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCNPJ(event.target.value)
  }

  useEffect(() => {
    async function loadYearsData () {
      const resposne = await axios.get(`${process.env.REACT_APP_BACK}/demanda/years`)
      setYears(resposne.data)
    }
    loadYearsData()
  }, [])

  useEffect(() => {
    async function loadMonthsData () {
      const resposne = await axios.get(`${process.env.REACT_APP_BACK}/demanda/months/${selectedYear}`)
      setMonths(resposne.data)
    }

    loadMonthsData()
  }, [selectedYear])

  useEffect(() => {
    async function loadDistribuidoresData () {
      const resposne = await axios
        .get(`${process.env.REACT_APP_BACK}/demanda/distribuidores/${selectedYear}/${selectedMonth}`)
      setDistribuidores(resposne.data)
    }
    if (!selectedMonth) {
      return () => { }
    }
    loadDistribuidoresData()
  }, [selectedMonth, selectedYear])

  useEffect(() => {
    async function loadDemandaData () {
      const resposne = await axios
        .get(
          `${process.env.REACT_APP_BACK}/demanda/${selectedYear}/${selectedMonth}/${selectedCNPJ}`
        )
      setDemanda(resposne.data)
    }
    if (!selectedCNPJ) {
      return () => { }
    }
    loadDemandaData()
  }, [selectedMonth, selectedYear, selectedCNPJ])

  return {
    years,
    months,
    distribuidores,
    demanda,
    selectedYear,
    selectedMonth,
    selectedCNPJ,
    handleYears,
    handleMonths,
    handleCNPJ
  }
}
