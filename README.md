# Bazhi

Site institucional da Bazhi: prospecção em massa e abordagem personalizada com IA, com foco no Brasil.

## Rodar localmente

Requer Node.js 18 ou superior. Não há dependências externas para instalar.

```sh
npm run dev
```

Abra http://127.0.0.1:4173/. Para alterar a porta, configure a variável `PORT`.

## Conectar à Vercel

Importe este repositório e use a raiz do projeto (`./`). A configuração está em `vercel.json`:

- Framework: Other
- Build command: `npm run build`
- Output directory: `dist`

O build verifica as referências locais e publica os arquivos estáticos que já estão em `dist/`.

## Conteúdo

- Visualização de crescimento em perspectiva 3D com animação de entrada.
- Base interna de mais de 20 milhões de empresas, conforme informações do responsável pela marca.
- Prévia interativa do painel, empresas, copy, campanhas e insights.
- Verificação de e-mails em camadas e política de devolução do crédito quando o envio não é realizado.
- Planos mensais e FAQ; teste do produto com 30 empresas conforme condições informadas pelo responsável.
- Movimento reduzido, navegação por teclado e layout responsivo.

A interface de demonstração usa dados ilustrativos. Os botões abrem a prévia local do produto: cadastro, validação de e-mails, envios reais, cobrança e devolução de créditos precisam estar conectados ao backend do software para operar de verdade. O site não implementa esses serviços.

## Estrutura

- `dist/`: HTML, estilos, scripts e imagens do site.
- `scripts/serve.mjs`: servidor de desenvolvimento local.
- `scripts/build.mjs`: verificação dos arquivos para publicação.
- `IMAGENS-IA.md`: registro das imagens ilustrativas.

Os planos ficam na landing page `precos.html`, aberta em nova aba pelo menu da home. A página antiga de comparação redireciona para essa página de preços. Não há comparador de concorrentes nesta versão.

## Ajustes de UX

A revisão mantém a identidade visual original e melhora a leitura, o contraste, a navegação móvel, o foco por teclado e as áreas de toque. O painel mantém as cinco telas disponíveis no celular. Os ajustes compartilhados ficam em `dist/ux-refinements.css` e `dist/ux.js`.
