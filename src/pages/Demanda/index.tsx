/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { transformMonth } from '../../utils/transformMonthNumberToString'
import { DemandaTable, FilterContainer } from './styles'
import UseDemanda from './useDemanda'

interface YearsProps {
  ANO: number
}
interface MonthsProps {
  MES: number
}
interface DistribuidoresProps {
  CNPJ_DISTRIBUIDOR: number
  NOME_FANTASIA: string
}
interface DemandaProps {
  PRODUTO: string
  total: number
}

export default function Demanda () {
  const {
    years,
    months,
    demanda,
    distribuidores,
    selectedYear,
    selectedMonth,
    selectedCNPJ,
    handleYears,
    handleMonths,
    handleCNPJ
  } = UseDemanda()
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
            <label>Mes :</label>
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
                  key={Math.random()}
                  value={distribuidor.CNPJ_DISTRIBUIDOR}
                >
                  {distribuidor.NOME_FANTASIA}
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
              <tr key={value.PRODUTO}>
                <td >{value.PRODUTO}</td>
                <td>{value.total}</td>
              </tr>
            ))}
          </tbody>
        </DemandaTable>

      )}

    </>
  )
}
