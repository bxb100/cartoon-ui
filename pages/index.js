import ComicCard from "../components/comic-card";
import Layout from "../components/layout";
import ComicAdd from "../components/comic-add";

export default function Home() {

	const callRefresh = () => {
		console.log("cs")
	}
	const comics = [
		{
			"id": "6361defc5f145e7ea57d0087",
			"title": "20 世纪少年",
			"path": "/Users/xiaobo/Downloads",
			"volNum": null,
			"scanned": false
		}
	]

	return (
		<Layout>
			<h1 className="text-4xl sm:text-6xl font-bold">Cartoon</h1>
			<div className="w-full max-w-2xl">
				<ComicAdd callRefresh={callRefresh}/>

				{
					comics.map(c => {
						return <ComicCard key={c.id} comic={c} />
					})
				}
			</div>
		</Layout>
	)
}
