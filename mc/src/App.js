import React from 'react'
import ControlPanel from './Components/ControlPanel'

export default class App extends React.Component {
  render() {
    return (
      <div className="Application" >
        <div className="grid-container ShowContainer">

          <div className="grid-y grid-frame grid-padding-y grid-padding-x">

            <div className="cell large-6  ShowCellY">

              <div className="grid-x grid-margin-x ShowGrid" >

                <div className="cell large-6 ShowCell" >
                  <ControlPanel Name="Radio" />
                </div>

                <div className="cell large-6  ShowCell" >
                  <ControlPanel Name='Fire Computer' />
                </div>

              </div>
            </div>


            <div className="cell large-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid">

                <div className="cell large-4 ShowCell">
                  <ControlPanel Name="Armory" />
                </div>

                <div className="cell large-8 ShowCell">
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