import AdminJS, { ComponentLoader } from "adminjs";
import express from "express";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/mongoose";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import fs from "fs";
// import bcrypt from "bcrypt";
// import uploadFeature from '@adminjs/upload'
// const uploadFeature = require("@adminjs/upload");
import UserInfoModel from "./model/userinfo";
import BlogsModel from "./model/blogs";
import HeroModel from "./model/Hero";
import NotificationModel from "./model/notification";
import InteractionModel from "./model/Interaction";
import AdminInfo from "./model/admin";
import { ActionRequest, ActionContext } from "adminjs";
import AWS from "aws-sdk";
import RichTextEditorPage from "./RichTextEditorPage"
// import { DefaultQuillToolbarOptions } from '@adminjs/design-system';
 // Adjust the path based on your project structure
import Connect from "connect-mongo";
import session from "express-session";
import { SessionOptions } from "express-session";
dotenv.config();

const PORT = 3001;

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource,
});
mongoose.set("strictQuery", true);

const start = async (): Promise<void> => {
  const app = express();

  // This facilitates the connection to the mongo database
  await mongoose.connect(`${process.env.MONGO_URL}`);

  const DEFAULT_ADMIN = {
    email: "nishchayr@iitbhilai.ac.in",
    password: "12345678",
  };
  const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
  };
  app.use(
    session({
      secret: "sessionsecret",
      resave: false,
      saveUninitialized: true,
      store: Connect.create({
        mongoUrl: `${process.env.MONGO_URL}`,
        collectionName: "sessions",
      }),
    })
  );

  const usersNavigation = {
    name: "Users",
    icon: "User",
  };

  const booksNavigation = {
    name: "Blogs",
    icon: "Book",
  };

  const componentLoader = new ComponentLoader();
  const Components = {
    upload: componentLoader.add("FormPage", "./editImage"),
    show: componentLoader.add("Show", "./showImage"),
    richTextContent : componentLoader.add("RichTextEditorPage", "./RichTextEditorPage"),
    richShowContent : componentLoader.add("richShowContent", "./RichTextShowEditor"),
  };


  const convertKeysToArray = (payload) => {
    const filesArray = [];
    let index = 0;
  
    while (payload[`items.0.file.${index}`]) {
      const fileKey = `items.0.file.${index}`;
      filesArray.push(payload[fileKey]);
      index++;
    }
  
    return filesArray;
  };
  const excludeItemsFromPayload = (payload) => {
    const result = {};
  
    // Iterate through keys in the payload
    for (const key in payload) {
      // Check if the key does not start with 'items.'
      if (!key.startsWith('items.')) {
        // Add the key and its value to the result object
        result[key] = payload[key];
      }
    }
  
    return result;
  };
  const handleFileUploadAction = async (request) => {
    const s3 = new AWS.S3({
      accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`,
      region: `${process.env.REACT_APP_AWS_REGION}`,
    });
    try {
      const file = request.payload["items.0.file.0"];                                   
      if (file) {
        // Configure AWS SDK with your credentials
        const s3 = new AWS.S3({
          accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
          secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`,
          region: `${process.env.REACT_APP_AWS_REGION}`,
        });
        const arrayOfFiles = convertKeysToArray(request.payload);
        const itemsArray = [];
        arrayOfFiles.forEach(async (file) => {
        const fileStream = fs.createReadStream(file.path);
        // Generate a unique key for the file in S3
        const key = `uploads/${file.name}`;
        // Prepare the parameters for the S3 upload
        const params = {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: key,
          Body: fileStream, // Assuming the file data is available                      
        };
        const item = {
          s3Key: key,
          bucket: process.env.REACT_APP_AWS_BUCKET,
          mime: file.type,
          dateCreated: new Date(),
          region: process.env.REACT_APP_AWS_REGION,
        };
        itemsArray.push(item);
        // Upload the file to S3                  
        const res = await s3.putObject(params).promise();
        console.log(
          `Successfully uploaded file to ${res}`
        );

        });
        const resultPayload = excludeItemsFromPayload(request.payload);
        resultPayload['items'] = itemsArray;

        request.payload = resultPayload;
      } 
      const richTextContent = request.payload['richTextContent'];
      if (richTextContent) {
        // Handle rich text content upload to AWS S3 here
        const title = request.payload['title'];
        // For example:
        const richTextKey = `richtext/${title}_rich_text.txt`;
        const richTextParams = {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: richTextKey,
          Body: Buffer.from(richTextContent, 'utf-8'),
          ContentType: 'text/plain',
        };
  
        const richTextRes = await s3.putObject(richTextParams).promise();
        console.log(`Successfully uploaded rich text content to ${richTextRes}`);
  
        // Update the payload with the rich text content information
        const url = `https://${process.env.REACT_APP_AWS_BUCKET}.s3.amazonaws.com/${richTextKey}`;
        request.payload['richTextContent'] = url;

      }
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      // Handle error accordingly
    }

    return request;
  }


  // We will need to create an instance of AdminJS with a basic resource
  const admin = new AdminJS({
    resources: [
      {
        resource: AdminInfo,
        options: {
          navigation: {
            name: "Admin",
            icon: "User",
          },

          // listproperties s: ['username' , 'password', 'email', 'passwossrd', 'isGoogleSignup'],
        },
      },
      {
        resource: UserInfoModel,
        options: {
          navigation: usersNavigation,
          listProperties: ["name", "email", "isGoogleSignup", "g_id"],
          // properties: {
          //   password: {
          //     isVisible: false,
          //   },
          //   password: {
          //     type: "string",
          //     isVisible: {
          //       // Make password visible in the edit mode.
          //       list: false,
          //       edit: true,
          //       filter: false,
          //       show: false,
          //     },
          //   },
          // },
        },
      },
      {
        resource: BlogsModel,
        options: {
          navigation: booksNavigation,
          listProperties: [
            "title",
            "user_id",
            
            "tags",
            'richTextContent',
            "time",
            "read_time",
            "like",
          ],
          properties: {
            items: {
              type: "image/png",
              components: {
                edit: Components.upload,
                show: Components.show,
              },
            },
            richTextContent: {
              type: 'richtext',
              components: {
                edit: Components.richTextContent,
                show: Components.richShowContent,
              }
            },
            // components: {
            //   edit: RichTextEditorPage,
            // },
            // // Add more options for the rich text editor
            // options: {
            //   placeholder: 'Type your content here...',
            //   // Add more options as needed
            // },
          },
          actions: {
            new: {
              // Triggered before saving to the database
              before: async (request) => {
               return handleFileUploadAction(request);
              },
            },
            edit: {
              // Triggered before saving to the database
              before: async (request) => {
                return handleFileUploadAction(request);
              },
            },
          },
        },
      },
      {
        resource: HeroModel,
        options: {
          navigation: booksNavigation,
          listProperties: ["page", "key", "value"],
        },
      },
      {
        resource: InteractionModel,
        options: {
          navigation: booksNavigation,
        },
      },
      {
        resource: NotificationModel,
        options: {
          navigation: booksNavigation,
        },
      },
    ],
    componentLoader,
  });

  const sessionOptions: SessionOptions = {
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: true,
  };

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
    ...sessionOptions,
  });

  app.use(admin.options.rootPath, adminRouter);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
