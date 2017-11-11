import { Hotel } from '../schema/hoteles';
export async function getListHoteles(text: string): Promise<Array<any>> {
    let resut = await Hotel.aggregate([
        { $match: { name: { $regex: `${text}.*`, $options: 'i' } } }
    ])
    return resut;
}
export async function getHotel(id: string): Promise<any> {
    let resut = await Hotel.findById(id); 
    return resut;
}
