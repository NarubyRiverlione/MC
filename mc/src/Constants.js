export const CstOrdnance = {
  AA: 'Anti Aircraft', G: ' Cruise missile', AS: 'Anti Ship missile', T: 'Torpedo', D: 'Defence',
}

export const CstRadio = {
  Title: 'Radio station',
  Actions: { store: 'STORE', decode: 'DECODE', erase: 'ERASE' },
  Busy: {
    store: 'storing', decode: 'decoding', erase: 'erasing', onSlot: ' slot ',
  },
  Results: { store: 'Stored', decode: 'Decoded', erase: 'Empty' },
  Time: {
    store: 2000, decode: 5000, erase: 1000, error: 5000,
  },
  Errors: {
    AlreadyBusy: 'ERROR: Radio is already busy',
    SlotNotEmpty: 'ERROR: slot is not empty',
    NoDecodeNothingStored: 'ERROR: no msg stored to decode',
    NoStoreNoNewMsg: 'ERROR: no msg to store',
    NewMessageTimedOut: 'ALERT !! New orders where not followed',
  },
}

export const CstFireComputers = {
  Title: 'Fire Computers',
  Name: { A: 'A', B: 'B' },
  Actions: {
    load: 'into Fire Computer',
    send: 'to Launch Station',
  },
  Results: { read: 'Mission: ', empty: 'Waiting for mission' },
  Time: {
    read: 3000, selectFC: 1000, send: 4000, error: 5000,
  },
  Errors: {
    NoMsg: 'ERROR: no message in selected radio slot',
    MsgNotDecoded: 'ERROR: message not decoded',
    NoFCselected: 'ERROR: no Fire Computer is selected',
    NoMissionInSelectedFC: 'ERROR: no mission in selected FC',
    CannotSend: 'ERROR: cannot sent mission to Launch Station',
  },
}

export const CstLaunchStations = {
  Title: 'Launch Stations',
  Name: { rails: 'Rails', VLT: 'Vertical Launch Tube', tubes: 'Torpedo Tubes' },
  Numbers: {
    A: 'A', B: 'B', one: '1', two: '2', romanOn: 'I', romanTwo: 'II',
  },
  StatusColor: {
    empty: 2, loading: 1, loaded: 0, removing: 3,
  },
  Actions: {
    fire: 'F I R E',
    prepare: 'Prepare',
    remove: 'Remove',
    repair: 'Repair',
    receiving: 'Receiving fire mission',
  },
  Results: {
    fire: 'Firing weapon',
    prepare: 'Ready to fire',
    remove: 'Empty',
    repair: 'Repaired',
    received: 'Fire mission loaded into weapon, ready to fire.',
  },
  Errors: {
    WrongLaunchStation: {
      AA: 'ERROR: Anti Air missile needs a rail selected',
      AS: 'ERROR: Anti Ship missile needs a rail selected',
      G: 'ERROR: Ground Missile needs a VLT selected',
      T: 'ERROR: Torpedo needs a tube selected',
    },
    SelectedLSnotEmpty: 'ERROR: selected Launch Station not empty',
    NoLaunchStationSelected: 'ERROR: no Launch Station selected',
    NoRemoveOfEmpty: 'ERROR: Launch Station is already empty',
    WrongLaunchStationForMission: 'ERROR: wrong Launch Station selected for this mission',
    LSisEmpty: 'ERROR: Launch Station is not loaded',
    NoMissionLoaded: 'ERROR: no missions loaded into weapon',
    MissionAlreadyDone: 'ERROR: mission already executed',
  },
  Time: {
    error: 4000, removing: 7000, loading: 5000, preparing: 4000, firing: 2000,
  },
}

export const CstArmory = {
  Title: 'Armory',
  StartLoadout: {
    [CstOrdnance.AA]: 5,
    [CstOrdnance.G]: 4,
    [CstOrdnance.AS]: 2,
    [CstOrdnance.T]: 4,
  },
  Actions: { load: 'LOAD', loading: 'Loading into Launch Station' },
  Errors: {
    WrongLaunchStation: 'ERROR: Wrong Launch Station selected',
    NoOrdnanceSelected: 'ERROR: No ordnance selected',
    SelectedLSnotEmpty: 'ERROR: Launch Station not empty',
    NoLaunchStationSelected: 'ERROR: No Launch Station selected',
    OrdnanceOutOfStock: 'ERROR: Ordnance out of stock',
  },
  Time: {
    error: 6000, StartLoading: 1000, NoOrdnanceSelected: 4000, OrdnanceOutOfStock: 4000,
  },
}

export const CstGame = {
  Name: 'Missile Boat - Weapons Control Panel',
  Time: {
    FirstMsg: 1500,
    NewMessageTimeOut: 10000,
    NewIncomingMessageMax: 25000,
    NewIncomingMessageMin: 15000,
  },
  Titles: {
    ReceivedMissions: 'Received missions',
    ExecutedMissions: 'Executed missions',
    Rank: 'Rank',

  },

}

export const CstMissions = {
  IDTargetMax: 10,
  IDTargetMin: 0,
  Targets: [' A', ' B', ' C', ' D', ' E', ' F', ' G', ' H', ' I', ' J', ' K', ' L', ' M', ' N', ' O', ' P', ' Q', ' R', ' T', ' S', ' V', ' W'],
  Type: ['Aircraft Attack', 'Ground Attack', 'Ship Attack', 'Submarine Attack'],
  NeededOrdnance: ['AA', 'G', 'AS', 'T'],
}

export const Cnst = {
  Status: { Idle: 'Idle' },
  LedColors: ['green', 'orange', 'red', 'blue'],
  LedBackgroundColor: 'Gainsboro',
}


export const ActionCnst = {
  Game: {
    // StartTimerNewMessage: 'START_NEW_MSG_TIMER_GAME',
    StoreMsgTimeOutTimer: 'STORE_MSG_TIMEOUT_TIMER_GAME',
    // StopMsgTimeOutTimer: 'STOP_MSG_TIMEOUT_TIMER_GAME',
    IncExecutedMissions: 'INC_EXECUTED_MISSION_GAME',
    ClearMsgTimeOutTimer: 'CLEAR_MSG_TIMEOUT_TIMER_GAME',
    NewMessageTimedOut: 'NEW_MSG_TIMEDOUT_GAME',

    // SetMissionPanelLocation: 'SET_MISSION_PANEL_LOCATION_GAME',

    UpdateRank: 'UPDATE_RANK_GAME',
    UpdateMissionID: 'UPDATE_MISSION_ID_GAME',
    AddNewMission: 'ADD_MISSION_GAME',
    DoneMission: 'SET_MISION_DONE_GAME',
  },
  Radio: {
    // EraseSlot: 'ERASE_SLOT_RADIO',

    SelectSlot: 'SELECT_SLOT_RADIO',
    // ExecuteCmd: 'EXEC_CMD_RADIO',
    NewMessageReceived: 'NEW_MSG_RADIO',

    ClearNewMessageReceived: 'CLEAR_NEW_MSG_RADIO',
    NewMessageTimedOut: 'NEW_MSG_TIMEDOUT_RADIO',
    StatusUpdate: 'STATUS_UPDATE_RADIO',

    UpdateButton: 'UPDATE_STATUS_BUTTON_RADIO',
    UpdateSlots: 'UPDATE_SLOTS_RADIO',

    SetBusy: 'SET_BUSY_RADIO',
    SetIdle: 'SET_IDLE_RADIO',
  },
  FireComputers: {
    SelectSlot: 'FIRECOMPUTERS_SELECT_SLOT',
    ReadMsg: 'FIRECOMPUTER_START_READ_MSG',
    ReadMsgDone: 'FIRECOMPUTER_DONE_READ_MSG',
    SelectFireComputer: 'FIRECOMPUTERS_SELECT_FC',
    SendMission: 'FIRECOMPUTER_START_SEND_MISSION',
    SendMissionDone: 'FIRECOMPUTER_DONE_SEND_MISSION',
    StatusUpdate: 'FIRECOMPUTER_STATUS_UPDATE',
    UpdateFCs: 'FIRECOMPUTER_UPDATE',
  },
  LaunchStations: {
    DeselectStations: 'LAUNCHSTATION_DESELECT_ALL',
    UpdateSelectedStatus: 'LAUNCHSTATION_UPDATE_SELECTED_STATUS',
    UpdatedStations: 'LAUNCHSTATION_UPDATE_STATIONS',
    // ReceivedMission: 'LAUNCHSTATION_RECEIVED_MISSION',
    // Prepare: 'LAUNCHSTATION_PREPARE',
    // Repair: 'LAUNCHSTATION_REPAIR',
    Select: 'LAUNCHSTATION_SELECT',
    // ShowErrorStatus: 'LAUNCHSTATION_SHOW_ERR',
    StatusUpdate: 'LAUNCHSTATION_STATUS_UPDATE',
    Firing: 'FIRING_LAUNCHSTATION',
    Fired: 'DONE_FIRE_LAUNCHSTATION',
  },
  Armory: {
    SetLoadout: 'ARMORY_SET_LOADOUT',
    Select: 'ARMORY_SELECT',
    Loading: 'ARMORY_START_LOAD',
    LoadingDone: 'ARMORY_LOADING_DONE',
    // AddOneToArmory: 'ARMORY_ADD_ONE_ORDNANCE',
    UpdateAmount: 'ARMORY_UPDATE_AMOUNT',
    // ShowErrorStatus: 'ARMORY_SHOW_ERR',
    StatusUpdate: 'ARMORY_STATUS_UPDATE',
  },
}
