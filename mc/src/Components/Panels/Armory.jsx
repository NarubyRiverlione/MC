/* eslint-disable no-console */
import React from 'react'
// import PropTypes from 'prop-types'

import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import { Cnst } from '../../Constants'

import * as ArmoryActions from '../../Actions/ArmoryActions'
import armoryStore from '../../Stores/ArmoryStore'


const SetSelected = (caption) => {
  ArmoryActions.Select(caption)
  // armoryStore.Selected === caption ? this.setState({ Selected: '' }) : this.setState({ Selected: caption })
}

const Load = () => {
  ArmoryActions.Load()
  console.log(`Armory: Loading ${armoryStore.Selected}`)
}


export default class Armory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Selected: armoryStore.Selected,
      Loading: armoryStore.Loading,
      Amount: armoryStore.Amount,
    }
  }

  componentDidMount() {
    armoryStore.on(Cnst.Armory.Emit.selected, () => {
      console.log(`Armory  ${armoryStore.Selected} selected.`)
      this.setState({ Selected: armoryStore.Selected })
    })

    armoryStore.on(Cnst.Armory.Emit.loading, () => {
      console.log(`Armory loading ${armoryStore.Selected} = ${armoryStore.loading}`)
      this.setState({ Loading: armoryStore.Loading })
    })

    armoryStore.on(Cnst.Armory.Emit.changeAmount, () => {
      console.log('Armory amount changed')
      this.setState({ Amount: armoryStore.Amount })
    })
  }


  render() {
    const { Selected, Amount, Loading } = this.state
    return (
      <div className="grid-container" id="ArmoryDisplay">
        <div className="grid-x">
          {/* Select ordnance */}
          <div className="medium-7 grid-y">
            <div className="cell small-2"><p>Select Cnst.Ordnance</p></div>
            <div className="cell small-2">
              <Button
                Caption={Cnst.Ordnance.AA}
                Width={250}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Selected === Cnst.Ordnance.AA}
                cb={() => {
                  SetSelected()
                }}
              />
            </div>
            <div className="cell small-2">
              <Button
                Caption={Cnst.Ordnance.G}
                Width={250}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Selected === Cnst.Ordnance.G}
                cb={() => {
                  SetSelected()
                }}
              />
            </div>
            <div className="cell small-2">
              <Button
                Caption={Cnst.Ordnance.AS}
                Width={250}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Selected === Cnst.Ordnance.AS}
                cb={() => {
                  SetSelected()
                }}
              />
            </div>
            <div className="cell small-2">
              <Button
                Caption={Cnst.Ordnance.T}
                Width={250}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Selected === Cnst.Ordnance.T}
                cb={() => {
                  SetSelected()
                }}
              />
            </div>
            <div className="cell small-2">
              <Button
                Caption={Cnst.Ordnance.D}
                Width={250}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Selected === Cnst.Ordnance.D}
                cb={() => {
                  SetSelected()
                }}
              />
            </div>
          </div>


          {/* amount in store */}
          <div className="medium-2 grid-y">
            <div className="cell small-2"><p># store</p></div>
            <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.AA].toString().padStart(2, '0')} Width={50} /></div>
            <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.G].toString().padStart(2, '0')} Width={50} /></div>
            <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.AS].toString().padStart(2, '0')} Width={50} /></div>
            <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.T].toString().padStart(2, '0')} Width={50} /></div>
            <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.D].toString().padStart(2, '0')} Width={50} /></div>
          </div>

          {/* Send ordnance to Launch station */}
          <div className="large-3 grid-y">
            <div className="cell small-5" />
            <div className="cell small-4">
              <Button
                Caption={Cnst.Armory.Actions.load}
                Width={100}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Loading}
                cb={Load()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
