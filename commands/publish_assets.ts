import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { join } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { readFile } from 'node:fs/promises'
import pMap from 'p-map' // Install with `npm install p-map`
import mime from 'mime'

export default class PublishAssets extends BaseCommand {
  static commandName = 'publish:assets'
  static description = 'This command will publish the assets to the R2 CDN'

  static options: CommandOptions = {
    loadApp: false,
    stayAlive: false,
  }

  async run() {
    const buildDir = this.app.publicPath('assets')

    try {
      // Get all files from build directory
      const files = await readdir(buildDir, { recursive: true })

      const s3Client = new S3Client({
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        requestHandler: {
          requestTimeout: 30000,
          httpsAgent: {
            maxSockets: 1000,
          },
        },
        credentials: {
          accessKeyId: process.env.R2_KEY!,
          secretAccessKey: process.env.R2_SECRET!,
        },
      })

      // First, list all objects in the bucket
      const { Contents = [] } = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: process.env.R2_BUCKET!,
        }),
      )

      // Delete all existing objects
      if (Contents.length > 0) {
        this.logger.info('Deleting existing objects...')
        await pMap(
          Contents,
          async (object) => {
            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET!,
                Key: object.Key!,
              }),
            )
            this.logger.success(`Deleted: ${object.Key}`)
          },
          { concurrency: 1000 },
        )
      }
      this.logger.info('Starting upload of assets to R2...')

      await pMap(
        files,
        async (file) => {
          const filePath = join(buildDir, file)

          const stats = await stat(filePath)
          if (!stats.isFile()) return

          const key = `${file}`

          const fileContent = await readFile(filePath)

          await s3Client.send(
            new PutObjectCommand({
              Bucket: process.env.R2_BUCKET!,
              Key: key,
              Body: fileContent,
              ContentType: mime.getType(filePath)!,
            }),
          )
          // this.logger.success(`Uploaded: ${key}`)
        },
        { concurrency: 1000 },
      )

      // Upload each file
      // for (const file of files) {
      //   const filePath = join(buildDir, file)

      //   const stats = await stat(filePath)
      //   if (!stats.isFile()) continue

      //   const key = `assets/${file}`

      //   const fileContent = await readFile(filePath)
      //   await s3Client.send(
      //     new PutObjectCommand({
      //       Bucket: process.env.R2_BUCKET!,
      //       Key: key,
      //       Body: fileContent,
      //     })
      //   )
      //   this.logger.success(`Uploaded: ${key}`)
      // }

      this.logger.success('All assets uploaded successfully!')
    } catch (error) {
      this.logger.error('Failed to upload assets')
      this.logger.error(error)
    }
  }
}
