import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
    seedPhrase: string;
    address: string;
    createdAt: Date;
}

const WalletSchema: Schema = new Schema({
    seedPhrase: { type: String, required: true },
    address: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


export default mongoose.model<IWallet>('Wallet', WalletSchema);
