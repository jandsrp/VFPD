# Deploy na Vercel - Guia Passo a Passo

Para colocar o projeto da VFPD no ar, siga estas instruções:

## 1. Configuração do Projeto
O projeto está pronto para ser importado na Vercel como um projeto **Next.js**.

## 2. Variáveis de Ambiente Necessárias
Você **DEVE** configurar as seguintes variáveis no painel da Vercel (Settings -> Environment Variables):

| Nome da Variável | Valor (Copie do seu .env local) |
| :--- | :--- |
| `DATABASE_URL` | Sua URL de conexão com o banco Neon |
| `UPLOADTHING_SECRET` | Sua Secret Key do Uploadthing |
| `UPLOADTHING_APP_ID` | Seu App ID do Uploadthing |

## 3. Comandos de Build
A Vercel detectará automaticamente as configurações de Next.js, mas caso precise confirmar:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## 4. Deploy
Após configurar as variáveis, basta clicar em "Deploy". Se o projeto estiver em um repositório no GitHub, a Vercel fará o deploy automático a cada novo commit.

---
🚀 Seu site estará online em poucos minutos!
