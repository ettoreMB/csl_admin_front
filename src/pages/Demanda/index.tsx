/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { transformMonth } from '../../utils/transformMonthNumberToString'
import { DemandaTable, FilterContainer } from './styles'

interface YearsProps {
  ANO: number
}
interface MonthsProps {
  MES: number
}
interface DistribuidoresProps {
  cnpj: number
  nome_fantasia: string
}
interface DemandaProps {
  nome_produto: string
  total: number
}

export default function Demanda () {
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])
  const [distribuidores, setDistribuidores] = useState([])
  const [demanda, setDemanda] = useState([])

  const [selectedYear, setSelectedYear] = useState('2023')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedCNPJ, setSelectedCNPJ] = useState('')

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
        .get(`${process.env.REACT_APP_BACK}/demanda/distribuidores?year=${selectedYear}&month=${selectedMonth}`)
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
          `${process.env.REACT_APP_BACK}/demanda?year=${selectedYear}&month=${selectedMonth}&cnpj=${selectedCNPJ}`
        )
      setDemanda(resposne.data)
    }
    if (!selectedCNPJ) {
      return () => { }
    }
    loadDemandaData()
  }, [selectedMonth, selectedYear, selectedCNPJ])

  return (
    <>
      <FilterContainer>
        <label htmlFor="">Ano :</label>
        <select value={selectedYear} onChange={handleYears}>
          {years?.map((year: YearsProps) => (

            <option key={year.ANO} value={year.ANO}>{year.ANO}</option>
          ))}
        </select>

        {selectedYear && (
          <>
            <label htmlFor="">Mes :</label>
            <select value={selectedMonth} onChange={handleMonths}>
              <option value="">selecione o mes</option>
              {months?.map((months: MonthsProps) => (
                <option key={months.MES} value={months.MES}>{transformMonth(months.MES)}</option>
              ))}
            </select>
          </>
        )}

        {selectedMonth && (
          <>
            <label htmlFor="">Distribuidor :</label>
            <select value={selectedCNPJ} onChange={handleCNPJ}>
              <option value="">selecione o distribuidor</option>
              {distribuidores?.map((distribuidor: DistribuidoresProps) => (
                <option
                  key={distribuidor.cnpj}
                  value={distribuidor.cnpj}
                >
                  {distribuidor.nome_fantasia}
                </option>
              ))}
            </select>
          </>
        )}

      </FilterContainer>

      {demanda && (
        <DemandaTable>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {demanda?.map((value: DemandaProps) => (
              <tr key={value.nome_produto}>
                <td >{value.nome_produto}</td>
                <td>{value.total}</td>
              </tr>
            ))}
          </tbody>
        </DemandaTable>

      )}

    </>
  )
}
