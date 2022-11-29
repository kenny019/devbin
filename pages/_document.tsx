import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
	<Html lang="en" className="light">
	  <Head>
		<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
	  </Head>
	  <body className="bg-white text-black dark:text-white dark:bg-zinc-800">
		<Main />
		<NextScript />
	  </body>
	</Html>
  )
}