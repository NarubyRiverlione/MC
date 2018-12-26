import { Cnst } from '../Constants'


export default class Mission {
  ID = 0

  Target = ''

  TargetLocation = ''

  Type = ''


  constructor(newID) {
    const TargetID = Math.floor(Math.random() * Cnst.Game.Missions.IDMax) + Cnst.Game.Missions.IDMin
    this.Target = Cnst.Game.Missions.Targets[TargetID]

    const MissionType = Math.floor(Math.random() * 4)
    this.Type = Cnst.Game.Missions.Type[MissionType]

    this.ID = newID
  }
}
