import {useState} from "react";
import fetcher from "../lib/fetcher";
import toast from "react-hot-toast";

export default function ComicScan({id, revalidate}) {

	const [scan, setScan] = useState(false)

	return (
		<>
		{
			scan ? <button type="button"
						   className={`h-9 inline-flex items-center px-3 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed`}
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
							await fetcher(`/api/scan-comic?id=${id}`)
							toast.success("Scan successful")
						} catch (e) {
							toast.error(e.message)
						} finally {
							setScan(false)
							await revalidate()
						}
					}}
					className="h-9 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{'Scan'}
				</button>
		}
		</>
	)
}
