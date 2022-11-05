export default async function handler(req, res) {

	const {id} =  req.query
	const response = await fetch(`${process.env.API_HOST}/api/comic/${id}/volume`, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "GET"
	})

	const json = await response.json();
	res.status(response.status).send(json)
}
