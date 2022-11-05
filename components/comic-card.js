import Link from "next/link";
import {ReferLink} from "./icon";
import {FolderIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";

export default function ComicCard({comic}) {
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

	useEffect(() => {
		console.log(comicObj)
	}, [comicObj])

	return (
		<div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-dashed divide-gray-200 mt-10">
			<div className="px-4 py-5 sm:p-6">
				<div className="flex justify-between space-x-4 px-2 sm:px-10">
					<Link href={`/comics/${comic.id}?name=${comic.title}`} className="text-xl text-left font-semibold flex items-center">

						{
							update ? <Input placeholder={comic.title} handler={
								e => setComicObj({...comicObj, title: e.target.value})
							}/> : comic.title
						}

						<ReferLink/>
					</Link>

					<div className="flex space-x-3">
						<button
							onClick={() => setUpdate(false)}
							hidden={!update}
							className={` text-white bg-indigo-600 py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
						>
							{'Update'}
						</button>

						<button
							hidden={update}
							className={` text-gray-500 border-gray-200 py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
						>
							{'Scan'}
						</button>
						<button
							hidden={update}
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
