"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../dto/user.dto");
let UserMapper = class UserMapper {
    mapToDto(user) {
        const dto = new user_dto_1.UserDto();
        dto.id = user.id;
        dto.first_name = user.first_name;
        dto.last_name = user.last_name;
        dto.email = user.email;
        dto.avatar = user.avatar;
        return dto;
    }
};
UserMapper = __decorate([
    (0, common_1.Injectable)()
], UserMapper);
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map