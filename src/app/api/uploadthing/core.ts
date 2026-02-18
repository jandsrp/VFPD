import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 4 } })
        .middleware(async ({ req }) => {
            console.log("UploadThing middleware started");
            // This code runs on your server before upload
            // const user = await auth(req);
            // if (!user) throw new UploadThingError("Unauthorized");
            console.log("UploadThing middleware authorized");
            return { userId: "admin" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
