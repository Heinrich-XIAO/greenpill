import { CH32V003F4P6 } from "@tsci/Heinrich-XIAO.CH32V003F4P6"
import { usePushButton } from "@tsci/seveibar.push-button"
import type { ChipProps } from "@tscircuit/props"

interface Props extends ChipProps {
  name: string
  resetButton?: boolean
  jumper?: boolean
  powerLED?: boolean
  VDD: string[]
  VSS: string[]
  PD4: string[] // pin1
  PD5: string[] // pin2
  PD6: string[] // pin3
  PD7: string[] // pin4
  PA1: string[] // pin5
  PA2: string[] // pin6
  // GND is in pin7
  PD0: string[] // pin8
  // VDD is in pin 9
  PC0: string[] // pin10
  PC1: string[] // pin11
  PC2: string[] // pin12
  PC3: string[] // pin13
  PC4: string[] // pin14
  PC5: string[] // pin15
  PC6: string[] // pin16
  PC7: string[] // pin17
  PD1: string[] // pin18
  PD2: string[] // pin19
  PD3: string[] // pin20
}

export default ({
  name,
  resetButton = true,
  jumper = true,
  powerLED = true,
  ...props
}: Props) => {
  const ResetButton = usePushButton("SW1")

  return (
    <board>
      <CH32V003F4P6
        name="U1"
        pcbRotation={90}
        connections={{
          VDD: ["net.VDD", ...props.VDD],
          VSS: ["net.GND", ...props.VSS],
          pin2: ["net.BOARD_TX", ...props.PD5],
          pin3: ["net.BOARD_RX", ...props.PD6],
          pin4: ["net.RST", ...props.PD7],
          pin18: ["net.SWIO", ...props.PD1],
          pin1: props.PD4,
          pin5: props.PA1,
          pin6: props.PA2,
          pin7: props.VSS,
          pin8: props.PD0,
          pin9: props.VDD,
          pin10: props.PC0,
          pin11: props.PC1,
          pin12: props.PC2,
          pin13: props.PC3,
          pin14: props.PC4,
          pin15: props.PC5,
          pin16: props.PC6,
          pin17: props.PC7,
          pin19: props.PD2,
          pin20: props.PD3,
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

      {powerLED && (
        <group name="power_led">
          <resistor
            name="R2"
            resistance="1k"
            footprint="0603"
            connections={{
              pos: "net.VDD",
              neg: ".LED_PWR > .pos",
            }}
            pcbX={9}
            pcbY={-3}
          />
          <led
            name="LED_PWR"
            color="green"
            footprint="0603"
            connections={{
              pos: ".R2 > .neg",
              neg: "net.GND",
            }}
            pcbX={9}
            pcbY={-6}
            pcbRotation={180}
          />
        </group>
      )}
    </board>
  )
}

