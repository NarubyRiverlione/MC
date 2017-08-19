const Cnst = {
  Status: { idle: 'Idle' },

  LedColors: ['green', 'orange', 'red'],
  LedBackgroundColor: 'Gainsboro',

  Stations: { Radio: 'Radio', FireComputers: 'Fire Computers', Armory: 'Armory', LaunchStations: 'Launch Stations' },

  Ordnance: { AA: 'Anti Aircraft', G: ' Cruise Missle', AS: 'Anti Ship Missle', T: 'Torpedo', D: 'Defence' },

  Radio: {
    Actions: { store: 'STORE', decode: 'DECODE', erase: 'ERASE' },
    Busy: { store: 'storing', decode: 'decoding', erase: 'erasing', onSlot: ' on slot ' },
    Results: { store: 'Stored', decode: 'Decrypted', erase: 'Empty' },
    Time: {
      store: 2000, decode: 5000, erase: 1000, NewMessageTimeOut: 10000,
      NewIncomingMessageMax: 10000, NewIncomingMessageMin: 5000
    },
    Errors: {
      NoDecodeNothingStored: 'ERROR no msg stored to decode',
      NoStoreNoNewMsg: 'ERROR no msg to store',
      NewMessageTimedOut: 'ALERT! New orders where not followed'
    },
    Emit: {
      ChangedRadioStatus: 'ChangedRadioStatus', DoneCmd: 'RadioDoneCmd', SlotChanged: 'RadioSlotChanged',
      ChangeSlot: 'RadioChangeSlot', UpdateNewMessage: 'RadioUpdateNewMessage',
    }
  },

  FireComputers: {
    Name: { A: 'A', B: 'B' },
    Actions: { read: 'Read msg into FC ', send: 'Send mission to Launch Station' },
    Results: { read: 'Mission recieved', empty: 'Waiting for mission' },
    Time: { read: 5000, selectFC: 1000, send: 4000 },
    Errors: {
      NoMsg: 'ERROR: no msg availible', MsgNotDecoded: 'ERROR: msg not decoded',
      NoFCselected: 'ERROR: no FC is selected', NoMissionInSelectedFC: 'ERROR: no mission in selected FC'
    },
    Emit: {
      ChangedFCstatus: 'ChangedFCstatus', FCisReading: 'FCisReading', FCdoneReading: 'FCdoneReading',
      FCupdateStatus: 'FCupdateStatus', FCisSending: 'FCisSending', FCdoneSending: 'FCdoneSending'
    }
  },

  LaunchStations: {
    Name: { rails: 'Rails', VLT: 'Vertical Launch Tube', tubes: 'Tubes' },
    Numbers: { A: 'A', B: 'B', one: '1', two: '2', romanOn: 'I', romanTwo: 'II' },
    StatusColor: { empty: 2, loading: 1, loaded: 0 },
    Actions: { fire: 'F I R E', prepare: 'Prepare', remove: 'Remove', repair: 'Repair' },
    Results: { fire: 'Fired', prepare: 'Ready to launch', remove: 'Empty', repair: 'Repaired' },
    Emit: { selected: 'LSselected', fire: 'LSfiring' }
  },

  Armory: {
    Actions: { load: 'L O A D' },
    Emit: { selected: 'OrdnanceIsSelected', loading: 'OrdnanceStartLoading' }

  }

}

const ActionCnst = {
  Radio: { SelectSlot: 'RADIO_SELECT_SLOT', ExecuteCmd: 'RADIO_EXEC_CMD' },
  FireComputers: {
    SelectSlot: 'FIRECOMPUTERS_SELECT_SLOT', ReadMsg: 'FIRECOMPUTER_READ_MSG',
    SelectFireComputer: 'FIRECOMPUTERS_SELECT_FC', SendMission: 'FIRECOMPUTER_SEND_MISSION',
  },
  LaunchStations: {
    Prepare: 'LAUNCHSTATION_PREPARE', Remove: 'LAUNCHSTATION_REMOVE', Repair: 'LAUNCHSTATION_REPAIR',
    Select: 'LAUNCHSTATION_SELECT'
  },
  Armory: {
    Select: 'ARMORY_SELECT', Load: 'ARMORY_LOAD'
  }
}

export { Cnst, ActionCnst }