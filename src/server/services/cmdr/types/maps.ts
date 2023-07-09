import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { maps } from "shared/types/constants/maps";

export = function (registry: Registry) {
	registry.RegisterType("maps", registry.Cmdr.Util.MakeEnumType("maps", maps));
};
