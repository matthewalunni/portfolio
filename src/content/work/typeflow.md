---
title: Typeflow
publishDate: 2026-08-19 00:00:00
img: /assets/projects/typeflow/banner.png
img_alt: Typeflow, AI in every app, right where you type
description: |
  An AI keyboard for iPhone and a command layer for Mac. Type or speak what you need and the draft lands in the field you're already in.
tags:
  - Design
  - iOS
  - macOS
  - Swift
  - Next.js
---

I designed and built Typeflow on my own, from the first sketch to the App Store listing and the Product Hunt launch.

[Website](https://gettypeflow.app) · [App Store](https://apps.apple.com/app/id6772824988)

#### The problem

I was switching to a chat app dozens of times a day. Write an email, leave the app, prompt, copy, come back, paste. Then do it again in Slack, and again in Notes. Typeflow removes the round trip.

#### How it works

- **On iPhone it's a keyboard.** Switch to it in any app, type or speak a prompt, and the response is typed straight into the field.
- **On Mac it's a shortcut.** Press ⌥Space anywhere and a card opens at your cursor.
- **On Mac it reads the window you're in.** "Reply and keep it short" already knows what you're replying to, so you never paste the thread in.
- **Snippets.** Save a prompt once as a slash command like `/fix` or `/reply`, then fire it from any text field. They sync over CloudKit.

<img src="/portfolio/assets/projects/typeflow/board-03.png" alt="Typeflow card open over a Mail compose window on Mac" />

<img src="/portfolio/assets/projects/typeflow/board-02.png" alt="Typeflow reading a Slack message and drafting a reply" />

<img src="/portfolio/assets/projects/typeflow/board-04.png" alt="Typeflow snippets shown as slash commands above the iOS keyboard" />

#### What I did

- **Product and interface design.** The keyboard, the Mac card, onboarding, the paywall and settings.
- **iOS app and keyboard extension** in Swift and SwiftUI, with dictation and streaming responses.
- **Mac app** with system-wide text injection through the Accessibility API, including compatibility work for Electron apps.
- **Landing page and backend** in Next.js.
- **Subscriptions and trials** with RevenueCat, and the activation and conversion funnel instrumented in PostHog.
- **Launch.** Product Hunt gallery, launch videos made in Remotion, and getting the keyboard extension through App Store review.

#### Status

The iOS app is live on the App Store. The Mac app is a public beta.
