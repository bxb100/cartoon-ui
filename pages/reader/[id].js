import {useRouter} from "next/router";
import {ArrowSmallLeftIcon} from "@heroicons/react/20/solid";
import Head from "next/head";
import LoadingDots from "../../components/loading-dots";
import Link from "next/link";

export default function Reader() {

	const router = useRouter();
	const {id} = router.query

	const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/volume/stream/${id}`;

	return (
		<div>
			<Head>
				<title>Reader</title>
			</Head>

			<a onClick={() => router.back()} className={"absolute inline-flex cursor-pointer items-center px-3 py-2 cursor-point text-lg leading-4 font-medium text-black opacity-5 hover:opacity-100"}>
				<ArrowSmallLeftIcon className="-ml-0.5 h-8 w-8" aria-hidden="true"/>
				Back
			</a>

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
