import React from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";
import { extractIconText } from "../utils/stringFuctions";
import { WINDOW_DIMENSION } from "../utils/constants";

export default function UserData(props) {
  const { logout, auth } = useAuth();
  const { navigation } = props;

  const { login, first_name, last_name } = auth;

  return (
    <ScrollView
      style={{
        width: "auto",
        paddingTop: 15,
        maxHeight: WINDOW_DIMENSION.height - 105,
      }}
    >
      {/* <Text style={styles.menuDivisionTitle}>Cuenta</Text> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text
            style={{
              padding: 12,
              fontSize: 25,
              textAlign: "center",
              height: 60,
              backgroundColor: "#00ced150",

              width: 60,
              borderRadius: 50,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {extractIconText(first_name + " " + last_name)}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>{login}</Text>
          <Text>{first_name + " " + last_name}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.menuDivisionTitle}>Configuración de la Cuenta</Text>
        <UserDataMenuItem field={"Contraseña"} icon={"lock"} />
      </View>
      <View style={{ marginTop: 20 }}>
        {auth.login == "admin" ? (
          <AdminManagement navigation={navigation} />
        ) : undefined}
      </View>
      <View style={{ marginTop: 0 }}>
        <Text style={styles.menuDivisionTitle}>Dispositivos</Text>
        <UserDataMenuItem
          field={"Añadir Impresora"}
          navigation={navigation}
          nextScreen={"Printers"}
          icon={"print"}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.menuDivisionTitle}>Reportes</Text>
        <UserDataMenuItem
          field={"Cobros del día"}
          options={{
            header: ["Prestamo", "Cliente", "Recibo", "Fecha", "Monto"],

            bodyKey: "daypayments",
          }}
          navigation={navigation}
          nextScreen={"Reports"}
          icon={"money"}
        />
        {/* <UserDataMenuItem
          field={"Prestamos Nuevos"}
          navigation={navigation}
          nextScreen={"Reports"}
          options={{
            header: ["Prestamo", "Cliente", "Recibo", "Fecha", "Monto"],

            bodyKey: "",
          }}
          icon={"update"}
        /> */}
        <UserDataMenuItem
          field={"Visitas"}
          navigation={navigation}
          nextScreen={"Reports"}
          options={{
            header: ["Prestamo", "Cliente", "Recibo", "Fecha", "Monto"],

            bodyKey: "visits",
          }}
          icon={"where-to-vote"}
        />
        {/* 
                <UserDataMenuItem
                field={'Atrasos'}
                navigation={navigation}
                nextScreen={'Printers'}
                icon={'feedback'}
                />
                <UserDataMenuItem
                field={'Ruta de cobros'}
                navigation={navigation}
                nextScreen={'Printers'}
                icon={'alt-route'}
                /> */}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.menuDivisionTitle}>Sincronización de Datos</Text>
        <UserDataMenuItem
          field={"Obtener datos desde el servidor"}
          navigation={navigation}
          nextScreen={"Sync"}
          options={{
            bodyKey: "download",
          }}
          icon={"cloud-download"}
        />
        <UserDataMenuItem
          field={"Subir datos al servidor"}
          navigation={navigation}
          nextScreen={"Sync"}
          options={{
            bodyKey: "upload",
          }}
          icon={"cloud-upload"}
        />
      </View>
      <TouchableOpacity onPress={logout}>
        <Text
          style={{
            color: "red",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 60,
          }}
        >
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function UserDataMenuItem({ icon, field, nextScreen, navigation, options }) {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        icon != "lock"
          ? navigation.navigate(nextScreen, { params: options })
          : Alert.alert(
              "Modulo no Disponible",
              "Actualmente se ecuentra en mantenimiento"
            );
      }}
    >
      <View style={styles.menuDivision}>
        <Icon
          name={icon}
          size={20}
          color={"rgba(	70, 130, 180, 0.7)"}
          style={{ marginRight: 10, marginTop: -4 }}
        />
        <Text style={{ width: "100%", color: "rgba(0,0,0,0.7)" }}>{field}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function AdminManagement({ navigation }) {
  //console.log(navigation);
  return (
    <View>
      <Text style={styles.menuDivisionTitle}>Gestión Administrativa</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("QRManagement")}
        style={styles.menuDivision}
      >
        <Icon
          name="qr-code"
          size={30}
          style={{ marginRight: 10, marginTop: -4 }}
        />
        <Text>Administrar códigos QR</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("accessMagament")}
        style={styles.menuDivision}
      >
        <Icon
          name="qr-code"
          size={30}
          style={{ marginRight: 10, marginTop: -4 }}
        />
        <Text>Control de Acceso</Text>
      </TouchableWithoutFeedback>
      <View style={styles.menuDivision}>
        <Icon
          name="settings-remote"
          size={30}
          style={{ marginRight: 10, marginTop: -4 }}
        />
        <Text>Configurar la Conexión</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuDivisionTitle: {
    color: "rgba(0,0,0,0.4)",
    fontWeight: "400",
    textTransform: "capitalize",
    //backgroundColor: "#4682b4",
    backgroundColor: "transparent",
    borderBottomColor: "rgba(	70, 130, 180, 0.1)",
    // borderBottomWidth: 2,
    borderRadius: 15,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginBottom: 12,
  },

  menuDivision: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: "100%",
    //borderBottomWidth: 1,
    borderColor: "#80808020",
    flexDirection: "row",
    alignItems: "center",
  },

  menuDivisionText: {
    fontWeight: "bold",
  },
});
