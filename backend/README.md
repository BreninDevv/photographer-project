# 📸 Sistema de Agendamento para Fotógrafo

---

## 📌 Visão Geral

Sistema de agendamento onde clientes podem contratar serviços fotográficos e escolher horários disponíveis, enquanto o administrador gerencia agenda, serviços e bloqueios de horários.

---

## 👤 Tipos de Usuário

O sistema possui dois tipos de usuários:

- CLIENT
- ADMIN

O tipo do usuário é definido pelo campo `role`.

---

# 👥 Regras do Cliente

## Cadastro e Autenticação

- realizar cadastro informando:
  - nome
  - email
  - senha
- realizar login
- realizar logout
- recuperar senha utilizando apenas o email

---

## 📸 Serviços

- visualizar apenas serviços ativos
- cada serviço possui:
  - nome
  - duração (em minutos)
  - preço
- o cliente deve obrigatoriamente escolher um serviço antes de visualizar a agenda

---

## 📅 Agenda

Após selecionar um serviço:

- o sistema exibe apenas horários que:
  - estejam dentro do horário de funcionamento
  - não estejam ocupados por outros agendamentos
  - não estejam bloqueados pelo administrador
  - comportem a duração total do serviço selecionado

---

## ⏰ Horário de Funcionamento

- funcionamento padrão:
  - **08:00 às 18:00**
- horários exibidos em blocos de **30 minutos**

Exemplo:

- 08:00
- 08:30
- 09:00
- 09:30

---

## 📌 Criação de Agendamento

O cliente pode:

- escolher uma data disponível
- escolher um horário disponível
- confirmar o serviço e o horário

Antes da confirmação final, o cliente pode:

- alterar o serviço
- alterar a data
- cancelar o processo e retornar ao início

---

## ✅ Após Confirmação

O cliente pode:

- visualizar seus agendamentos
- cancelar o agendamento até **24 horas antes do horário marcado**

Após esse prazo:

- apenas o administrador pode cancelar.

---

# 👑 Regras do Administrador

- possui cadastro pré-criado no sistema
- realiza login normalmente

---

## O administrador pode:

- visualizar a agenda completa
- visualizar todos os agendamentos
- cancelar agendamentos de clientes
- marcar sessões finalizadas como **concluídas**
- criar novos serviços
- editar serviços existentes
- desativar serviços (sem removê-los do banco)

---

## 🚫 Bloqueio de Horários

O administrador pode:

- bloquear um dia inteiro
- bloquear intervalos de horário específicos

Exemplos:

- 10/02/2026 → dia inteiro bloqueado
- 15/02/2026 → bloqueado das 14:00 às 16:00

Horários bloqueados:

- não aparecem para clientes
- impedem novos agendamentos

---

# 📦 Serviços (Planos)

Cada serviço contém:

- id
- nome
- duração (em minutos)
- preço
- status (ativo ou inativo)

---

## Serviços Iniciais

| Serviço                           | Duração | Preço  |
| --------------------------------- | ------- | ------ |
| Ensaio Individual                 | 60 min  | R$ 200 |
| Ensaio Profissional / Corporativo | 90 min  | R$ 280 |
| Ensaio Família                    | 120 min | R$ 350 |
| Evento / Casamento Civil          | 240 min | R$ 900 |

---

# ⚙️ Regras Técnicas Importantes

- a duração do serviço define automaticamente o horário final do agendamento
- não é permitido conflito entre agendamentos
- o sistema deve impedir sobreposição de horários
- serviços desativados não podem ser selecionados
- registros não devem ser apagados do banco, apenas desativados
- todos os agendamentos possuem status:
  - PENDING
  - CONFIRMED
  - CANCELED
  - DONE

---

# ✅ Observações

Este documento serve como base para:

- modelagem do banco de dados
- regras de negócio do backend
- validações do sistema
- integração entre front-end e back-end
