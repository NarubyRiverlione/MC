const Cnst = {
  Status: { idle: 'Idle' },

  Stations: { Radio: 'Radio', FireComputers: 'Fire Computers', Armory: 'Armory', LaunchStations: 'Launch Stations' },

  Ordnance: { AA: 'Anti A ircraft', G: ' Cruise Missle', AS: 'Anti Ship Missle', T: 'Torpedo', D: 'Defence' },

  Radio: {
    Actions: { store: 'STORE', decode: 'DECODE', erase: 'ERASE' },
    Busy:{ store: 'storing', decode: 'decoding', erase: 'erasing',onSlot:' on slot '},
    Results: { store: 'Stored', decode: 'Decrypted', erase: 'Empty' },
    Time: {
      store: 2000, decode: 5000, erase: 1000, NewMessageTimeOut: 10000,
      NewIncomingMessageMax: 10000, NewIncomingMessageMin: 5000
    },
    Errors: {
      NoDecodeNothingStored: 'ERROR no msg stored to decode',
      NoStoreNoNewMsg: 'ERROR no msg to store',
      NewMessageTimedOut:'ALERT! New orders where not followed'
    }
  },

  FireComputers: {
    Name: { A: 'A', B: 'B' },
    Actions: { read: 'Insert msg', send: 'Send mission to Launch Station' },
    Results: { read: 'Mission recieved' }
  }


}

const ActionCnst = {
  Radio: { SelectSlot: 'RADIO_SELECT_SLOT', ExecuteCmd: 'RADIO_EXEC_CMD' }
}

export { Cnst, ActionCnst }