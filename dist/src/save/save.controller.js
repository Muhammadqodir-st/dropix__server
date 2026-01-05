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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveController = void 0;
const common_1 = require("@nestjs/common");
const save_service_1 = require("./save.service");
const auth_guard_1 = require("../common/guards/auth.guard");
const save_dto_1 = require("./dto/save.dto");
let SaveController = class SaveController {
    saveService;
    constructor(saveService) {
        this.saveService = saveService;
    }
    findAll() {
        return this.saveService.findAll();
    }
    findById(req) {
        return this.saveService.findById(req.user.id);
    }
    create(dto, req) {
        return this.saveService.create(req.user.id, dto);
    }
};
exports.SaveController = SaveController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SaveController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SaveController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_dto_1.SaveDto, Object]),
    __metadata("design:returntype", void 0)
], SaveController.prototype, "create", null);
exports.SaveController = SaveController = __decorate([
    (0, common_1.Controller)('save'),
    __metadata("design:paramtypes", [save_service_1.SaveService])
], SaveController);
//# sourceMappingURL=save.controller.js.map