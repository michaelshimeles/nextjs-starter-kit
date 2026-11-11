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

// Optional: Neon Object Storage, used when STORAGE_PROVIDER=neon. Its
// AWS_* variables come from `neon env pull`; the bucket must be created with
// the `public_read` access level (Neon returns 501 for S3 ACLs).
const neon = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
  requestChecksumCalculation: "WHEN_REQUIRED",
});

const uploadToNeon = async (buffer: Buffer, key: string, contentType: string) => {
  const bucket = process.env.NEON_STORAGE_BUCKET_NAME!;
  await neon.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
  return `${process.env.AWS_ENDPOINT_URL_S3}/${bucket}/${encodeURIComponent(key)}`;
};

export const uploadImageAssets = async (
  buffer: Buffer,
  key: string,
  contentType = "image/*"
) => {
  if (process.env.STORAGE_PROVIDER === "neon") {
    return uploadToNeon(buffer, key, contentType);
  }

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_UPLOAD_IMAGE_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: "image/*",
      ACL: "public-read", // optional if bucket is public
    })
  );

  const publicUrl = `https://pub-6f0cf05705c7412b93a792350f3b3aa5.r2.dev/${key}`;
  return publicUrl;
};
