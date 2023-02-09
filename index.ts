import AdminJS from 'adminjs'
import express from 'express'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = 3001

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource
})

const start = async (): Promise<void> => {
  const app = express()

  // This facilitates the connection to the mongo database
  await mongoose.connect(`${process.env.MONGO_URL}`)

  // We will need to create an instance of AdminJS with a basic resource
  const admin = new AdminJS({
    resources: [
    ]
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)

  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
