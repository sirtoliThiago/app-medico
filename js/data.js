// Banco de Dados Simulado (Mock Data)
const db = {
    categories: [
        { id: 'primeiros-socorros', title: 'Primeiros Socorros', icon: 'ph-first-aid', color: 'bg-red-100 text-red-600' },
        { id: 'febre', title: 'Febre e Dor', icon: 'ph-thermometer', color: 'bg-orange-100 text-orange-600' },
        { id: 'pediatria', title: 'Saúde Infantil', icon: 'ph-baby', color: 'bg-blue-100 text-blue-600' },
        { id: 'ferimentos', title: 'Cortes e Ferimentos', icon: 'ph-bandages', color: 'bg-purple-100 text-purple-600' },
        { id: 'medicina-alternativa', title: 'Medicina Natural', icon: 'ph-leaf', color: 'bg-emerald-100 text-emerald-600' }
    ],
    videos: [
        {
            id: 'v1',
            type: 'video',
            title: 'Como agir em caso de Engasgo (Manobra de Heimlich)',
            categoryId: 'primeiros-socorros',
            image: 'assets/images/engasgo.png',
            youtubeId: 'PyMq2iDMEkI',
            views: '1.2M',
            duration: '2:15',
            description: 'A Manobra de Heimlich é a melhor técnica para desobstruir as vias aéreas. Use a força das mãos sobre a boca do estômago para expulsar o objeto preso.',
            steps: [
                '1. Posicione-se por trás da pessoa.',
                '2. Abrace a pessoa na altura do estômago.',
                '3. Feche uma mão em punho e coloque-a sobre a região da boca do estômago.',
                '4. Com a outra mão, segure o punho e puxe com força para dentro e para cima.'
            ]
        },
        {
            id: 'v2',
            type: 'video',
            title: 'O que fazer em caso de Queimaduras de 1º Grau',
            categoryId: 'primeiros-socorros',
            image: 'assets/images/queimadura.png',
            youtubeId: 'z8Scj1Rveck',
            views: '500K',
            duration: '3:00',
            description: 'Queimaduras leves precisam ser resfriadas imediatamente para interromper a lesão na pele. Nunca aplique produtos caseiros como borra de café ou manteiga.',
            steps: [
                '1. Lave o local com água corrente em temperatura ambiente por 10 minutos.',
                '2. Não aplique gelo diretamente para não queimar mais a pele.',
                '3. Não passe pasta de dente, manteiga ou borra de café.',
                '4. Cubra com um pano limpo ou gaze úmida se necessário.'
            ]
        },
        {
            id: 'v3',
            type: 'video',
            title: 'Como baixar a febre de forma segura',
            categoryId: 'febre',
            image: 'assets/images/febre.png',
            youtubeId: 'H6r2rz3wvfM',
            views: '800K',
            duration: '4:10',
            description: 'A febre é um sinal de que o corpo está lutando contra uma infecção. Existem formas físicas de aliviar a temperatura enquanto a medicação faz efeito.',
            steps: [
                '1. Ofereça muito líquido (água, soro).',
                '2. Dê um banho morno (nunca gelado).',
                '3. Mantenha roupas leves e ambiente arejado.',
                '4. Se a febre não ceder após medicação prescrita, procure a UPA.'
            ]
        },
        {
            id: 'a1',
            type: 'video',
            title: 'Como montar um Kit de Primeiros Socorros Básico',
            categoryId: 'primeiros-socorros',
            image: 'assets/images/first_aid.png',
            youtubeId: 'PyMq2iDMEkI',
            views: '350K',
            duration: '5:00',
            description: 'Ter um kit em casa é fundamental para emergências rápidas. Conheça os itens essenciais que não podem faltar no kit de qualquer família.',
            steps: [
                '1. Tenha algodão, gaze esterilizada e esparadrapo.',
                '2. Mantenha soro fisiológico para limpar ferimentos.',
                '3. Guarde um termômetro digital.',
                '4. Tenha tesoura sem ponta e luvas descartáveis.',
                '5. Analgésicos e antitérmicos básicos (sempre verifique a validade).'
            ]
        },
        {
            id: 'v5',
            type: 'video',
            title: 'Reanimação Cardiopulmonar (RCP) Básica',
            categoryId: 'primeiros-socorros',
            image: 'assets/images/rcp.png',
            youtubeId: 'LquiiQVKqKE',
            views: '2.1M',
            duration: '5:00',
            description: 'A Reanimação Cardiopulmonar (RCP) é crucial em casos de parada cardíaca. Mantenha as compressões torácicas no ritmo correto até a chegada do socorro.',
            steps: [
                '1. Ligue imediatamente para 192 (SAMU).',
                '2. Coloque a pessoa de barriga para cima em uma superfície firme.',
                '3. Coloque as duas mãos entrelaçadas no centro do peito.',
                '4. Comprima forte e rápido (100 a 120 compressões por minuto).'
            ]
        },
        {
            id: 'v6',
            type: 'video',
            title: 'O que fazer durante uma Convulsão',
            categoryId: 'primeiros-socorros',
            image: 'assets/images/convulsao.png',
            youtubeId: '8fk2-liGO0A',
            views: '900K',
            duration: '3:45',
            description: 'Durante uma crise convulsiva, o mais importante é proteger a cabeça da pessoa e evitar machucados. Nunca tente segurar a língua ou colocar objetos na boca.',
            steps: [
                '1. Afaste objetos perigosos ou cortantes de perto.',
                '2. Coloque algo macio (travesseiro ou blusa) sob a cabeça.',
                '3. Vire a pessoa de lado se possível, para ela não engasgar com saliva.',
                '4. Aguarde a crise passar. Ligue 192 se durar mais de 5 minutos.'
            ]
        },
        {
            id: 'v7',
            type: 'video',
            title: 'Como parar um Sangramento Nasal',
            categoryId: 'ferimentos',
            image: 'assets/images/sangramento_nasal.png',
            youtubeId: 'z8Scj1Rveck',
            views: '600K',
            duration: '2:30',
            description: 'Sangramentos no nariz são comuns, mas inclinar a cabeça para trás é um erro perigoso. Incline a cabeça sempre para a frente.',
            steps: [
                '1. Sente-se e incline a cabeça ligeiramente para a frente.',
                '2. Aperte as narinas com o polegar e o indicador firmemente por 10 minutos.',
                '3. Respire normalmente pela boca.',
                '4. Se o sangramento não parar após 20 minutos de pressão, procure um médico.'
            ]
        },
        {
            id: 'v8',
            type: 'video',
            title: 'Tratamento de Cortes e Hemorragias',
            categoryId: 'ferimentos',
            image: 'assets/images/corte.png',
            youtubeId: 'LquiiQVKqKE',
            views: '400K',
            duration: '4:20',
            description: 'A primeira ação em cortes profundos é estancar o sangramento usando pressão direta. Evite lavar cortes extremamente grandes até controlar a hemorragia.',
            steps: [
                '1. Pressione o ferimento firmemente com um pano limpo ou gaze.',
                '2. Se o sangue encharcar o pano, não o retire; coloque outro por cima.',
                '3. Se possível, eleve o membro machucado acima do nível do coração.',
                '4. Mantenha a pressão até a ajuda chegar (ligue 192 se for grave).'
            ]
        },
        {
            id: 'v9',
            type: 'video',
            title: 'Alívio para Enxaqueca e Dor de Cabeça',
            categoryId: 'febre',
            image: 'assets/images/enxaqueca.png',
            youtubeId: 'H6r2rz3wvfM',
            views: '300K',
            duration: '3:15',
            description: 'Enxaquecas fortes podem ser aliviadas com repouso em local escuro e uso de compressas frias na região da testa ou nuca.',
            steps: [
                '1. Vá para um quarto escuro e silencioso.',
                '2. Coloque uma compressa fria (ou gelo enrolado em pano) sobre os olhos ou testa.',
                '3. Beba bastante água, a desidratação piora a dor.',
                '4. Evite telas de celular ou computador.'
            ]
        },
        {
            id: 'v10',
            type: 'video',
            title: 'Chá Calmante para Ansiedade',
            categoryId: 'medicina-alternativa',
            image: 'assets/images/cha_ansiedade.png',
            youtubeId: '9Lfoptrc3N4',
            views: '250K',
            duration: '2:50',
            description: 'Crises de ansiedade leves podem ser amenizadas com fitoterapia e respiração. O chá de camomila possui propriedades naturais relaxantes do sistema nervoso.',
            steps: [
                '1. Ferva a água e adicione 1 colher de sopa de flores de camomila secas.',
                '2. Abafe por 10 minutos (infusão).',
                '3. Respire o vapor do chá de forma lenta e profunda enquanto esfria.',
                '4. Beba aos poucos, focando no relaxamento.'
            ]
        },
        {
            id: 'v11',
            type: 'video',
            title: 'Compressa de Ervas para Dores Musculares',
            categoryId: 'medicina-alternativa',
            image: 'assets/images/compressa_ervas.png',
            youtubeId: '9Lfoptrc3N4',
            views: '180K',
            duration: '4:10',
            description: 'Dores musculares e tensões respondem muito bem ao calor. Uma compressa de ervas (como alecrim ou arnica) ajuda a desinflamar e relaxar o músculo.',
            steps: [
                '1. Ferva água com punhados de alecrim ou camomila.',
                '2. Mergulhe uma toalha limpa nessa água morna.',
                '3. Torça para tirar o excesso e aplique sobre a região dolorida.',
                '4. Deixe agir por 15 a 20 minutos. Repita se necessário.'
            ]
        },
        {
            id: 'v12',
            type: 'video',
            title: 'Saúde Infantil: Quando levar ao médico?',
            categoryId: 'pediatria',
            image: 'assets/images/pediatria.png',
            youtubeId: 'H6r2rz3wvfM',
            views: '450K',
            duration: '3:30',
            description: 'Saber identificar quando a situação da criança requer atenção médica urgente é fundamental para evitar complicações e agir com segurança.',
            steps: [
                '1. Febre acima de 39°C em bebês de 0-3 meses: vá ao pronto-socorro imediatamente.',
                '2. Dificuldade para respirar, lábios roxos ou desmaio: ligue 192.',
                '3. Vômitos e diarreia persistentes: risco de desidratação, busque atendimento.',
                '4. Manchas vermelhas no corpo com febre: pode ser dengue, busque médico.'
            ]
        },
        {
            id: 'v13',
            type: 'video',
            title: 'Desidratação em Crianças: Como prevenir e tratar',
            categoryId: 'pediatria',
            image: 'assets/images/diarreia.png',
            youtubeId: '8fk2-liGO0A',
            views: '390K',
            duration: '2:45',
            description: 'Crianças se desidratam muito rápido. O soro caseiro e o soro fisiológico são aliados essenciais. Saiba como reconhecer os sinais de alerta.',
            steps: [
                '1. Ofereça líquidos com frequência: água, suco, soro oral.',
                '2. Para fazer soro caseiro: 1 litro de água + 1 colher de sopa de açúcar + 1 colher de chá de sal.',
                '3. Sinais de alerta: boca seca, sem lágrimas ao chorar, olhos fundos.',
                '4. Se a criança não aceitar líquidos ou piorar, leve ao pronto-socorro.'
            ]
        }
    ]
};
