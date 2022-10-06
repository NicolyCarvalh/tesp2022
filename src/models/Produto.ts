import mongoose, { Schema } from 'mongoose';
import { boolean, number } from 'yup';

export interface ProdutoInteface {
    nome: String;
    descricao: String;
    quantidadeEstoque: number;
    preco: String;
    precoPromocional: number;
    precoPromoAtivado: boolean;
    tipo: String
}
const ProdutoSchema = new Schema(
    {
    nome: String,
    descricao: String,
    quantidadeEstoque: number,
    preco: String,
    precoPromocional: number,
    precoPromoAtivado: boolean,
    tipo: String,
    },
    {
        timestamps: true,
    }
);
export const Produto = mongoose.model('Produto', ProdutoSchema, 'produtos');
{
}
