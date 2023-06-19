import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { maps } from "shared/types/constants/maps";

// yes.. you have to do this manually bc you can't reference stuff frmo the serverstorage from the client..

export = function (registry: Registry) {
	registry.RegisterType("maps", registry.Cmdr.Util.MakeEnumType("maps", maps));
};
