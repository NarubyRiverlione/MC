import React from 'react'
import ControlPanel from './Components/ControlPanel'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { Radio: { Status: 'Idle' } }
  }

  render() {
    return (
      <div className="Application" >
        <div className="grid-container ShowContainer">

          <div className="grid-y  grid-padding-y grid-padding-x">

            <div className="cell medium-6  ShowCellY">

              <div className="grid-x grid-margin-x ShowGrid" >

                <div className="cell medium-6 ShowCell" >
                  <ControlPanel Name="Radio" StatusStatus={this.state.Radio.Status} />
                </div>

                <div className="cell medium-6  ShowCell" >
                  <ControlPanel Name='Fire Computer' />
                </div>

              </div>
            </div>


            <div className="cell medium-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid">

                <div className="cell medium-4 ShowCell">
                  <ControlPanel Name="Armory" />
                </div>

                <div className="cell medium-8 ShowCell">
                  <ControlPanel Name="Launch Stations" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    )
  }
}