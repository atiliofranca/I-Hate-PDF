# Editor de PDF Master

Uma aplicação web completa para edição, conversão e gerenciamento de arquivos PDF.

![Editor de PDF Master](i-hate-pdf.png)

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

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Node.js (para desenvolvimento local)

### Instalação

1. **Clone ou baixe o projeto**:
```bash
git clone <repository-url>
cd editor-pdf-master
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o servidor local**:
```bash
npm start
```

4. **Acesse a aplicação**:
   - Abra o navegador em `http://localhost:3000`
   - Ou simpemente abra o arquivo `index.html` diretamente

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
editor-pdf-master/
├── index.html                 # Página principal
├── package.json              # Dependências e scripts
├── exemplo.png               # Imagem de referência do layout
├── i-hate-pdf.png           # Logo da aplicação
├── src/
│   ├── css/
│   │   ├── light-theme.css   # Tema claro
│   │   └── dark-theme.css    # Tema escuro
│   ├── js/
│   │   ├── app.js           # Lógica principal da aplicação
│   │   ├── pdf-functions.js # Funções de processamento PDF
│   │   └── ui-components.js # Componentes de interface
│   └── assets/              # Recursos adicionais
└── README.md                # Documentação
```

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

### Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Instalar dependências
npm install

# Executar em modo de produção
npm run build
```

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

## 📞 Suporte

Para suporte ou dúvidas:
- Abra uma issue no repositório
- Consulte a documentação das bibliotecas utilizadas
- Verifique os logs do console do navegador

---

**Editor de PDF Master** - Uma solução completa para todas as suas necessidades de PDF! 🚀