import {useRouter} from "next/router";
import {ArrowSmallLeftIcon} from "@heroicons/react/20/solid";
import Head from "next/head";
import LoadingDots from "../../components/loading-dots";
import {useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";

export default function Reader() {

	const router = useRouter();
	const {id} = router.query

	const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/volume/stream/${id}`

	const [load, setLoad] = useState(true)

	useEffect(() => {
		const handleEvent = ({ data, origin}) => {
			if (origin === process.env.NEXT_PUBLIC_API_HOST) {
				if (data === 'done') {
					setLoad(false)
				}
			}
			return true
		}
		window.addEventListener("message", handleEvent, false)
		return () => window.removeEventListener("message", handleEvent)
	}, [])

	useEffect(() => {
		// downgrade
		const timer = setTimeout(() => {
			if (load) {
				setLoad(false)
				toast('Slow Loading', {
					icon: '🐢'
				});
			}
		}, 30000)
		return () => clearTimeout(timer)
	}, [load])

	return (
		<div>
			<Head>
				<title>Reader</title>
			</Head>

			<Toaster></Toaster>

			<a onClick={() => router.back()}
			   className={"z-50 absolute inline-flex cursor-pointer items-center px-3 py-2 cursor-point text-lg leading-4 font-medium text-black opacity-5 hover:opacity-100"}>
				<ArrowSmallLeftIcon className="-ml-0.5 h-8 w-8" aria-hidden="true"/>
				Back
			</a>

			<div className={"w-full h-full fixed z-10 opacity-70 bg-gray-300"} hidden={!load}></div>

			{
				id ?
					(<iframe
						id={"villain"}
						src={`${process.env.NEXT_PUBLIC_API_HOST}/#/reader?src=${url}`}
						className={"w-screen h-screen"}
						style={{border: 0}}
						allowFullScreen
					/>)
					:
					(<div className={"h-screen w-screen flex items-center justify-center"}>
						<LoadingDots></LoadingDots>
					</div>)
			}

		</div>

	)

}
