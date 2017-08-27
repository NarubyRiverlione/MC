import { Cnst } from '../Constants'


export default class Mission {
  ID = 0
  Target = ''
  TargetLocation = ''
  //PanelLocation = ''

  constructor(newID) {
    const TargetID = Math.floor(Math.random() * Cnst.Game.Missions.IDMax) + Cnst.Game.Missions.IDMin
    this.Target = Cnst.Game.Missions.Targets[TargetID]

    // this.PanelLocation = ''

    this.ID = newID
  }
}