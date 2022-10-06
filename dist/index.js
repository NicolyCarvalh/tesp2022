"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(users_1.default);
const mongoURI = process.env.MONGODB_URL || '';
console.log('Conectando ao mongo');
mongoURI &&
    mongoose_1.default
        .connect(mongoURI)
        .then(() => console.log('MongoDB conectado ...'))
        .catch((err) => console.log(err));
app.listen(process.env.PORT, () => console.log('Servidor rodando com sucesso', process.env.PORT));
