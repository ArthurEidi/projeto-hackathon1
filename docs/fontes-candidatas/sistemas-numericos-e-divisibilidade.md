# Fontes candidatas — sistemas-numericos-e-divisibilidade

## Questão 1
- **Banca / Ano / Questão:** ENEM 2021 — Questão 176
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/176
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/176 (`correctAlternative: "D"`)
- **Enunciado:**
  > O sistema de numeração romano ainda é utilizado na indicação de capítulos e volumes de livros, na designação de séculos e, em ordem cronológica, de papas e reis de mesmo nome. São utilizadas sete letras do alfabeto:  
  > Quatro fundamentais: I (vale 1); X (vale 10); C (vale 100) e M (vale 1 000).  
  > Três secundárias: V (vale 5); L (vale 50); e D (vale 500).
  >
  > As regras para escrever números romanos são:  
  > 1\. Não existe símbolo correspondente ao zero;  
  > 2\. Os símbolos fundamentais podem ser repetidos até três vezes e seus valores são adicionados. Exemplo: XXX = 30;  
  > 3\. Uma letra posta à esquerda de outra de maior valor indica subtração dos respectivos valores. Exemplo: IX = 10 – 1 = 9;  
  > 4\. Uma letra posta à direita de outra de maior valor indica adição dos respectivos valores. Exemplo: XI = 10 + 1 = 11
  >
  > Em uma cidade europeia há uma placa indicando o ano de sua fundação: MCDLXIX.
  >
  > Quantos anos de fundação essa cidade comemorará em 2050?
- **Alternativas:**
  - A) 379
  - B) 381
  - C) 579
  - D) 581
  - E) 601
- **Gabarito:** D
- **Resumo para o app (adaptada):** Uma placa indica a fundação de uma cidade no ano romano MCDLXIX. Quantos anos ela completará em 2050?
- **Conferência matemática:** MCDLXIX = 1000 + (500 − 100) + 50 + 10 + (10 − 1) = 1469; 2050 − 1469 = 581 anos. Gabarito D.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2012 — Questão 161
- **URL do enunciado:** https://api.enem.dev/v1/exams/2012/questions/161
- **URL do gabarito:** https://api.enem.dev/v1/exams/2012/questions/161 (`correctAlternative: "C"`)
- **Enunciado:**
  > João decidiu contratar os serviços de uma empresa por telefone através do SAC (Serviço de Atendimento ao Consumidor). O atendente ditou para João o número de protocolo de atendimento da ligação e pediu que ele anotasse. Entretanto, João não entendeu um dos algarismos ditados pelo atendente e anotou o número 1 3 \_ 9 8 2 0 7, sendo que o espaço vazio é o do algarismo que João não entendeu.
  >
  > De acordo com essas informações, a posição ocupada pelo algarismo que falta no número de protocolo é a de
- **Alternativas:**
  - A) Centena.
  - B) Dezena de milhar.
  - C) Centena de milhar.
  - D) Milhão.
  - E) Centena de milhão.
- **Gabarito:** C
- **Resumo para o app (adaptada):** No número de protocolo 1 3 _ 9 8 2 0 7, qual ordem decimal ocupa o algarismo que falta?
- **Conferência matemática:** Da direita para a esquerda: 7(U), 0(D), 2(C), 8(UM), 9(DM), _(CM) = centena de milhar. Gabarito C.

## Questão 3
- **Banca / Ano / Questão:** ENEM 2009 — Questão 156
- **URL do enunciado:** https://api.enem.dev/v1/exams/2009/questions/156
- **URL do gabarito:** https://api.enem.dev/v1/exams/2009/questions/156 (`correctAlternative: "A"`)
- **Enunciado:**
  > Para cada indivíduo, a sua inscrição no Cadastro de Pessoas Físicas (CPF) é composto por um número de 9 algarismos e outro número de 2 algarismos, na forma _d1_ e _d2_, em que os dígitos _d1_ e _d2_ são denominados dígitos verificadores. Os dígitos verificadores são calculados, a partir da esquerda, da seguinte maneira: os 9 primeiros algarismos são multiplicados pela sequência 10, 9, 8, 7, 6, 5, 4, 3, 2 (o primeiro por 10, o segundo por 9, e assim sucessivamente); em seguida, calcula-se o resto _r_ da divisão da soma dos resultados das multiplicações por 11, e se esse resto _r_ for 0 ou 1, _d1_ é zero, caso contrário _d1_ = (11 – r). O dígito _d2_ é calculado pela mesma regra, na qual os números a serem multiplicados pela sequência dada são contados a partir do segundo algarismo, sendo _d1_ o último algarismo, isto é, _d2_ é zero se o resto _s_ da divisão por 11 das somas das multiplicações for 0 ou 1, caso contrário, _d2_ = (11 – _s_).
  >
  > Suponha que João tenha perdido seus documentos, inclusive o cartão de CPF e, ao dar queixa da perda na delegacia, não conseguisse lembrar quais eram os dígitos verificadores, recordando-se apenas que os nove primeiros algarismos eram 123.456.789. Neste caso, os dígitos verificadores d1 e d2 esquecidos são, respectivamente,
- **Alternativas:**
  - A) 0 e 9.
  - B) 1 e 4.
  - C) 1 e 7.
  - D) 9 e 1.
  - E) 0 e 1.
- **Gabarito:** A
- **Resumo para o app (adaptada):** Calcule os dígitos verificadores d1 e d2 do CPF 123.456.789 pela regra do resto da divisão por 11.
- **Conferência matemática:** S1 = 1·10+2·9+3·8+4·7+5·6+6·5+7·4+8·3+9·2 = 210 = 19·11 + 1 ⇒ r=1 ⇒ d1=0. S2 = 2·10+3·9+4·8+5·7+6·6+7·5+8·4+9·3+0·2 = 244 = 22·11 + 2 ⇒ s=2 ⇒ d2=9. Gabarito A.
