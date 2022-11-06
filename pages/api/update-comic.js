export default async function handler(req, res) {

	const {id, caption, path} = req.query
	const response = await fetch(`${process.env.API_HOST}/api/comic/${id}`, {
		body: JSON.stringify({caption, path}),
		headers: {
			"Content-Type": "application/json"
		},
		method: "PUT"
	})

	const json = await response.json();
	res.status(response.status).send(json)
}
