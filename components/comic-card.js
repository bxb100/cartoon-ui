import Link from "next/link";
import {ArrowTopRightOnSquareIcon, FolderIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import fetcher from "../lib/fetcher";
import toast from "react-hot-toast";
import ComicScan from "./comic-scan";

export default function ComicCard({comic, revalidate}) {
	/*{
			"id": "6361defc5f145e7ea57d0087",
			"caption": "20 世纪少年",
			"path": "/Users/xiaobo/Downloads",
			"volNum": null,
			"scanned": false
		}
		*/

	const [update, setUpdate] = useState(false)
	const [comicObj, setComicObj] = useState(comic)

	return (
		<div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-dashed divide-gray-200 mt-10">

			<div className="px-4 py-5 sm:p-6">
				<div className="flex justify-between space-x-4 px-2 sm:px-10">

					{
						update
							? <Input placeholder={comic.caption} handler={
								e => setComicObj({...comicObj, caption: e.target.value})
							}/>
							:
							<div className={"h-11 w-1/2"}>
								<Link href={`/comics/${comic.id}?name=${comic.caption}`}
									  className="text-xl text-left font-semibold flex items-center w-full">
									<span className={"truncate"}>{comic.caption}</span>
									{/* TODO : not set min-w-fit because the safari will full width*/}
									<ArrowTopRightOnSquareIcon
										className={"w-6 h-6 ml-2"}></ArrowTopRightOnSquareIcon>
								</Link>

								<span className={"mt-1 text-sm text-gray-400 float-left "}>
									{comic.volNum ? `vol. ${comic.volNum}` : 'vol. ??'}
								</span>
							</div>
					}

					<div className="flex space-x-3">

						{
							update
								? <button
									onClick={async () => {
										await fetch(`/api/update-comic?id=${comic.id}&caption=${comicObj.caption}&path=${comicObj.path}`)
										setUpdate(false)
										await revalidate()
									}}
									hidden={!update}
									className={` btn-primary text-sm transition-all ease-in-out duration-150`}
								>
									{'Update'}
								</button>
								: <>
									<ComicScan id={comic.id} revalidate={revalidate}/>
									<button
										hidden={update}
										onClick={async () => {
											await fetch(`/api/delete-comic?id=${comic.id}`)
											await revalidate();
										}}
										className={`btn-primary bg-red-500  border-red-500 hover:bg-red-700 border-solid border `}
									>
										{'Remove'}
									</button>
								</>
						}


					</div>
				</div>
			</div>
			<div className="px-2 py-2 sm:px-3 bg-gray-50 relative">
				<div className="flex item-start truncate items-center text-gray-700 font-mono text-sm select-all">
					<FolderIcon className="h-4 w-4 mr-2 text-gray-400" aria-hidden='true'/>
					{update ? <Input placeholder={comic.path}
									 handler={e => setComicObj({...comicObj, path: e.target.value})}/> : comic.path}

					<div className={"absolute right-2 inset-y"}>
						<PencilSquareIcon hidden={update} className={"h-4 w-4 text-gray-400"}
										  onClick={() => setUpdate(true)}/>
					</div>
				</div>
			</div>

		</div>
	);
};


function Input({placeholder, handler}) {

	return (
		<div className="block w-full max-w-md border-b border-gray-300 focus-within:border-indigo-600">
			<input
				type="text"
				defaultValue={placeholder}
				onInput={handler}
				className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
				placeholder={placeholder}
			/>
		</div>
	);
}
