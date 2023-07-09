import Roact, { Portal } from "@rbxts/roact"
import { Lighting } from "@rbxts/services"
import { Spring, useMotor, useMountEffect } from "@rbxts/pretty-roact-hooks"
import { useState } from "@rbxts/roact-hooked";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            blureffect: JSX.IntrinsicElement<BlurEffect>;
        }
    }
}

interface Props {
  text: string
}

function App(props: Props) {
  // I dont like this either... too bad!
  const [frameTransparency, setFrameTransparency] = useMotor(1)
  const [textTransparency, setTextTransparency] = useMotor(1)
  const [blur, setBlur] = useMotor(0)
  const [buttonActive, toggle] = useState(true)

  const hide = () => {
    setFrameTransparency(new Spring(1))
    setTextTransparency(new Spring(1))
    setBlur(new Spring(0))
    toggle(false)
  }

  useMountEffect(() => {
    setFrameTransparency(new Spring(0.5))
    setTextTransparency(new Spring(0))
    setBlur(new Spring(1))
    toggle(true)

    task.delay(8, hide)
  })

  return (
    <>
      <imagebutton
        Size={UDim2.fromScale(1, 1)}
        BackgroundTransparency={1}
        Modal={true}
        Visible={buttonActive}
        Event={{
          Activated: hide
        }}
      />
      <frame
        Size={UDim2.fromScale(1, 1)}
        BackgroundColor3={Color3.fromRGB(40, 40, 40)}
        Transparency={frameTransparency}
      >
        <textlabel 
          AnchorPoint={Vector2.one.mul(0.5)}
          Position={UDim2.fromScale(0.5, 0.5)}
          Size={UDim2.fromScale(0.6, 0.6)}
          TextScaled={true}
          Font={Enum.Font.GothamBold}
          BackgroundTransparency={1}
          Text={props.text}
          TextColor3={Color3.fromRGB(251, 241, 199)}
          TextTransparency={textTransparency}
        />
        <textlabel
          AnchorPoint={Vector2.one.mul(0.5)}
          Position={UDim2.fromScale(0.5, 0.90)}
          Size={UDim2.fromScale(0.3, 0.05)}
          TextScaled={true}
          Text={"click to remove announcement"}
          BackgroundTransparency={1}
          Font={Enum.Font.GothamBold}
          TextColor3={Color3.fromRGB(251, 241, 199)}
          TextTransparency={textTransparency}
        />
      </frame>

      <Portal
        target={Lighting}
      >
        <blureffect
          // yes im reusing text transparency cry about it
          Size={blur.map(b => b * 24)}
        />
      </Portal>
    </>
  )
}

export default App
