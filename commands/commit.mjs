import { Eject } from '../core/Eject.mjs';

export async function commit(message) {
    const eject = new Eject();
    await eject.commit(message);
}
