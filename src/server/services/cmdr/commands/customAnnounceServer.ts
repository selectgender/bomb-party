import { CommandContext } from "@rbxts/cmdr";
import { Events } from "server/network";

export = (_: CommandContext, announcement: string) => Events.announcement.broadcast(announcement)
