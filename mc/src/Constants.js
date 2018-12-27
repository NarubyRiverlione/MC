const Cnst = {
  Status: { Idle: 'Idle' },
  LedColors: ['green', 'orange', 'red', 'blue'],
  LedBackgroundColor: 'Gainsboro',

  Stations: {
    Radio: 'Radio', FireComputers: 'Fire Computers', Armory: 'Armory', LaunchStations: 'Launch Stations',
  },
  Ordnance: {
    AA: 'Anti Aircraft', G: ' Cruise missile', AS: 'Anti Ship missile', T: 'Torpedo', D: 'Defence',
  },
  Game: {
    Time: {
      FirstMsg: 2000,
      NewMessageTimeOut: 10000,
      NewIncomingMessageMax: 30000,
      NewIncomingMessageMin: 15000,
    },
    Missions: {
      IDMax: 10,
      IDMin: 0,
      Targets: [' A', ' B', ' C', ' D', ' E', ' F', ' G', ' H', ' I', ' J', ' K', ' L', ' M', ' N', ' O', ' P', ' Q', ' R', ' T', ' S', ' V', ' W'],
      Type: ['Aircraft Attack', 'Ground Attack', 'Ship Attack', 'Submarine Attack'],
    },
  },
  Radio: {
    Actions: { store: 'STORE', decode: 'DECODE', erase: 'ERASE' },
    Busy: {
      store: 'storing', decode: 'decoding', erase: 'erasing', onSlot: ' on slot ',
    },
    Results: { store: 'Stored', decode: 'Decrypted', erase: 'Empty' },
    Time: {
      store: 2000, decode: 5000, erase: 1000, ShowError: 5000,
    },
    Errors: {
      SlotNotEmpty: 'ERR slot is not empty',
      NoDecodeNothingStored: 'ERR no msg stored to decode',
      NoStoreNoNewMsg: 'ERR no msg to store',
      NewMessageTimedOut: 'ALERT! New orders where not followed',
    },
    // Emit: {
    //   ChangedRadioStatus: 'ChangedRadioStatus',
    //   DoneCmd: 'RadioDoneCmd',
    //   SlotChanged: 'RadioSlotChanged',
    //   UpdateNewMessage: 'RadioUpdateNewMessage',
    // },
  },
  FireComputers: {
    Name: { A: 'A', B: 'B' },
    Actions: { read: 'Read msg into FC ', send: 'Send mission to Launch Station' },
    Results: { read: 'Received: ', empty: 'Waiting for mission' },
    Time: {
      read: 5000, selectFC: 1000, send: 4000, error: 5000,
    },
    Errors: {
      NoMsg: 'ERROR: no msg available',
      MsgNotDecoded: 'ERROR: msg not decoded',
      NoFCselected: 'ERROR: no FC is selected',
      NoMissionInSelectedFC: 'ERROR: no mission in selected FC',
      CannotSend: 'ERROR: cannot sent mission to Launch Station',
    },
    // Emit: {
    //   ChangedFCstatus: 'ChangedFCstatus',
    //   FCisReading: 'FCisReading',
    //   FCdoneReading: 'FCdoneReading',
    //   FCupdateStatus: 'FCupdateStatus',
    //   FCisSending: 'FCisSending',
    //   FCdoneSending: 'FCdoneSending',
    //   msgSlotChanged: 'FCmsgSlotChanged',
    // },
  },
  LaunchStations: {
    Name: { rails: 'Rails', VLT: 'Vertical Launch Tube', tubes: 'Tubes' },
    Numbers: {
      A: 'A', B: 'B', one: '1', two: '2', romanOn: 'I', romanTwo: 'II',
    },
    StatusColor: {
      empty: 2, loading: 1, loaded: 0, removing: 3,
    },
    Actions: {
      fire: 'F I R E', prepare: 'Prepare', remove: 'Remove', repair: 'Repair',
    },
    Results: {
      fire: 'Fired', prepare: 'Ready to launch', remove: 'Empty', repair: 'Repaired',
    },
    // Emit: {
    //   selected: 'LSselected',
    //   fire: 'LSfiring',
    //   ChangedSelectedStatus: 'LSselecedStatusChanged',
    //   startLoading: 'LSstartLoading',
    //   doneLoading: 'LSdoneLoading',
    //   startRemoving: 'LSstartRemoving',
    //   doneRemoving: 'LSdoneRemoving',
    //   startPreparing: 'LSstartPreparing',
    // },
    Errors: {
      WrongLaunchStation: {
        AA: 'ERROR: Anti Air needs a rail selected',
        AS: 'ERROR: Anti Ship needs a rail selected',
        G: 'ERROR: Ground Missile needs a VLT selected',
        T: 'ERROR: Torpedo needs a Tube selected',
      },
      SelectedLSnotEmpty: 'ERROR: selected Launch Station not empty',
      NoLSselected: 'ERROR: no Launch Station selected',
      NoRemoveOfEmpty: 'ERROR: Launch Station is already empty',
      WrongLSforMission: 'ERROR: wrong Launch Station selected for this mission',
      LSisEmpty: 'ERROR Launch Station is not loaded',
    },
    Time: {
      Error: 4000, removing: 7000, loading: 5000, preparing: 4000,
    },
  },
  Armory: {
    Actions: { load: 'L O A D', loading: 'Loading into Launch Station' },
    Emit: {
      selected: 'OrdnanceIsSelected',
      loading: 'OrdnanceStartLoading',
      ChangedArmoryStatus: 'ChangedArmoryStatus',
      changeAmount: 'ArmoryChangeAmount',
    },
    Errors: {
      WrongLaunchStation: 'ERROR: Wrong Launch Station selected',
      NoOrdnanceSelected: 'ERROR: no ordnance selected',
      SelectedLSnotEmpty: 'ERROR: cannot load',
      NoLSselected: 'ERROR: no Launch Station selected',
      OrdnanceOutOfStock: 'ERROR: Ordnance out of stock',
    },
    Time: {
      ShowError: 6000, StartLoading: 1000, NoOrdnanceSelected: 4000, OrdnanceOutOfStock: 4000,
    },
  },

}

const ActionCnst = {
  Game: {
    StartTimerNewMessage: 'START_NEW_MSG_TIMER_GAME',
    StoreMsgTimeOutTimer: 'STORE_MSG_TIMEOUT_TIMER_GAME',
    // StopMsgTimeOutTimer: 'STOP_MSG_TIMEOUT_TIMER_GAME',
    ClearMsgTimeOutTimer: 'CLEAR_MSG_TIMEOUT_TIMER_GAME',
    NewMessageTimedOut: 'NEW_MSG_TIMEDOUT_GAME',

    SetMissionPanelLocation: 'SET_MISSION_PANEL_LOCATION_GAME',

    UpdateRank: 'UPDATE_RANK_GAME',
    UpdateMissionID: 'UPDATE_MISSION_ID_GAME',
    UpdateMissions: 'UPDATE_MISSIONS_GAME',
  },
  Radio: {
    EraseSlot: 'ERASE_SLOT_RADIO',

    SelectSlot: 'SELECT_SLOT_RADIO',
    ExecuteCmd: 'EXEC_CMD_RADIO',
    NewMessageReceived: 'NEW_MSG_RADIO',

    ClearNewMessageReceived: 'CLEAR_NEW_MSG_RADIO',
    NewMessageTimedOut: 'NEW_MSG_TIMEDOUT_RADIO',
    StatusUpdate: 'STATUS_UPDATE_RADIO',

    UpdateButton: 'UPDATE_STATUS_BUTTON_RADIO',
    UpdateSlots: 'UPDATE_SLOTS_RADIO',
  },
  FireComputers: {
    SelectSlot: 'FIRECOMPUTERS_SELECT_SLOT',
    ReadMsg: 'FIRECOMPUTER_READ_MSG',
    SelectFireComputer: 'FIRECOMPUTERS_SELECT_FC',
    SendMission: 'FIRECOMPUTER_SEND_MISSION',
    StatusUpdate: 'FIRECOMPUTER_STATUS_UPDATE',
  },
  LaunchStations: {
    Prepare: 'LAUNCHSTATION_PREPARE',
    Remove: 'LAUNCHSTATION_REMOVE',
    Repair: 'LAUNCHSTATION_REPAIR',
    Select: 'LAUNCHSTATION_SELECT',
    StartLoading: 'LAUNCHSTATION_START_LOADING',
    DoneLoading: 'LAUNCHSTATION_DONE_LOADING',
    ShowErrorStatus: 'LAUNCHSTATION_SHOW_ERR',
    StatusUpdate: 'LAUNCHSTATION_STATUS_UPDATE',
  },
  Armory: {
    Select: 'ARMORY_SELECT',
    Load: 'ARMORY_LOAD',
    AddOneToArmory: 'ARMORY_ADD_ONE_ORDNANCE',
    ShowErrorStatus: 'ARMORY_SHOW_ERR',
    StatusUpdate: 'ARMORY_STATUS_UPDATE',
  },
}

export { Cnst, ActionCnst }
