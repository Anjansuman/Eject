import { Eject } from '../core/Eject.mjs';

export async function add(file) {
    const eject = new Eject();
    await eject.add(file);
}
