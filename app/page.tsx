import React from "react"
import Card from "./(tabs)/components/Card"
import Tabs from "./(tabs)/components/Tabs"

export default function Page() {
  return (
    <>
      {/* Navegação de abas */}
      <Tabs />

      {/* Card de boas-vindas */}
      <Card title="Bem-vindo" subtitle="Escolha uma aba acima para navegar.">
        <p>
          Este é o guia em <strong>PT-BR</strong> do <strong>Haikyuu Fly High (Global)</strong>.
          Use as abas para acessar:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>Eventos</strong> — novidades, banners e recompensas</li>
          <li><strong>Equipes</strong> — composições recomendadas</li>
          <li><strong>Personagens</strong> — tier list, funções e builds</li>
          <li><strong>Potenciais</strong> — onde investir primeiro</li>
          <li><strong>Memórias</strong> — lista completa e detalhes</li>
          <li><strong>Guia de Diamantes</strong> — como farmar rápido</li>
          <li><strong>Planilha de Diamantes</strong> — calcule seus ganhos</li>
        </ul>
        <p className="mt-3 text-neutral-400">
          Projeto <em>fan-made</em>, não oficial, criado para ajudar a comunidade BR. 🏐🦅
        </p>
      </Card>
    </>
  )
}
