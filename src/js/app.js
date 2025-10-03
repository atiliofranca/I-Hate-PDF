// Editor de PDF Master - Aplicação Principal
class PDFMasterApp {
    constructor() {
        this.currentTheme = 'light';
        this.currentFunctionality = null;
        this.sidebarCollapsed = false;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupResponsiveHandling();
        this.loadThemePreference();
        this.setupSidebar();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        sidebarToggle.addEventListener('click', () => this.toggleSidebar());

        // Menu navigation
        this.setupMenuNavigation();

        // Functionality navigation
        this.setupFunctionalityNavigation();

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    setupMenuNavigation() {
        const menuHeaders = document.querySelectorAll('.menu-header');
        
        menuHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                const menuItem = e.currentTarget.closest('.menu-item');
                const isActive = menuItem.classList.contains('active');
                
                // Close all other submenus
                document.querySelectorAll('.menu-item').forEach(item => {
                    if (item !== menuItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                if (isActive) {
                    menuItem.classList.remove('active');
                } else {
                    menuItem.classList.add('active');
                }
            });
        });
    }

    setupFunctionalityNavigation() {
        const functionalityLinks = document.querySelectorAll('[data-functionality]');
        
        functionalityLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const functionality = e.currentTarget.getAttribute('data-functionality');
                this.loadFunctionality(functionality);
                
                // Update active state
                document.querySelectorAll('[data-functionality]').forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Close sidebar on mobile after selection
                if (this.isMobile) {
                    this.closeMobileSidebar();
                }
            });
        });
    }

    loadFunctionality(functionalityId) {
        this.currentFunctionality = functionalityId;
        
        // Hide welcome screen and show functionality content
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('functionality-content').style.display = 'block';
        
        // Load functionality content
        const content = this.getFunctionalityContent(functionalityId);
        document.getElementById('functionality-content').innerHTML = content;
        
        // Initialize functionality-specific features
        this.initializeFunctionality(functionalityId);
    }

    getFunctionalityContent(functionalityId) {
        const functionalities = {
            comprimirPDF: {
                title: 'Comprimir PDF',
                description: 'Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            juntarPDF: {
                title: 'Juntar PDF',
                description: 'Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar.',
                allowMultiple: true,
                minFiles: 2,
                outputBehavior: 'combined'
            },
            dividirPDF: {
                title: 'Dividir PDF',
                description: 'Selecione um intervalo de páginas, separe uma página, ou converta cada página do documento em arquivo PDF independente.',
                allowMultiple: false,
                maxFiles: 1
            },
            organizarPDF: {
                title: 'Organizar PDF',
                description: 'Ordene as páginas de seu arquivo PDF como pretender. Exclua ou adicione páginas PDF ao seu documento como lhe for mais conveniente.',
                allowMultiple: false,
                maxFiles: 1
            },
            pdfParaWord: {
                title: 'PDF para Word',
                description: 'Converta facilmente seus ficheiros PDF para documentos WORD DOCX simples de editar.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            wordParaPDF: {
                title: 'Word para PDF',
                description: 'Converta seus documentos WORD para PDF com a máxima qualidade e exatamente igual que o arquivo DOC ou DOCX original.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            pdfParaPowerpoint: {
                title: 'PDF para PowerPoint',
                description: 'Converta seus ficheiros PDF para apresentações POWERPOINT PPTX fáceis de editar.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            powerpointParaPDF: {
                title: 'PowerPoint para PDF',
                description: 'Converta suas apresentações POWERPOINT para PDF com a máxima qualidade e exatamente igual que o arquivo PPT ou PPTX original.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            pdfParaExcel: {
                title: 'PDF para Excel',
                description: 'Retire dados direto de PDFs para planilhas do Excel em poucos segundos.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            excelParaPDF: {
                title: 'Excel para PDF',
                description: 'Converta suas tabelas EXCEL para PDF com as colunas ajustadas à largura da página. Vertical ou horizontal, você escolhe a orientação.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            editarPDF: {
                title: 'Editar PDF',
                description: 'Adicione texto, imagens, formas ou anotações livres a um documento PDF. Edite a dimensão, fonte e cor do conteúdo adicionado.',
                allowMultiple: false,
                maxFiles: 1
            },
            numerosPagina: {
                title: 'Números de página',
                description: 'Adicione números de página em documentos PDF facilmente. Escolha posição, dimensões, formato e tipografia.',
                allowMultiple: false,
                maxFiles: 1
            },
            pdfParaJPG: {
                title: 'PDF para JPG',
                description: 'Extraia todas as imagens contidas em um arquivo PDF ou converta cada página em um arquivo JPG.',
                allowMultiple: false,
                maxFiles: 1,
                outputBehavior: 'separatePerPage'
            },
            jpgParaPDF: {
                title: 'JPG para PDF',
                description: 'Converta suas imagens JPG para PDF. Ajuste a orientação e as margens.',
                allowMultiple: true,
                outputBehavior: 'userChoice'
            },
            marcaDagua: {
                title: 'Marca d\'água',
                description: 'Escolha uma imagem ou texto para inserir sobre o seu PDF. Selecione a posição, transparência e tipografia.',
                allowMultiple: false,
                maxFiles: 1,
                hasWatermarkOptions: true
            },
            protegerPDF: {
                title: 'Proteger PDF',
                description: 'Proteja arquivos PDF com uma senha. Encripte documentos PDF para impedir o acesso não autorizado.',
                allowMultiple: true,
                outputBehavior: 'separate',
                hasPasswordOption: true
            },
            desbloquearPDF: {
                title: 'Desbloquear PDF',
                description: 'Remova a senha de segurança dos PDF, assim você pode usá-los como quiser.',
                allowMultiple: true,
                outputBehavior: 'separate'
            },
            compararPDF: {
                title: 'Comparar PDF',
                description: 'Mostre uma comparação de documentos lado a lado e identifique facilmente as alterações entre diferentes versões de arquivos.',
                allowMultiple: true,
                minFiles: 2,
                outputBehavior: 'inAppDisplay'
            },
            digitalizarParaPDF: {
                title: 'Digitalizar para PDF',
                description: 'Digitalize documentos físicos ou imagens e converta-os diretamente para o formato PDF.',
                allowMultiple: true
            }
        };
        
        const config = functionalities[functionalityId];
        if (!config) return '<p>Funcionalidade não encontrada.</p>';
        
        const acceptedFiles = this.getAcceptedFileTypes(functionalityId);
        const minFiles = config.minFiles || 1;
        const maxFiles = config.maxFiles || (config.allowMultiple ? 'ilimitado' : 1);
        
        return `
            <div class="functionality-header">
                <h2 class="functionality-title">${config.title}</h2>
                <p class="functionality-description">${config.description}</p>
                <div class="functionality-rules">
                    <small class="text-muted">
                        <strong>Arquivos aceitos:</strong> ${acceptedFiles} • 
                        <strong>Quantidade:</strong> ${minFiles === maxFiles ? minFiles : `${minFiles} a ${maxFiles}`} arquivo(s)
                    </small>
                </div>
            </div>
            
            <div class="functionality-body">
                ${this.createFileUploadArea(functionalityId, config)}
                
                <div class="file-list" id="file-list-${functionalityId}" style="display: none;">
                    <h3>Arquivos selecionados</h3>
                    <div class="files-container" id="files-container-${functionalityId}"></div>
                    <div class="action-buttons" style="margin-top: 1.5rem;">
                        <button class="btn btn-primary" onclick="processFunctionality('${functionalityId}')">
                            <i class="fas fa-play"></i>
                            Processar Arquivos
                        </button>
                        <button class="btn btn-secondary" onclick="clearFiles('${functionalityId}')">
                            <i class="fas fa-trash"></i>
                            Limpar Arquivos
                        </button>
                    </div>
                </div>
                
                <div class="progress-section" id="progress-${functionalityId}" style="display: none;">
                    <h3>Processando...</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill-${functionalityId}" style="width: 0%"></div>
                    </div>
                    <p class="progress-text" id="progress-text-${functionalityId}">Iniciando processamento...</p>
                </div>
            </div>
        `;
    }

    createFileUploadArea(functionalityId, config) {
        const acceptedFiles = this.getAcceptedFileTypes(functionalityId);
        const multiple = config.allowMultiple !== false ? 'multiple' : '';
        
        return `
            <div class="file-upload-area" id="upload-area-${functionalityId}" onclick="document.getElementById('file-input-${functionalityId}').click()">
                <i class="fas fa-cloud-upload-alt upload-icon"></i>
                <div class="upload-text">Clique ou arraste arquivos aqui</div>
                <div class="upload-subtext">Formatos aceitos: ${acceptedFiles}</div>
                <input type="file" id="file-input-${functionalityId}" accept="${this.getFileExtensions(functionalityId)}" ${multiple} style="display: none;">
            </div>
        `;
    }

    getAcceptedFileTypes(functionalityId) {
        const fileTypes = {
            // PDF operations
            comprimirPDF: 'PDF',
            juntarPDF: 'PDF',
            dividirPDF: 'PDF',
            organizarPDF: 'PDF',
            editarPDF: 'PDF',
            numerosPagina: 'PDF',
            marcaDagua: 'PDF',
            protegerPDF: 'PDF',
            desbloquearPDF: 'PDF',
            compararPDF: 'PDF',
            
            // PDF to other formats
            pdfParaWord: 'PDF',
            pdfParaPowerpoint: 'PDF',
            pdfParaExcel: 'PDF',
            pdfParaJPG: 'PDF',
            
            // Other formats to PDF
            wordParaPDF: 'DOC, DOCX',
            powerpointParaPDF: 'PPT, PPTX',
            excelParaPDF: 'XLS, XLSX',
            jpgParaPDF: 'JPG, JPEG, PNG',
            digitalizarParaPDF: 'JPG, JPEG, PNG, PDF'
        };
        
        return fileTypes[functionalityId] || 'Todos os arquivos';
    }

    getFileExtensions(functionalityId) {
        const extensions = {
            // PDF operations
            comprimirPDF: '.pdf',
            juntarPDF: '.pdf',
            dividirPDF: '.pdf',
            organizarPDF: '.pdf',
            editarPDF: '.pdf',
            numerosPagina: '.pdf',
            marcaDagua: '.pdf',
            protegerPDF: '.pdf',
            desbloquearPDF: '.pdf',
            compararPDF: '.pdf',
            
            // PDF to other formats
            pdfParaWord: '.pdf',
            pdfParaPowerpoint: '.pdf',
            pdfParaExcel: '.pdf',
            pdfParaJPG: '.pdf',
            
            // Other formats to PDF
            wordParaPDF: '.doc,.docx',
            powerpointParaPDF: '.ppt,.pptx',
            excelParaPDF: '.xls,.xlsx',
            jpgParaPDF: '.jpg,.jpeg,.png',
            digitalizarParaPDF: '.jpg,.jpeg,.png,.pdf'
        };
        
        return extensions[functionalityId] || '*';
    }

    initializeFunctionality(functionalityId) {
        const fileInput = document.getElementById(`file-input-${functionalityId}`);
        const uploadArea = document.getElementById(`upload-area-${functionalityId}`);
        
        if (fileInput && uploadArea) {
            // File input change event
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelection(e.target.files, functionalityId);
            });
            
            // Drag and drop events
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                this.handleFileSelection(e.dataTransfer.files, functionalityId);
            });
        }
    }

    handleFileSelection(files, functionalityId) {
        if (files.length === 0) return;
        
        // Show file list
        document.getElementById(`file-list-${functionalityId}`).style.display = 'block';
        document.getElementById(`upload-area-${functionalityId}`).style.display = 'none';
        
        // Add files to container
        const container = document.getElementById(`files-container-${functionalityId}`);
        container.innerHTML = '';
        
        Array.from(files).forEach((file, index) => {
            const fileItem = this.createFileItem(file, index, functionalityId);
            container.appendChild(fileItem);
        });
        
        // Store files for processing
        window[`selectedFiles_${functionalityId}`] = files;
    }

    createFileItem(file, index, functionalityId) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${this.formatFileSize(file.size)}</div>
            </div>
            <div class="file-actions">
                <button class="btn btn-secondary btn-small" onclick="removeFile(${index}, '${functionalityId}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        return fileItem;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    toggleTheme() {
        const themeStylesheet = document.getElementById('theme-stylesheet');
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (this.currentTheme === 'light') {
            // Switch to dark theme
            themeStylesheet.href = 'src/css/dark-theme.css';
            icon.className = 'fas fa-sun';
            text.textContent = 'Tema Claro';
            this.currentTheme = 'dark';
        } else {
            // Switch to light theme
            themeStylesheet.href = 'src/css/light-theme.css';
            icon.className = 'fas fa-moon';
            text.textContent = 'Tema Escuro';
            this.currentTheme = 'light';
        }
        
        // Save preference
        localStorage.setItem('pdf-master-theme', this.currentTheme);
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('pdf-master-theme') || 'light';
        if (savedTheme === 'dark') {
            this.toggleTheme();
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        
        if (this.isMobile) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('collapsed');
            this.sidebarCollapsed = !this.sidebarCollapsed;
        }
    }

    closeMobileSidebar() {
        if (this.isMobile) {
            document.getElementById('sidebar').classList.remove('open');
        }
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== this.isMobile) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('open', 'collapsed');
            this.sidebarCollapsed = false;
        }
    }

    setupResponsiveHandling() {
        // Add mobile menu overlay
        if (this.isMobile) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.addEventListener('click', () => this.closeMobileSidebar());
            document.body.appendChild(overlay);
        }
    }
}

// Global functions for file management
window.removeFile = function(index, functionalityId) {
    const filesArray = Array.from(window[`selectedFiles_${functionalityId}`]);
    filesArray.splice(index, 1);
    
    if (filesArray.length === 0) {
        clearFiles(functionalityId);
    } else {
        // Update the files and re-render
        const dt = new DataTransfer();
        filesArray.forEach(file => dt.items.add(file));
        window[`selectedFiles_${functionalityId}`] = dt.files;
        
        // Re-render file list
        const container = document.getElementById(`files-container-${functionalityId}`);
        container.innerHTML = '';
        filesArray.forEach((file, i) => {
            const fileItem = app.createFileItem(file, i, functionalityId);
            container.appendChild(fileItem);
        });
    }
};

window.clearFiles = function(functionalityId) {
    document.getElementById(`file-list-${functionalityId}`).style.display = 'none';
    document.getElementById(`upload-area-${functionalityId}`).style.display = 'block';
    document.getElementById(`progress-${functionalityId}`).style.display = 'none';
    
    // Clear stored files
    delete window[`selectedFiles_${functionalityId}`];
    
    // Reset file input
    const fileInput = document.getElementById(`file-input-${functionalityId}`);
    if (fileInput) {
        fileInput.value = '';
    }
};

window.processFunctionality = async function(functionalityId) {
    const files = window[`selectedFiles_${functionalityId}`];
    if (!files || files.length === 0) {
        uiComponents.showNotification('Nenhum arquivo selecionado.', 'error');
        return;
    }
    
    // Show progress
    document.getElementById(`progress-${functionalityId}`).style.display = 'block';
    
    try {
        let result;
        
        // Process based on functionality
        switch (functionalityId) {
            case 'juntarPDF':
                result = await pdfProcessor.juntarPDF(files);
                break;
                
            case 'dividirPDF':
                // Show configuration modal for split options
                uiComponents.showSplitPDFModal(async (options) => {
                    result = await pdfProcessor.dividirPDF(files[0], options);
                    handleProcessResult(result, functionalityId);
                });
                return; // Exit here as modal will handle the rest
                
            case 'comprimirPDF':
                result = await pdfProcessor.comprimirPDF(files);
                break;
                
            case 'marcaDagua':
                // Show watermark configuration modal
                uiComponents.showWatermarkModal(async (options) => {
                    result = await pdfProcessor.adicionarMarcaDagua(files[0], options);
                    handleProcessResult(result, functionalityId);
                });
                return; // Exit here as modal will handle the rest
                
            case 'numerosPagina':
                // Show page numbers configuration modal
                uiComponents.showPageNumbersModal(async (options) => {
                    result = await pdfProcessor.adicionarNumerosPagina(files[0], options);
                    handleProcessResult(result, functionalityId);
                });
                return; // Exit here as modal will handle the rest
                
            case 'jpgParaPDF':
                const combineFiles = confirm('Deseja combinar todas as imagens em um único PDF? (Cancelar = arquivos separados)');
                result = await pdfProcessor.jpgParaPDF(files, { combineFiles });
                break;
                
            case 'pdfParaJPG':
                result = await pdfProcessor.pdfParaJPG(files[0]);
                break;
                
            case 'protegerPDF':
                const password = prompt('Digite a senha para proteger o(s) PDF(s):');
                if (!password) {
                    uiComponents.showNotification('Senha é necessária para proteger o PDF.', 'error');
                    return;
                }
                result = await pdfProcessor.protegerPDF(files, password);
                break;
                
            default:
                // For not yet implemented functionalities, show simulation
                result = await simulateProcessing(functionalityId);
                break;
        }
        
        handleProcessResult(result, functionalityId);
        
    } catch (error) {
        console.error('Erro no processamento:', error);
        uiComponents.showNotification('Erro durante o processamento: ' + error.message, 'error');
        clearFiles(functionalityId);
    }
};

// Handle processing result
function handleProcessResult(result, functionalityId) {
    if (result.success) {
        document.getElementById(`progress-text-${functionalityId}`).textContent = 'Processamento concluído!';
        uiComponents.showNotification(result.message, 'success');
        
        setTimeout(() => {
            clearFiles(functionalityId);
        }, 2000);
    } else {
        uiComponents.showNotification(result.message, 'error');
        clearFiles(functionalityId);
    }
}

// Simulate processing for not yet implemented features
async function simulateProcessing(functionalityId) {
    const functionNames = {
        organizarPDF: 'Organizar PDF',
        editarPDF: 'Editar PDF',
        pdfParaWord: 'PDF para Word',
        wordParaPDF: 'Word para PDF',
        pdfParaPowerpoint: 'PDF para PowerPoint',
        powerpointParaPDF: 'PowerPoint para PDF',
        pdfParaExcel: 'PDF para Excel',
        excelParaPDF: 'Excel para PDF',
        desbloquearPDF: 'Desbloquear PDF',
        compararPDF: 'Comparar PDF',
        digitalizarParaPDF: 'Digitalizar para PDF'
    };
    
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                resolve({ 
                    success: true, 
                    message: `${functionNames[functionalityId]} - Funcionalidade demonstrativa concluída!` 
                });
            }
            
            document.getElementById(`progress-fill-${functionalityId}`).style.width = progress + '%';
            document.getElementById(`progress-text-${functionalityId}`).textContent = `Processando... ${Math.round(progress)}%`;
        }, 300);
    });
};

// Initialize the application
const app = new PDFMasterApp();