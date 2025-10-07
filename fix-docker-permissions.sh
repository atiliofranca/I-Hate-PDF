#!/bin/bash

# Script para resolver problemas de permissão do Docker

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Correção de Permissões Docker${NC}"
echo "=================================="

# Verifica se está rodando como root
if [[ $EUID -eq 0 ]]; then
    echo -e "${RED}❌ Não execute este script como root!${NC}"
    echo "Execute como usuário normal: ./fix-docker-permissions.sh"
    exit 1
fi

# Função para imprimir mensagens
print_step() {
    echo -e "${GREEN}➤${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    exit 1
fi

# Verificar se grupo docker existe
if ! getent group docker > /dev/null 2>&1; then
    print_step "Criando grupo docker..."
    sudo groupadd docker
fi

# Adicionar usuário ao grupo docker
print_step "Adicionando usuário '$USER' ao grupo docker..."
sudo usermod -aG docker $USER

# Verificar se usuário está no grupo
if groups $USER | grep -q docker; then
    print_success "Usuário '$USER' foi adicionado ao grupo docker"
else
    print_error "Falha ao adicionar usuário ao grupo docker"
    exit 1
fi

# Iniciar serviço Docker se não estiver rodando
print_step "Verificando status do serviço Docker..."
if ! sudo systemctl is-active --quiet docker; then
    print_step "Iniciando serviço Docker..."
    sudo systemctl start docker
    sudo systemctl enable docker
    print_success "Serviço Docker iniciado"
else
    print_info "Serviço Docker já está rodando"
fi

# Corrigir permissões do socket Docker
print_step "Corrigindo permissões do socket Docker..."
sudo chmod 666 /var/run/docker.sock

echo ""
print_warning "IMPORTANTE: Para que as mudanças tenham efeito completo:"
echo ""
echo "1️⃣  Execute um dos comandos abaixo:"
echo "   newgrp docker          # Aplica mudanças na sessão atual"
echo "   # OU"
echo "   sudo su - \$USER        # Reinicia a sessão do usuário"
echo "   # OU faça logout/login"
echo ""
echo "2️⃣  Teste se funcionou:"
echo "   docker --version"
echo "   docker info"
echo ""
echo "3️⃣  Execute a aplicação:"
echo "   ./docker.sh dev"

echo ""
print_info "Se ainda tiver problemas, você pode:"
echo "• Reiniciar o computador"
echo "• Executar com sudo: sudo ./docker.sh dev"
echo "• Verificar logs: journalctl -u docker.service"

echo ""
print_success "Script de correção concluído!"