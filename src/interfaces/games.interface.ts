export interface AvailableGames {
    matchId: number;
    sport: string;
    fieldName: string;
    fieldAddress: string;
    fieldCity: string;
    lat: number;
    lon: number;
    startTime: Date;
    endTime: Date;
    currentPlayers: number;
    maxPlayers: number;
    pricePerPerson: number;
};