import { lerp, Linear, Spring, useMotor, useMountEffect } from "@rbxts/pretty-roact-hooks"
import Roact from "@rbxts/roact"

const meterImageId = "13604233861"
const arrowImageId = "4862800922"

const difficultyPositions = [
  UDim2.fromScale(0.23, 0.83),
  UDim2.fromScale(0.2, 0.82),
  UDim2.fromScale(0.16, 0.8),
  UDim2.fromScale(0.11, 0.77),
  UDim2.fromScale(0.065, 0.75)
]

interface Props {
  difficulty: number
}

function App(props: Props) {
  // just a number bc we need pretty tweens :)
  const initialPosition = difficultyPositions[0]
  const difficulty = math.max(props.difficulty, 1)

  const initialArrowColor = Color3.fromRGB(255, 255, 255)
  const overflowArrowColor = Color3.fromRGB(232, 23, 96)

  const springSettings = {
      frequency: 2,
      dampingRatio: 0.75
  }

  const [enabled, toggle] = useMotor(0)
  const [arrowColor, setArrowColor] = useMotor(0)
  const [arrowPosition, setArrowPosition] = useMotor({ 
    x: initialPosition.X.Scale,
    y: initialPosition.Y.Scale 
  })

  function normal() {
    task.wait(1)

    const newPosition = difficultyPositions[difficulty - 1]
    setArrowPosition({
      x: new Spring(newPosition.X.Scale, springSettings),
      y: new Spring(newPosition.Y.Scale, springSettings),
    })
  }

  function overflow() {
    task.wait(1)

    const pressurizedSettings = {
      frequency: 5,
      dampingRatio: 0.5
    }

    // 5-1 is necessary for clarity
    const final = difficultyPositions[5 - 1]
    const initial = difficultyPositions[1 - 1]

    const initialPosition = () => 
      setArrowPosition({
        x: new Spring(initial.X.Scale, springSettings),
        y: new Spring(initial.Y.Scale, springSettings),
      })

    const finalPosition = () => 
      setArrowPosition({
        x: new Spring(final.X.Scale, pressurizedSettings),
        y: new Spring(final.Y.Scale, pressurizedSettings),
      })

    finalPosition()
    task.wait(1)
    initialPosition()
    task.wait(1)
    finalPosition()
    task.wait(1)
    initialPosition()
    task.wait(1)
    setArrowPosition({
      x: new Spring(0.035, pressurizedSettings),
      y: new Spring(0.75, pressurizedSettings),
    })
    setArrowColor(new Linear(1))
  }

  useMountEffect(() => {
    new Promise((resolve) => {
      toggle(new Spring(1, springSettings))
      resolve(undefined)
    })
      .then(() => difficulty > 5 ? overflow() : normal())
      .then(() => {
        task.wait(4)
        toggle(new Spring(0, springSettings))
      })
  })

  return (
    <>
      <imagelabel 
        AnchorPoint={Vector2.one.mul(0.5)}
        Position={arrowPosition.map(t => UDim2.fromScale(t.x, t.y))}
        Size={enabled.map(t => UDim2.fromScale(t * 0.04, 0.05))}

        ImageColor3={
          arrowColor.map(
            t => Color3.fromRGB(
              lerp(initialArrowColor.R * 255, overflowArrowColor.R * 255, t), 
              lerp(initialArrowColor.G * 255, overflowArrowColor.G * 255, t), 
              lerp(initialArrowColor.B * 255, overflowArrowColor.B * 255, t)
            )
          )
        }

        Image={`http://www.roblox.com/asset/?id=${arrowImageId}`}
        Rotation={180}
        BackgroundTransparency={1}
        ZIndex={2}
      />

      <imagelabel 
        Image={`http://www.roblox.com/asset/?id=${meterImageId}`}
        BackgroundTransparency={1}
        AnchorPoint={new Vector2(0.5, 1)}
        Position={UDim2.fromScale(0.13, 0.99)}
        Size={enabled.map(t => UDim2.fromScale(t * 0.25, 0.25))}
      />
    </>
  )
}

export default App
