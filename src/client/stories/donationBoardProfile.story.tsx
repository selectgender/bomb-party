import Roact from "@rbxts/roact"
import { withHookDetection } from "@rbxts/roact-hooked"
import { Players } from "@rbxts/services"

interface Props {
  name: string  
  icon: string
  amount: number
}

function Profile(props: Props) {
  return (
    <frame
      AnchorPoint={Vector2.one.mul(0.5)}
      Position={UDim2.fromScale(0.5, 0.5)}
      Size={UDim2.fromScale(0.7, 0.3)}
      BackgroundColor3={Color3.fromRGB(189, 174, 147)}
    >
      <imagelabel
        AnchorPoint={Vector2.yAxis.mul(0.5)}
        Position={UDim2.fromScale(0.01, 0.5)}
        Size={UDim2.fromScale(0.2, 0.9)}
        Image={props.icon}
        BackgroundTransparency={1}
      >
        <uicorner CornerRadius={new UDim(1, 0)} />
        <uiaspectratioconstraint />
      </imagelabel>
      <textlabel 
        Size={UDim2.fromScale(0.8, 0.5)}
        Position={UDim2.fromScale(0.25, 0)}
        Text={props.name}
        TextXAlignment={Enum.TextXAlignment.Left}
        BorderSizePixel={0}
        TextScaled={true}
        Font={Enum.Font.GothamBold}
        BackgroundTransparency={1}
        TextColor3={Color3.fromRGB(251, 241, 199)}
      />
      <textlabel 
        Size={UDim2.fromScale(0.8, 0.5)}
        Position={UDim2.fromScale(0.25, 0.5)}
        Text={`${props.amount} R$`}
        TextXAlignment={Enum.TextXAlignment.Left}
        BorderSizePixel={0}
        TextScaled={true}
        Font={Enum.Font.GothamBold}
        BackgroundTransparency={1}
        TextColor3={Color3.fromRGB(251, 241, 199)}
      />
      <uicorner CornerRadius={new UDim(0.2, 0)} />
    </frame>
  )
}

export = (target: Instance) => {
  withHookDetection(Roact)
  const handle = Roact.mount(
    <Profile 
      name={"ivy"}
      icon={""}
      amount={100}
    />,
    target
  )

  return () => {
    Roact.unmount(handle) 
  }
}
