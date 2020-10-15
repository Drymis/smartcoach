import { Component, OnInit } from '@angular/core';
import { PitchTeamLineup } from 'src/app/core/models/pitch-team-lineup';
import { Pitch } from 'src/app/core/models/pitch.model';
import { SmartcoachService } from 'src/app/core/services/smartcoach.service';
import { SmartcoachUtility } from 'src/app/shared/utilities/smartcoach-utility';

@Component({
  selector: 'app-pitch-configurator',
  templateUrl: './pitch-configurator.component.html',
  styleUrls: ['./pitch-configurator.component.scss']
})
export class PitchConfiguratorComponent implements OnInit {

  public pitchData: Pitch;
  public homeBench: PitchTeamLineup[];
  public homeFormation: PitchTeamLineup[];
  public awayBench: PitchTeamLineup[];
  public awayFormation: PitchTeamLineup[];
  public positions: {};
  public isTouch;

  constructor(
    private smartcoachService: SmartcoachService,
  ) {
  }

  ngOnInit() {
    this.isTouch = SmartcoachUtility.isTouchDevice();

    this.smartcoachService.getPitch().then((retrievedPitch: Pitch) => {
      this.pitchData = retrievedPitch;

      this.addTeamPlayersNumber();

      this.parseTeams();

      this.initializePositions();

    }).catch((err) => {
      console.log(err);
    });
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drag(event) {
    // setting drag start data to be used when dropping
    const rawId = event.target.id;
    const parsedId = this.parseRawId(rawId);
    localStorage.setItem('previousId', JSON.stringify(parsedId));
  }

  parseRawId(rawId) {
    rawId = rawId.split(/(\d+)/);
    return {
      id: rawId[1],
      arrayName: rawId[0],
      isHome: rawId[0].includes('home')
    }
  }

  drop(event) {
    event.preventDefault();

    const previousId = JSON.parse(localStorage.getItem('previousId'));
    let targetId = null;

    // if touch then get element with coords otherwise just get the target id
    if (this.isTouch) {
      const changedTouch = event.changedTouches[0];
      targetId = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY).id;
    } else {
      targetId = event.target.id;
    }
    const targetParsedId = this.parseRawId(targetId);

    // if there is a target with id and is same team
    if (targetId && (previousId.isHome === targetParsedId.isHome)) {
      const targetArrayName = targetParsedId.arrayName;

      // get index of the dragstart element and dragend element
      const previousArrayIndex = this[previousId.arrayName].findIndex(player => {
        return player.player_id.toString() === previousId.id
      });
      const targetArrayIndex = this[targetArrayName].findIndex(player => {
        return player.player_id.toString() === targetParsedId.id
      });

      this.swapPlayers(previousId.arrayName, targetArrayName, previousArrayIndex, targetArrayIndex);
    }
  }

  swapPlayers(previousArrayName, targetArrayName, previousArrayIndex, targetArrayIndex) {
    const previousPlayer = this[previousArrayName][previousArrayIndex]
    const newPlayer = this[targetArrayName][targetArrayIndex];

    newPlayer.bench = false;
    const tempPosition = newPlayer.position;
    newPlayer.position = previousPlayer.position;
    previousPlayer.position = tempPosition;
    previousPlayer.bench = true;

    this[previousArrayName][previousArrayIndex] = newPlayer;
    this[targetArrayName][targetArrayIndex] = previousPlayer;
  }

  addTeamPlayersNumber() {
    let usedNumbers = [];
    let randomNumber;

    // random home lineup numbers
    this.pitchData.home_lineup.forEach(player => {
      randomNumber = null;

      while(!randomNumber || usedNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 99) + 1;
      }

      player.player_number = randomNumber;
      usedNumbers.push(randomNumber);
    });

    // random away lineup numbers
    usedNumbers = [];
    this.pitchData.away_lineup.forEach(player => {
      randomNumber = null;

      while(!randomNumber || usedNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 99) + 1;
      }
      player.player_number = randomNumber;
      usedNumbers.push(randomNumber);
    });
  }

  parseTeams() {
    // parses pitchData players in separate arrays depending on team and bench
    this.homeBench = this.pitchData.home_lineup.filter(player => {
      return player.bench === true
    });
    this.homeFormation = this.pitchData.home_lineup.filter(player => {
      return player.bench === false
    });
    this.awayBench = this.pitchData.away_lineup.filter(player => {
      return player.bench === true
    });
    this.awayFormation = this.pitchData.away_lineup.filter(player => {
      return player.bench === false
    });
  }

  initializePositions() {
    // formation positions
    this.positions = {
      gk: { top: '50%', left: '10%' },
      rcmf: { top: '71%', left: '60%' },
      lcmf: { top: '29%', left: '60%' },
      rcb: { top: '70%', left: '34%' },
      lcb: { top: '30%', left: '34%' },
      rcb3: { top: '70%', left: '34%' },
      lcb3: { top: '30%', left: '34%' },
      ss: { top: '50%', left: '72%' },
      rw: { top: '87%', left: '64%' },
      lw: { top: '13%', left: '64%' },
      rb: { top: '89%', left: '38%' },
      lb: { top: '11%', left: '38%' },
      rb5: { top: '89%', left: '38%' },
      lb5: { top: '11%', left: '38%' },
      lwf: { top: '13%', left: '72%' },
      rwf: { top: '87%', left: '72%' },
      dmf: { top: '50%', left: '48%' },
      rcmf3: { top: '78%', left: '60%' },
      lcmf3: { top: '22%', left: '60%' },
      cf: { top: '50%', left: '90%' },
      cb: { top: '50%', left: '34%' },
      amf: { top: '50%', left: '60%' },
      ramf: { top: '70%', left: '60%' },
      lamf: { top: '30%', left: '60%' },
      rdmf: { top: '70%', left: '48%' },
      ldmf: { top: '30%', left: '48%' },
      rwb: { top: '70%', left: '52%' },
      lwb: { top: '30%', left: '52%' },
    };
  }
}
