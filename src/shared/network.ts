import { Networking } from "@flamework/networking";
import { DonationBoardData } from "shared/types/interfaces/donationBoardData";

type DonationBoardPacket = DonationBoardData[];

// if literally anything needs to be in here we have a problem
interface ServerEvents {}

// Server -> Client events
interface ClientEvents {
	announcement: (text: string) => void;
	difficultyChange: (difficulty: number) => void;
	donationBoardRefresh: (packet: DonationBoardPacket) => void;
}

// im not repeating myself... DONT PUT ANYTHING IN HERE
// ESPEEEEECIALLY HERE
interface ServerFunctions {}

// Server -> Client functions
interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
