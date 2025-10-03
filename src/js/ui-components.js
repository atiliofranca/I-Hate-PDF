// Editor de PDF Master - Componentes de Interface
class UIComponents {
    constructor() {
        this.modals = {};
        this.notifications = [];
    }

    // ========== MODALS ==========

    /**
     * Criar modal genérico
     */
    createModal(id, title, content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = `modal-${id}`;
        
        const { width = '500px', height = 'auto', closable = true } = options;
        
        modal.innerHTML = `
            <div class="modal-container" style="width: ${width}; height: ${height};">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    ${closable ? '<button class="modal-close" onclick="uiComponents.closeModal(\'' + id + '\')"><i class="fas fa-times"></i></button>' : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modals[id] = modal;
        
        // Fechar modal ao clicar fora
        if (closable) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(id);
                }
            });
        }
        
        return modal;
    }

    /**
     * Abrir modal
     */
    openModal(id) {
        const modal = this.modals[id];
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Fechar modal
     */
    closeModal(id) {
        const modal = this.modals[id];
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Modal de configuração de divisão de PDF
     */
    showSplitPDFModal(callback) {
        const content = `
            <form id="split-pdf-form">
                <div class="form-group">
                    <label>Método de divisão:</label>
                    <select id="split-method" onchange="uiComponents.toggleSplitOptions()">
                        <option value="pages">Páginas específicas</option>
                        <option value="range">Intervalo de páginas</option>
                        <option value="separate">Separar todas as páginas</option>
                    </select>
                </div>
                
                <div class="form-group" id="page-options">
                    <div id="specific-pages" style="display: none;">
                        <label>Páginas (separadas por vírgula):</label>
                        <input type="text" id="pages-input" placeholder="1, 3, 5-7, 10">
                    </div>
                    
                    <div id="range-pages" style="display: block;">
                        <label>Página inicial:</label>
                        <input type="number" id="start-page" min="1" value="1">
                        <label>Página final:</label>
                        <input type="number" id="end-page" min="1" value="1">
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="uiComponents.closeModal('split-pdf')">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="uiComponents.processSplitPDF()">Dividir PDF</button>
                </div>
            </form>
        `;
        
        this.createModal('split-pdf', 'Configurações de Divisão', content);
        this.openModal('split-pdf');
        this.splitCallback = callback;
    }

    /**
     * Alternar opções de divisão
     */
    toggleSplitOptions() {
        const method = document.getElementById('split-method').value;
        const specificPages = document.getElementById('specific-pages');
        const rangePages = document.getElementById('range-pages');
        
        if (method === 'pages') {
            specificPages.style.display = 'block';
            rangePages.style.display = 'none';
        } else if (method === 'range') {
            specificPages.style.display = 'none';
            rangePages.style.display = 'block';
        } else {
            specificPages.style.display = 'none';
            rangePages.style.display = 'none';
        }
    }

    /**
     * Processar divisão de PDF
     */
    processSplitPDF() {
        const method = document.getElementById('split-method').value;
        let options = { method };
        
        if (method === 'pages') {
            const pagesInput = document.getElementById('pages-input').value;
            options.pages = pagesInput.split(',').map(p => p.trim());
        } else if (method === 'range') {
            options.startPage = parseInt(document.getElementById('start-page').value);
            options.endPage = parseInt(document.getElementById('end-page').value);
        } else if (method === 'separate') {
            options.separatePages = true;
        }
        
        if (this.splitCallback) {
            this.splitCallback(options);
        }
        
        this.closeModal('split-pdf');
    }

    /**
     * Modal de configuração de marca d'água
     */
    showWatermarkModal(callback) {
        const content = `
            <form id="watermark-form">
                <div class="form-group">
                    <label>Tipo de marca d'água:</label>
                    <select id="watermark-type" onchange="uiComponents.toggleWatermarkType()">
                        <option value="text">Texto</option>
                        <option value="image">Imagem</option>
                    </select>
                </div>
                
                <div class="form-group" id="text-watermark">
                    <label>Texto:</label>
                    <input type="text" id="watermark-text" placeholder="Digite o texto da marca d'água">
                </div>
                
                <div class="form-group" id="image-watermark" style="display: none;">
                    <label>Imagem:</label>
                    <input type="file" id="watermark-image" accept="image/*">
                </div>
                
                <div class="form-group">
                    <label>Posição:</label>
                    <select id="watermark-position">
                        <option value="center">Centro</option>
                        <option value="top-left">Superior Esquerda</option>
                        <option value="top-right">Superior Direita</option>
                        <option value="bottom-left">Inferior Esquerda</option>
                        <option value="bottom-right">Inferior Direita</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Opacidade:</label>
                    <input type="range" id="watermark-opacity" min="0.1" max="1" step="0.1" value="0.5">
                    <span id="opacity-value">50%</span>
                </div>
                
                <div class="form-group">
                    <label>Tamanho da fonte:</label>
                    <input type="range" id="watermark-font-size" min="20" max="100" value="50">
                    <span id="font-size-value">50px</span>
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="uiComponents.closeModal('watermark')">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="uiComponents.processWatermark()">Aplicar Marca d'água</button>
                </div>
            </form>
        `;
        
        this.createModal('watermark', 'Configurações de Marca d\'água', content);
        this.openModal('watermark');
        this.watermarkCallback = callback;
        
        // Event listeners para atualizar valores em tempo real
        document.getElementById('watermark-opacity').addEventListener('input', (e) => {
            document.getElementById('opacity-value').textContent = Math.round(e.target.value * 100) + '%';
        });
        
        document.getElementById('watermark-font-size').addEventListener('input', (e) => {
            document.getElementById('font-size-value').textContent = e.target.value + 'px';
        });
    }

    /**
     * Alternar tipo de marca d'água
     */
    toggleWatermarkType() {
        const type = document.getElementById('watermark-type').value;
        const textWatermark = document.getElementById('text-watermark');
        const imageWatermark = document.getElementById('image-watermark');
        
        if (type === 'text') {
            textWatermark.style.display = 'block';
            imageWatermark.style.display = 'none';
        } else {
            textWatermark.style.display = 'none';
            imageWatermark.style.display = 'block';
        }
    }

    /**
     * Processar marca d'água
     */
    processWatermark() {
        const type = document.getElementById('watermark-type').value;
        const position = document.getElementById('watermark-position').value;
        const opacity = parseFloat(document.getElementById('watermark-opacity').value);
        const fontSize = parseInt(document.getElementById('watermark-font-size').value);
        
        const options = { type, position, opacity, fontSize };
        
        if (type === 'text') {
            options.text = document.getElementById('watermark-text').value;
        } else {
            const imageFile = document.getElementById('watermark-image').files[0];
            if (imageFile) {
                options.imageFile = imageFile;
            }
        }
        
        if (this.watermarkCallback) {
            this.watermarkCallback(options);
        }
        
        this.closeModal('watermark');
    }

    /**
     * Modal de configuração de números de página
     */
    showPageNumbersModal(callback) {
        const content = `
            <form id="page-numbers-form">
                <div class="form-group">
                    <label>Posição:</label>
                    <select id="numbers-position">
                        <option value="bottom-center">Inferior Centro</option>
                        <option value="bottom-left">Inferior Esquerda</option>
                        <option value="bottom-right">Inferior Direita</option>
                        <option value="top-center">Superior Centro</option>
                        <option value="top-left">Superior Esquerda</option>
                        <option value="top-right">Superior Direita</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Formato:</label>
                    <select id="numbers-format">
                        <option value="number">Numérico (1, 2, 3...)</option>
                        <option value="roman">Romano (I, II, III...)</option>
                        <option value="text">Texto (Página 1, Página 2...)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Iniciar em:</label>
                    <input type="number" id="start-number" min="1" value="1">
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="uiComponents.closeModal('page-numbers')">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="uiComponents.processPageNumbers()">Adicionar Números</button>
                </div>
            </form>
        `;
        
        this.createModal('page-numbers', 'Configurações de Numeração', content);
        this.openModal('page-numbers');
        this.pageNumbersCallback = callback;
    }

    /**
     * Processar números de página
     */
    processPageNumbers() {
        const position = document.getElementById('numbers-position').value;
        const format = document.getElementById('numbers-format').value;
        const startNumber = parseInt(document.getElementById('start-number').value);
        
        const options = { position, format, startNumber };
        
        if (this.pageNumbersCallback) {
            this.pageNumbersCallback(options);
        }
        
        this.closeModal('page-numbers');
    }

    // ========== NOTIFICAÇÕES ==========

    /**
     * Mostrar notificação
     */
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = this.getNotificationIcon(type);
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${icon}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Container de notificações
        let container = document.getElementById('notifications-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notifications-container';
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Auto-remover após duração especificada
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }
        
        return notification;
    }

    /**
     * Obter ícone da notificação
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        return icons[type] || icons.info;
    }

    // ========== LOADING ==========

    /**
     * Mostrar loading
     */
    showLoading(message = 'Carregando...') {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.id = 'global-loading';
        
        loading.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-message">${message}</p>
            </div>
        `;
        
        document.body.appendChild(loading);
        document.body.style.overflow = 'hidden';
    }

    /**
     * Esconder loading
     */
    hideLoading() {
        const loading = document.getElementById('global-loading');
        if (loading) {
            loading.remove();
            document.body.style.overflow = 'auto';
        }
    }

    // ========== CONFIRMAÇÃO ==========

    /**
     * Modal de confirmação
     */
    showConfirmation(title, message, onConfirm, onCancel) {
        const content = `
            <p>${message}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="uiComponents.closeModal('confirmation'); ${onCancel ? onCancel + '()' : ''}">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="uiComponents.closeModal('confirmation'); ${onConfirm}()">Confirmar</button>
            </div>
        `;
        
        this.createModal('confirmation', title, content);
        this.openModal('confirmation');
    }

    // ========== UTILITÁRIOS ==========

    /**
     * Atualizar progresso
     */
    updateProgress(elementId, percentage, message) {
        const progressFill = document.getElementById(`progress-fill-${elementId}`);
        const progressText = document.getElementById(`progress-text-${elementId}`);
        
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
        
        if (progressText) {
            progressText.textContent = message || `${Math.round(percentage)}% concluído`;
        }
    }

    /**
     * Formatar tamanho de arquivo
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Validar formulário
     */
    validateForm(formId, rules) {
        const form = document.getElementById(formId);
        let isValid = true;
        
        // Remover mensagens de erro anteriores
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        
        for (const [fieldId, rule] of Object.entries(rules)) {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            if (rule.required && !value) {
                this.showFieldError(field, 'Este campo é obrigatório');
                isValid = false;
            }
            
            if (rule.minLength && value.length < rule.minLength) {
                this.showFieldError(field, `Mínimo ${rule.minLength} caracteres`);
                isValid = false;
            }
            
            if (rule.pattern && !rule.pattern.test(value)) {
                this.showFieldError(field, rule.message || 'Formato inválido');
                isValid = false;
            }
        }
        
        return isValid;
    }

    /**
     * Mostrar erro de campo
     */
    showFieldError(field, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        
        field.classList.add('error');
        field.parentNode.appendChild(error);
    }
}

// Instanciar componentes UI globalmente
window.uiComponents = new UIComponents();

// Adicionar estilos CSS para os componentes
const componentStyles = `
<style>
/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.modal-container {
    background-color: var(--bg-primary);
    border-radius: 12px;
    box-shadow: var(--shadow-large);
    max-width: 90vw;
    max-height: 90vh;
    overflow: hidden;
}

.modal-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.modal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
}

.modal-close:hover {
    background-color: var(--bg-hover);
    color: var(--primary-color);
}

.modal-body {
    padding: 1.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

/* Form Styles */
.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input.error {
    border-color: var(--error-color);
}

.error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

/* Notification Styles */
.notifications-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.notification {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: var(--shadow-medium);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
}

.notification-success {
    border-color: var(--success-color);
}

.notification-error {
    border-color: var(--error-color);
}

.notification-warning {
    border-color: var(--warning-color);
}

.notification-info {
    border-color: var(--primary-color);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem;
}

.notification-close:hover {
    color: var(--text-primary);
}

/* Loading Styles */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
}

.loading-container {
    text-align: center;
    color: white;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-message {
    font-size: 1rem;
    font-weight: 500;
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', componentStyles);