import {useRouter} from "next/router";
import {ArrowSmallLeftIcon} from "@heroicons/react/20/solid";
import Head from "next/head";
import LoadingDots from "../../components/loading-dots";

export default function Reader() {

	const router = useRouter();
	const {id} = router.query

	const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/volume/stream/${id}`;

	return (
		<div>
			<Head>
				<title>Reader</title>
			</Head>

			<button
				onClick={() => router.back()}
				type="button"
				className="absolute inline-flex items-center px-3 py-2 cursor-point text-sm leading-4 font-medium text-black opacity-5 hover:opacity-100 hover:text-green"
			>
				<ArrowSmallLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
				Back
			</button>

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
