import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createUploadConfig } from "pushduck/server";

const { s3 } = createUploadConfig()
  .provider("cloudflareR2", {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    accessKeyId: process.env.R2_UPLOAD_IMAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_UPLOAD_IMAGE_SECRET_ACCESS_KEY!,
    bucket: process.env.R2_UPLOAD_IMAGE_BUCKET_NAME!,
  })
  .build();

const router = s3.createRouter({
  imageUpload: s3
    .image()
    .maxFileSize("10MB")
    .middleware(async () => {
      const result = await auth.api.getSession({
        headers: await headers(),
      });

      if (!result?.session?.userId) {
        throw new Error("Unauthorized");
      }

      return { userId: result.session.userId };
    })
    .paths({
      generateKey: ({ file, metadata }) =>
        `uploads/${metadata.userId}/${Date.now()}-${file.name}`,
    }),
});

export type AppRouter = typeof router;

export const { GET, POST } = router.handlers;
