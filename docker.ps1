# I Hate PDF - Docker Helper para Windows PowerShell
# Versão: 1.0

param(
    [Parameter(Mandatory=$false)]
    [string]$Command
)

# Cores para output (compatível com PowerShell)
$Red = "Red"
$Green = "Green" 
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

# Funções para mensagens coloridas
function Write-Success {
    param([string]$Message)
    Write-Host "[I-HATE-PDF] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

# Verifica se Docker está instalado
function Test-Docker {
    try {
        $null = Get-Command docker -ErrorAction Stop
        $null = Get-Command docker-compose -ErrorAction Stop
        
        # Testa se Docker daemon está rodando
        $null = docker version 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Docker daemon não está rodando."
            Write-Warning "Inicie o Docker Desktop primeiro."
            exit 1
        }
        
        return $true
    }
    catch {
        Write-Error "Docker ou Docker Compose não estão instalados."
        Write-Info "Baixe Docker Desktop em: https://www.docker.com/products/docker-desktop/"
        exit 1
    }
}

# Build da imagem Docker
function Build-Image {
    Write-Success "Construindo a imagem Docker..."
    docker build -t i-hate-pdf .
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Falha ao construir a imagem!"
        exit 1
    }
}

# Executa o container em modo desenvolvimento  
function Start-Development {
    Write-Success "Iniciando aplicação em modo desenvolvimento..."
    docker-compose up --build i-hate-pdf
}

# Executa o container em modo produção
function Start-Production {
    Write-Success "Iniciando aplicação em modo produção..."
    docker-compose --profile production up --build i-hate-pdf-prod
}

# Para todos os containers
function Stop-Application {
    Write-Success "Parando todos os containers..."
    docker-compose down
}

# Remove containers e imagens
function Remove-All {
    Write-Warning "Removendo containers e imagens..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker image prune -f
}

# Mostra logs dos containers
function Show-Logs {
    docker-compose logs -f
}

# Menu de ajuda
function Show-Help {
    Write-Host "I Hate PDF - Docker Helper para Windows" -ForegroundColor $Blue
    Write-Host ""
    Write-Host "Uso: .\docker.ps1 [COMANDO]" -ForegroundColor $White
    Write-Host ""
    Write-Host "Comandos disponíveis:" -ForegroundColor $White
    Write-Host "  build    - Constrói a imagem Docker" -ForegroundColor $White
    Write-Host "  dev      - Inicia em modo desenvolvimento (porta 3000)" -ForegroundColor $White
    Write-Host "  prod     - Inicia em modo produção (porta 3001)" -ForegroundColor $White
    Write-Host "  stop     - Para todos os containers" -ForegroundColor $White
    Write-Host "  clean    - Remove containers e imagens" -ForegroundColor $White
    Write-Host "  logs     - Mostra logs dos containers" -ForegroundColor $White
    Write-Host "  help     - Mostra esta ajuda" -ForegroundColor $White
    Write-Host ""
    Write-Host "Exemplos:" -ForegroundColor $Yellow
    Write-Host "  .\docker.ps1 dev     # Inicia em desenvolvimento" -ForegroundColor $White
    Write-Host "  .\docker.ps1 prod    # Inicia em produção" -ForegroundColor $White
    Write-Host "  .\docker.ps1 stop    # Para a aplicação" -ForegroundColor $White
    Write-Host ""
    Write-Host "Acesso:" -ForegroundColor $Yellow
    Write-Host "  Desenvolvimento: http://localhost:3000" -ForegroundColor $White
    Write-Host "  Produção: http://localhost:3001" -ForegroundColor $White
}

# Verificar argumentos e executar comandos
if (-not $Command) {
    Write-Error "Comando não especificado!"
    Show-Help
    exit 1
}

switch ($Command.ToLower()) {
    "build" {
        Test-Docker
        Build-Image
    }
    "dev" {
        Test-Docker
        Start-Development
    }
    "prod" {
        Test-Docker  
        Start-Production
    }
    "stop" {
        Test-Docker
        Stop-Application
    }
    "clean" {
        Test-Docker
        Remove-All
    }
    "logs" {
        Test-Docker
        Show-Logs
    }
    { $_ -in "help", "--help", "-h", "/?" } {
        Show-Help
    }
    default {
        Write-Error "Comando inválido: $Command"
        Write-Host ""
        Show-Help
        exit 1
    }
}