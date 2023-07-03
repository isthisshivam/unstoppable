import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import PrimaryButton from '../../components/PrimaryButton';
import strings from '../../constants/strings';
import {ScrollView} from 'react-native-gesture-handler';
import PrimaryHeader from '../../components/PrimaryHeader';
import RNIap, {
  Product,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import firebase from '@react-native-firebase/app';
// import {requestPurchase, useIAP} from 'react-native-iap';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const itemSkusMonthly = Platform.select({
  ios: ['Unstoppable_Monthly_Subs'],
  android: ['com.spacermobility.develop'],
});
const itemSkusAnnualy = Platform.select({
  ios: ['Unstoppable_Anually_Subs'],
  android: ['com.spacermobility.develop'],
});
const Subscription = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [selected, setSelected] = useState(true);
  const [productList, setProducts] = useState([]);
  useEffect(() => {
    check();
  }, []);
  useEffect(() => {
    buildLink();
  }, []);
  // const dynamicEventLink = async () => {
  //   const link = await firebase.links
  //     .DynamicLink(
  //       encodeURI(`https://eventsmag.page.link/${'id'}`),
  //       'eventsmag.page.link',
  //     )
  //     .android.setPackageName('app_android_package_name')
  //     .ios.setBundleId('app_ios_bundle_id');

  //   const dymcLink = await firebase
  //     .links()
  //     .createShortDynamicLink(link, `UNGUESSABLE`)
  //     .then(url => decodeURIComponent(url));

  //   return dymcLink;
  // };
  const check = async () => {
    await dynamicLinks()
      .getInitialLink()
      .then(url => {
        if (url) {
          console.log('getInitialLink=', url);
          // app opened from a url
        } // use deep link to handle the URL.
        if (Platform.OS === 'android') {
          Linking.getInitialURL()
            .then(url => {
              // do something with the URL
            })
            .catch(err => err);
        } else {
          // handle case for iOS
        }
      });
  };
  async function buildLink() {
    const link = await dynamicLinks().buildShortLink(
      {
        link: 'https://scorrer.com',
        domainUriPrefix: 'https://unstoppablernapp.page.link',
        analytics: {
          campaign: 'banner',
        },
        android: {
          packageName: 'com.unstoppableathelete',
        },
        ios: {
          bundleId: 'com.unstoppable.com.dev',
        },
      },
      'SHORT',
    );
    console.log('link==', link);
    return link;
  }
  // const handleDynamicLink = link => {
  //   // Handle dynamic link inside your own application
  //   if (link.url === 'https://invertase.io/offer') {
  //     // ...navigate to your offers screen
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);

  // const {
  //   connected,
  //   products,
  //   promotedProductsIOS,
  //   subscriptions,
  //   purchaseHistories,
  //   availablePurchases,
  //   currentPurchase,
  //   currentPurchaseError,
  //   initConnectionError,
  //   finishTransaction,
  //   getProducts,
  //   getSubscriptions,
  //   getAvailablePurchases,
  //   getPurchaseHistories,
  //   purchaseHistory,
  // } = useIAP();

  // const handlePurchase = async sku => {
  //   console.log('handlepurchase==', sku);
  //   await requestPurchase({sku: sku});
  // };

  // const restore = async () => {
  //   console.log('getPurchaseHistories==', purchaseHistories);
  //   let data = await getAvailablePurchases();
  //   console.log('getAvailablePurchases==', data);
  // };

  // useEffect(() => {
  //   /// restore();
  //   if (selected) getProducts({skus: itemSkusMonthly});
  //   else getProducts({skus: itemSkusAnnualy});
  // }, []);

  // useEffect(() => {
  //   // ... listen to currentPurchaseError, to check if any error happened
  // }, [currentPurchaseError]);

  // useEffect(() => {
  //   // ... listen to currentPurchase, to check if the purchase went through
  // }, [currentPurchase]);

  const Header = () => {
    return (
      <View style={style.PrimaryHeader_C}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.PrimaryHeader_Click}>
          <Image
            resizeMode="contain"
            style={style.img_22_22}
            source={images.backwhite}></Image>
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          style={style.img_2_221}
          source={images.applogo}></Image>
        <View style={style.img_22_22} />
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          style={style.imageBack}
          source={images.faceB}>
          <ImageBackground
            resizeMode="cover"
            style={style.imageBack}
            source={images.backS}>
            <Header />
            {/* <Text style={style.subs}>{strings.lower}</Text>
            <Text style={style.subs1}>{strings.UnstoppableAth}</Text> */}
          </ImageBackground>
        </ImageBackground>
        <TouchableOpacity onPress={() => setSelected(true)} style={style.click}>
          {selected ? (
            <ImageBackground
              resizeMode="cover"
              borderRadius={20}
              style={[style.image]}
              source={images.backSlinear}>
              <Text style={style.month}>{strings.monthly}</Text>
              <View style={style.jus}>
                <Text style={style.dollar}>
                  $ 19.99
                  <Text style={style.doll}> / monthly</Text>
                </Text>
                <Image
                  style={[style.img1, {marginTop: 20}]}
                  source={images.checkes}></Image>
              </View>
              <Text style={style.includes}>
                Includes daily workouts, coach, & coaching
              </Text>
            </ImageBackground>
          ) : (
            <View style={style.opacity}>
              <Text style={style.month}>{strings.monthly}</Text>
              <View style={style.jus}>
                <Text style={style.dollar}>
                  $ 19.99
                  <Text style={style.doll}> / monthly</Text>
                </Text>

                <Image
                  style={[style.img, {marginTop: 10}]}
                  source={images.min}></Image>
              </View>
              <Text style={style.includes}>
                Includes daily workouts, coach, & coaching
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelected(false)}
          style={[style.click, {marginTop: -20}]}>
          {selected ? (
            <View style={style.opacity}>
              <Text style={style.month}>{strings.annualy}</Text>
              <View style={style.jus}>
                <Text style={style.dollar}>
                  $ 199.99
                  <Text style={style.doll}> / annualy</Text>
                </Text>

                <Image
                  style={[style.img, {marginTop: 10}]}
                  source={images.min}></Image>
              </View>
              <Text style={style.includes}>
                Includes daily workouts, coach, & coaching
              </Text>
            </View>
          ) : (
            <ImageBackground
              resizeMode="cover"
              borderRadius={20}
              style={[style.image]}
              source={images.backSlinear}>
              <Text style={style.month}>{strings.annualy}</Text>
              <View style={style.jus}>
                <Text style={style.dollar}>
                  $ 199.99
                  <Text style={style.doll}> / annualy</Text>
                </Text>

                <Image
                  style={[style.img1, {marginTop: 20}]}
                  source={images.checkes}></Image>
              </View>
              <Text style={style.includes}>
                Includes daily workouts, coach, & coaching
              </Text>
            </ImageBackground>
          )}
        </TouchableOpacity>
        <View style={style.opacc}>
          <PrimaryButton
            heading={'SUBSCRIBE'}
            onClick={() =>
              handlePurchase(selected ? itemSkusMonthly[0] : itemSkusAnnualy[0])
            }></PrimaryButton>
        </View>
        <Text style={style.restore}>RESTORE PURCHASES</Text>
        <Text style={style.by}>
          By completing this purchase you agree to the Terms and Conditions and
          Privacy Policy. Subscriptions will auto-renew unless turned off in
          your settings.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Subscription;
