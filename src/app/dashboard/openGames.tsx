import React from "react";

type Game = {
    id: string;
    location: string;
    pricePerPerson: number;
    currentPlayers: number;
    maxPlayers: number;
};

type OpenGamesProps = {
    games: Game[];
};

const OpenGames: React.FC<OpenGamesProps> = ({ games }) => {
    return (
        <div className="py-10">
            <h2 className="text-2xl font-bold mb-4">Available Games</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-2 border border-gray-200"
                    >
                        <div className="font-semibold text-lg">{game.location}</div>
                        <div className="text-gray-600">
                            Price per person: <span className="font-medium">${game.pricePerPerson}</span>
                        </div>
                        <div className="text-gray-600">
                            Spaces available:{" "}
                            <span className="font-medium">
                                {game.currentPlayers}/{game.maxPlayers} (
                                {game.maxPlayers - game.currentPlayers} spaces left)
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpenGames;