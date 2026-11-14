# Fontes candidatas — areas-e-volumes-por-composicao

## Questão 1
- **Banca / Ano / Questão:** ENEM 2023 — Questão 136
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/136
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/136 (`correctAlternative: "B"`)
- **Enunciado:**
  > Um artista plástico esculpe uma escultura a partir de um bloco de madeira de lei, em etapas. Inicialmente, esculpe um cone reto com 36 cm de altura e diâmetro da base medindo 18 cm. Em seguida, remove desse cone um cone menor, cujo diâmetro da base mede 6 cm, obtendo, assim, um tronco de cone, conforme ilustrado na figura.
  >
  > ![](https://enem.dev/2023/questions/136/565c2d5a-96a0-4468-9bb1-2710707a40fd.png)
  >
  > Em seguida, perfura esse tronco de cone, removendo um cilindro reto, de diâmetro 6 cm, cujo eixo de simetria é o mesmo do cone original. Dessa forma, ao final, a escultura tem a forma de um tronco de cone com uma perfuração cilíndrica de base a base.  
  > O tipo de madeira utilizada para produzir essa escultura tem massa igual a 0,6 g por centímetro cúbico de volume. Utilize 3 como aproximação para π.
  >
  > Qual é a massa, em grama, dessa escultura?
- **Alternativas:**
  - A) 1.198,8
  - B) 1.296,0
  - C) 1.360,8
  - D) 4.665,6
  - E) 4.860,0
- **Gabarito:** B
- **Resumo para o app (adaptada):** De um cone (h=36 cm, D=18 cm) retira-se cone menor (d=6 cm) e perfura-se cilindro central (d=6 cm). A 0,6 g/cm³ e π=3, qual a massa?
- **Conferência matemática:** Semelhança: r/R = 3/9 = 1/3 => h_menor = 12 cm, h_tronco = 24 cm. V_cone = (1/3)·3·9²·36 = 2916 cm³; V_menor = 2916/27 = 108 cm³ => V_tronco = 2808 cm³. V_cil = 3·3²·24 = 648 cm³. V_final = 2808 - 648 = 2160 cm³. Massa = 2160·0,6 = 1296,0 g. Alternativa B.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2019 — Questão 175
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/175
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/175 (`correctAlternative: "D"`)
- **Enunciado:**
  > Uma construtora pretende conectar um reservatório central (Rc) em formato de um cilindro, com raio interno igual a 2 m e altura interna igual a 3,30 m, a quatro reservatórios cilíndricos auxiliares (R1, R2, R3 e R4), os quais possuem raios internos e alturas internas medindo 1,5 m.
  >
  > ![](https://enem.dev/2019/questions/175/6eeec785-2f50-4d22-b6da-0a4570b9f881.png)
  >
  > As ligações entre o reservatório central e os auxiliares são feitas por canos cilíndricos com 0,10 m de diâmetro interno e 20 m de comprimento, conectados próximos às bases de cada reservatório.  
  > Na conexão de cada um desses canos com o reservatório central ha registros que liberam ou interrompem o fluxo de água.
  >
  > No momento em que o reservatório central está cheio e os auxiliares estão vazios, abrem-se os quatro registros e, após algum tempo, as alturas das colunas de água nos reservatórios se igualam, assim que cessa o fluxo de água entre eles, pelo princípio dos vasos comunicantes.
  >
  > A medida, em metro, das alturas das colunas de água nos reservatórios auxiliares, após cessar o fluxo de água entre eles, é
- **Alternativas:**
  - A) 1,44.
  - B) 1,16
  - C) 1,10.
  - D) 1,00.
  - E) 0,95.
- **Gabarito:** D
- **Resumo para o app (adaptada):** Cilindro central cheio (r=2 m, h=3,30 m) liga-se a 4 cilindros (r=1,5 m, h=1,5 m) por 4 canos (d=0,10 m, L=20 m). Qual a altura final?
- **Conferência matemática:** V_central = π·2²·3,3 = 13,2π m³. V_canos = 4·π·(0,05)²·20 = 0,2π m³. Sobra 13,2π - 0,2π = 13π m³ nos 5 reservatórios. Área total das bases = π·2² + 4·π·(1,5)² = 4π + 9π = 13π m². Altura final = 13π / 13π = 1,00 m. Alternativa D.

## Questão 3
- **Banca / Ano / Questão:** ENEM 2010 — Questão 164
- **URL do enunciado:** https://api.enem.dev/v1/exams/2010/questions/164
- **URL do gabarito:** https://api.enem.dev/v1/exams/2010/questions/164 (`correctAlternative: "B"`)
- **Enunciado:**
  > Uma metalúrgica recebeu uma encomenda para fabricar, em grande quantidade, uma peça com o formato de um prisma reto com base triangular, cujas dimensões da base são 6 cm, 8 cm e 10 cm e cuja altura é 10 cm. Tal peça deve ser vazada de tal maneira que a perfuração na forma de um cilindro circular reto seja tangente às suas faces laterais, conforme mostra a figura.
  >
  > ![](https://enem.dev/2010/questions/164/d7f10275-2a88-4791-b723-59fdae4f26d0.jpg)
  >
  > O raio da perfuração da peça é igual a
- **Alternativas:**
  - A) 1 cm.
  - B) 2 cm.
  - C) 3 cm.
  - D) 4 cm.
  - E) 5 cm.
- **Gabarito:** B
- **Resumo para o app (adaptada):** Um prisma reto de base triangular 6 cm, 8 cm e 10 cm e altura 10 cm tem perfuração cilíndrica tangente às faces laterais. Qual o raio?
- **Conferência matemática:** A base é triângulo retângulo (6² + 8² = 10²), área A = (6·8)/2 = 24 cm² e semiperímetro p = (6+8+10)/2 = 12 cm. Raio do círculo inscrito: r = A/p = 24/12 = 2 cm (ou r = (6+8-10)/2 = 2 cm). Alternativa B.
