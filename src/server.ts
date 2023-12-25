import { app } from './app'
import { Config } from './config'

const config = new Config()

const port = config.port

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
