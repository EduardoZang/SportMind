# 🧠 SportMind — Inteligência para o Esporte

## 📚 Sobre o Projeto

O sistema **SportMind** nasceu da necessidade real de otimizar e automatizar o gerenciamento de treinos esportivos em diferentes modalidades. A ideia surgiu quando o desenvolvedor **Eduardo Zang** assumiu o cargo de **auxiliar técnico** ao lado do professor **Ms. Eder Ferrari**, vivenciando de perto toda a logística e a burocracia envolvidas na organização eficiente dos treinos. 🏋️‍♂️📋

Essa experiência prática revelou a importância de uma gestão estruturada e fluida para o bom funcionamento das rotinas esportivas. Ao concluir sua formação no **Ensino Médio Integrado ao Técnico em Informática**, Eduardo uniu forças com o professor Éder para idealizar uma solução que fosse capaz de tornar esses processos mais ágeis, intuitivos e eficazes.

🚀 Assim nasceu o **SportMind**: um sistema completo e multi-institucional, voltado à administração de:

- 🏫 Instituições  
- 👤 Usuários  
- 🧑‍🏫 Professores  
- 🧑‍🎓 Atletas  
- 🏅 Modalidades  
- 📅 Calendários  
- 🏃‍♂️ Treinos  
- 📊 Frequência  
- 🥇 Resultados  
- 📢 Comunicação automatizada (e-mail e WhatsApp)

Tudo isso em uma plataforma moderna, responsiva e segura. ✅

---

## 💡 Origem e Significado do Nome

O nome **SportMind** representa mais que um sistema. Ele traduz a **mentalidade do esporte** — uma junção entre *Sport* (esporte) e *Mind* (mente), refletindo o propósito do projeto: aliar **disciplina, estratégia e inteligência** à rotina esportiva. 🧠⚽

A palavra *Mind* evoca a **cerebralidade**, simbolizando a mente como o centro da organização, do foco e das decisões que fazem a diferença nos bastidores de cada treino, competição e conquista.

> **SportMind** não é apenas uma ferramenta.  
> É a materialização de uma filosofia: transformar o esporte com inteligência, tecnologia e gestão consciente. 🌟📈

---

## 🎯 Nosso Propósito

Levar aos profissionais do esporte uma solução **eficaz, intuitiva e inteligente**, capaz de facilitar o dia a dia de diretores, professores e atletas.  
Com o SportMind, a **mentalidade esportiva** ganha um novo aliado: a **tecnologia**. 🤝💻

---

## ✅ **REQUISITOS FUNCIONAIS**

1. **Cadastro de Instituições**

   * Campos: nome da instituição, CNPJ, endereço, telefone, e-mail, logotipo.
   * Cada item do sistema será vinculado ao `instituicaoId`.

2. **Cadastro de Usuários**

   * Campos: nome, nome social (opcional), data de nascimento, CPF, RG, órgão expedidor, matrícula escolar (opcional), telefone, e-mail, foto, nome de usuário, senha, observações (opcional).
   * Vinculado à instituição.

3. **Cadastro de Professores**

   * Com base nos usuários cadastrados.
   * Cada professor pertence a uma instituição.

4. **Cadastro de Atletas**

   * Com base nos usuários cadastrados.
   * Um atleta pode participar de múltiplas modalidades.

5. **Cadastro de Modalidades**

   * Campos: nome da modalidade, descrição, lista de atletas vinculados.
   * Vinculada à instituição.

6. **Cadastro de Calendário**

   * Criar calendário anual por instituição.
   * Base para criação de treinos e eventos.

7. **Cadastro de Treinos**

   * Associar treino a uma modalidade e a um dia no calendário.
   * Campos: descrição, horário de início/fim, local.

8. **Cadastro de Notícias**

   * Criar notícias para uma ou mais modalidades.
   * Campos: título, conteúdo, anexos (imagens, PDF, Word, Excel, links), data.
   * Envio automático por e-mail e WhatsApp para os grupos relacionados.

9. **Notificações por E-mail/WhatsApp**

   * Ao cadastrar notícia ou treino, enviar notificação automática para:

     * Grupo da modalidade, se for direcionado.
     * Grupo geral da instituição, se for para todos.

10. **Cadastro de Frequência**

    * Só pode ser lançada se houver treino no calendário no dia.
    * Listar atletas da modalidade e marcar presença:

      * Presente (padrão)
      * Falta
      * Falta Justificada

11. **Boletim de Resultados**

    * Associar atleta a uma modalidade.
    * Inserir histórico de competições e medalhas.

12. **Sistema de Permissões**

    * **Atleta**:

      * Ver calendário de treinos das modalidades em que participa.
      * Visualizar frequência e medalhas.
      * Editar seus dados pessoais.
    * **Professor (Técnico)**:

      * Acesso completo a todas as telas, exceto configurações da instituição.
    * **Diretor**:

      * Acesso completo ao sistema, incluindo configurações da instituição.

---

## 🚫 **REQUISITOS NÃO FUNCIONAIS**

1. **Tecnologias Utilizadas**

   * **Frontend**: React.js + Bootstrap 5
   * **Backend**: Node.js (Express)
   * **Banco de Dados**: PostgreSQL

2. **Performance**

   * Operações CRUD com resposta menor que 2 segundos.
   * Listagens com paginação a partir de 20 registros.

3. **Segurança**

   * Senhas criptografadas com **bcrypt**
   * Autenticação com **JWT**
   * Validação de dados no cliente e no servidor.

4. **Usabilidade**

   * Interface limpa e intuitiva.
   * Navegação fluida entre seções.
   * Componentes reutilizáveis.

5. **Responsividade**

   * Totalmente funcional em **desktop e mobile**.
   * Layout adaptativo com Bootstrap 5.

6. **Compatibilidade**

   * Compatível com os principais navegadores: Chrome, Firefox, Safari, Edge.

7. **Backup e Integridade**

   * Backup diário do banco de dados.
   * Rollback automático em transações com falha.

8. **Multi-instituição**

   * Cada recurso é isolado por `instituicaoId`.
   * Não há cruzamento de dados entre instituições diferentes.

---

## ⚖️ **REGRAS DE NEGÓCIO**

1. Um usuário pode ser professor, atleta, ambos ou apenas cadastro básico.
2. Cada item do sistema é associado a uma instituição (`instituicaoId`).
3. Um atleta pode participar de várias modalidades.
4. Treinos e frequência só podem ser criados se houver calendário para o ano vigente.
5. Frequência só pode ser lançada se houver treino no dia.
6. Frequência padrão ao lançar é **Presente**.
7. Histórico de medalhas é cumulativo, sem sobrescrever dados anteriores.
8. Professores podem editar qualquer dado, atletas apenas os seus.
9. Apenas o diretor pode alterar dados da instituição.
10. O envio de notificações segue as regras de associação entre notícia/treino e modalidades.

---

## 🎨 **LAYOUT MODERNO (Verde & Branco)**

**Tecnologia de Estilo:** Bootstrap 5 + customizações CSS

### 🎨 Paleta de Cores

* Primária: `#2ecc71` (verde claro)
* Secundária: `#ffffff` (branco)
* Acento: `#27ae60` (verde escuro)
* Texto: `#333333`

### 🧩 Componentes Visuais

* **Navbar fixa** no topo: logotipo à esquerda, avatar/usuário à direita.
* **Cards responsivos** para:

  * Frequência
  * Modalidades
  * Boletim
* **Tabelas (DataTables)** com filtros e paginação.
* **Formulários** com validação inline e ícones.
* **Modais** para adicionar/editar entidades.
* **Dashboard inicial** com:

  * Próximos treinos
  * Notícias recentes
  * Calendário de eventos
* **Modo escuro (futuro opcional)** com toggle no perfil do usuário.

