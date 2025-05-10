docs.md

# Name: Caleb Basnight

# Rhythm Reactor Final Project Documentation for CSC 2463

## Project Overview & Description

    Rhythm Reactor is an interactive browser-based rhythm game that uses a physical Arduino interface (buttons and LEDs) connected via Web Serial. The player must press the correct button in time with visual and audio cues, testing their timing and rhythm. This hybrid of physical computing and web-based interactivity showcases creative coding, audio programming with Tone.js, and microcontroller integration.

    In Rhythm Reactor, beats appear in cycles of four. LEDs light up to signal which beat is active, and the user must press the corresponding physical button in sync. Points and combos are scored based on how well the player hits the beats. On the software side, a p5.js sketch handles the visuals, scoring, and  communication with an Arduino over the Web Serial API. Sound playback is handled by Tone.js.

## Interface & Circuit Overview

    Browser Interface (p5.js):

        4 on-screen circles represent beats.

        Button to connect to Arduino.

        Button to test sound functionality.

        Display for score and combo count.

    Arduino Hardware Setup:

        Inputs: 4 push buttons (connected to pins 2, 3, 4, 5)

        Outputs: 4 LEDs (connected to pins 8, 9, 10, 11)

        Communication: Serial over USB at 9600 baud

    Text Description of Schematics:

        Each button pin is connected with input resistors.

        Each LED is connected in series with a resistor to its respective digital pin.

        Arduino sends "B0" to "B3" when a button is pressed.

        Browser sends "L0" to "L3" to light up corresponding LEDs.

