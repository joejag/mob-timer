# A Fork of the Pluralsight Mob Timer

The Pluralsight mob timer is quite excellent. But it assumes that you want to use a period of escallation before someone leaves the keyboard.

This fork removes that escallation period, to support this it also removes the alawys on top behaviour.

# Pluralsight Mob Timer
A cross-platform timer built on [Electron](http://electron.atom.io/)
for doing [Mob Programming](http://mobprogramming.org/)


# Development
Run `npm install` to get the dependencies, then `npm start` to run the timer. Run `npm test` to start the tests.

# Build
Run `npm run build`. Platform specific packages will be placed in the `dist` directory. If you need a platform other than Mac or Windows, modify the build script in the `package.json` file.

# Motivation
Pluralsight has a development team that does mob programming full-time,
and a few other teams dabble in mobbing as well.
We have tried and enjoyed a number of other mob timers, but we had various
(mostly minor) gripes with them.
So we decided to build one of our own.

We had a few goals:

* Make a timer that is hard to ignore, but also not overly annoying
* Implement escalating alerts
* Customization
* Have a timer that we can easily hack on, built with tech we know


# License

The Pluralsight Mob Timer is licensed under the [Apache 2.0 license](LICENSE).
