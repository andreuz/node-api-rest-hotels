import { Hotel } from '../schema/hoteles';
const data =require('./data');
export async function createFakeHotels() {
    let count = await Hotel.find().count();
    if (count <= 0) {
        data.forEach ((hotel:any)=>{
            new Hotel(hotel).save();
        });
    }
}