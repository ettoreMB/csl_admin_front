export function transformMonth (monthValue: number) {
  const date = new Date()
  date.setMonth(monthValue - 1)

  return date.toLocaleString('pt-BR', { month: 'long' })
}
