// src/data/memorias-catalog.ts
export type Position = "S" | "MB" | "WS" | "OP" | "L";
export type Param = "Serve" | "Spike" | "Set" | "Receive" | "Block" | "Save";

export type MemoryCatalogItem = {
    id: string;
    name: string;
    positions: Position[];
    bonus: Partial<Record<Param, { flat: number }>>;
    desc: string;
    img: string;
};

export const memoryCatalog: MemoryCatalogItem[] = [
    {
        id: "mem_op",
        name: "Memória de OP",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 518 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 663 }, Block: { flat: 605 }, Save: { flat: 490 }
        },
        desc: "Quando um membro com esta memória joga pela primeira vez em cada set, sua [Recepção] aumenta em 24%. Este efeito dura por 3 ralis.",
        img: "img/memories/MemoOP.png"
    },
    {
        id: "mem_l",
        name: "Memória de L",
        positions: ["L"],
        bonus: {
            Serve: { flat: 490 }, Spike: { flat: 518 }, Set: { flat: 605 },
            Receive: { flat: 663 }, Block: { flat: 461 }, Save: { flat: 663 }
        },
        desc: "Os Parâmetros Principais do membro que equipa esta memória aumentam em 6.4%. Se o resultado de recepção do respectivo membro não for BAD, o poder do próximo Ataque Potente do aliado será aumentado em 24% × [Ataque Potente] do membro que executará o Ataque Potente.",
        img: "img/memories/MemoL.png"
    },
    {
        id: "mem_ws",
        name: "Memória de WS",
        positions: ["WS"],
        bonus: {
            Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 }
        },
        desc: "O membro que equipa esta memória tem seu [Ataque Potente] aumentado em 12%. Quando o membro realiza um Ataque Potente, o [Bloqueio] do oponente é reduzido em 6.4% até a bola cruzar a rede uma vez. Se o resultado do bloqueio do oponente nesta jogada for BAD, o membro oponente que bloqueou terá seu [Bloqueio] reduzido em 6.4%. Este efeito dura até a bola cruzar a rede duas vezes.",
        img: "img/memories/MemoWS.png"
    },
    {
        id: "mem_s",
        name: "Memória de S",
        positions: ["S"],
        bonus: {
            Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 },
            Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 }
        },
        desc: "Enquanto houver um membro com esta memória em quadra, o [Passe] dos aliados aumenta em 8%. Uma vez por set, quando a Stamina de um membro cair abaixo de 30, a Stamina desse membro será restaurada em 24.",
        img: "img/memories/MemoS.png"
    },
    {
        id: "mem_mb",
        name: "Memória de MB",
        positions: ["MB"],
        bonus: {
            Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 }
        },
        desc: "O [Ataque Rápido] do membro que equipa esta memória é aumentado em 12%. Para cada membro de Bloqueio na linha de frente do oponente, o [Ataque Rápido] desse membro aumenta em mais 6.4%.",
        img: "img/memories/MemoMB.png"
    },
    {
        id: "mem_up_consciencia_wakatoshi_ushijima",
        name: "Ushijima UR",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 570 }, Spike: { flat: 729 }, Set: { flat: 507 },
            Receive: { flat: 729 }, Block: { flat: 665 }, Save: { flat: 539 }
        },
        desc: "A [Percepção] do membro que equipa esta memória é aumentada em 20%. Se a [Percepção] do membro exceder 20%, para cada 1% adicional de [Percepção], a [Força] aumenta em 1% (até 100%).",
        img: "img/memories/MemoUshijimaUR.png"
    },
    {
        id: "mem_ofensive_up_osamu_miya",
        name: "Osamu UR",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 570 }, Spike: { flat: 729 }, Set: { flat: 507 },
            Receive: { flat: 729 }, Block: { flat: 665 }, Save: { flat: 539 }
        },
        desc: "O [Ataque Rápido] do membro que equipa esta memória é aumentado em 24%. Se a [Técnica de Ataque] do membro exceder 40%, o [Ataque Rápido] aumenta em 48% × [Ataque Rápido].",
        img: "img/memories/MemoOsamuUR.png"
    },
    {
        id: "mem_receba_reforco_hard_hit_daichi_sawamura",
        name: "Daichi SSR",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 518 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 663 }, Block: { flat: 605 }, Save: { flat: 490 }
        },
        desc: "A [Recepção] do membro que equipa esta memória é aumentada em 20%. Se o membro estiver em quadra, ganhe 1 acúmulo de [Determinação] sempre que um aliado do tipo Força consumir 20 de Stamina. Cada acúmulo aumenta o poder do Ataque Potente em 4% do atributo [Ataque Potente], até 10 acúmulos.",
        img: "img/memories/MemoDaichiSSR.png"
    },
    {
        id: "mem_reacao_para_cima_akinori_konoha",
        name: "Konoha SSR",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 518 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 663 }, Block: { flat: 605 }, Save: { flat: 490 }
        },
        desc: "Os Parâmetros Principais dos membros que equipam esta memória aumentam em 12%. O [Reflexo] do membro eleva a Moral da Equipe dos aliados em 10%. Enquanto um aliado estiver com [Despertar de Moral da Equipe] ativo, o [Reflexo] desse membro aumenta em 8%.",
        img: "img/memories/MemoKonohaSSR.png"
    },
    {
        id: "mem_ofensive_up_kentaro_kyotani",
        name: "Kentaro MAD DOG SSR",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 518 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 663 }, Block: { flat: 605 }, Save: { flat: 490 }
        },
        desc: "Se o membro com esta memória estiver em quadra, a [Força] do aliado que estiver atacando aumenta em 12%. Enquanto o membro estiver em quadra e a Stamina do oponente estiver abaixo de 60, o [Bloqueio] do oponente é reduzido em 16%. Este efeito dura até a bola cruzar a rede 3 vezes e pode ser ativado uma vez por set por membro.",
        img: "img/memories/MemoKentaroSSR.png"
    },
    {
        id: "mem_param_main_e_hard_hit_takehito_sasaya",
        name: "Sasaya SSR",
        positions: ["OP"],
        bonus: {
            Serve: { flat: 518 }, Spike: { flat: 663 }, Set: { flat: 461 },
            Receive: { flat: 663 }, Block: { flat: 605 }, Save: { flat: 490 }
        },
        desc: "O [Ataque Potente] e o [Bloqueio] dos membros que equipam esta memória aumentam em 12%. Se o placar estiver favorável ao oponente, o poder do seu Spike aumenta em 28% × [Ataque Potente].",
        img: "img/memories/MemoSasayaSSR.png"
    },
    {
        id: "mem_defense_up_yu_nishinoya_depois_da_escola",
        name: "Nishinoya SP",
        positions: ["L"],
        bonus: {
            Serve: { flat: 619 }, Spike: { flat: 656 }, Set: { flat: 765 },
            Receive: { flat: 838 }, Block: { flat: 583 }, Save: { flat: 838 }
        },
        desc: "O membro que equipa esta memória tem sua [Recepção] aumentada em 24%. Quando a Habilidade Especial do respectivo membro é ativada, o [Reflexo] aumenta em 1.2% e o [Empenho] aumenta em 2.4% (até 5 acúmulos). Se o membro usar uma Habilidade Especial mais de duas vezes durante um rali, ele recupera 10 de Stamina e, na próxima Habilidade Especial que usar, sua [Técnica de Defesa] aumenta em 16%. Este efeito dura até a bola cruzar a rede duas vezes.",
        img: "img/memories/MemoNishinoyaSP.png"
    },
    {
        id: "mem_defense_offensive_up_motoya_komori",
        name: "Komori UR",
        positions: ["L"],
        bonus: {
            Serve: { flat: 619 }, Spike: { flat: 656 }, Set: { flat: 838 },
            Receive: { flat: 838 }, Block: { flat: 583 }, Save: { flat: 765 }
        },
        desc: "O membro que equipa esta memória tem sua [Recepção] aumentada em 24%. Quando o respectivo membro recebe, a [Técnica de Defesa] dos aliados na retaguarda aumenta em 2% (até 3 acúmulos). Se o membro estiver em quadra, quando um aliado ativar uma habilidade de Recepção, quem receber recupera 2 de Stamina e tem seu [Ataque Potente/Ataque Rápido] aumentado em 15%. Este efeito dura até a bola cruzar a rede duas vezes.",
        img: "img/memories/MemoKomoriUR.png"
    },
    {
        id: "mem_defense_up_yu_nishinoya",
        name: "Nishinoya SSR",
        positions: ["L"],
        bonus: {
            Serve: { flat: 490 }, Spike: { flat: 518 }, Set: { flat: 605 },
            Receive: { flat: 663 }, Block: { flat: 461 }, Save: { flat: 663 }
        },
        desc: "Se o membro que equipa esta memória estiver em quadra, aumenta a [Defesa] dos jogadores da linha de trás do seu lado em 8%. Se o consumo de Stamina do equipador for 8 ou mais ao ativar a habilidade de recepção, a [Recepção] do equipador aumenta em 20% e ele recupera 2 de Stamina.",
        img: "img/memories/MemoNishinoyaSSR.png"
    },
    {
        id: "mem_receba_morisuke_yaku",
        name: "Yaku SSR",
        positions: ["L"],
        bonus: {
            Serve: { flat: 490 }, Spike: { flat: 518 }, Set: { flat: 605 },
            Receive: { flat: 663 }, Block: { flat: 461 }, Save: { flat: 663 }
        },
        desc: "Quando um membro com esta memória recebe, a [Recepção] aumenta em 4% (até 5 acúmulos). Se a recepção do membro for PERFECT, o poder do próximo Ataque Rápido de um aliado aumenta em 32% × [Ataque Rápido] do membro que executará o ataque rápido.",
        img: "img/memories/MemoYakuSSR.png"
    },
    {
        id: "mem_receba_haruki_komi",
        name: "Haruki SSR",
        positions: ["L"],
        bonus: {
            Serve: { flat: 490 }, Spike: { flat: 518 }, Set: { flat: 605 },
            Receive: { flat: 663 }, Block: { flat: 461 }, Save: { flat: 663 }
        },
        desc: "A [Recepção] e a [Defesa] dos membros que equipam esta memória aumentam em 16%. Se a recepção ou a defesa do membro não for BAD, a Moral da Equipe aumenta em 10. Além disso, o poder do próximo Ataque Potente de um aliado aumenta em 10% × [Ataque Potente] do membro.",
        img: "img/memories/MemoHarukiSSR.png"
    },
    {
        id: "mem_receba_yamagata_hayato",
        name: "Memo Yamagata SSR",
        positions: ["L"],
        bonus: {
            Serve: { flat: 490 }, Spike: { flat: 518 }, Set: { flat: 605 },
            Receive: { flat: 663 }, Block: { flat: 461 }, Save: { flat: 663 }
        },
        desc: "A [Recepção] do membro que equipa esta memória é aumentada em 20%. Quando o membro ativa a Habilidade Especial de Recepção, o [Reflexo] aumenta em 12%.",
        img: "img/memories/MemoYamagataSSR.png"
    },
    {
        id: "mem_defense_up_michinari_akagi",
        name: "Memo Akagi SSR",
        positions: ["L"],
        bonus: {
            Serve: { flat: 490 }, Spike: { flat: 518 }, Set: { flat: 605 },
            Receive: { flat: 663 }, Block: { flat: 461 }, Save: { flat: 663 }
        },
        desc: "A [Recepção] do membro que equipa esta memória é aumentada em 20%. Se o resultado de recepção ou defesa do membro não for BAD, a [Técnica de Defesa] do aliado aumenta em 16% (até 3 acúmulos). Este efeito dura por 1 rali.",
        img: "img/memories/MemoAkagiSSR.png"
    },
    {
        id: "mem_power_up_shouyou_hinata_hanami",
        name: "Hinata SP",
        positions: ["MB"],
        bonus: { Serve: { flat: 619 }, Spike: { flat: 838 }, Set: { flat: 656 }, Receive: { flat: 838 }, Block: { flat: 765 }, Save: { flat: 583 } },
        desc: "A [Força] do membro que equipa esta memória aumenta em 24%. Se o Ataque Rápido do membro for PERFECT, aumente a [Força] do membro em 2% (até 5 acúmulos). Se o Ataque Rápido de um aliado for PERFECT e o bloqueador oponente não tocar na bola, a [Reflexo] e o [Empenho] da linha de frente inimiga serão reduzidos em 8% cada. Este efeito dura até a bola cruzar a rede 10 vezes.",
        img: "img/memories/MemoHinataSP.png"
    },
    {
        id: "mem_hast_attack_block_up_tsukishima_firefly_display_de_fogos_de_artificio",
        name: "Tsuki SP",
        positions: ["MB"],
        bonus: { Serve: { flat: 619 }, Spike: { flat: 838 }, Set: { flat: 656 }, Receive: { flat: 765 }, Block: { flat: 838 }, Save: { flat: 583 } },
        desc: "O [Ataque Rápido] do membro que equipa esta memória aumenta em 24%. Se o membro fizer um PERFECT, o [Bloqueio] aumenta em 9% (até 3 acúmulos). Aplica aleatoriamente o efeito negativo [Supressão] a um membro do time adversário em quadra (Parâmetros Principais reduzidos em 5%). Este efeito dura até a bola cruzar a rede 8 vezes.",
        img: "img/memories/MemoTsukiSP.png"
    },
    {
        id: "mem_kurosp",
        name: "Kuro SP",
        positions: ["MB"],
        bonus: { Serve: { flat: 765 }, Spike: { flat: 656 }, Set: { flat: 619 }, Receive: { flat: 838 }, Block: { flat: 838 }, Save: { flat: 583 } },
        desc: "O [Bloqueio] aumenta em 12%. Quando o membro bloquear ou receber, se houver um inimigo em quadra com efeito negativo, a [Técnica de Defesa] do respectivo membro aumenta em 20%. Este efeito dura até a bola cruzar a rede quatro vezes.",
        img: "img/memories/MemoKuroSP.png"
    },
    {
        id: "mem_tecnica_de_defesa_bloqueio_takashi_aone_banho_de_mar",
        name: "Aone SP",
        positions: ["MB"],
        bonus: { Serve: { flat: 838 }, Spike: { flat: 765 }, Set: { flat: 656 }, Receive: { flat: 619 }, Block: { flat: 838 }, Save: { flat: 583 } },
        desc: "A [Técnica de Defesa] do membro que equipa esta memória aumenta em 12.8%. Quando este membro participa de um bloqueio de 2 ou 3 jogadores, o [Bloqueio] da linha de frente aliada aumenta em 12% até a bola cruzar a rede duas vezes. Quando o membro bloquear, se a jogada resultar em bloqueio de 2/3, o [Bloqueio] do membro aumenta em mais 15% até a bola cruzar a rede duas vezes.",
        img: "img/memories/MemoAoneSP.png"
    },
    {
        id: "mem_hast_attack_blockup_tetsuro_kuroo",
        name: "Kuro UR",
        positions: ["MB"],
        bonus: { Serve: { flat: 665 }, Spike: { flat: 729 }, Set: { flat: 507 }, Receive: { flat: 570 }, Block: { flat: 729 }, Save: { flat: 539 } },
        desc: "O membro que equipa esta memória tem seu [Bloqueio] aumentado em 24%. Cada vez que o membro receber um aumento de [Ataque Rápido] proveniente de uma habilidade de aliado, ganha 1 acúmulo de [Ajuste]. Cada acúmulo de [Ajuste] aumenta o [Bloqueio] em 2.4% (máx. 10). Quando a Habilidade Especial de Bloqueio do membro for ativada, consuma 10 acúmulos do efeito [Constrição] e reduza a recarga da Habilidade Especial de Bloqueio do membro em 10 cruzadas de rede.",
        img: "img/memories/MemoKuroUR.png"
    },
    {
        id: "mem_block_up_hirugami_yukoro",
        name: "Hirugami UR",
        positions: ["MB"],
        bonus: { Serve: { flat: 729 }, Spike: { flat: 665 }, Set: { flat: 507 }, Receive: { flat: 570 }, Block: { flat: 729 }, Save: { flat: 539 } },
        desc: "O membro que equipa esta memória tem seu [Bloqueio] aumentado em 20%. Quando um aliado pontua, o [Bloqueio] dele aumenta em 4.8% (até 3 acúmulos). Se um aliado possuir o efeito [Bloqueio Forte], ao bloquear sua [Técnica de Defesa] aumenta em 2.4% até a bola cruzar a rede quatro vezes (até 3 acúmulos).",
        img: "img/memories/MemoHirugamiUR.png"
    },
    {
        id: "mem_increase_consciousness_shoyo_hinata",
        name: "Hinata SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "A [Percepção] dos membros que equipam esta memória aumenta em 16%. Se a [Percepção] do membro for 40% ou maior, a [Percepção] aumenta em mais 16% e sofrer bloqueio é reduzido em 8%.",
        img: "img/memories/MemoHinataSSR.png"
    },
    {
        id: "mem_block_up_tsukishima",
        name: "Tsuki SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "O [Bloqueio] do membro que equipa esta memória aumenta em 20%. Quando o membro ativa a Habilidade Especial de Bloqueio, se o oponente que realizou o spike (Ataque Potente/Rápido) tiver um efeito negativo, o poder deste bloqueio aumenta em 32% × [Bloqueio] do membro.",
        img: "img/memories/MemoTsukiSSR.png"
    },
    {
        id: "mem_offensive_up_tetsuro_kuroo_pratica",
        name: "Kuro SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "A [Percepção] dos membros que equipam esta memória aumenta em 16%. Quando o membro for bloqueado, sua [Técnica de Defesa] aumenta em 24% da sua [Força].",
        img: "img/memories/MemoKuroSSR.png"
    },
    {
        id: "mem_block_up_tatsuo",
        name: "Tatsuo SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "O [Bloqueio] do membro que equipa esta memória aumenta em 24%. Quando o membro bloquear, se o spike do oponente (potente/rápido) for PERFECT, este bloqueio será garantidamente PERFECT. Se o resultado deste bloqueio não for BAD, o [Bloqueio] do membro aumenta em 5% (até 3 acúmulos).",
        img: "img/memories/MemoTatsuoSSR.png"
    },
    {
        id: "mem_receive_up_ataque_rapido_reforco_haiba_lev",
        name: "Lev SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "Se o membro que equipa esta memória estiver em quadra, a [Recepção] dos defensores aliados aumenta em 12%. Se o membro estiver em quadra e o resultado da recepção aliada for PERFECT, o poder da próxima Habilidade Especial de Ataque Rápido do membro aumenta em 24% × [Ataque Rápido].",
        img: "img/memories/MemoLevSSR.png"
    },
    {
        id: "mem_defense_up_takanobu_aone",
        name: "Aone SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "A [Técnica de Defesa] dos membros que equipam esta memória aumenta em 16%. Se o resultado de bloqueio do membro não for BAD, a Stamina do oponente é reduzida em 2 após o spike (potente/rápido). Se o atacante oponente for um membro de Ataque Potente, ele perde mais 1 de Stamina.",
        img: "img/memories/MemoAoneSSR.png"
    },
    {
        id: "mem_block_up_tendo_satoru",
        name: "Tendo SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "O [Bloqueio] do membro que equipa esta memória aumenta em 28%. Se o bloqueio do membro for PERFECT, a recarga da Habilidade Especial de Bloqueio é reduzida em 3 cruzadas de rede.",
        img: "img/memories/MemoTendoSSR.png"
    },
    {
        id: "mem_fast_attack_up_rintaro_suna",
        name: "Rintaro SSR",
        positions: ["MB"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 518 }, Block: { flat: 663 }, Save: { flat: 490 } },
        desc: "O [Ataque Rápido] do membro que equipa esta memória aumenta em 20%. Se o bloqueador oponente tiver um efeito negativo quando o membro atacar rapidamente, o poder deste Ataque Rápido aumenta em 40% × [Ataque Rápido] do membro.",
        img: "img/memories/MemoRintaroSSR.png"
    },
    {
        id: "mem_akaashi_sp",
        name: "Akaashi SP",
        positions: ["S"],
        bonus: { Serve: { flat: 838 }, Spike: { flat: 656 }, Set: { flat: 838 }, Receive: { flat: 619 }, Block: { flat: 765 }, Save: { flat: 583 } },
        desc: "O [Passe] do equipador aumenta em 24%. Enquanto o [Despertar de Moral da Equipe] de um aliado estiver ativo, a [Percepção] do equipador aumenta em 10%. Aliados com o efeito [Condição Excelente] recebem +15% em seus Parâmetros Principais. Quando um aliado perde o efeito [Condição Excelente], o [Reflexo] de todos os aliados aumenta em 10% até a bola cruzar a rede 8 vezes.",
        img: "img/memories/MemoAkaashiSP.png"
    },
    {
        id: "mem_sugawara_sp",
        name: "Sugawara SP",
        positions: ["S"],
        bonus: { Serve: { flat: 838 }, Spike: { flat: 656 }, Set: { flat: 838 }, Receive: { flat: 619 }, Block: { flat: 765 }, Save: { flat: 583 } },
        desc: "Os Parâmetros Principais do equipador aumentam em 16%. Quando o equipador realiza um Passe, para cada 6 de Stamina atual que possuir, o [Ataque Potente/Ataque Rápido] do atacante aumenta em 2% (até 30%). Este efeito dura até a bola cruzar a rede duas vezes. Quando o equipador ativa uma Habilidade e consome Stamina, restaure 10 de Stamina ao aliado com a menor Stamina.",
        img: "img/memories/MemoSugawaraSP.png"
    },
    {
        id: "mem_kenma_sp",
        name: "Kenma SP",
        positions: ["S"],
        bonus: { Serve: { flat: 765 }, Spike: { flat: 656 }, Set: { flat: 838 }, Receive: { flat: 838 }, Block: { flat: 619 }, Save: { flat: 583 } },
        desc: "O [Reflexo] aumenta em 16%. Quando um Ataque Potente/Rápido do oponente for PERFECT, um aliado que ativar uma habilidade de Bloqueio ou Recepção ganha 1 acúmulo de [Adesão]; para cada acúmulo, o [Reflexo] aumenta em 4% (máx. 3). Se tal aliado atingir 3 acúmulos, consuma-os para aumentar em 100% o [Reflexo] desse aliado até a bola cruzar a rede uma vez.",
        img: "img/memories/MemoKenmaSP.png"
    },
    {
        id: "mem_oikawa_ur",
        name: "Oikawa UR",
        positions: ["S"],
        bonus: { Serve: { flat: 729 }, Spike: { flat: 570 }, Set: { flat: 729 }, Receive: { flat: 539 }, Block: { flat: 665 }, Save: { flat: 507 } },
        desc: "O [Saque] aumenta em 24%. Quando o saque deste membro for [PERFECT], ganhe 2 acúmulos de [Ritmo de Ataque]. Para cada acúmulo, aliados em quadra recebem +1% de [Percepção], até 10 acúmulos. Se o saque resultar em ace, ganhe 4 acúmulos adicionais. Enquanto este membro estiver em quadra, cada vez que o [Ritmo de Ataque] atingir 6 acúmulos, a [Força] e o [Empenho] dos aliados aumentam em 4% (até 3 acúmulos).",
        img: "img/memories/MemoOikawaUR.png"
    },
    {
        id: "mem_kageyama_ur",
        name: "Kageyama UR",
        positions: ["S"],
        bonus: { Serve: { flat: 729 }, Spike: { flat: 570 }, Set: { flat: 729 }, Receive: { flat: 539 }, Block: { flat: 665 }, Save: { flat: 507 } },
        desc: "O [Passe] aumenta em 24%. Quando este membro ativar uma habilidade de Ataque de Dois Toques, sua [Força] aumenta em 40% da [Percepção], até +100%. Além disso, quando este membro ativar uma habilidade de Dois Toques, o poder do próximo Spike aliado (Potente/Rápido) aumenta em 28% do [Ataque Potente/Ataque Rápido] do atacante.",
        img: "img/memories/MemoKageyamaUR.png"
    },
    {
        id: "mem_atsumu_ur",
        name: "Atsumu UR",
        positions: ["S"],
        bonus: { Serve: { flat: 729 }, Spike: { flat: 570 }, Set: { flat: 729 }, Receive: { flat: 539 }, Block: { flat: 665 }, Save: { flat: 507 } },
        desc: "O [Passe] aumenta em 24%. Enquanto o equipador estiver em quadra, aliados em quadra cuja [Percepção] e [Reflexo] estejam abaixo de 20% recebem +6.4% em [Técnica de Ataque] e [Técnica de Defesa]. Se a jogada de um aliado não for [PERFECT], a [Técnica de Ataque] e a [Técnica de Defesa] do equipador aumentam em 2% por acúmulo (máx. 5), durando por 1 rali.",
        img: "img/memories/MemoAtsumuUR.png"
    },
    {
        id: "mem_kageyama_ssr_serve",
        name: "Kageyama SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "O [Saque] aumenta em 20%. Quando este membro ativar um Supremo de Dois Toques, a [Percepção] dos aliados aumenta em 20% e a [Percepção] deste membro aumenta em mais 15%.",
        img: "img/memories/MemoKageyamaSSR.png"
    },
    {
        id: "mem_kenma_ssr",
        name: "Kenma SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "O [Passe] aumenta em 8%. Enquanto o equipador estiver em quadra, a [Recepção] dos aliados da linha de trás aumenta em 12%. Enquanto o equipador estiver em quadra, quando as pilhas de [Conexão] de um aliado diminuírem, os aliados ganham 1 acúmulo de [Conexão]; para cada acúmulo, aliados em quadra recebem +1% de [Recepção], até 6 acúmulos.",
        img: "img/memories/MemoKenmaSSR.png"
    },
    {
        id: "mem_akaashi_ssr",
        name: "Akaashi SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "O [Passe] aumenta em 12%. Enquanto o [Despertar de Moral da Equipe] de um aliado estiver ativo, quando este membro realizar um Passe, o aliado que for atacar (Potente/Rápido) recupera 4 de Stamina e esse Spike recebe +16% de [Técnica de Ataque]. Quando este membro dissipar um debuff de um aliado, também remove o efeito [Modo de Baixa] desse aliado.",
        img: "img/memories/MemoAkaashiSSR.png"
    },
    {
        id: "mem_oikawa_ssr",
        name: "Oikawa SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "O [Passe] aumenta em 20%. Na primeira vez em cada set que o [Ritmo de Ataque] dos aliados atingir 10 ou mais acúmulos, o [Passe] deste membro aumenta em mais 20% (dura 1 set). Para cada acúmulo de [Ritmo de Ataque], aliados em quadra recebem +1% de [Percepção], até 10 acúmulos.",
        img: "img/memories/MemoOikawaSSR.png"
    },
    {
        id: "mem_koganegawa_ssr",
        name: "Koganegawa SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "O [Passe] aumenta em 16%. Enquanto o equipador estiver em quadra, se o resultado de Bloqueio de um aliado não for [BAD], o poder do próximo Ataque Potente do oponente diminui em 20% do atributo [Ataque Potente] do atacante. Enquanto o equipador estiver em quadra, se o resultado de Bloqueio de um aliado for [BAD], o poder do próximo Bloqueio aliado aumenta em 32% do [Bloqueio] do bloqueador.",
        img: "img/memories/MemoKoganegawaSSR.png"
    },
    {
        id: "mem_shirabu_ssr",
        name: "Shirabu SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "O [Passe] aumenta em 16%. Quando o Passe deste membro for [PERFECT], o aliado que executar um Ataque Potente recebe +32% de [Força] até a bola cruzar a rede uma vez.",
        img: "img/memories/MemoShirabuSSR.png"
    },
    {
        id: "mem_semi_ssr",
        name: "Semi SSR",
        positions: ["S"],
        bonus: { Serve: { flat: 663 }, Spike: { flat: 518 }, Set: { flat: 663 }, Receive: { flat: 490 }, Block: { flat: 605 }, Save: { flat: 461 } },
        desc: "Quando este membro sacar, a [Percepção] aumenta em 16%. Ao ativar um Supremo de Saque, o [Saque] aumenta em 6.4%, até 3 acúmulos.",
        img: "img/memories/MemoSemiSSR.png"
    },
    {
        id: "mem_bokuto_sp",
        name: "Bokuto SP",
        positions: ["WS"],
        bonus: { Serve: { flat: 765 }, Spike: { flat: 838 }, Set: { flat: 583 }, Receive: { flat: 838 }, Block: { flat: 656 }, Save: { flat: 619 } },
        desc: "A [Força] do membro que equipa esta memória aumenta em 24%. Quando o membro atacar com força, a [Técnica de Ataque] aumenta em 5%. Se a duração restante do [Despertar de Moral da Equipe] de um aliado for de 6 ou mais cruzadas de rede, a [Técnica de Ataque] aumenta em mais 20%.",
        img: "img/memories/MemoBokutoSP.png"
    },
    {
        id: "mem_offense_defense_up_hoshiumi_ur",
        name: "Hoshiumi UR",
        positions: ["WS"],
        bonus: { Serve: { flat: 665 }, Spike: { flat: 729 }, Set: { flat: 507 }, Receive: { flat: 729 }, Block: { flat: 570 }, Save: { flat: 539 } },
        desc: "A [Técnica de Ataque] e a [Técnica de Defesa] aumentam em 6.4%. Quando a Habilidade/Habilidade Especial do membro é ativada, seus [Parâmetros Principais] aumentam em 2% (máx. 10 acúmulos). Se a jogada for [PERFECT], ganhe 1 acúmulo adicional.",
        img: "img/memories/MemoHoshiumiUR.png"
    },
    {
        id: "mem_bokuto_ur",
        name: "Bokuto UR",
        positions: ["WS"],
        bonus: { Serve: { flat: 665 }, Spike: { flat: 729 }, Set: { flat: 507 }, Receive: { flat: 729 }, Block: { flat: 570 }, Save: { flat: 539 } },
        desc: "O membro que equipa esta memória tem seu [Ataque Potente] aumentado em 24%. Cada vez que um aliado ativar o [Despertar de Moral da Equipe], o [Ataque Potente] desse membro aumenta em 8% (até 3 acúmulos). Enquanto o membro estiver em quadra, a duração do bônus de Moral da Equipe dos aliados é aumentada em 2 cruzadas de rede.",
        img: "img/memories/MemoBokutoUR.png"
    },
    {
        id: "mem_hayaseomi_ur",
        name: "Hayaseomi UR",
        positions: ["WS"],
        bonus: { Serve: { flat: 765 }, Spike: { flat: 838 }, Set: { flat: 583 }, Receive: { flat: 838 }, Block: { flat: 656 }, Save: { flat: 619 } },
        desc: "O membro que equipa esta memória tem seu [Ataque Potente] aumentado em 24%. Quando o membro receber, a [Técnica de Ataque] aumenta em 15% até a bola cruzar a rede duas vezes. Após receber, o [Empenho] do membro aumenta em 8% (até 4 acúmulos).",
        img: "img/memories/MemoHayaseomiUR.png"
    },
    {
        id: "mem_yui_ssr",
        name: "Yui SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "A [Recepção] aumenta em 20%. Quando este membro receber, o [Ataque Potente] aumenta em 16% e dura até a bola cruzar a rede seis vezes. Se a recepção deste membro for [PERFECT], seu próximo Ataque Potente será garantidamente [PERFECT].",
        img: "img/memories/MemoYuiSSR.png"
    },
    {
        id: "mem_oshiro_ssr",
        name: "Oshiro SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "O [Ataque Potente] aumenta em 20%. Para cada 6 de Stamina recuperada por este membro, o [Ataque Potente] aumenta em 6.3%. Este efeito dura até a bola cruzar a rede cinco vezes. Se a Stamina recuperada em uma única instância exceder 10, a [Técnica de Ataque] aumenta em 6.4% até a bola cruzar a rede cinco vezes.",
        img: "img/memories/MemoOshiroSSR.png"
    },
    {
        id: "mem_kita_ssr",
        name: "Kita SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "A [Recepção] aumenta em 20%. Se a recepção deste membro não for [PERFECT], o poder da próxima recepção de um aliado aumenta em 40% da [Recepção] do membro que receber.",
        img: "img/memories/MemoKitaSSR.png"
    },
    {
        id: "mem_tanaka_ssr",
        name: "Tanaka SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "O [Ataque Potente] aumenta em 20%. Para este membro, até o segundo Ataque Potente de cada set, o poder de finalização aumenta em 36% do [Ataque Potente].",
        img: "img/memories/MemoTanakaSSR.png"
    },
    {
        id: "mem_azumane_ssr",
        name: "Azumane SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "Se o membro que equipa esta memória tiver 50 ou mais de Stamina, o [Ataque Potente] aumenta em 36%. Quando este membro ativar uma habilidade de Ataque Potente e a Stamina consumida for 20 ou mais, o poder desse Ataque Potente aumenta em 32% do [Ataque Potente].",
        img: "img/memories/MemoAzumaneSSR.png"
    },
    {
        id: "mem_iwaizumi_ssr",
        name: "Iwaizumi SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "Exclusivo de [WS]: aumenta a [Recepção] em 10%. Quando o equipador executar um Supremo de Ataque Potente Crítico, aumenta o [Ataque Potente] em 8% da [Recepção] por 3 cruzadas de rede.",
        img: "img/memories/MemoIwaizumiSSR.png"
    },
    {
        id: "mem_futakuchi_ssr",
        name: "Futakuchi SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "O [Bloqueio] aumenta em 20%. Para cada aliado do tipo Bloqueio em quadra, o poder de finalização da Habilidade Especial deste membro aumenta em 6.4% do parâmetro correspondente a essa Especial.",
        img: "img/memories/MemoFutakuchiSSR.png"
    },
    {
        id: "mem_goshiki_ssr",
        name: "Goshiki SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "O [Ataque Potente] aumenta em 20%. Enquanto o [Despertar de Moral da Equipe] de um aliado estiver ativo, o [Ataque Potente] deste membro aumenta em 32%.",
        img: "img/memories/MemoGoshikiSSR.png"
    },
    {
        id: "mem_awareness_reaction_up_oshiro_ssr",
        name: "Oshiro SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "Quando este membro ativar uma Habilidade, a [Percepção] aumenta em 3.2% e o [Reflexo] aumenta em 3.2%, até 5 acúmulos.",
        img: "img/memories/MemoOshiroSSR.png"
    },
    {
        id: "mem_terushima_ssr",
        name: "Terushima SSR",
        positions: ["WS"],
        bonus: { Serve: { flat: 605 }, Spike: { flat: 663 }, Set: { flat: 461 }, Receive: { flat: 663 }, Block: { flat: 518 }, Save: { flat: 490 } },
        desc: "O [Ataque Potente] aumenta em 24%. Quando este membro ativar o efeito [Escolha Mais], ganhe 2 acúmulos de [Escolha Mais] e aumente a [Recepção] dos aliados da linha de trás em 12% por 1 rali. Para cada acúmulo de [Escolha Mais], o [Ataque Potente]/[Ataque Rápido] aumenta em 2.5%, até 4 acúmulos.",
        img: "img/memories/MemoTerushimaSSR.png"
    }
];