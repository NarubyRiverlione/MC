import React from 'react'
import './App.css'
import ControlPanel from './Components/ControlPanel'

export default class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <div className="grid-container ShowContainer">

          <div className="grid-y grid-frame grid-padding-y grid-padding-x">

            <div className="cell medium-6  ShowCellY">

              <div className="grid-x grid-margin-x ShowGrid" >

                <div className="cell medium-6 ShowCell" >
                  <ControlPanel Name="Radio" />
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