import { Registry } from "@rbxts/cmdr";

const whitelist = [
	3814464357, // me
	543918313, // pop
	205465430, // red
];

export = (registry: Registry) => {
	registry.RegisterHook("BeforeRun", (context) => {
		if (!whitelist.includes(context.Executor.UserId)) return "good try sneaky little gremlin";
	});
};
