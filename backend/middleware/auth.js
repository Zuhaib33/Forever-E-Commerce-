import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {

        const { token } = req.headers

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized. Login Again"
            })
        }

        const token_decode = jwt.decode(
            token,
            process.env.JWT_SECRET
        )
       console.log("fghj")
        req.body.userId = token_decode.userId
        const userId = req.body.userId

        // console.log(token_decode)
        // console.log(req.body.userId )
        // console.log(token_decode.userId )
        console.log(userId )

        next()

    } catch (error) {

        console.log(error)

        return res.json({
            success: false,
            message: error.message
        })
    }
}

export default authUser