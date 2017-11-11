import { Router } from 'express';
import { getListHoteles, getHotel } from '../service';
export function Routers(router: Router) {
    router.get("/Hotels", busqueda);
    router.get("/Hotels/:text", busqueda);
    router.get("/Hotel/:id", busquedaId);
    router.get('/', renderHtml);
    return router;
}
async function busqueda(req: any, res: any) {
    try {
        let Hostel = await getListHoteles(req.params.text ? req.params.text : "");
        let status = Hostel.length ? 200 : 204;
        res.status(status).json(Hostel)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
async function busquedaId(req: any, res: any) {
    
    try {
        let Hostel = await getHotel(req.params.id);
        let status = Hostel != null ? 200 : 204;
        res.status(status).json(Hostel)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
function renderHtml(req: any, res: any){
    res.render('index', { title: 'Almundo' });
}