import { Eject } from '../core/Eject.mjs';

export async function log() {
    const eject = new Eject();
    await eject.log();
}