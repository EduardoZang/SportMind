# 🧠 SportMind — Inteligência para o Esporte

<p align="center">
  <img src="assets/Logomarca_SportMind.png" alt="Logo SportMind inteiro" width="200" />
  <img src="assets/Logo_SportMind.png" alt="Logo SportMind slim" width="200" />
</p>

---

## 📋 Sumário

1. [Sobre o Projeto](#sobre-o-projeto)  
2. [Origem e Significado do Nome](#origem-e-significado-do-nome)  
3. [Nosso Propósito](#nosso-propósito)  
4. [Requisitos Funcionais](#✅-requisitos-funcionais)  
5. [Requisitos Não Funcionais](#🚫-requisitos-não-funcionais)  
6. [Regras de Negócio](#⚖️-regras-de-negócio)  
7. [Layout e Identidade Visual](#🎨-layout-e-identidade-visual)  

---

## 📚 Sobre o Projeto

O **SportMind** nasceu da necessidade real de otimizar e automatizar o gerenciamento de treinos esportivos em diferentes modalidades. Idealizado pelo **Eduardo Zang** e o **prof. Eder Ferrari**, o sistema surgiu para tornar processos logísticos e burocráticos mais ágeis e intuitivos após vivenciar a rotina esportiva de perto. 🏋️‍♂️📋

### Funcionalidades Principais

- 🏫 **Instituições**  
- 👤 **Usuários** (Atletas, Professores, Diretores)  
- 🏅 **Modalidades**  
- 📅 **Calendários anuais**  
- 🏃‍♂️ **Treinos**  
- 📢 **Notícias**  
- 📊 **Frequência**  
- 🥇 **Boletim de Resultados**  
- 🔒 **Sistema de Permissões**  
- 📤 **Notificações automatizadas** (e-mail)

---

## 💡 Origem e Significado do Nome

**SportMind** une *Sport* (esporte) e *Mind* (mente), representando a disciplina, estratégia e inteligência por trás da organização esportiva. É a filosofia de trazer planejamento e tecnologia aos bastidores de cada treino e competição. 🌟📈

> “SportMind não é apenas uma ferramenta.  
> É a materialização de uma filosofia:  
> transformar o esporte com inteligência, tecnologia e gestão consciente.”

---

## 🎯 Nosso Propósito

Entregar uma solução **eficaz, intuitiva e inteligente** para diretores, professores e atletas, facilitando toda a rotina de gestão esportiva. Com o SportMind, a mentalidade do esporte ganha um aliado tecnológico. 🤝💻

---

## ✅ Requisitos Funcionais

1. **Cadastro de Instituições**  
   - Nome, CNPJ, endereço, telefone, e-mail, logotipo  
2. **Cadastro de Usuários**  
   - Nome, nome social, data de nascimento, CPF, RG, matrícula, telefone, e-mail, foto, usuário, senha  
3. **Perfis (Roles)**  
   - Atleta, Professor, Diretor (mesmo usuário pode ter várias roles)  
4. **Cadastro de Modalidades**  
   - Nome, descrição, lista de atletas vinculados  
5. **Calendário Anual**  
   - Criação de calendário por instituição  
6. **Treinos**  
   - Data, descrição, horário, local, modalidade  
7. **Notícias**  
   - Título, conteúdo, anexos, data, modalidades  
   - Envio automático por e-mail  
8. **Frequência**  
   - Lançamento somente se houver treino no dia  
   - Marcação: Presente / Falta / Falta Justificada  
9. **Boletim de Resultados**  
   - Histórico de competições, classificações e medalhas  
10. **Notificações Automatizadas**  
    - Disparo de e-mail para atletas vinculados a treinos/notícias  
11. **Sistema de Permissões**  
    - Atleta: visualiza seus treinos, frequência e boletim  
    - Professor: CRUD completo (exceto configurações da instituição)  
    - Diretor: CRUD completo, incluindo configurações da instituição  

---

## 🚫 Requisitos Não Funcionais

1. **Tecnologias**  
   - Frontend: React.js + Bootstrap 5  
   - Backend: Node.js (Express)  
   - Banco de Dados: PostgreSQL  
2. **Performance**  
   - CRUD < 2 s  
   - Listagens com paginação (≥ 20 itens)  
3. **Segurança**  
   - Senhas com **bcrypt**  
   - Autenticação **JWT**  
   - Validação no cliente e servidor  
4. **Usabilidade**  
   - Interface limpa e componentes reutilizáveis  
5. **Responsividade**  
   - Desktop e mobile  
6. **Compatibilidade**  
   - Chrome, Firefox, Safari, Edge  
7. **Backup & Integridade**  
   - Backup diário  
   - Rollback automático em falhas  
8. **Multi-instituição**  
   - Dados isolados por `instituicaoId`  

---

## ⚖️ Regras de Negócio

1. Usuário pode ter múltiplas roles simultâneas.  
2. Atleta pode participar de várias modalidades.  
3. Treinos e frequência exigem calendário vigente.  
4. Frequência padrão ao lançar: **Presente**.  
5. Histórico de boletim é cumulativo.  
6. Professores editam qualquer dado (exceto config. da instituição).  
7. Atletas editam apenas seus dados.  
8. Somente Diretores alteram dados da instituição.  

---

## 🎨 Layout e Identidade Visual

- **Navbar** fixa: logo à esquerda, avatar/usuário à direita  
- **Dashboard**: cartões de próximos treinos, notícias recentes, calendário  
- **Tabelas** com filtros e paginação  
- **Modais** para CRUD  
- **Formulários** com validação inline e ícones  
- **Paleta**:  
  - Primária: `#2ecc71` (verde claro)  
  - Secundária: `#ffffff` (branco)  
  - Acento: `#27ae60` (verde escuro)  
  - Texto: `#333333`  

---

> Desenvolvido com ❤ por Eduardo Zang