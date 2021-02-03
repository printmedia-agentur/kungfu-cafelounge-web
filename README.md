<div align="center"><img src="https://assets.dmnktoe.de/__ext/healform/healform_logo_wide.png" width="400"></div>
<br><br>

<p align="center"><img alt="Discord" src="https://img.shields.io/discord/547850652479520769.svg?color=4cb697&label=chat"> <img alt="undefined" src="https://img.shields.io/github/languages/top/dmnktoe/myhealform.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/github/languages/code-size/dmnktoe/myhealform.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/github/issues-raw/dmnktoe/myhealform.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/github/issues-closed-raw/dmnktoe/myhealform.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/website-up-down-green-red/https/my.healform.de/app/.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/uptimerobot/ratio/m780919962-c16c97a6b6140da7034f481f.svg?label=server-uptime&style=flat"> <img alt="undefined" src="https://img.shields.io/uptimerobot/ratio/m782108295-5097c2c223de2e943f8f7760.svg?label=api-uptime&style=flat"> <img alt="undefined" src="https://img.shields.io/github/package-json/v/dmnktoe/myhealform.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/github/release/dmnktoe/myhealform.svg?style=flat"> <img alt="undefined" src="https://img.shields.io/github/license/dmnktoe/myhealform.svg?style=flat"> </p>

<hr>

# KungFu Cafelounge

Die erste original Cryosauna / Kältekammer in Kassel und Baunatal gilt als eine der weltweit modernsten physikalischen Therapiemöglichkeiten für Gesundheit, Fitness, Leistungsfähigkeit und Schönheit!

Including frontend-client optimzed for web as a web-app, backend-server and the official macOS app.

## Overview

### Usage

Sign-up for a new account is the easiest way to start scheduling and managing your appointments.

### Features

**Elementary functions to-do list:**

- [ ] Book appointment (w/ payment gate)
- [ ] Certificate shop (w/ payment gate)
- [ ] Reschedule possibility **(in progress)**
- [ ] Stripe & PayPal integration
- [x] View appointment by :id
- [ ] Buy coupons
- [ ] Cancel appointment **(in progress)**
- [ ] E-Mail account verification **(in progress)**
- - [ ] Resend account verification email **(in progress)**
- [ ] Create user in Acuity during user register

**Future roadmap:**

- [ ] 2-Factor-Authorization
- [ ] Update profile
- [ ] Avatar
- [ ] Mailchimp & Intercom integration
- [ ] Twilio phone number verification
- [ ] Create user in Intercom during user register
- [ ] better error handling through flash messages
- [ ] confirm account in frontend
- [ ] email template
- [ ] loading indicator

**Bugs**

- [ ] confirm mail OR phone - only one info message gets displayed
- [ ] flash messages not in container
- [ ] display something when there are no items available
- many functions getting called 3 or 4 times
- - [ ] dashboard api
- - [ ] reactive form
- [ ] avatar and flash messages dont get updated after logout (and new log-in)
- - [ ] avatar: no gravatar
- [ ] login logout behavior
