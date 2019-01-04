import { CstGame } from './Constants'

export default class Mission {
  ID = 0

  Target = ''

  TargetLocation = ''

  Type = ''

  NeededOrdnance = ''

  constructor(newID) {
    const TargetID = Math.floor(Math.random() * CstGame.Missions.IDMax) + CstGame.Missions.IDMin
    this.Target = CstGame.Missions.Targets[TargetID]

    const MissionType = Math.floor(Math.random() * 5)
    this.Type = CstGame.Missions.Type[MissionType]
    this.NeededOrdnance = CstGame.Missions.NeededOrdnance[MissionType]
    this.ID = newID
  }
}
