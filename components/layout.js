import Head from "next/head";
import {Toaster} from "react-hot-toast";

export default function Layout({children}) {

	return (
		<div className=" item-center justify-center min-h-screen py-2 bg-gray-100">
			<Head>
				<title>Cartoon</title>
				<link rel="icon" href="/favicon.ico"/>
				<meta
					name="description"
					content="Simple Cartoon Reader UI"
				/>
			</Head>

			<Toaster position="top-center"/>

			<main className="flex flex-col items-center justify-center w-full flex-1 md:px-20 text-center my-20">
				{children}
			</main>
		</div>
	)

}
