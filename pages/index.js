import ComicCard from "../components/comic-card";
import Layout from "../components/layout";
import ComicAdd from "../components/comic-add";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import {useEffect} from "react";
import ComicPlaceholder from "../components/comic-placeholder";

export default function Home() {

	const {data: comics, mutate: revalidateComics} = useSWR(
		`/api/get-comics`,
		fetcher
	)

	return (
		<Layout>
			<h1 className="text-4xl sm:text-6xl font-bold">Cartoon</h1>
			<div className="w-full max-w-2xl">
				<ComicAdd validate={revalidateComics}/>

				{
					comics
						? comics.map(c => {
							return <ComicCard revalidate={revalidateComics} key={c.id} comic={c}/>
						})
						:
						[1, 2, 3].map((_, i) => <ComicPlaceholder key={i}/>)
				}
			</div>
		</Layout>
	)
}
