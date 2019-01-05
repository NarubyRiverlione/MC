import { CstMissions } from './Constants'

export default class Mission {
  ID = 0

  Target = ''

  TargetLocation = ''

  Type = ''

  NeededOrdnance = ''

  Done = false

  constructor(newID) {
    const TargetID = Math.floor(Math.random() * CstMissions.IDTargetMax) + CstMissions.IDTargetMin
    this.Target = CstMissions.Targets[TargetID]

    const MissionType = Math.floor(Math.random() * 4)
    this.Type = CstMissions.Type[MissionType]
    this.NeededOrdnance = CstMissions.NeededOrdnance[MissionType]
    if (!this.Type) console.error('Unknown Mission type !!')
    this.ID = newID
    console.log(`${MissionType} = ${this.Type} = ${this.NeededOrdnance}`)
  }
}
