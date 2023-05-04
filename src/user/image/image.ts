import * as path from 'path'
import * as fs from 'fs'
import { Response } from 'express'
import axios from "axios";

export class Image {

    getPath(hash:string) {
        return path.join(__dirname, `${hash}.jpg`)

    }

    checkIfImageExist(filePath: string, response: Response) {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath)
            const base64String = fileData.toString('base64')
            response.write(base64String)
          }
    }
    downloadImage(userAvatar: any) {
        return axios.get(userAvatar, {
            responseType: 'arraybuffer',
          })
    }
    saveImage(path: string, buffer: any) {
        fs.writeFileSync(path, buffer)

    }
}