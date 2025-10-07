# I Hate PDF

Uma aplicação web completa para edição, conversão e gerenciamento de arquivos PDF.

![I Hate PDF](i-hate-pdf.png)

## 📋 Funcionalidades

### 🛠️ Edição de PDF

- **Juntar PDF**: Mesclar múltiplos PDFs em um único arquivo
- **Dividir PDF**: Separar páginas ou criar intervalos específicos
- **Organizar PDF**: Reordenar, excluir ou adicionar páginas
- **Editar PDF**: Adicionar texto, imagens e anotações
- **Números de página**: Adicionar numeração customizável
- **Marca d'água**: Inserir texto ou imagem como marca d'água

### 🔄 Conversão para PDF

- **Word para PDF**: Converter documentos DOC/DOCX
- **PowerPoint para PDF**: Converter apresentações PPT/PPTX
- **Excel para PDF**: Converter planilhas XLS/XLSX
- **JPG para PDF**: Converter imagens para PDF
- **Digitalizar para PDF**: Converter documentos digitalizados

### 📤 Conversão de PDF

- **PDF para Word**: Extrair conteúdo para documentos editáveis
- **PDF para PowerPoint**: Converter para apresentações
- **PDF para Excel**: Extrair dados para planilhas
- **PDF para JPG**: Converter páginas em imagens

### ⚡ Otimização

- **Comprimir PDF**: Reduzir tamanho mantendo qualidade

### 🔒 Segurança

- **Proteger PDF**: Adicionar senha de proteção
- **Desbloquear PDF**: Remover senhas existentes

### 📊 Ferramentas Especiais

- **Comparar PDF**: Identificar diferenças entre versões

## 🚀 Instalação e Uso

### 🎯 Escolha seu Método de Instalação

#### 🐳 **Método 1: Docker (Recomendado) - Sem Instalações Complexas**

**✅ Vantagens:**

- ✅ **Não precisa instalar Node.js** na sua máquina
- ✅ **Funciona em qualquer OS** (Windows, Linux, macOS)
- ✅ **Ambiente isolado** - não interfere com outras aplicações
- ✅ **Setup em 30 segundos** - apenas Docker necessário

**📋 Únicos Pré-requisitos:**

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado

#### 📦 **Método 2: Instalação Manual - Para Desenvolvedores**

**⚠️ Requisitos Adicionais:**

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- **Node.js 16+** (apenas se não usar Docker)
- **npm/yarn** (gerenciador de pacotes)

---

### Instalação

#### 🐳 Usando Docker (Recomendado)

Docker oferece a melhor experiência - **Node.js já está incluído no container**, então você não precisa instalar nada além do Docker!

##### 📋 Pré-requisitos Docker

**Para todos os sistemas operacionais:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) (incluído no Docker Desktop)

##### 🪟 **Windows**

**Instalação do Docker:**

1. Baixe [Docker Desktop para Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)
2. Execute o instalador e siga as instruções
3. Reinicie o computador se solicitado
4. Abra o Docker Desktop e aguarde inicialização

**Executando a aplicação (Escolha uma dessas opções):**

```powershell
# 1. Clone o projeto (PowerShell/CMD)
git clone <repository-url>
cd i-hate-pdf

# 2. Método 1: Docker Compose (recomendado para Windows)
docker-compose up --build

# 3. Método 2Script PowerShell (se disponível)
.\docker.ps1 dev

# 4. Método 3: Comandos individuais
docker build -t i-hate-pdf .
docker run -p 3000:3000 i-hate-pdf
```

**Parar a aplicação no Windows:**

```powershell
# Pressione Ctrl+C no terminal onde está rodando
# Ou em outro terminal:
docker-compose down
```

##### 🐧 **Linux**

**Instalação do Docker:**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose

# CentOS/RHEL/Fedora
sudo dnf install docker docker-compose

# Arch Linux
sudo pacman -S docker docker-compose

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Iniciar serviço
sudo systemctl start docker
sudo systemctl enable docker
```

**Executando a aplicação:**

```bash
# 1. Clone o projeto
git clone <repository-url>
cd i-hate-pdf

# 2. Tornar script executável
chmod +x docker.sh

# 3. Método 1: Script helper (recomendado)
./docker.sh dev        # Desenvolvimento
./docker.sh prod       # Produção
./docker.sh stop       # Parar
./docker.sh clean      # Limpar tudo

# 4. Método 2: Docker Compose direto
docker-compose up --build                    # Desenvolvimento
docker-compose --profile production up       # Produção
docker-compose down                          # Parar
```

**Verificação no Linux:**

```bash
# Verificar se Docker está funcionando
docker --version
docker-compose --version
docker ps

# Se houver problemas de permissão
sudo chmod 666 /var/run/docker.sock
```

##### 🍎 **macOS**

**Instalação do Docker:**

1. Baixe [Docker Desktop para Mac](https://desktop.docker.com/mac/main/amd64/Docker.dmg)
2. Instale arrastando para a pasta Applications
3. Abra Docker Desktop e aguarde inicialização
4. Aceite as permissões necessárias

**Executando a aplicação:**

```bash
# 1. Clone o projeto (Terminal)
git clone <repository-url>
cd i-hate-pdf

# 2. Tornar script executável
chmod +x docker.sh

# 3. Método 1: Script helper (recomendado)
./docker.sh dev        # Desenvolvimento
./docker.sh prod       # Produção  
./docker.sh stop       # Parar
./docker.sh logs       # Ver logs
./docker.sh help       # Ajuda

# 4. Método 2: Docker Compose
docker-compose up --build    # Iniciar
docker-compose down          # Parar
```

**Usando Homebrew (alternativo):**

```bash
# Instalar Docker via Homebrew
brew install --cask docker
brew install docker-compose

# Depois seguir os mesmos comandos acima
```

##### 🌍 **Comandos Universais (Todos os Sistemas)**

**Iniciar a aplicação:**

```bash
# Desenvolvimento (porta 3000)
docker-compose up --build

# Produção (porta 3001) 
docker-compose --profile production up --build

# Em background (não bloqueia terminal)
docker-compose up -d --build
```

**Gerenciar a aplicação:**

```bash
# Ver status dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Parar aplicação
docker-compose down

# Reconstruir tudo do zero
docker-compose down --rmi all
docker-compose up --build
```

**Acessar a aplicação:**

- **Desenvolvimento**: http://localhost:3000
- **Produção**: http://localhost:3001

##### 🔧 **Comandos de Manutenção**

```bash
# Limpar cache e containers antigos
docker system prune -a

# Ver uso de espaço
docker system df

# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune
```

##### 🐛 **Solução de Problemas Comuns**

**Windows:**

- Se Docker Desktop não iniciar: Habilite Hyper-V e WSL2
- Erro de permissão: Execute PowerShell como Administrador
- Porta em uso: `netstat -ano | findstr :3000`

**Linux:**

- Erro de permissão: `sudo usermod -aG docker $USER`
- Docker não inicia: `sudo systemctl start docker`
- Socket error: `sudo chmod 666 /var/run/docker.sock`

**macOS:**

- Docker Desktop travado: Force quit e reinicie
- Erro M1/M2: Use imagem compatible `--platform linux/amd64`
- Permissão negada: `sudo chown -R $USER ~/.docker`

##### 📱 **Verificação de Funcionamento**

**1. Teste básico:**

```bash
# Verificar Docker
docker --version
docker run hello-world

# Verificar Compose  
docker-compose --version
```

**2. Teste da aplicação:**

```bash
# Iniciar aplicação
docker-compose up --build

# Em outro terminal, verificar se está rodando
curl http://localhost:3000
# Ou abra no navegador: http://localhost:3000
```

**3. Teste completo:**

```bash
# Desenvolvimento
docker-compose up --build
# Acesse: http://localhost:3000

# Produção
docker-compose --profile production up --build  
# Acesse: http://localhost:3001

# Parar
docker-compose down
```

#### 📦 Instalação Manual (Apenas se NÃO usar Docker)

**⚠️ ATENÇÃO**: Este método requer **Node.js instalado** na sua máquina. Se preferir não instalar Node.js, use o método Docker acima.

**📋 Pré-requisitos Obrigatórios:**

- Node.js 16+ instalado localmente
- npm ou yarn
- Git

**🔧 Passos de Instalação:**

1. **Instale Node.js** (se ainda não tiver):

   - **Windows/macOS**: https://nodejs.org/
   - **Linux**: `sudo apt install nodejs npm` (Ubuntu/Debian)
2. **Clone o projeto**:

```bash
git clone <repository-url>
cd i-hate-pdf
```

3. **Instale as dependências**:

```bash
npm install
```

4. **Execute o servidor local**:

```bash
npm start
```

5. **Acesse a aplicação**:
   - Abra o navegador em `http://localhost:3000`
   - Ou simpemente abra o arquivo `index.html` diretamente

---

## 🤔 Docker vs Instalação Manual - Qual Escolher?

| Aspecto                       | 🐳 Docker                             | 📦 Manual                                |
| ----------------------------- | ------------------------------------- | ---------------------------------------- |
| **Node.js necessário** | ❌**NÃO precisa instalar**     | ✅**Deve instalar Node.js 16+**    |
| **Setup time**          | ⚡ ~30 segundos                       | ⏱️ ~5-10 minutos                       |
| **Funciona em**         | 🌍 Windows, macOS, Linux              | 🌍 Windows, macOS, Linux                 |
| **Isolamento**          | ✅**Totalmente isolado**        | ❌ Pode conflitar com outros projetos    |
| **Atualizações**      | ✅**Automáticas no container** | ❌ Manual (Node.js, npm, etc.)           |
| **Deploy**              | ✅**Igual em qualquer lugar**   | ❌ Depende da máquina                   |
| **Primeira vez**        | 🐳**Recomendado para todos**    | 💻**Apenas para devs experientes** |

### 🎯 **Recomendação:**

#### 👥 **Para Usuários/Testadores:**

```bash
# Use Docker - simples e rápido!
docker-compose up --build
# Acesse: http://localhost:3000
```

#### 👨‍💻 **Para Desenvolvedores:**

```bash
# Docker ainda é recomendado (ambiente consistente)
./docker.sh dev
# Acesse: http://localhost:3000

# Manual apenas se quiser modificar dependências
npm install && npm start
```

---

### Uso Básico

1. **Selecionar Funcionalidade**:

   - Use o menu lateral para escolher a operação desejada
   - Cada funcionalidade tem suas próprias regras de entrada
2. **Carregar Arquivos**:

   - Clique na área de upload ou arraste arquivos
   - Formatos aceitos variam conforme a funcionalidade
3. **Configurar Opções**:

   - Algumas funções abrem modais de configuração
   - Ajuste parâmetros conforme necessário
4. **Processar**:

   - Clique em "Processar Arquivos"
   - Acompanhe o progresso na barra
   - Arquivos processados são baixados automaticamente

## 🎨 Temas

A aplicação suporta dois temas:

- **Tema Claro**: Interface clara e moderna
- **Tema Escuro**: Interface escura para reduzir fadiga visual

Use o botão no canto inferior esquerdo da sidebar para alternar entre os temas.

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:

- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (320px - 767px)

## 🔧 Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos responsivos com variáveis CSS
- **JavaScript ES6+**: Lógica da aplicação

### Bibliotecas PDF

- **PDF-lib**: Manipulação de PDFs (juntar, dividir, editar)
- **jsPDF**: Criação de PDFs
- **File Saver**: Download de arquivos

### Icons e Fontes

- **Font Awesome**: Ícones
- **System Fonts**: Tipografia nativa do sistema

## 📁 Estrutura do Projeto

```
i-hate-pdf/
├── index.html                 # Página principal
├── package.json              # Dependências e scripts
├── exemplo.png               # Imagem de referência do layout
├── i-hate-pdf.png           # Logo da aplicação
├── 📦 Docker Files/          # Arquivos de containerização
│   ├── Dockerfile            # Definição da imagem Docker
│   ├── docker-compose.yml    # Orquestração de containers
│   ├── .dockerignore         # Arquivos ignorados no build
│   ├── Dockerfile            # Definição da imagem Docker
│   ├── docker-compose.yml    # Orquestração de containers
│   ├── .dockerignore         # Arquivos ignorados no build
│   └── DOCKER_RESOLUTION.md  # Resolução de problemas específicos encontrados
├── src/
│   ├── css/
│   │   ├── light-theme.css   # Tema claro
│   │   └── dark-theme.css    # Tema escuro
│   ├── js/
│   │   ├── app.js           # Lógica principal da aplicação
│   │   ├── pdf-functions.js # Funções de processamento PDF
│   │   └── ui-components.js # Componentes de interface
│   └── assets/              # Recursos adicionais
└── README.md                # Documentação principal
```

### 🐳 **Arquivos Docker Incluídos**

| Arquivo                | Descrição                      | Uso                  |
| ---------------------- | -------------------------------- | -------------------- |
| `Dockerfile`         | Define como construir a imagem   | Build automático    |
| `docker-compose.yml` | Configuração de serviços      | Orquestração       |
| `.dockerignore`      | Arquivos excluídos do build     | Otimização         |
| `DOCKER_RESOLUTION.md` | Resolução de problemas específicos encontrados | `cat DOCKER_RESOLUTION.md` |
| `setup.sh`           | Verificação de pré-requisitos | `./setup.sh`       |
| `DOCKER.md`          | Documentação detalhada         | Referência completa |
| `QUICK_START.md`     | Guia rápido por OS              | Início em 30s       |

## 🎯 Funcionalidades Detalhadas

### Juntar PDF

- **Entrada**: 2 ou mais arquivos PDF
- **Saída**: 1 arquivo PDF combinado
- **Opções**: Ordem dos arquivos pode ser reorganizada

### Dividir PDF

- **Entrada**: 1 arquivo PDF
- **Saída**: Múltiplos arquivos PDF ou páginas específicas
- **Opções**:
  - Páginas específicas (1, 3, 5-7)
  - Intervalo (página X até Y)
  - Separar todas as páginas

### Comprimir PDF

- **Entrada**: 1 ou mais arquivos PDF
- **Saída**: Arquivos comprimidos separadamente
- **Benefício**: Reduz tamanho mantendo qualidade

### Marca d'água

- **Entrada**: 1 arquivo PDF
- **Opções**:
  - Texto personalizado ou imagem
  - Posição configurável
  - Opacidade ajustável
  - Tamanho da fonte

### Números de Página

- **Entrada**: 1 arquivo PDF
- **Opções**:
  - Posição (superior/inferior, esquerda/centro/direita)
  - Formato (numérico, romano, texto)
  - Número inicial

## 🔒 Segurança e Privacidade

- **Processamento Local**: Todos os arquivos são processados localmente no navegador
- **Sem Upload**: Nenhum arquivo é enviado para servidores externos
- **Privacidade**: Seus documentos permanecem em seu computador

## 🌐 Compatibilidade

### Navegadores Suportados

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

### Formatos Suportados

- **PDF**: Leitura e escrita completa
- **Imagens**: JPG, JPEG, PNG
- **Documentos**: DOC, DOCX (conversão básica)
- **Planilhas**: XLS, XLSX (conversão básica)
- **Apresentações**: PPT, PPTX (conversão básica)

## 🚧 Limitações Conhecidas

1. **Conversões de Office**: Funcionalidades básicas implementadas, podem necessitar bibliotecas adicionais para conversões complexas
2. **OCR**: Digitalização de texto não implementada (apenas conversão de imagem)
3. **Senhas**: Proteção e remoção de senhas simuladas (requer bibliotecas específicas)
4. **Tamanho de Arquivo**: Limitado pela memória disponível do navegador

## 🛠️ Desenvolvimento

### 🐳 Comandos Docker por Sistema Operacional

#### 🪟 **Windows (PowerShell)**

```powershell
# Scripts helper para Windows
.\docker.ps1 dev      # Desenvolvimento (porta 3000)
.\docker.ps1 prod     # Produção (porta 3001)
.\docker.ps1 stop     # Parar containers
.\docker.ps1 clean    # Limpar containers e imagens
.\docker.ps1 logs     # Ver logs
.\docker.ps1 help     # Ajuda

# Comandos docker-compose (universais)
docker-compose up --build                    # Desenvolvimento
docker-compose --profile production up       # Produção
docker-compose down                          # Parar
```

#### 🐧 **Linux** / 🍎 **macOS (Terminal/Bash)**

```bash
# Scripts helper para Unix
./docker.sh dev      # Desenvolvimento (porta 3000)
./docker.sh prod     # Produção (porta 3001)
./docker.sh stop     # Parar containers
./docker.sh clean    # Limpar containers e imagens
./docker.sh logs     # Ver logs
./docker.sh help     # Ajuda

# Comandos docker-compose (universais)
docker-compose up --build                    # Desenvolvimento
docker-compose --profile production up       # Produção
docker-compose down                          # Parar
```

#### 🌍 **Comandos Universais (Todos os Sistemas)**

```bash
# Funcionam em Windows, Linux e macOS
docker-compose up --build              # Desenvolvimento
docker-compose down                    # Parar aplicação
docker-compose logs -f                 # Ver logs
docker-compose ps                      # Status containers
docker system prune -a                 # Limpar cache Docker
```

### 📦 Scripts Npm Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Instalar dependências
npm install

# Executar em modo de produção
npm run build
```

### 🔧 Configuração Docker

**Desenvolvimento**:

- Porta: 3000
- Hot reload: ✅ (com volumes)
- Logs: Tempo real

**Produção**:

- Porta: 3001
- Hot reload: ❌
- Otimizado para performance

### Estrutura de Classes

- **PDFMasterApp**: Classe principal da aplicação
- **PDFProcessor**: Processamento de arquivos PDF
- **UIComponents**: Componentes de interface (modals, notificações)

### Adicionando Novas Funcionalidades

1. Adicione a funcionalidade em `app.js` no objeto `functionalities`
2. Implemente o processamento em `pdf-functions.js`
3. Adicione componentes UI necessários em `ui-components.js`
4. Atualize os estilos CSS conforme necessário

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## � Documentação Adicional

### 🐳 **Docker**

- **`DOCKER.md`** - Guia completo Docker com solução de problemas
- **`QUICK_START.md`** - Início rápido para Windows, Linux e macOS
- **`DOCKER_RESOLUTION.md`** - Resolução de problemas específicos encontrados

### 🛠️ **Scripts Helper**

- **`docker.sh`** - Script Bash para Linux/macOS com comandos coloridos
- **`docker.ps1`** - Script PowerShell para Windows com verificações automáticas
- **`setup.sh`** - Verificação de pré-requisitos e configuração inicial

### 📖 **Guias Rápidos**

```bash
# Ver documentação específica
cat DOCKER.md          # Guia completo Docker
cat QUICK_START.md      # Início rápido (30 segundos)
./setup.sh             # Verificar se tudo está configurado
./docker.sh help       # Ajuda dos comandos (Linux/Mac)
.\docker.ps1 help      # Ajuda dos comandos (Windows)
```

### 🌍 **URLs de Acesso**

- **Desenvolvimento**: http://localhost:3000 (com hot reload)
- **Produção**: http://localhost:3001 (otimizado)
- **Status**: `docker-compose ps` (verificar containers rodando)

## 🀽� Suporte

### 🆘 **Primeira Ajuda**

1. **Verificar logs**: `./docker.sh logs` ou `docker-compose logs -f`
2. **Reconstruir**: `./docker.sh clean && ./docker.sh dev`
3. **Consultar documentação**: Leia `DOCKER.md` para problemas específicos
4. **Testar pré-requisitos**: Execute `./setup.sh`

### 🐛 **Problemas Comuns**

- **Docker não inicia**: Verifique se Docker Desktop está rodando
- **Erro de permissão**: Execute `sudo usermod -aG docker $USER` (Linux)
- **Porta em uso**: Mude a porta no `docker-compose.yml`
- **Build falha**: Execute `docker system prune -a` e tente novamente

### 💬 **Suporte Adicional**

- Abra uma issue no repositório
- Consulte a documentação das bibliotecas utilizadas
- Verifique os logs do console do navegador

---

**I Hate PDF** - Uma solução completa para todas as suas necessidades de PDF! 🚀
