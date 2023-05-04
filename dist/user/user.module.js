"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mailer_service_1 = require("../mailer/mailer.service");
const message_service_1 = require("../message/message.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entity/user.entity");
const axios_1 = require("@nestjs/axios");
const user_repository_1 = require("./repository/user.repository");
const user_mapper_1 = require("./mapper/user.mapper");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        providers: [user_service_1.UserService, mailer_service_1.MailerService, message_service_1.MessageService, user_repository_1.UserRepository, user_mapper_1.UserMapper],
        controllers: [user_controller_1.UserController],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_entity_1.User.name, schema: user_entity_1.UserSchema }]),
            axios_1.HttpModule,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map