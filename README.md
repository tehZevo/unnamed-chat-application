# Unnamed Chat Application

## TODO
- database (sequelize + sqlite3)
  - uuid for message/channel ids
- unit tests because those are cool
- typescript
- hashicon-like fingerprint validation on frontend
- permissions system
- voice/video chat
- https://sequelize.org/docs/v6/other-topics/transactions/
- dockerfile / docker compose example

## Ideas/vision
- accounts are just pubkeys
- server has a root channel which can have subchannels

### channels
- can have subchannels
- can have text enabled/disabled
- can have voice/video enabled/disabled
- have ids
- create channel
- delete channel
- move channel (set new parent; not applicable for the root channel)
- merge channels (interleave messages)
- modify channel visibility/permissions

### messages
- have content
- have attachments
- create message
- delete own messages
- edit messages
- delete others' messages
- reactions

### client-side config
- encrypted private key for "offline" storage
- profile data (name, bio, etc)
- server list
- ability to export
- ability to store some of this on server(s)?

### servers
- servers can have admins
  - editable using config file
