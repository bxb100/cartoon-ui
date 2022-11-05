export default async function handler(req, res) {

	const {id, title, path} = req.query
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/comic/${id}`, {
		body: JSON.stringify({title, path}),
		headers: {
			"Content-Type": "application/json"
		},
		method: "PUT"
	})

	const json = await response.json();
	res.status(response.status).send(json)
}
