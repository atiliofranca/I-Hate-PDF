# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos da aplicação para o container
COPY . .

# Expõe a porta 3000 (porta padrão do live-server)
EXPOSE 3000

# Define o usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Comando para iniciar a aplicação
CMD ["npm", "start"]