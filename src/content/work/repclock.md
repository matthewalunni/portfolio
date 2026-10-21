---
title: RepClock
publishDate: 2026-10-21 00:00:00
img: /assets/projects/repclock/banner.png
img_alt: Three RepClock screens showing the alarm list, a ringing alarm counting squats and the cleared alarm
description: |
  A workout alarm for iPhone. It rings until the camera has counted your reps, so the only way to turn it off is to get up.
tags:
  - Design
  - iOS
  - Swift
  - Next.js
---

I designed and built RepClock on my own, including the app, the App Store listing and the landing page.

[Website](https://repvaultapp.com/clock) · [App Store](https://apps.apple.com/app/id6818528707)

#### The problem

Every alarm can be swiped away half asleep. RepClock can't. It rings through silent mode and Focus, and the only way to stop it is to prop the phone up, step back and do the reps. The camera counts them, and the last rep ends the alarm. By then you're out of bed.

<p align="center">
  <img src="/portfolio/assets/projects/repclock/ringing.png" alt="RepClock ringing, with a body-pose skeleton and a flip counter at 7 of 20 squats" width="190" />
  <img src="/portfolio/assets/projects/repclock/movements.png" alt="RepClock movement picker with squats, push-ups, jumping jacks, burpees and kettlebell swings" width="190" />
  <img src="/portfolio/assets/projects/repclock/history.png" alt="RepClock history showing wake-up times and the on-time streak" width="190" />
</p>

#### Features

- Squats, push-ups, jumping jacks, burpees or kettlebell swings, with a rep count per alarm
- Teach it your own movement from a short video of three to six reps
- One five-minute snooze per alarm, and Skip today for the mornings you really can't. A skip is logged as a skip.
- Record the reps and share the clip with a sticker that counts them up
- History, an on-time streak, and a vault of ring styles, themes and badges to unlock

#### Design

The look is a printed flip clock: an ivory ground, black type and one volt green accent. The flip digits carry through from the alarm list to the rep counter to the "up in 1:02" screen, so the morning reads as one countdown. The two ways out are there on purpose. An alarm should be hard to dodge, not a trap.

<p align="center">
  <img src="/portfolio/assets/projects/repclock/share.png" alt="RepClock share screen with a clip of the reps and a sticker picker" width="240" />
</p>

#### What I did

- **Product, interface and brand design.** The flip-clock system, onboarding, the paywall and the App Store screenshots.
- **iOS app** in Swift and SwiftUI. Alarms are scheduled with AlarmKit so they ring like the system alarm, with a Live Activity while one is ringing.
- **On-device rep counting** with Apple's Vision body-pose detection. Camera footage never leaves the phone.
- **Landing page** in Next.js.
- **Subscriptions and a free trial** with RevenueCat.

#### Status

Live on the App Store as of October 2026.
