#!/bin/bash

# Script para facilitar o desenvolvimento com Docker

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_message() {
    echo -e "${GREEN}[I-HATE-PDF]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verifica se Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
        exit 1
    fi
    
    # Verifica se o Docker daemon está rodando e se há permissões
    if ! docker info &> /dev/null; then
        if [[ $(docker info 2>&1) == *"permission denied"* ]]; then
            print_error "Permissão negada para acessar o Docker daemon."
            print_warning "Soluções possíveis:"
            echo "  1. Adicionar usuário ao grupo docker:"
            echo "     sudo usermod -aG docker \$USER"
            echo "     newgrp docker"
            echo ""
            echo "  2. Ou executar com sudo:"
            echo "     sudo ./docker.sh $1"
            echo ""
            echo "  3. Iniciar o Docker daemon:"
            echo "     sudo systemctl start docker"
            exit 1
        else
            print_error "Docker daemon não está rodando."
            print_warning "Para iniciar o Docker:"
            echo "  sudo systemctl start docker"
            echo "  sudo systemctl enable docker  # Para iniciar automaticamente"
            exit 1
        fi
    fi
}

# Build da imagem Docker
build() {
    print_message "Construindo a imagem Docker..."
    docker build -t i-hate-pdf .
}

# Executa o container em modo desenvolvimento
dev() {
    print_message "Iniciando aplicação em modo desenvolvimento..."
    docker-compose up --build i-hate-pdf
}

# Executa o container em modo produção
prod() {
    print_message "Iniciando aplicação em modo produção..."
    docker-compose --profile production up --build i-hate-pdf-prod
}

# Para todos os containers
stop() {
    print_message "Parando todos os containers..."
    docker-compose down
}

# Remove containers e imagens
clean() {
    print_warning "Removendo containers e imagens..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker image prune -f
}

# Mostra logs dos containers
logs() {
    docker-compose logs -f
}

# Menu de ajuda
help() {
    echo -e "${BLUE}I Hate PDF - Docker Helper${NC}"
    echo ""
    echo "Uso: $0 [COMANDO]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  build    - Constrói a imagem Docker"
    echo "  dev      - Inicia em modo desenvolvimento (porta 3000)"
    echo "  prod     - Inicia em modo produção (porta 3001)"
    echo "  stop     - Para todos os containers"
    echo "  clean    - Remove containers e imagens"
    echo "  logs     - Mostra logs dos containers"
    echo "  help     - Mostra esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 dev     # Inicia em desenvolvimento"
    echo "  $0 prod    # Inicia em produção"
    echo "  $0 stop    # Para a aplicação"
}

# Verifica argumentos
case "$1" in
    build)
        check_docker
        build
        ;;
    dev)
        check_docker
        dev
        ;;
    prod)
        check_docker
        prod
        ;;
    stop)
        check_docker
        stop
        ;;
    clean)
        check_docker
        clean
        ;;
    logs)
        check_docker
        logs
        ;;
    help|--help|-h)
        help
        ;;
    *)
        print_error "Comando inválido: $1"
        echo ""
        help
        exit 1
        ;;
esac