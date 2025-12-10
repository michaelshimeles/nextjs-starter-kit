import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto", // required for R2
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_UPLOAD_IMAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_UPLOAD_IMAGE_SECRET_ACCESS_KEY!,
  },
});

export const uploadImageAssets = async (buffer: Buffer, key: string) => {
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_UPLOAD_IMAGE_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: "image/*",
      ACL: "public-read", // optional if bucket is public
    })
  );

  const baseUrl = process.env.R2_PUBLIC_URL;
  if (!baseUrl) {
    throw new Error("R2_PUBLIC_URL environment variable is not configured");
  }
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const publicUrl = `${normalizedBase}/${key}`;
  return publicUrl;
  return publicUrl;
};
