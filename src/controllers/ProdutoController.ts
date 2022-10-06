import { Request, Response } from 'express';
import { Produto } from '../models/Produto';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    nome: Yup.string().required(),
    descricao: Yup.string().required(),
    quantidadeEstoque: Yup.number().required(),
    preco: Yup.number().required(),
    precoPromocional: Yup.number().required(),
    precoPromoAtivado: Yup.number().required(),
    tipo: Yup.string().required(),
});

export default {
    async create(request: Request, response: Response) {
        const {nome, descricao, quantidadeEstoque, preco, precoPromocional, precoPromoAtivado, tipo } = request.body;

        if (
            !(await userSchema.isValid({
                nome,
                descricao,
                quantidadeEstoque,
                preco,
                precoPromocional,
                precoPromoAtivado, 
                tipo,
            }))
        ) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await Produto.findOne({ nome });
        if (!existing) {
            const user = await Produto.create({
                nome,
                descricao,
                quantidadeEstoque,
                preco,
                precoPromocional,
                precoPromoAtivado, 
                tipo,
            });
            return response.status(200).json({
                message: 'Produto criado com sucesso',
                user,
            });
        }
        return response
            .status(201)
            .json({ message: 'Produto ja existe no BD' });
    },
    async index(request: Request, response: Response) {

        const existing = await Produto.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum produto encontrado' });
        }
        return response.status(200).json(existing);
    },
   
    },