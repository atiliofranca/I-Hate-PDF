# 🐳 I Hate PDF - Guia Docker

Este guia explica como executar a aplicação I Hate PDF usando Docker.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

## 🚀 Início Rápido

### 1. Clone o Repositório
```bash
git clone <repository-url>
cd i-hate-pdf
```

### 2. Execute a Aplicação

#### Método 1: Script Helper (Recomendado)
```bash
# Tornar o script executável (primeira vez)
chmod +x docker.sh

# Iniciar em modo desenvolvimento
./docker.sh dev

# Ou iniciar em modo produção
./docker.sh prod
```

#### Método 2: Docker Compose Direto
```bash
# Desenvolvimento (porta 3000)
docker-compose up --build

# Produção (porta 3001)
docker-compose --profile production up --build
```

### 3. Acessar a Aplicação
- **Desenvolvimento**: http://localhost:3000
- **Produção**: http://localhost:3001

## 📚 Comandos Disponíveis

### Script Helper (`./docker.sh`)
```bash
./docker.sh build    # Constrói apenas a imagem
./docker.sh dev      # Inicia em desenvolvimento
./docker.sh prod     # Inicia em produção  
./docker.sh stop     # Para todos os containers
./docker.sh clean    # Remove containers e imagens
./docker.sh logs     # Mostra logs em tempo real
./docker.sh help     # Mostra ajuda
```

### Docker Compose Direto
```bash
# Construir e iniciar
docker-compose up --build

# Iniciar em segundo plano
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Executar comandos no container
docker-compose exec i-hate-pdf bash
```

## 🔧 Configurações

### Portas
- **Desenvolvimento**: 3000 (com hot reload)
- **Produção**: 3001 (otimizado)

### Volumes (Desenvolvimento)
```yaml
volumes:
  - .:/app              # Código fonte
  - /app/node_modules    # Node modules (performance)
```

### Variáveis de Ambiente
```yaml
environment:
  - NODE_ENV=development  # ou production
```

## 🐛 Solução de Problemas

### Aviso sobre Versão Obsoleta
Se aparecer: `the attribute 'version' is obsolete`
```bash
# Já foi corrigido no docker-compose.yml atual
# Ignore este aviso, não afeta o funcionamento
```

### Porta em Uso
```bash
# Verificar qual processo usa a porta
sudo lsof -i :3000

# Matar processo se necessário
sudo kill -9 <PID>

# Ou usar porta diferente no docker-compose.yml
ports:
  - "3002:3000"  # Usar porta 3002 no host
```

### Problemas de Permissão
```bash
# SOLUÇÃO RÁPIDA: Use o script automático
./fix-docker-permissions.sh

# OU manualmente:
# Linux: Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Corrigir permissões do socket
sudo chmod 666 /var/run/docker.sock

# Aplicar mudanças
newgrp docker
# OU fazer logout/login
```

### Container não Inicia
```bash
# Ver logs detalhados
docker-compose logs

# Reconstruir do zero
./docker.sh clean
./docker.sh build
./docker.sh dev
```

### Problemas de Cache
```bash
# Limpar cache do Docker
docker system prune -a

# Reconstruir sem cache
docker-compose build --no-cache
```

## 🔄 Desenvolvimento

### Hot Reload
Em modo desenvolvimento, o container monitora mudanças nos arquivos:
- Alterações em CSS/JS são refletidas automaticamente
- Não é necessário reiniciar o container

### Instalando Dependências
```bash
# Método 1: Reconstruir container
./docker.sh clean
./docker.sh dev

# Método 2: Executar npm install no container
docker-compose exec i-hate-pdf npm install <package-name>
```

### Debug
```bash
# Acessar bash do container
docker-compose exec i-hate-pdf sh

# Ver estrutura de arquivos
docker-compose exec i-hate-pdf ls -la

# Ver processo do Node.js
docker-compose exec i-hate-pdf ps aux
```

## 📁 Estrutura Docker

```
i-hate-pdf/
├── Dockerfile              # Definição da imagem
├── docker-compose.yml      # Orquestração
├── .dockerignore          # Arquivos ignorados
├── docker.sh              # Script helper
└── ...
```

### Dockerfile Explicado
```dockerfile
FROM node:18-alpine        # Base Node.js Alpine (leve)
WORKDIR /app              # Diretório de trabalho
COPY package*.json ./     # Copiar dependências primeiro
RUN npm install           # Instalar dependências
COPY . .                  # Copiar código fonte
EXPOSE 3000              # Expor porta
USER nextjs              # Usuário não-root (segurança)
CMD ["npm", "start"]     # Comando de inicialização
```

## 🚀 Deploy em Produção

### Docker Hub
```bash
# Build e tag da imagem
docker build -t seu-usuario/i-hate-pdf .

# Push para Docker Hub
docker push seu-usuario/i-hate-pdf

# Pull e execute em produção
docker run -d -p 3000:3000 seu-usuario/i-hate-pdf
```

### Docker Swarm
```bash
# Inicializar swarm
docker swarm init

# Deploy do stack
docker stack deploy -c docker-compose.yml i-hate-pdf
```

### Kubernetes
```bash
# Converter docker-compose para k8s
kompose convert

# Aplicar no cluster
kubectl apply -f .
```

## 📊 Monitoramento

### Logs
```bash
# Logs em tempo real
docker-compose logs -f

# Logs específicos de um serviço
docker-compose logs -f i-hate-pdf

# Últimas N linhas
docker-compose logs --tail=50 i-hate-pdf
```

### Status dos Containers
```bash
# Ver containers rodando
docker-compose ps

# Estatísticas de uso
docker stats

# Inspecionar container
docker-compose exec i-hate-pdf top
```

## 🔐 Segurança

### Boas Práticas Implementadas
- ✅ Usuário não-root no container
- ✅ Imagem Alpine (menor superfície de ataque)
- ✅ .dockerignore para excluir arquivos sensíveis
- ✅ Variáveis de ambiente para configuração

### Recomendações Adicionais
```bash
# Scan de vulnerabilidades (se disponível)
docker scan i-hate-pdf

# Atualizar base image regularmente
docker pull node:18-alpine
docker-compose build --no-cache
```

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs: `./docker.sh logs`
2. Tente reconstruir: `./docker.sh clean && ./docker.sh dev`
3. Consulte a seção de solução de problemas acima
4. Abra uma issue no repositório

**Happy Dockering!** 🐳