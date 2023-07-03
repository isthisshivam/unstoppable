import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import images from '../assests/images';
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import useStyle from '../constants/style';
import LinearGradient from 'react-native-linear-gradient';
import Tooltip from 'react-native-walkthrough-tooltip';
const ToolTip = ({heading, onClick, ex_style, tip}) => {
  const styles = useStyle();
  const [tip, showTip] = useState(false);
  return (
    <Tooltip
      isVisible={tip}
      contentStyle={styles.tooltip}
      content={
        <View style={styles.tt_c}>
          <ScrollView>
            <TouchableOpacity style={styles.opa}>
              <ImageBackground
                borderRadius={14}
                style={styles.back}
                source={images.profileb}>
                <Image style={styles.imagess} source={images.share}></Image>
              </ImageBackground>
              <Text style={styles.edit}>{'Edit Profile'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      }
      onClose={() => showTip(false)}
      placement={'left'}
      topAdjustment={dH(30)}>
      <Text></Text>
    </Tooltip>
  );
};
export default ToolTip;
