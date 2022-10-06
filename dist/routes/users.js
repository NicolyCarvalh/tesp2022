"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * /new para criar um novo usuario
 * /list para listar todos os usuarios
 */
const express_1 = __importDefault(require("express"));
const UserControllers_1 = __importDefault(require("../controllers/UserControllers"));
const userRoutes = express_1.default.Router();
userRoutes.post('/new', UserControllers_1.default.create);
userRoutes.put('/update', UserControllers_1.default.update);
userRoutes.get('/list', UserControllers_1.default.index);
userRoutes.post('/find', UserControllers_1.default.findOne);
userRoutes.post('/delete', UserControllers_1.default.delete);
exports.default = userRoutes;
