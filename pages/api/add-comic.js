export default async function handler(req, res) {
	const {title, path} = req.query;

	const response = await fetch(
		`${process.env.API_HOST}/api/comic`,
		{
			body: JSON.stringify({title, path}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
		}
	)
	if (response.ok) {
		const data = await response.json();
		res.status(response.status).json(data)
	} else {
		res.status(response.status).json({msg: "Add Failed"})
	}
}
