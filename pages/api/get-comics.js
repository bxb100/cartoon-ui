export default async function handler(req, res) {

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/comic`, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "GET"
	})

	const json = await response.json();
	res.status(response.status).send(json)
}
