
import React from 'react';
import { Audio } from './Audio';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  return (
<View>
<Audio/>
{/* <Text>Audio recorder</Text> */}
</View>
  )
  }

export default App;
