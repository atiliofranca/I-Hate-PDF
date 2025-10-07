#!/bin/bash

# Script de inicialização para I Hate PDF

echo "🚀 I Hate PDF - Setup Inicial"
echo "=============================="

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado!"
    echo "📥 Instale o Docker primeiro:"
    echo "   Ubuntu/Debian: sudo apt update && sudo apt install docker.io docker-compose"
    echo "   CentOS/RHEL: sudo yum install docker docker-compose"
    echo "   Arch: sudo pacman -S docker docker-compose"
    echo "   macOS: brew install docker docker-compose"
    echo "   Ou baixe de: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar se Docker Compose está instalado  
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado!"
    echo "📥 Instale o Docker Compose:"
    echo "   sudo apt install docker-compose"
    echo "   Ou siga: https://docs.docker.com/compose/install/"
    exit 1
fi

# Verificar se Docker daemon está rodando e permissões
if ! docker info &> /dev/null; then
    error_msg=$(docker info 2>&1)
    if [[ $error_msg == *"permission denied"* ]]; then
        echo "❌ Sem permissão para acessar Docker daemon!"
        echo ""
        echo "🔧 SOLUÇÃO 1 - Adicionar usuário ao grupo docker:"
        echo "   sudo usermod -aG docker $USER"
        echo "   newgrp docker"
        echo "   # Ou faça logout/login"
        echo ""
        echo "🔧 SOLUÇÃO 2 - Executar com sudo:"
        echo "   sudo ./docker.sh dev"
        echo ""
        echo "🔧 SOLUÇÃO 3 - Verificar se Docker está rodando:"
        echo "   sudo systemctl start docker"
        echo "   sudo systemctl enable docker"
        exit 1
    else
        echo "❌ Docker daemon não está rodando!"
        echo "� Inicie o Docker:"
        echo "   sudo systemctl start docker"
        echo "   sudo systemctl enable docker  # Para iniciar automaticamente"
        exit 1
    fi
fi

echo "✅ Docker está instalado e rodando!"
echo ""

# Verificar se os arquivos necessários existem
files=("Dockerfile" "docker-compose.yml" "package.json")
for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Arquivo $file não encontrado!"
        exit 1
    fi
done

echo "✅ Todos os arquivos necessários estão presentes!"
echo ""

# Tornar o script docker.sh executável
if [ -f "docker.sh" ]; then
    chmod +x docker.sh
    echo "✅ Script docker.sh está executável!"
else
    echo "❌ Script docker.sh não encontrado!"
fi

echo ""
echo "🎉 Setup completo! Próximos passos:"
echo ""
echo "1️⃣  Construir e executar:"
echo "   ./docker.sh dev        # Modo desenvolvimento"
echo "   ./docker.sh prod       # Modo produção"
echo ""
echo "2️⃣  Ou usar docker-compose:"
echo "   docker-compose up --build"
echo ""
echo "3️⃣  Acessar a aplicação:"
echo "   http://localhost:3000   # Desenvolvimento"
echo "   http://localhost:3001   # Produção"
echo ""
echo "📚 Para mais comandos: ./docker.sh help"
echo "📖 Documentação completa: cat DOCKER.md"