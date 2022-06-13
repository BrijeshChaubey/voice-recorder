import React from 'react';
import{View ,Text,StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
 } from 'react-native-audio-recorder-player'
import { log } from 'react-native-reanimated';

const audioRecorderPlayer = new AudioRecorderPlayer();

export class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
  onStartRecord = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
    console.log("Recorded",result);
  };
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };
  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };
  onPausePlay = async (e) => {
    await this.audioRecorderPlayer.pausePlayer();
   };
   onStopPlay = async (e) => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    };

  render(){
  return(
    <View style={{backgroundColor:'white'}}>
     <Card style={styles.container}>
     <Card.Title title="Audio recorder and player" />
     <Title style={{marginLeft:50}}>{this.state.recordTime}</Title>
     <Button style={styles.btnStyle} onPress={() => this.onStartRecord()}>Record</Button>
          <Button
            style={styles.btnStyle2}
            
            onPress={() => this.onStopRecord()}
          >
            STOP
    </Button>
          
          <Title style={{marginTop:15}}>{this.state.playTime} / {this.state.duration}</Title>
          <Button style={styles.btnStyle3}  onPress={() => this.onStartPlay()}>
            PLAY
        </Button>
          <Button
            style={styles.btnStyle3}
            
            onPress={() => this.onPausePlay()}
          >
            PAUSE
    </Button>
          <Button
            style={styles.btnStyle2}
            
            onPress={() => this.onStopPlay()}
          >
            STOP
    </Button>
     </Card> 
     </View> 
    

  )
  }
}
const styles = StyleSheet.create({
 
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 320,
    height: 500,
    borderWidth: 2,
    margin: 15,

    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: 'pink',
    marginLeft:25,
    marginTop: 10,
    width: 120,
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
  },
  btnStyle2: {
    backgroundColor: 'red',
    marginLeft:25,
    marginTop: 18,
    width: 120,
    fontSize: 15,
    padding: 7,
    borderRadius: 5,
  },
  btnStyle3: {
    backgroundColor: 'cyan',
    marginLeft:25,
    marginTop: 25,
    width: 120,
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
  },
});
