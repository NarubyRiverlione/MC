const Cnst = {
  Status: { idle: 'Idle' },

  Stations: { Radio: 'Radio', FireComputers:'Fire Computers', Armory:'Armory', LaunchStations:'Launch Stations' },
  
  Ordnance: { AA:  'Anti A ircraft', G: ' Cruise Missle', AS: 'Anti Ship Missle', T: 'Torpedo', D: 'Defence' },
    
  Radio: {
    Actions: {store: 'STORE', decode: 'DECODE', erase:'ERASE' },
    Results: { store: 'Stored', decode:'Decrypted', erase:'Empty' }
  } ,
    
  FireComputers: {
    Name: { A: 'A', B:'B' },
    Actions: { read: 'Insert msg',send:'Send mission to Launch Station' },
    Results: { read: 'Mission recieved' }
  }

    
  

}

export default Cnst