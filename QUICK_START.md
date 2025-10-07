# 🚀 Guia Rápido - I Hate PDF com Docker

## 🎯 **Vantagem Principal: SEM Node.js na sua máquina!**

**✅ Com Docker você NÃO precisa:**
- Instalar Node.js
- Instalar npm/yarn  
- Configurar ambiente
- Gerenciar versões

**🐳 Docker inclui TUDO automaticamente!**

---

## 🪟 Windows

### 1. Instalar Docker Desktop
- Baixe: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
- Execute o instalador
- Reinicie o computador
- Abra Docker Desktop e aguarde inicialização

### 2. Executar Aplicação
```powershell
# Clone o projeto
git clone <repository-url>
cd i-hate-pdf

# Opção 1: Script PowerShell
.\docker.ps1 dev

# Opção 2: Docker Compose (recomendado)
docker-compose up --build

# Acesse: http://localhost:3000
```

### 3. Parar Aplicação
```powershell
# Pressione Ctrl+C no terminal
# Ou execute:
docker-compose down
```

---

## 🐧 Linux

### 1. Instalar Docker
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
sudo systemctl start docker
newgrp docker

# CentOS/Fedora
sudo dnf install docker docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER
```

### 2. Executar Aplicação  
```bash
# Clone o projeto
git clone <repository-url>
cd i-hate-pdf

# Tornar executável
chmod +x docker.sh

# Executar
./docker.sh dev

# Acesse: http://localhost:3000
```

### 3. Comandos Úteis
```bash
./docker.sh dev      # Desenvolvimento
./docker.sh prod     # Produção (porta 3001)
./docker.sh stop     # Parar
./docker.sh clean    # Limpar tudo
./docker.sh logs     # Ver logs
```

---

## 🍎 macOS

### 1. Instalar Docker Desktop
```bash
# Opção 1: Download direto
# https://desktop.docker.com/mac/main/amd64/Docker.dmg

# Opção 2: Homebrew
brew install --cask docker
```

### 2. Executar Aplicação
```bash
# Clone o projeto
git clone <repository-url>
cd i-hate-pdf

# Tornar executável
chmod +x docker.sh  

# Executar
./docker.sh dev

# Acesse: http://localhost:3000
```

### 3. Gerenciar Aplicação
```bash
./docker.sh dev      # Iniciar desenvolvimento
./docker.sh prod     # Iniciar produção  
./docker.sh stop     # Parar aplicação
./docker.sh help     # Ver ajuda
```

---

## 🌍 Comandos Universais

### Básicos (todos os sistemas)
```bash
# Iniciar
docker-compose up --build

# Parar  
docker-compose down

# Logs
docker-compose logs -f

# Status
docker-compose ps
```

### Manutenção
```bash
# Limpar cache
docker system prune -a

# Ver uso de espaço
docker system df

# Rebuild completo
docker-compose down --rmi all
docker-compose up --build
```

---

## 🔗 Links Úteis

- **Docker Desktop**: https://www.docker.com/products/docker-desktop/
- **Docker Compose**: https://docs.docker.com/compose/install/
- **Documentação completa**: Ver arquivo `DOCKER.md`

---

## ⚡ Início Rápido (30 segundos)

```bash
# 1. Clone
git clone <repository-url> && cd i-hate-pdf

# 2. Execute
docker-compose up --build

# 3. Acesse
# http://localhost:3000
```

**Pronto! A aplicação está rodando!** 🎉