"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../models/Users");
const Yup = __importStar(require("yup"));
// yarn add yup @types/yup
const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    username: Yup.string().required(),
    phone: Yup.string().required(),
    address: Yup.object({
        street: Yup.string().required(),
        suite: Yup.string().required(),
        city: Yup.string().required(),
        zipcode: Yup.string().required(),
    }),
});
const deleteUserSchema = Yup.object().shape({
    email: Yup.string().email().required(),
});
exports.default = {
    async create(request, response) {
        const { name, email, username, phone, address } = request.body;
        if (!(await userSchema.isValid({
            name,
            email,
            username,
            phone,
            address,
        }))) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }
        const existing = await Users_1.User.findOne({ email });
        if (!existing) {
            const user = await Users_1.User.create({
                name,
                email,
                username,
                phone,
                address,
            });
            return response.status(200).json({
                message: 'Usuario criado com sucesso',
                user,
            });
        }
        return response
            .status(201)
            .json({ message: 'Usuario ja existe no BD' });
    },
    async index(request, response) {
        // atribui à existing
        // o retorno da chamada do método find
        // no modelo User
        const existing = await Users_1.User.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum usuario encontrado' });
        }
        return response.status(200).json(existing);
    },
    async update(request, response) {
        const { name, email, username } = request.body;
        const user = await Users_1.User.findOneAndUpdate({
            name,
        }, {
            email,
            username,
        });
        if (user) {
            return response.status(200).json({ message: 'Usuario atualizado' });
        }
        return response.status(400).json({ message: 'usuario nao encontrado' });
    },
    async findOne(request, response) {
        const { name, email, username } = request.body;
        const user = await Users_1.User.find({
            $or: [{ name: name }, { email: email }, { username: username }],
        });
        if (user) {
            return response.status(200).json(user);
        }
        return response.status(400).json({ message: 'usuario nao encontrado' });
    },
    async delete(request, response) {
        const { email } = request.body;
        if (!(await deleteUserSchema.isValid({ email }))) {
            return response.status(401).json({ message: 'email invalido' });
        }
        const result = await Users_1.User.findOneAndDelete({ email });
        if (result) {
            return response
                .status(200)
                .json({ message: 'usuario removido com sucesso' });
        }
        return response.status(400).json({ message: 'usuario nao encontrado' });
    },
};
