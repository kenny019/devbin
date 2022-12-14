import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {

  return (
	<Html lang="en" className="light">
	  <Head>
		<title>devBin</title>
	  </Head>
	  <body className="bg-white text-black dark:text-white dark:bg-zinc-800">
		<Main />
		<NextScript />
	  </body>
	</Html>
  )
}