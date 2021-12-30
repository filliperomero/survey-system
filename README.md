## Folder Structure

- data
  - protocols
    - db -> separados por entidade
- domain
- infra -> COnversa apenas com o data layer (se necessário, pode chamar o domain também para nao ficarmos replicando models sem necessidade)
- main
- presentation
- utils -> Se vc nao encontrar um local adequado para um arquivo em específico, crie essa pasta e coloque nisso. Nessa arquitetura, implementacoes de bibliotecas devem ficar nas pontas da arquitetura (infra, main ou utils)