import Link from "next/link";
import {ArrowTopRightOnSquareIcon, FolderIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import fetcher from "../lib/fetcher";
import toast from "react-hot-toast";

export default function ComicCard({comic, callRefresh}) {
	/*{
			"id": "6361defc5f145e7ea57d0087",
			"title": "20 世纪少年",
			"path": "/Users/xiaobo/Downloads",
			"volNum": null,
			"scanned": false
		}
		*/

	const [update, setUpdate] = useState(false)
	const [comicObj, setComicObj] = useState(comic)
	const [scan, setScan] = useState(false)

	return (
		<div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-dashed divide-gray-200 mt-10">

			<div className="px-4 py-5 sm:p-6">
				<div className="flex justify-between space-x-4 px-2 sm:px-10">

					{
						update
							? <Input placeholder={comic.title} handler={
								e => setComicObj({...comicObj, title: e.target.value})
							}/>
							: <Link href={`/comics/${comic.id}?name=${comic.title}`}
									className="text-xl text-left font-semibold flex items-center">
								{comic.title}
								<ArrowTopRightOnSquareIcon className={"w-6 h-6 ml-2"}></ArrowTopRightOnSquareIcon>
							</Link>
					}


					<div className="flex space-x-3">
						<button
							onClick={async () => {
								await fetch(`/api/update-comic?id=${comic.id}&title=${comicObj.title}&path=${comicObj.path}`)
								setUpdate(false)
								await callRefresh()
							}}
							hidden={!update}
							className={` text-white bg-indigo-600 py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
						>
							{'Update'}
						</button>

						{scan ? <button type="button"
										className={`${update ? 'hidden' : 'inline-flex'} items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed`}
										disabled="">
								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor"
										  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Scanning...
							</button>
							:
							<button
								onClick={async () => {
									setScan(true)
									try {
										await fetcher(`/api/scan-comic?id=${comic.id}`)
										toast.success("Scan successful")
									} finally {
										setScan(false)
									}
								}}
								hidden={update}
								className="items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
							>
								{'Scan'}
							</button>
						}
						<button
							hidden={update}
							onClick={async () => {
								await fetch(`/api/delete-comic?id=${comic.id}`)
								await callRefresh();
							}}
							className={`bg-red-500 text-white border-red-500 hover:text-red-500 hover:bg-white py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
						>
							{'Remove'}
						</button>
					</div>
				</div>
			</div>
			<div className="px-2 py-2 sm:px-3 bg-gray-50 relative">
				<div className="flex item-start truncate items-center text-gray-700 font-mono text-sm select-all">
					<FolderIcon className="h-4 w-4 mr-2 text-gray-400" aria-hidden='true'/>
					{update ? <Input placeholder={comic.path}/> : comic.path}

					<div className={"absolute right-2 inset-y"}>
						<PencilSquareIcon hidden={update} className={"h-4 w-4 text-gray-400"}
										  onClick={() => setUpdate(true)}/>
					</div>
				</div>
			</div>

		</div>
	)
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
