import { CH32V003F4P6 } from "@tsci/Heinrich-XIAO.CH32V003F4P6"
import { usePushButton } from "@tsci/seveibar.push-button"
import type { CommonLayoutProps } from "@tscircuit/props"

interface Props extends CommonLayoutProps {
  name: string
  resetButton?: boolean
  jumper?: boolean
  crystal?: boolean
}

// TODO: Add crystal oscillator

export default ({
  name,
  resetButton = true,
  jumper = true,
  ...props
}: Props) => {
  const ResetButton = usePushButton("SW1")

  return (
    <board>
      <CH32V003F4P6
        name="U1"
        pcbRotation={90}
        connections={{
          VDD: "net.VDD",
          VSS: "net.GND",
          pin2: "net.BOARD_TX",
          pin3: "net.BOARD_RX",
          pin4: "net.RST",
          pin18: "net.SWIO",
        }}
      />

      {/* Jumpers */}
      {jumper && (
        <jumper
          name="J1"
          footprint="pinrow5"
          connections={{
            pin1: "net.GND",
            pin2: "net.RST",
            pin3: "net.SWIO",
            pin4: "net.BOARD_TX",
            pin5: "net.BOARD_RX",
          }}
          pcbX={3}
          pcbY={7}
        />
      )}

      {/* Pullup Resistors */}
      <resistor
        name="R1"
        footprint="0603"
        resistance={100000}
        connections={{
          pos: "net.VDD",
          neg: "net.BOARD_RX",
        }}
        pcbRotation={-90}
        pcbX={10}
        pcbY={2}
      />

      {/* Decoupling Capacitors */}
      <capacitor
        name="C1"
        capacitance="100n"
        connections={{
          anode: "net.VDD",
          cathode: "net.GND",
        }}
        footprint="0603"
        pcbRotation={-90}
        pcbX={7}
        pcbY={2}
      />

      {/* Reset switch */}
      {resetButton && (
        <group name="reset_button">
          <ResetButton
            name="SW1"
            pin1="net.GND"
            pin2="net.RST"
            pcbX={2}
            pcbY={-10}
          />
          <capacitor
            name="C2"
            capacitance="100n"
            connections={{
              anode: "net.RST",
              cathode: "net.GND",
            }}
            footprint="0603"
            pcbRotation={180}
            pcbX={2}
            pcbY={-5}
          />
        </group>
      )}
    </board>
  )
}

