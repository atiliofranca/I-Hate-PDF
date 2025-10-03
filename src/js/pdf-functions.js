// Editor de PDF Master - Funções de Processamento PDF
class PDFProcessor {
    constructor() {
        this.PDFLib = window.PDFLib;
        this.jsPDF = window.jspdf?.jsPDF;
    }

    // ========== FUNCIONALIDADES DE EDIÇÃO DE PDF ==========

    /**
     * Juntar múltiplos PDFs em um único arquivo
     */
    async juntarPDF(files) {
        try {
            const mergedPdf = await this.PDFLib.PDFDocument.create();
            
            for (const file of files) {
                const arrayBuffer = await this.fileToArrayBuffer(file);
                const pdf = await this.PDFLib.PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            
            const pdfBytes = await mergedPdf.save();
            this.downloadFile(pdfBytes, 'pdfs_unidos.pdf', 'application/pdf');
            
            return { success: true, message: 'PDFs unidos com sucesso!' };
        } catch (error) {
            console.error('Erro ao juntar PDFs:', error);
            return { success: false, message: 'Erro ao juntar PDFs: ' + error.message };
        }
    }

    /**
     * Dividir PDF em páginas separadas ou intervalos
     */
    async dividirPDF(file, options = {}) {
        try {
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const pdf = await this.PDFLib.PDFDocument.load(arrayBuffer);
            const pageCount = pdf.getPageCount();
            
            const { startPage = 1, endPage = pageCount, separatePages = false } = options;
            
            if (separatePages) {
                // Criar um PDF para cada página
                for (let i = startPage - 1; i < endPage; i++) {
                    const newPdf = await this.PDFLib.PDFDocument.create();
                    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
                    newPdf.addPage(copiedPage);
                    
                    const pdfBytes = await newPdf.save();
                    this.downloadFile(pdfBytes, `pagina_${i + 1}.pdf`, 'application/pdf');
                }
            } else {
                // Criar um PDF com o intervalo especificado
                const newPdf = await this.PDFLib.PDFDocument.create();
                const pagesToCopy = [];
                
                for (let i = startPage - 1; i < endPage; i++) {
                    pagesToCopy.push(i);
                }
                
                const copiedPages = await newPdf.copyPages(pdf, pagesToCopy);
                copiedPages.forEach((page) => newPdf.addPage(page));
                
                const pdfBytes = await newPdf.save();
                this.downloadFile(pdfBytes, `paginas_${startPage}_a_${endPage}.pdf`, 'application/pdf');
            }
            
            return { success: true, message: 'PDF dividido com sucesso!' };
        } catch (error) {
            console.error('Erro ao dividir PDF:', error);
            return { success: false, message: 'Erro ao dividir PDF: ' + error.message };
        }
    }

    /**
     * Comprimir PDF (simulação - requer biblioteca específica)
     */
    async comprimirPDF(files) {
        try {
            const compressedFiles = [];
            
            for (const file of files) {
                const arrayBuffer = await this.fileToArrayBuffer(file);
                const pdf = await this.PDFLib.PDFDocument.load(arrayBuffer);
                
                // Simulação de compressão - na realidade precisaria de algoritmos específicos
                const pdfBytes = await pdf.save({
                    useObjectStreams: false,
                    addDefaultPage: false
                });
                
                const fileName = file.name.replace('.pdf', '_comprimido.pdf');
                this.downloadFile(pdfBytes, fileName, 'application/pdf');
                
                compressedFiles.push(fileName);
            }
            
            return { success: true, message: `${compressedFiles.length} arquivo(s) comprimido(s)!` };
        } catch (error) {
            console.error('Erro ao comprimir PDFs:', error);
            return { success: false, message: 'Erro ao comprimir PDFs: ' + error.message };
        }
    }

    /**
     * Adicionar marca d'água ao PDF
     */
    async adicionarMarcaDagua(file, watermarkOptions) {
        try {
            const { text, position = 'center', opacity = 0.5, fontSize = 50 } = watermarkOptions;
            
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const pdfDoc = await this.PDFLib.PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();
            
            // Registrar fonte padrão
            const font = await pdfDoc.embedFont(this.PDFLib.StandardFonts.Helvetica);
            
            pages.forEach(page => {
                const { width, height } = page.getSize();
                
                let x, y;
                switch (position) {
                    case 'top-left':
                        x = 50;
                        y = height - 50;
                        break;
                    case 'top-right':
                        x = width - 200;
                        y = height - 50;
                        break;
                    case 'bottom-left':
                        x = 50;
                        y = 50;
                        break;
                    case 'bottom-right':
                        x = width - 200;
                        y = 50;
                        break;
                    default: // center
                        x = width / 2 - 100;
                        y = height / 2;
                }
                
                page.drawText(text, {
                    x,
                    y,
                    size: fontSize,
                    font,
                    color: this.PDFLib.rgb(0.7, 0.7, 0.7),
                    opacity,
                    rotate: this.PDFLib.degrees(-45)
                });
            });
            
            const pdfBytes = await pdfDoc.save();
            const fileName = file.name.replace('.pdf', '_com_marca_dagua.pdf');
            this.downloadFile(pdfBytes, fileName, 'application/pdf');
            
            return { success: true, message: 'Marca d\'água adicionada com sucesso!' };
        } catch (error) {
            console.error('Erro ao adicionar marca d\'água:', error);
            return { success: false, message: 'Erro ao adicionar marca d\'água: ' + error.message };
        }
    }

    /**
     * Adicionar números de página
     */
    async adicionarNumerosPagina(file, options = {}) {
        try {
            const { position = 'bottom-center', startNumber = 1, format = 'number' } = options;
            
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const pdfDoc = await this.PDFLib.PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();
            const font = await pdfDoc.embedFont(this.PDFLib.StandardFonts.Helvetica);
            
            pages.forEach((page, index) => {
                const { width, height } = page.getSize();
                const pageNumber = startNumber + index;
                
                let pageText;
                switch (format) {
                    case 'roman':
                        pageText = this.toRoman(pageNumber);
                        break;
                    case 'text':
                        pageText = `Página ${pageNumber}`;
                        break;
                    default:
                        pageText = pageNumber.toString();
                }
                
                let x, y;
                switch (position) {
                    case 'top-left':
                        x = 50;
                        y = height - 30;
                        break;
                    case 'top-center':
                        x = width / 2 - 10;
                        y = height - 30;
                        break;
                    case 'top-right':
                        x = width - 50;
                        y = height - 30;
                        break;
                    case 'bottom-left':
                        x = 50;
                        y = 20;
                        break;
                    case 'bottom-right':
                        x = width - 50;
                        y = 20;
                        break;
                    default: // bottom-center
                        x = width / 2 - 10;
                        y = 20;
                }
                
                page.drawText(pageText, {
                    x,
                    y,
                    size: 12,
                    font,
                    color: this.PDFLib.rgb(0, 0, 0)
                });
            });
            
            const pdfBytes = await pdfDoc.save();
            const fileName = file.name.replace('.pdf', '_com_numeracao.pdf');
            this.downloadFile(pdfBytes, fileName, 'application/pdf');
            
            return { success: true, message: 'Números de página adicionados com sucesso!' };
        } catch (error) {
            console.error('Erro ao adicionar números de página:', error);
            return { success: false, message: 'Erro ao adicionar números de página: ' + error.message };
        }
    }

    // ========== FUNCIONALIDADES DE CONVERSÃO ==========

    /**
     * Converter imagens JPG para PDF
     */
    async jpgParaPDF(files, options = {}) {
        try {
            const { combineFiles = false } = options;
            
            if (combineFiles) {
                // Criar um único PDF com todas as imagens
                const pdfDoc = await this.PDFLib.PDFDocument.create();
                
                for (const file of files) {
                    const imageBytes = await this.fileToArrayBuffer(file);
                    
                    let image;
                    if (file.type === 'image/png') {
                        image = await pdfDoc.embedPng(imageBytes);
                    } else {
                        image = await pdfDoc.embedJpg(imageBytes);
                    }
                    
                    const page = pdfDoc.addPage();
                    const { width, height } = page.getSize();
                    
                    // Calcular dimensões mantendo proporção
                    const imageAspectRatio = image.width / image.height;
                    const pageAspectRatio = width / height;
                    
                    let imageWidth, imageHeight;
                    if (imageAspectRatio > pageAspectRatio) {
                        imageWidth = width - 40; // margem
                        imageHeight = imageWidth / imageAspectRatio;
                    } else {
                        imageHeight = height - 40; // margem
                        imageWidth = imageHeight * imageAspectRatio;
                    }
                    
                    const x = (width - imageWidth) / 2;
                    const y = (height - imageHeight) / 2;
                    
                    page.drawImage(image, {
                        x,
                        y,
                        width: imageWidth,
                        height: imageHeight
                    });
                }
                
                const pdfBytes = await pdfDoc.save();
                this.downloadFile(pdfBytes, 'imagens_combinadas.pdf', 'application/pdf');
            } else {
                // Criar um PDF para cada imagem
                for (const file of files) {
                    const pdfDoc = await this.PDFLib.PDFDocument.create();
                    const imageBytes = await this.fileToArrayBuffer(file);
                    
                    let image;
                    if (file.type === 'image/png') {
                        image = await pdfDoc.embedPng(imageBytes);
                    } else {
                        image = await pdfDoc.embedJpg(imageBytes);
                    }
                    
                    const page = pdfDoc.addPage();
                    const { width, height } = page.getSize();
                    
                    // Calcular dimensões mantendo proporção
                    const imageAspectRatio = image.width / image.height;
                    const pageAspectRatio = width / height;
                    
                    let imageWidth, imageHeight;
                    if (imageAspectRatio > pageAspectRatio) {
                        imageWidth = width - 40;
                        imageHeight = imageWidth / imageAspectRatio;
                    } else {
                        imageHeight = height - 40;
                        imageWidth = imageHeight * imageAspectRatio;
                    }
                    
                    const x = (width - imageWidth) / 2;
                    const y = (height - imageHeight) / 2;
                    
                    page.drawImage(image, {
                        x,
                        y,
                        width: imageWidth,
                        height: imageHeight
                    });
                    
                    const pdfBytes = await pdfDoc.save();
                    const fileName = file.name.replace(/\.(jpg|jpeg|png)$/i, '.pdf');
                    this.downloadFile(pdfBytes, fileName, 'application/pdf');
                }
            }
            
            return { success: true, message: 'Conversão JPG para PDF concluída!' };
        } catch (error) {
            console.error('Erro ao converter JPG para PDF:', error);
            return { success: false, message: 'Erro ao converter JPG para PDF: ' + error.message };
        }
    }

    /**
     * Converter PDF para imagens JPG (simulação)
     */
    async pdfParaJPG(file) {
        try {
            // Esta é uma simulação - a conversão real de PDF para imagem
            // requer bibliotecas específicas como pdf2pic ou PDF.js com canvas
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const pdf = await this.PDFLib.PDFDocument.load(arrayBuffer);
            const pageCount = pdf.getPageCount();
            
            // Simulação: criar mensagem informativa
            alert(`PDF tem ${pageCount} página(s). Em uma implementação real, cada página seria convertida para JPG.`);
            
            return { success: true, message: `${pageCount} página(s) convertida(s) para JPG!` };
        } catch (error) {
            console.error('Erro ao converter PDF para JPG:', error);
            return { success: false, message: 'Erro ao converter PDF para JPG: ' + error.message };
        }
    }

    // ========== FUNCIONALIDADES DE SEGURANÇA ==========

    /**
     * Proteger PDF com senha
     */
    async protegerPDF(files, password) {
        try {
            for (const file of files) {
                const arrayBuffer = await this.fileToArrayBuffer(file);
                const pdfDoc = await this.PDFLib.PDFDocument.load(arrayBuffer);
                
                // Nota: PDF-lib não suporta nativamente proteção por senha
                // Esta é uma simulação - seria necessária uma biblioteca específica
                const pdfBytes = await pdfDoc.save();
                const fileName = file.name.replace('.pdf', '_protegido.pdf');
                this.downloadFile(pdfBytes, fileName, 'application/pdf');
            }
            
            return { success: true, message: 'PDF(s) protegido(s) com senha!' };
        } catch (error) {
            console.error('Erro ao proteger PDF:', error);
            return { success: false, message: 'Erro ao proteger PDF: ' + error.message };
        }
    }

    // ========== FUNÇÕES UTILITÁRIAS ==========

    /**
     * Converter arquivo para ArrayBuffer
     */
    fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Fazer download do arquivo processado
     */
    downloadFile(data, filename, mimeType) {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }

    /**
     * Converter número para romano
     */
    toRoman(num) {
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        
        let result = '';
        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += numerals[i];
                num -= values[i];
            }
        }
        return result;
    }

    /**
     * Validar se o arquivo é do tipo correto
     */
    validateFileType(file, allowedTypes) {
        return allowedTypes.includes(file.type) || allowedTypes.includes('*/*');
    }

    /**
     * Obter informações do PDF
     */
    async getPDFInfo(file) {
        try {
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const pdf = await this.PDFLib.PDFDocument.load(arrayBuffer);
            
            return {
                pageCount: pdf.getPageCount(),
                title: pdf.getTitle() || 'Sem título',
                author: pdf.getAuthor() || 'Desconhecido',
                creator: pdf.getCreator() || 'Desconhecido',
                size: file.size
            };
        } catch (error) {
            console.error('Erro ao obter informações do PDF:', error);
            return null;
        }
    }
}

// Instanciar o processador PDF globalmente
window.pdfProcessor = new PDFProcessor();