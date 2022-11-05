import LoadingDots from "./loading-dots";

export default function ComicPlaceholder() {

	return (
		<div className="animate-pulse bg-white overflow-hidden shadow rounded-lg divide-y divide-dashed divide-gray-200 mt-10">
			<div className="px-4 py-5 sm:p-6">
				<LoadingDots />
				<div className="flex justify-between space-x-4 px-2 sm:px-10">
					<div className="h-2 bg-slate-200 rounded"></div>
				</div>
			</div>
			<div className="px-2 py-2 sm:px-3 bg-gray-50 relative">
				<div className="flex item-start truncate items-center text-gray-700 font-mono text-sm select-all">
					<div className="h-3"></div>
				</div>
			</div>
		</div>
	)
}
