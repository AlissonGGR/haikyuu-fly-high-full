import Tabs from '../components/Tabs'
import Card from '../components/Card'
import Empty from '../components/Empty'

export default function Page() {
  return (
    <>
      <Tabs />
      <Card title="Eventos" subtitle="Conteúdo em breve.">
        <Empty hint="Envie os textos/links para preencher esta aba." />
      </Card>
    </>
  )
}
