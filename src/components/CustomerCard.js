import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  capitalize,
  extractIconText,
  formatFullName,
} from "../utils/stringFuctions";
import { WINDOW_DIMENSION } from "../utils/constants";
import CustomerIcon from "./CustomerIcon";

export default function CustomerCard(props) {
  const { customer } = props;
  const navigation = useNavigation();

  const [action, setOption] = useState("cobrar");

  var statusColor;

  const goToCustomer = () => {
    navigation.navigate("Customersnav", {
      screen: "Customer",
      params: customer,
    });
  };

  ////console.log(customer);

  ////console.log("custom", formatFullName(customer.first_name, customer))

  switch (customer?.loan_status) {
    case "NORMAL":
      statusColor = "#66b050";
      break;
    case "ARREARS":
      statusColor = "#b25353";
      break;
    default:
      break;
  }

  return (
    <TouchableNativeFeedback onPress={goToCustomer}>
      <View containerStyle={{ padding: 0 }}>
        <View style={{ flexDirection: "column" }}>
          <View
            title="card"
            style={{
              //backgroundColor: 'green',
              display: "flex",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8,
              paddingVertical: 6,
              // flexWrap: "wrap",
              // marginTop: 15,
              // paddingLeft: 15,
              // paddingTop: 15,
              // paddingBottom: 10,
            }}
          >
            {/* <View
                    style={{
                        backgroundColor: 'skyblue',
                        padding: 10,
                        width: 70,
                        height: 70,
                        borderRadius: 50
                    }}
                    >
                        <Text 
                        onPress={goToCustomer}
                        style={{
                            fontSize: 30,
                            color: 'white',
                            textAlign: 'center'
                            }}>
                                {extractIconText(formatFullName(customer.first_name, customer))}
                            </Text>    
                            
                    </View>*/}
            <View style={{}}>
              <CustomerIcon size={60} data={customer} />
            </View>
            <View
              style={{
                paddingVertical: 1,
                paddingLeft: 15,
                // width: WINDOW_DIMENSION.width <= 360 ? 180 : 200,
                //backgroundColor: 'green'
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  // width:
                  //   WINDOW_DIMENSION.width <= 360
                  //     ? 180
                  //     : WINDOW_DIMENSION.width * 0.4,
                  // //backgroundColor : 'green'
                }}
              >
                {formatFullName(customer.first_name, customer)}
              </Text>
              {/* <Text style={{ fontSize: 11 }}>{customer.identification}</Text> */}
              <Text style={{ fontSize: 11 }}>
                {capitalize(customer.street)}
              </Text>
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                {capitalize(customer.business)}
              </Text>
            </View>

            <View style={{ position: "absolute", top: 12, right: 6 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  paddingHorizontal: 4,
                  borderRadius: 15,
                  display: "flex",
                  alignItems: "center",
                  // width: "auto",
                  // fontWeight: "bold",

                  backgroundColor: statusColor,
                }}
              >
                {customer.loan_status == "ARREARS" ? "Atraso" : "Normal"}
              </Text>
            </View>
            <View
              style={{
                //backgroundColor: 'grey',
                flexDirection: "row",
                paddingLeft: 60,
                paddingBottom: 7,
              }}
            ></View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});
