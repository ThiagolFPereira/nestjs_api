import { Response } from 'express';
export declare class Image {
    getPath(hash: string): any;
    checkIfImageExist(filePath: string, response: Response): void;
    downloadImage(userAvatar: any): any;
    saveImage(path: string, buffer: any): void;
}
