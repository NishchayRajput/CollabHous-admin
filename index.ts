import AdminJS from 'adminjs'
import express from 'express'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import UserInfoModel from './model/userinfo'
import BlogsModel from './model/blogs'
import HeroModel from './model/Hero'
import NotificationModel from './model/notification'
import InteractionModel from './model/Interaction'
import AdminInfo from './model/admin'
// import Connect from 'connect-pg-simple'
import Connect from 'connect-mongo'
import session from 'express-session'
import { SessionOptions } from 'express-session';
dotenv.config()

const PORT = 3001

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource
})
mongoose.set('strictQuery', true);

const start = async (): Promise<void> => {
  const app = express()

  // This facilitates the connection to the mongo database
  await mongoose.connect(`${process.env.MONGO_URL}`)




  const DEFAULT_ADMIN = {
    email: 'nishchayr@iitbhilai.ac.in',
    password: '12345678'
  }
  const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
  }
  app.use(session({
    secret: 'sessionsecret',
    resave: false,
    saveUninitialized: true,
    store: Connect.create({
      mongoUrl: `${process.env.MONGO_URL}`,
      collectionName: 'sessions'
    })
  }))

  const usersNavigation = {
    name: 'Users',
    icon: 'User',
  }
  
  const booksNavigation = {
    name : 'Blogs',
    icon : 'Book',
  }
  
  
  // We will need to create an instance of AdminJS with a basic resource
  const admin = new AdminJS({
    resources: [
      {
        resource : AdminInfo, 
        options : {
          navigation : {
            name : 'Admin',
            icon : 'User',
          },
          
          // listproperties s: ['username' , 'password', 'email', 'passwossrd', 'isGoogleSignup'],
        }
      },
      {
        resource: UserInfoModel,
        options: {
          navigation: usersNavigation,
          listProperties : ['name','email', 'password', 'isGoogleSignup', 'g_id'],        
        }
      },
      {
        resource: BlogsModel,
        options : {
          navigation : booksNavigation,
          listProperties : ['title','user_id','content', 'tags', 'time', 'read_time', 'like'],
        }
      },
      {
        resource: HeroModel,
        options : {
          navigation : booksNavigation,
          listProperties : ['page','key','value']
        }
      },
      {
        resource: InteractionModel,
        options : {
          navigation : booksNavigation,
          
        }
      },
      {
        resource: NotificationModel,
        options : {
          navigation : booksNavigation,
        }
        
      },

    ]
  })


  const sessionOptions: SessionOptions = {
    secret: 'sessionsecret',
    resave: false,
    saveUninitialized: true,
  };

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
      ...sessionOptions,
    }
  );

  app.use(admin.options.rootPath, adminRouter);
  app.use(admin.options.rootPath, adminRouter)
  
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
