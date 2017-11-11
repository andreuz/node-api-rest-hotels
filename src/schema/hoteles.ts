import { Schema, Document, Model, model } from 'mongoose';

export interface Location {
    type: string,
    coordinates: Array<number>
}

export interface Hoteles {
    name?: string
    starts?: number
    price?: number
    image?: string
    address?: string
    latitud?: number
    longitud?: number
}

export interface IHotelesModel extends Hoteles, Document {}

export let HotelSchema: Schema = new Schema({
    id: String,
    name: String,
    stars: Number,
    price: Number,
    image: String,
    amenities: [String]
}, { collection: "Hoteles", versionKey: false });

export const Hotel: Model<IHotelesModel> = model<IHotelesModel>("Hoteles", HotelSchema);