import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  StyleProp,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {primaryColor1, secondaryColor3} from '../../utils/constants';
import PrimaryButton from '../primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../context/authentification';
import {useLinkTo} from '@react-navigation/native';

interface CustomButton {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const clearUserInformation = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {}
};

const CustomInput = ({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder: string;
  value?: string;
}) => {
  return (
    <View style={style.inputGroup}>
      <Text style={style.textLabel}>{label}</Text>
      <TextInput
        clearButtonMode="always"
        placeholder={placeholder}
        style={style.textInput}
        value={value}
      />
    </View>
  );
};

const Checkbox = ({text}: {text: string}) => {
  return (
    <BouncyCheckbox
      text={text}
      style={{marginBottom: 8}}
      innerIconStyle={{
        borderRadius: 5,
      }}
      iconStyle={{
        borderRadius: 5,
        backgroundColor: primaryColor1,
      }}
      textStyle={{
        textDecorationLine: 'none',
        fontWeight: '700',
      }}
    />
  );
};

const CustomButton = ({text, style, onPress}: CustomButton) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

interface UserInfo {
  userName: string;
  userEmail: string;
}

export default function UserPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const {setLoggedUser} = useContext(UserContext);
  const navigate = useLinkTo();

  const getUserInfo = async () => {
    const userName = await AsyncStorage.getItem('userName');
    const userEmail = await AsyncStorage.getItem('userEmail');

    userName && userEmail && setUserInfo({userName, userEmail});
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <KeyboardAvoidingView style={style.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <View
          style={{
            backgroundColor: 'red',
            height: 60,
            width: 60,
            borderRadius: 25,
          }}
        />
        <CustomButton
          text="Change"
          style={[style.primaryButton, style.buttonMarginLeft]}
        />
        <CustomButton
          text="Remove"
          style={[style.secondaryButton, style.buttonMarginLeft]}
        />
      </View>
      <View>
        <Text style={style.title}>Personal Information</Text>
        <CustomInput
          label="Name:"
          placeholder="Change your Name"
          value={userInfo?.userName}
        />
        <CustomInput label="LastName:" placeholder="Change your LastName" />
        <CustomInput
          label="Email:"
          placeholder="Change your E-mail"
          value={userInfo?.userEmail}
        />
        <CustomInput label="Phone:" placeholder="Change your Phone Number" />
      </View>
      <View>
        <Text style={style.title}>Email Notifications</Text>
        <Checkbox text="Order Status" />
        <Checkbox text="Password Changes" />
        <Checkbox text="Special Offers" />
        <Checkbox text="Newsletter" />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <PrimaryButton
          title="Log out"
          size="full"
          onPress={() => {
            clearUserInformation();
            setLoggedUser(false);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}
        >
          <CustomButton
            text="Discard Changes"
            style={[style.secondaryButton, style.primaryButtonLarge]}
            onPress={() => navigate('/Home')}
          />
          <CustomButton
            text="Save Changes"
            style={[style.primaryButton, style.primaryButtonLarge]}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: secondaryColor3,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: primaryColor1,
    padding: '5%',
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
  },

  textLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primaryColor1,
    height: 45,
  },

  inputGroup: {
    marginBottom: 15,
  },

  primaryButton: {
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: primaryColor1,
    color: 'green',
  },

  primaryButtonLarge: {
    width: '48%',
  },

  buttonMarginLeft: {
    marginLeft: 20,
  },

  secondaryButton: {
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: primaryColor1,
  },
});
