import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../lib/s3Client";

export async function getPreSignedUrl(key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
  });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
