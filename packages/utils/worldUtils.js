/**
 * @hidden
 * Hack on ecsy to get World instance from system itself.
 * @param system A registered ecsy System class
 * @returns ecsy world
 */
export function getWorld(system) {
    return system["world"];
}
