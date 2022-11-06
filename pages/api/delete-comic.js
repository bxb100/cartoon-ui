export default async function handler(req, res) {

	const {id} =  req.query
	const response = await fetch(`${process.env.API_HOST}/api/comic/${id}`, {
		method: "DELETE"
	})

	res.status(response.status).end()
}
