import {useEffect, useState} from "react";
import LoadingDots from "./loading-dots";
import toast, {Toaster} from "react-hot-toast";

export default function ComicAdd({validate}) {

	const [caption, setCaption] = useState('');
	const [path, setPath] = useState('');

	const [disabled, setDisabled] = useState(true)
	const [adding, setAdding] = useState(false)

	useEffect(() => {
		if (caption.length === 0 || path.length === 0) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}, [caption, path])

	useEffect(() => {
		if (adding) {
			setDisabled(true)
		}
	}, [adding])

	async function handleSubmit(e) {
		e.preventDefault()
		setAdding(true)
		try {
			const res = await fetch(`/api/add-comic?caption=${caption}&path=${path}`)
			if (!res.ok) {
				toast.error((await res.json()).msg)
			}
		} finally {
			setAdding(false)
			setDisabled(false)
			await validate()
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex justify-between space-x-4 px-5 w-full max-w-2xl h-10 mt-10"
			>
				<Input name={"caption"} setRef={setCaption} placeholder={"Comic caption"}></Input>
				<Input name={"path"} setRef={setPath} placeholder={"Comic Path"}></Input>

				<button
					type="submit"
					disabled={disabled}
					className={`${
						disabled
							? 'cursor-not-allowed bg-gray-100 text-gray-500 border-gray-300'
							: 'bg-black text-white border-black hover:text-black hover:bg-white'
					} py-2 w-28 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
				>
					{adding ? <LoadingDots/> : 'Add'}
				</button>
			</form>
		</>
	)
};

function Input({name, setRef, placeholder}) {

	return (
		<div
			className="flex-auto relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
			<label
				htmlFor={name}
				className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-gray-100 text-xs font-medium text-gray-900"
			>
				{name}
			</label>
			<input
				onInput={e => setRef(e.target.value)}
				type="text"
				name={name}
				id={name}
				className="bg-gray-100 block w-full border-0 p-0 text-gray-900 placeholder-gray-500 font-sans text-sm focus:ring-0 sm:text-sm"
				placeholder={placeholder}
			/>
		</div>
	)
}
