import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto", // required for R2
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const uploadPkpassToR2 = async (buffer: Buffer, key: string) => {
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: "application/vnd.apple.pkpass",
      ACL: "public-read", // optional if bucket is public
    })
  );

  const publicUrl = `https://pub-8d68d87557f4468eae5143c802a7fd29.r2.dev/${key}`;
  return publicUrl;
};
