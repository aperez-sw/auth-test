import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");

  const [auth, setAuth] = useState("");

  const handleDiag = async () => {
    const responseGetEnroled =
      await LocalAuthentication.getEnrolledLevelAsync();
    const responseHasHardware = await LocalAuthentication.hasHardwareAsync();
    const responseIsEnrolledAsync = await LocalAuthentication.isEnrolledAsync();
    const supportedAuthenticationTypesAsync =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log("responseGetEnroled", responseGetEnroled);
    setText1(responseGetEnroled.toString());
    console.log("responseHasHardware", responseHasHardware);
    setText2(responseHasHardware.toString());
    console.log("responseIsEnrolledAsync", responseIsEnrolledAsync);
    setText3(responseIsEnrolledAsync.toString());
    console.log(
      "supportedAuthenticationTypesAsync",
      supportedAuthenticationTypesAsync
    );
    setText4(supportedAuthenticationTypesAsync.toString());
  };

  const handleAuth = async () => {
    const responseAuth = await LocalAuthentication.authenticateAsync();
    console.log("responseAuth", responseAuth);
    setAuth(JSON.stringify(responseAuth));
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={handleAuth}
        style={{ backgroundColor: "skyblue", paddingVertical: 5 }}
      >
        <Text>VER QUE HACE AL PEDIR AUTH</Text>
        {auth && (
          <Text style={{ fontWeight: "500", color: "red" }}>{auth}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDiag}
        style={{ backgroundColor: "orange", paddingVertical: 5 }}
      >
        <Text>HACER DIAGNOSTICO DEL CEL</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Metodo: getEnrolledLevelAsync</Text>
      <Text style={styles.desc}>
        Descripcion: Determine what kind of authentication is enrolled on the
        device.
      </Text>
      <Text>
        Note: On Android devices prior to M, SECRET can be returned if only the
        SIM lock has been enrolled, which is not the method that
        authenticateAsync prompts.
      </Text>
      <Text style={styles.desc}>
        NONE = 0, Indicates no enrolled authentication.
      </Text>
      <Text style={styles.desc}>
        SECRET = 1, Indicates non-biometric authentication (e.g. PIN, Pattern).
      </Text>
      <Text style={styles.desc}>
        BIOMETRIC = 2, Indicates biometric authentication.
      </Text>
      <Text style={styles.value}>{text1}</Text>
      <Text style={styles.title}>Metodo hasHardwareAsync</Text>
      <Text style={styles.desc}>
        Descripcion: Determine whether a face or fingerprint scanner is available on the device.
      </Text>
      <Text style={styles.value}>{text2}</Text>
      <Text style={styles.title}>Metodo isEnrolledAsync</Text>
      <Text style={styles.desc}>
        Descripcion: Determine whether the device has saved fingerprints or facial data to use for authentication.
      </Text>
      <Text style={styles.value}>{text3}</Text>

      <Text style={styles.title}>
        Metodo: supportedAuthenticationTypesAsync
      </Text>
      <Text style={styles.desc}>
        Descripcion: Determine what kinds of authentications are available on
        the device.
      </Text>
      <Text style={styles.desc}>FINGERPRING = 1</Text>
      <Text style={styles.desc}>FACIAL_RECOGNITION = 2</Text>
      <Text style={styles.desc}>IRIS(Android) = 3</Text>
      <Text style={styles.value}>{text4}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 80,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 15,
  },
  value: {
    fontWeight: "500",
    marginVertical: 5,
    color: "red",
  },
  desc: {
    paddingRight: 20,
    marginVertical: 5,
  },
});
