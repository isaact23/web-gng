## Backlog
* Sound FX
* Fix player movement behavior (going under arches, placing blocks under self, etc.)
* Reuse code between coordinate classes
* Remove error throwing from stringify methods (return null on fail)
* Move IPlayerMotor inside of IPlayer system
* Remove dispose() method in ClusterClient, add load and unload methods there instead of in Game
* Rename to Ravensquest
* Add in-game API calls to create in-game IOT w/ Venmo & Auth0 system
* Ragdolls, Drones & Robots, Planes, Fun stuff
* Add action queue
* Optimize Babylon out of serverside build

## 0.1.2

* TODO: Add authentication
* TODO: Completely revamp Player class
* TODO: Add avatars
* Removed lots of interfaces

## 0.1.1

* Implemented action system
* Changes in blocks are automatically synched between server and all clients

## 0.1.0

* Re-write grid system using generic parameters
* Serverside block storage
* Server sends block data to clients on logging in
* Shadows

## 0.0.4

* Fixed lines between blocks
* Improved top-down biome generation (inverse instead of logistic)

## 0.0.3

* Add complex terrain generation with logistic curves
* Add interpolation between biomes

## 0.0.2

* First version.
* Sinusoidal terrain generation
* Block placing / breaking
