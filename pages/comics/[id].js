import Layout from "../../components/layout";
import Link from "next/link";
import {ArrowTopRightOnSquareIcon, HomeIcon} from "@heroicons/react/20/solid";
import Head from "next/head";
import {useRouter} from "next/router";
import Image from "next/image";
import fetcher from "../../lib/fetcher";
import useSWR from "swr";
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import toast from "react-hot-toast";

export default function Comic() {
	const router = useRouter();
	const {id, name} = router.query;

	const {data: volumes, mutate: revalidateVolumes} = useSWR(
		`/api/get-volumes?id=${id}`,
		fetcher
	)
	const [scan, setScan] = useState(false)

	return (
		<Layout>
			<Head>
				<title>{name || 'Comic'}</title>
			</Head>

			<div className="px-4 sm:px-6 lg:px-8 text-left">
				<div className={"flex space-x-4"}>


					<Link href={"/"} className={"mt-4 sm:mt-0 sm:flex-none"}>
						<button
							type="button"
							className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<HomeIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
							Home
						</button>
					</Link>

					{scan ? <button type="button"
									className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed`}
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
								} finally {
									setScan(false)
									await revalidateVolumes()
								}
							}}
							className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{'Scan'}
						</button>
					}
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table className="min-w-full divide-y divide-gray-300">
									<thead className="bg-gray-50">
									<tr>
										<th scope="col"
											className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
											Name
										</th>
										<th scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Progress
										</th>
										<th scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Status
										</th>
										<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
											<span className="sr-only">Delete</span>
										</th>
									</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
									{
										volumes
											? volumes.map((volume) => (
												<VolumeRow key={volume.id} volume={volume} refresh={revalidateVolumes}/>
											))
											: <></>
									}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

function VolumeRow({volume, refresh}) {
	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
				<div className="flex items-center">
					<div className="w-20 flex-shrink-0">
						<Image className="w-20 rounded"
							   width={200}
							   height={200}
							   src={`data:image/jpg;base64,${volume.cover}`}
							   alt={volume.fileName || ''}/>
					</div>
					<div className="ml-4">
						<div className="font-medium text-gray-900">
							<Link href={`/reader/${volume.id}`}
								  className="text-left font-semibold flex items-center">
								{volume.fileName}
								<ArrowTopRightOnSquareIcon className={"w-4 h-4 ml-2"}></ArrowTopRightOnSquareIcon>
							</Link>
						</div>
						<div
							className="text-gray-500 truncate max-w-md select-all ">{volume.path}</div>
					</div>
				</div>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<div
					className="text-gray-900">{volume.currentPage} / {volume.pageCount}</div>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												<span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5
												 	${volume.read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800 '}`}>
													{volume.read ? 'Reading' : "Seal"}
												</span>
			</td>
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
				<DeleteToast id={volume.id} refresh={refresh}></DeleteToast>
			</td>
		</tr>
	)
}

function DeleteToast({id, refresh}) {
	let [isOpen, setIsOpen] = useState(false)

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	return (
		<>
			<div className=" flex items-center justify-center">
				<a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={openModal}>
					Delete<span className="sr-only"></span>
				</a>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25"/>
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Delete the Volume?
									</Dialog.Title>

									<div className="mt-4 flex flex-row space-x-4">
										<button
											type="button"
											className="justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={async () => {
												try {
													await fetch(`/api/delete-volume?id=${id}`)
													await refresh()
												} finally {
													closeModal()
												}
											}}
										>
											Delete
										</button>
										<button
											type="button"
											className="justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Dismiss
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
