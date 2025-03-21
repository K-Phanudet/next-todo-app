This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project structure

```bash
.
├── README.md
├── app
│   ├── ProviderWrapper.tsx
│   ├── api
│   │   ├── auth
│   │   │   ├── logout
│   │   │   │   ├── route.test.ts
│   │   │   │   └── route.ts
│   │   │   ├── route.test.ts
│   │   │   └── route.ts
│   │   ├── todos
│   │   │   ├── [id]
│   │   │   │   ├── route.test.ts
│   │   │   │   └── route.ts
│   │   │   ├── route.test.ts
│   │   │   └── route.ts
│   │   └── users
│   │       ├── route.test.ts
│   │       └── route.ts
│   ├── bonus       # For bonus question
│   │   └── page.tsx
│   ├── components      #Use atomic design pattern
│   │   ├── atoms
│   │   │   ├── Botton
│   │   │   │   ├── Botton.test.tsx
│   │   │   │   └── Botton.tsx
│   │   │   ├── Icon
│   │   │   │   ├── Icon.test.tsx
│   │   │   │   └── Icon.tsx
│   │   │   ├── Image
│   │   │   │   ├── Image.test.tsx
│   │   │   │   └── Image.tsx
│   │   │   ├── Link
│   │   │   │   ├── Link.test.tsx
│   │   │   │   └── Link.tsx
│   │   │   ├── Overlay
│   │   │   │   ├── Overlay.test.tsx
│   │   │   │   └── Overlay.tsx
│   │   │   ├── Text
│   │   │   │   ├── Text.test.tsx
│   │   │   │   └── Text.tsx
│   │   │   ├── Typography
│   │   │   │   ├── Heading.test.tsx
│   │   │   │   ├── Heading.tsx
│   │   │   │   ├── Paragraph.test.tsx
│   │   │   │   ├── Paragraph.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── molecules
│   │   │   ├── CardActions
│   │   │   │   ├── CardActions.test.tsx
│   │   │   │   └── CardActions.tsx
│   │   │   ├── CardContent
│   │   │   │   ├── CardContent.test.tsx
│   │   │   │   └── CardContent.tsx
│   │   │   ├── CardImage
│   │   │   │   ├── CardImage.test.tsx
│   │   │   │   └── CardImage.tsx
│   │   │   ├── Form
│   │   │   │   ├── Form.test.tsx
│   │   │   │   └── Form.tsx
│   │   │   ├── Input
│   │   │   │   ├── Input.test.tsx
│   │   │   │   └── Input.tsx
│   │   │   ├── ModalContent
│   │   │   │   ├── ModalContent.test.tsx
│   │   │   │   └── ModalContent.tsx
│   │   │   ├── ModalHeader
│   │   │   │   ├── ModalHeader.test.tsx
│   │   │   │   └── ModalHeader.tsx
│   │   │   └── index.ts
│   │   ├── organisms
│   │   │   ├── AuthForm
│   │   │   │   ├── AuthForm.test.tsx
│   │   │   │   └── AuthForm.tsx
│   │   │   ├── Card
│   │   │   │   ├── Card.test.tsx
│   │   │   │   └── Card.tsx
│   │   │   ├── Modal
│   │   │   │   ├── Modal.test.tsx
│   │   │   │   └── Modal.tsx
│   │   │   └── index.ts
│   │   └── templates
│   │       ├── AuthPage
│   │       │   ├── AuthPage.test.tsx
│   │       │   └── AuthPage.tsx
│   │       ├── PageHeader
│   │       │   ├── PageHeader.test.tsx
│   │       │   └── PageHeader.tsx
│   │       └── index.ts
│   ├── configurations  # store constants and configuration
│   │   └── config.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── hooks       # custom hooks
│   │   ├── hooks.ts
│   │   ├── tests
│   │   │   ├── useAuth.test.ts
│   │   │   └── useTodos.test.ts
│   │   ├── useAuth.ts
│   │   └── useTodos.ts
│   ├── layout.tsx
│   ├── lib         # utils function and api fuctions
│   │   └── api     
│   │       ├── auth.ts
│   │       ├── tests
│   │       │   ├── auth.test.ts
│   │       │   ├── todo.test.ts
│   │       │   └── user.test.ts
│   │       ├── todo.ts
│   │       └── user.ts
│   ├── login     # For Login page
│   │   ├── page.test.tsx
│   │   └── page.tsx
│   ├── page.tsx # For Home page
│   ├── register # For Register page
│   │   ├── page.test.tsx
│   │   └── page.tsx
│   ├── slices
│   │   ├── tests
│   │   │   └── todoSlice.test.ts
│   │   └── todoSlice.ts
│   ├── store    # redux store
│   │   ├── index.ts
│   │   └── tests
│   │       └── index.test.ts
│   └── todos   # For Todo page
│       ├── constants.ts
│       ├── page.test.tsx
│       └── page.tsx
├── eslint.config.js
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── tree.txt
├── tsconfig.json
└── yarn.lock

47 directories, 104 files

```


## Bonus Question
> You can enter bonus page `/bonus`. and review at that source code