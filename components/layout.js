import Head from "next/head";
import {Toaster} from "react-hot-toast";

export default function Layout({children}) {

	return (
		<div className=" item-center justify-center min-h-screen py-2">
			<Head>
				<title>Cartoon</title>
				<link rel="icon" href="/favicon.ico"/>
				<meta
					name="description"
					content="Simple Cartoon Reader UI"
				/>
			</Head>

			<Toaster
				position="bottom-right"
				toastOptions={{
					duration: 10000,
				}}
			/>

			<main className="flex flex-col items-center justify-center w-full flex-1 sm:px-20 text-center my-20">
				{children}
			</main>
		</div>
	)

}
