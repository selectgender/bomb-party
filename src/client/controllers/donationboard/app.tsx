import Roact from "@rbxts/roact"
import Leaderboard from "./leaderboard"
import Donate from "./donate"
import { useState } from "@rbxts/roact-hooked"

type Pages = "Donate" | "Leaderboard"

function App() {
  const [page, setPage] = useState<Pages>("Donate")

  const getPageComponent = () => {
    if (page === "Donate") return <Donate />
    else if (page === "Leaderboard") return <Leaderboard />
    else 
      return (
        <scrollingframe
          Size={UDim2.fromScale(0.8, 0.8)}
          AnchorPoint={Vector2.one.mul(0.5)}
          Position={UDim2.fromScale(0.5, 0.5)}
          BackgroundTransparency={1}
          BorderSizePixel={0}
        >
          <textlabel 
            Text={"this apparently didnt load.. and im too lazy to style this haha"} 
            Size={UDim2.fromScale(1, 0.1)}
          />
        </scrollingframe>
      )
  }

  const inversePage = () => {
    if (page === "Donate") return "Leaderboard"
    else if (page === "Leaderboard") return "Donate"
    else return "Leaderboard"
  }

  return (
    <frame
      Size={UDim2.fromScale(1, 1)}
      BackgroundColor3={Color3.fromRGB(255, 255, 255)}
      BorderSizePixel={0}
    >
      <textlabel 
        Size={UDim2.fromScale(1, 0.1)}
        TextScaled={true}
        Font={Enum.Font.GothamBold}
        Text={"Donations"}
        BackgroundTransparency={1}
        TextColor3={Color3.fromRGB(40, 40, 40)}
      />

      {getPageComponent()}

      <textbutton 
        AnchorPoint={Vector2.xAxis.mul(0.5)}
        Size={UDim2.fromScale(0.8, 0.1)}
        Position={UDim2.fromScale(0.5, 0.9)}
        TextScaled={true}
        Font={Enum.Font.GothamBold}
        Text={inversePage()}
        BackgroundColor3={Color3.fromRGB(213, 196, 161)}
        Event={{
          Activated: () => {
            if (page === "Leaderboard") setPage("Donate")
            else if (page === "Donate") setPage("Leaderboard")
            else {
              warn("apparently the page doesnt align with the type??")
              setPage("Leaderboard")
            }
          }
        }}
      >
        <uicorner CornerRadius={new UDim(0.2, 0)} />
      </textbutton>
      <uigradient
        Rotation={90}
        Color={
          new ColorSequence([
            new ColorSequenceKeypoint(0, Color3.fromRGB(251, 241, 199)),
            new ColorSequenceKeypoint(1, Color3.fromRGB(213, 196, 161))
          ])
        }
      />
    </frame>
  )
}

export default App
