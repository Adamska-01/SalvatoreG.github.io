---
title: Army's Heaven
summary: Online first person shooter.
dateRange: 2022 - Present
order: 2
group: Solo Projects
preview: ../../assets/PersonalProjects/ArmysHeaven/Preview.png
images:
  - ../../assets/PersonalProjects/ArmysHeaven/1.png
  - ../../assets/PersonalProjects/ArmysHeaven/2.png
  - ../../assets/PersonalProjects/ArmysHeaven/3.png
  - ../../assets/PersonalProjects/ArmysHeaven/4.png
  - ../../assets/PersonalProjects/ArmysHeaven/5.png
  - ../../assets/PersonalProjects/ArmysHeaven/6.png
  - ../../assets/PersonalProjects/ArmysHeaven/7.png
videos:
  - title: Video Update
    youtubeId: _yTgHGTRmaQ
  - title: Video Demonstration
    youtubeId: iTvzLS9thS4
technologies:
  - C_Sharp
  - Unity
  - Photon
links:
  - text: GitHub
    href: https://github.com/Adamska-01/Online_FPS
  - text: Itch.io
    href: https://salvg.itch.io/armys-heaven
---

**Army's Heaven** is a first-person shooter project featuring both single-player and multiplayer modes. Initially developed with **PUN2 (Photon Unity Package)** for online gameplay, the project has since expanded to include a single-player campaign designed to demonstrate the newly added gameplay systems.

Recent development efforts have focused on building a high-quality single-player experience. The project now features:

- **Custom FPS Controller** — Built from the ground up for responsive movement, fluid aiming, and modular input handling.
- **AI Behavior System** — Finite state machine–driven enemy agents with support for path finding, perception, combat states, and dynamic reactions to the player.
- **Ragdoll Reanimation** — A ragdoll-to-animation blending system that allows NPCs to seamlessly stand up after being knocked down, preserving bone pose and orientation.
- **Damage-Based Animation Layering** — AI character animations adapt dynamically based on damaged body parts (e.g. limping when legs are injured), leveraging Unity's animation system.
- **Inventory and Item System** — ScriptableObject-based inventory architecture supporting pickups, weapon management, and UI feedback.
- **Editor Tooling** — A custom inspector tool for visualizing and editing AI patrol waypoints directly in the Unity Editor, improving iteration speed and level design workflow.

The ultimate goal is to merge these refined single-player systems back into the multiplayer online version, ensuring both modes benefit from the same polished mechanics.