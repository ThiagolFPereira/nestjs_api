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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const user_mapper_1 = require("./mapper/user.mapper");
let UserController = class UserController {
    constructor(userService, userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }
    async createUsers(userDTO) {
        try {
            const user = await this.userService.create(userDTO);
            return this.userMapper.mapToDto(user);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUser(userId) {
        try {
            const user = await this.userService.getUser(userId);
            return this.userMapper.mapToDto(user);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAvatar(response, userId) {
        try {
            await this.userService.getAvatar(userId, response);
            response.end();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteAvatar(response, userId) {
        try {
            await this.userService.deleteAvatar(userId, response);
            response.end();
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('user/:userId/avatar'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Delete)('user/:userId/avatar'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAvatar", null);
UserController = __decorate([
    (0, swagger_1.ApiUseTags)('doc'),
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [user_service_1.UserService, user_mapper_1.UserMapper])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map