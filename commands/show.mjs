import { Eject } from '../core/Eject.mjs';

export async function show(commitHash) {
    const eject = new Eject();
    await eject.show(commitHash);
}