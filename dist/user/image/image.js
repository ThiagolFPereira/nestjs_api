"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const path = require("path");
const fs = require("fs");
const axios_1 = require("axios");
class Image {
    getPath(hash) {
        return path.join(__dirname, `${hash}.jpg`);
    }
    checkIfImageExist(filePath, response) {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath);
            const base64String = fileData.toString('base64');
            response.write(base64String);
        }
    }
    downloadImage(userAvatar) {
        return axios_1.default.get(userAvatar, {
            responseType: 'arraybuffer',
        });
    }
    saveImage(path, buffer) {
        fs.writeFileSync(path, buffer);
    }
}
exports.Image = Image;
//# sourceMappingURL=image.js.map