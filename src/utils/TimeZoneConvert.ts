export function nowBrazil(): Date {
    const now = new Date();
    // offset de -3h (São Paulo)
    const offset = -3 * 60; // em minutos
    const brasilTime = new Date(now.getTime() + offset * 60 * 1000);
    return brasilTime;
}