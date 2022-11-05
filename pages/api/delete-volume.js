export default async function handler(req, res) {

	const {id} =  req.query
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/volume/${id}`, {
		method: "DELETE"
	})

	const json = await response.json();
	res.status(response.status).send(json)
}
