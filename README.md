# 🧠 SportMind — Inteligência para o Esporte

<p align="center">
  <img src="assets/Logomarca_SportMind.png" alt="Logo SportMind inteiro" width="200" />
  <img src="assets/Logo_SportMind.png" alt="Logo SportMind slim" width="200" />
</p>

---

<h2 id="sumario">📋 Sumário</h2>

1. [Sobre o Projeto](#sobre-o-projeto)  
2. [Origem e Significado do Nome](#origem-e-significado-do-nome)  
3. [Nosso Propósito](#nosso-propósito)  
4. [Requisitos Funcionais](#requisitos-funcionais)  
5. [Requisitos Não Funcionais](#requisitos-nao-funcionais)  
6. [Regras de Negócio](#regras-de-negocio)  
7. [Layout e Identidade Visual](#layout-e-identidade-visual)  

---

<h2 id="sobre-o-projeto">📚 Sobre o Projeto</h2>

O **SportMind** nasceu da necessidade real de otimizar e automatizar o gerenciamento de treinos esportivos em diferentes modalidades. Idealizado pelo **Eduardo Zang** e o **prof. Éder Ferrari**, o sistema surgiu para tornar processos logísticos e burocráticos mais ágeis e intuitivos após vivenciar a rotina esportiva de perto. 🏋️‍♂️📋

---

<h2 id="origem-e-significado-do-nome">💡 Origem e Significado do Nome</h2>

**SportMind** une *Sport* (esporte) e *Mind* (mente), representando a disciplina, estratégia e inteligência por trás da organização esportiva. É a filosofia de trazer planejamento e tecnologia aos bastidores de cada treino e competição. 🌟📈

---

<h2 id="nosso-propósito">🎯 Nosso Propósito</h2>

Entregar uma solução **eficaz, intuitiva e inteligente** para diretores, professores e atletas, facilitando toda a rotina de gestão esportiva. Com o SportMind, a mentalidade do esporte ganha um aliado tecnológico. 🤝💻

---

<h2 id="requisitos-funcionais">✅ Requisitos Funcionais</h2>

1. **Cadastro de Instituições**: nome, CNPJ, endereço, telefone, e-mail, logotipo  
2. **Cadastro de Usuários**: nome, nome social, data de nascimento, CPF, RG, matrícula, telefone, e-mail, foto, usuário, senha  
3. **Perfis**: Atleta, Professor, Diretor (mesmo usuário pode ter várias roles)  
4. **Modalidades**: nome, descrição, lista de atletas  
5. **Calendário Anual** por instituição  
6. **Treinos**: data, descrição, horário, local, modalidade  
7. **Notícias**: título, conteúdo, anexos, data, modalidades, envio automático por e-mail  
8. **Frequência**: só se houver treino no dia; Presente / Falta / Falta Justificada  
9. **Boletim**: competições, classificações e medalhas  
10. **Notificações**: disparo de e-mail para atletas de treinos/notícias  
11. **Permissões**: Atleta, Professor e Diretor com acessos distintos  

---

<h2 id="requisitos-nao-funcionais">🚫 Requisitos Não Funcionais</h2>

- **Frontend**: React.js + Bootstrap 5  
- **Backend**: Node.js (Express)  
- **Banco**: PostgreSQL  
- **Performance**: CRUD < 2 s; paginação a partir de 20 itens  
- **Segurança**: bcrypt, JWT, validações  
- **Usabilidade**: interface limpa, componentes reutilizáveis  
- **Responsividade**: desktop e mobile  
- **Compatibilidade**: Chrome, Firefox, Safari, Edge  
- **Backup**: diário, rollback automático  
- **Multi-instituição**: dados isolados por instituicaoId  

---

<h2 id="regras-de-negocio">⚖️ Regras de Negócio</h2>

1. Usuário pode ter múltiplas roles simultâneas.  
2. Atleta pode participar de várias modalidades.  
3. Treinos e frequência exigem calendário vigente.  
4. Frequência padrão: **Presente**.  
5. Histórico de boletim é cumulativo.  
6. Professores editam qualquer dado (exceto config. da instituição).  
7. Atletas editam apenas seus próprios dados.  
8. Somente Diretores alteram configurações da instituição.  

---

<h2 id="layout-e-identidade-visual">🎨 Layout e Identidade Visual</h2>

- **Navbar fixa**: logo à esquerda, avatar/usuário à direita  
- **Dashboard**: cartões de próximos treinos, notícias recentes, calendário  
- **Tabelas** com filtros e paginação  
- **Modais** para CRUD  
- **Formulários** com validação inline e ícones  
- **Paleta**:  
  - Primária: `#2ecc71`  
  - Secundária: `#ffffff`  
  - Acento: `#27ae60`  
  - Texto: `#333333`  

> Desenvolvido com ❤ por Eduardo Zang