export default async function handler(req, res) {
	const {title, path} = req.query;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_HOST}/api/comic`,
		{
			body: JSON.stringify({title, path}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
		}
	)
	console.log(await response.text())
	if (response.ok) {
		const data = await response.json();
		res.status(200).json(data)
	} else {
		res.status(403).json({msg: "Add Failed"})
	}
}
