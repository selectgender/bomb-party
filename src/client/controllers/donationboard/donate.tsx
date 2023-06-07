import Roact from "@rbxts/roact"
import { donationOptions } from "shared/types/constants/donationOptions"
import { MarketplaceService, Players } from "@rbxts/services"

interface ButtonProps {
  amount: number
  placement: number
  productId: number
}

const player = Players.LocalPlayer

function Button(props: ButtonProps) {
  return (
    <textbutton 
      Size={UDim2.fromScale(0.8, 0.05)}
      AnchorPoint={Vector2.xAxis.mul(0.5)}
      Position={UDim2.fromScale(0.5, 0.06 * props.placement)}
      Text={`${props.amount} R$`}
      TextScaled={true}
      Font={Enum.Font.GothamBold}
      BackgroundColor3={Color3.fromRGB(213, 196, 161)}
      Event={{
        Activated: () => MarketplaceService.PromptProductPurchase(player, props.productId)
      }}
    >
      <uicorner 
        CornerRadius={new UDim(0.2, 0)}
      />
    </textbutton>
  )
}

function Donate() {
  const buttons: Roact.Element[] = []
  for (const [index, option] of ipairs(donationOptions)) {
    print(index)
    buttons.push(
      <Button 
        amount={option.amount} 
        placement={index - 1}
        productId={option.id}
      />
    )
  }

  return (
    <scrollingframe
      Size={UDim2.fromScale(0.8, 0.8)}
      AnchorPoint={Vector2.one.mul(0.5)}
      Position={UDim2.fromScale(0.5, 0.5)}
      BackgroundTransparency={1}
      BorderSizePixel={0}
    >
      {buttons}
    </scrollingframe>
  ) 
}

export default Donate
