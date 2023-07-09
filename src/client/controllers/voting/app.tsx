import { useEventListener, useMotor, useMountEffect } from "@rbxts/pretty-roact-hooks";
import Roact, { Portal } from "@rbxts/roact"
import { useMemo, useState } from "@rbxts/roact-hooked";
import { Workspace } from "@rbxts/services"
import { Events } from "client/network";

type Display = Model & {
    Part: Part;
    image: Part;
    mapname: Part;
    votecounter: Part;
}

interface VotingProps {
    display: number
}

function Voting(props: VotingProps) {
    const voting = Workspace.lobby.voting

    // I dont wanna call findfirstchild one million times okay....
    const display = useMemo(() => voting.FindFirstChild(`board${props.display}`), [props.display]) as Display

    const [id, setId] = useState(7279137093)
    const [map, setMap] = useState("how do i type")
    const [voteCount, setVoteCount] = useState(0)

    useEventListener(Events.votingReducer, (action) => {
        if (action.type === "clearVisuals") {
            setId(7279137093)
            setMap("how do i type")
            setVoteCount(0)
        } else if (action.type === "displayOption") {
            if (props.display !== action.option) return
            setId(action.image)
            setMap(action.name)
        } else if (action.type === "setVoteCount") {
            if (props.display !== action.option) return
            setVoteCount(action.votes)
        } else if (action.type === "displayVoted") {
            print("WIP haha")
        }
    })

    return (
        <>
            <Portal
                target={display.image}
            >
                <surfacegui
                    Face={"Right"}
                >
                    <imagelabel
                        Size={UDim2.fromScale(1, 1)}
                        BackgroundTransparency={1}
                        Image={`rbxassetid://${id}`}
                    />
                    <textlabel
                        Size={UDim2.fromScale(0.2, 0.4)}
                        AnchorPoint={Vector2.one.mul(0.5)}
                        Position={UDim2.fromScale(0.5, 0.5)}
                        BackgroundTransparency={1}
                        Text={`${voteCount}`}
                        TextScaled={true}
                        Font={Enum.Font.GothamBold}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                    >
                        <uistroke
                            Thickness={5}
                        />
                    </textlabel>
                </surfacegui>
            </Portal>
            <Portal
                target={display.mapname}
            >
                <surfacegui
                    Face={"Right"}
                >
                    <textlabel
                        Size={UDim2.fromScale(1, 0.2)}
                        Position={UDim2.fromScale(0, 0.05)}
                        BackgroundTransparency={1}
                        Text={map}
                        TextScaled={true}
                        Font={Enum.Font.GothamBold}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                    >
                        <uistroke
                            Thickness={5}
                        />
                    </textlabel>
                </surfacegui>
            </Portal>
        </>
    )
}


function App() {
    return (
        <>
            <Voting display={1} />
            <Voting display={2} />
            <Voting display={3} />
        </>
    )
}

export default App
