import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import router from './routes/router'
import errorsHandler from './errors/errorsHandler'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(router)
app.use(errorsHandler)

app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`))

export default app