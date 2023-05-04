"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const message_service_1 = require("../message/message.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const crypto = require("crypto");
const fs = require("fs");
const user_repository_1 = require("./repository/user.repository");
const image_1 = require("./image/image");
let UserService = class UserService {
    constructor(mailerService, rabbitMQService, userRepository, httpService) {
        this.mailerService = mailerService;
        this.rabbitMQService = rabbitMQService;
        this.userRepository = userRepository;
        this.httpService = httpService;
    }
    async create(userDto) {
        try {
            const user = await this.userRepository.create(userDto);
            await this.mailerService.sendMail(user.email, 'New user created', `Hello ${user.first_name}, your user has been created successfully!`);
            this.rabbitMQService.send(user);
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUser(userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://reqres.in/api/users/${userId}`));
            const dataReponse = response.data;
            return dataReponse.data;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async avatarHash(userId) {
        const userAvatar = (await this.getUser(userId)).avatar;
        const hash = crypto.createHash('sha256').update(userAvatar).digest('hex');
        return hash;
    }
    async getAvatar(userId, response) {
        try {
            const avatar = new image_1.Image();
            const hash = await this.avatarHash(userId);
            const user = await this.userRepository.getByCriteria({ userId, hash });
            const filePath = avatar.getPath(hash);
            if (user) {
                avatar.checkIfImageExist(filePath, response);
                response.status(200);
            }
            else {
                const image = await avatar.downloadImage(user);
                const buffer = Buffer.from(image.data, 'binary');
                avatar.saveImage(filePath, buffer);
                await this.userRepository.createByCriteria({ userId, hash });
                response.write(buffer.toString('base64'));
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteAvatar(userId, response) {
        try {
            const avatar = new image_1.Image();
            const hash = await this.avatarHash(userId);
            await this.userRepository.delete({ userId, hash });
            const filePath = avatar.getPath(hash);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            response.status(200);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        message_service_1.MessageService,
        user_repository_1.UserRepository, typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map