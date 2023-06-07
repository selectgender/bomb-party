import { TypeDefinition, Registry } from "@rbxts/cmdr";

// yes.. you have to do this manually bc you can't reference stuff frmo the serverstorage from the client..
const maps = [
  "voxel",
  "desert",
  "frostburn",
  "peaks",

  // none bc sometimes you dont want one
  "none"
]

export = function ( registry: Registry ) {
    registry.RegisterType( "maps", registry.Cmdr.Util.MakeEnumType( "maps", maps ) )
}
