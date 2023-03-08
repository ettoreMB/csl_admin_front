
interface TableProps {
  children: React.ReactNode
}

export default function HomeTable ({ children }: TableProps) {
  return (
    <table>
    <thead>
      <tr>
        <th>CNPJ</th>
        <th>NOME FANTASIA</th>
        <th>Representante</th>
        <th>Acessar</th>
      </tr>
    </thead>
    <tbody>
     {children}
    </tbody>
  </table>
  )
}
