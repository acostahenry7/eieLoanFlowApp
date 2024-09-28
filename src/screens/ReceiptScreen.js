import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Button,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getReceiptsByLoanApi,
  getAmortizationByPaymentApi,
} from "../api/receipts";
import CardTemplate from "../components/CardTemplate";
import Receipt from "../components/Receipt";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function ReceiptScreen(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const { auth } = useAuth();
  const { customer, loans, loan } = params;
  //console.log("CUSTOMER", customer);
  const [payments, setPayments] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [receiptVisibility, setReceiptVisibility] = useState(false);
  const [customHtml, setCustomHtml] = useState({});
  const [receiptDetails, setReceiptDetails] = useState({});
  const [isLoading, setIsLoading] = useState(undefined);

  //console.log(quotas);

  useEffect(() => {
    (async () => {
      const response = await getReceiptsByLoanApi({ loanNumber: loan });
      //console.log("PAYMENTS", response);
      setPayments(response);
    })();
  }, []);

  const options = [
    {
      name: "Ver",
      action: async (payment) => {
        // //console.log(payment);
        setReceiptVisibility(true);
        setIsLoading(true);
        const response = await getAmortizationByPaymentApi({
          receiptId: payment?.receipt.receipt_id,
        });

        //console.log("RECEIPT TEMPLATE", response);

        setCustomHtml(response.receipt.app_html);

        // //console.log("RESPONSE", response.transactions;
        // setQuotas(response.transactions;

        // //  //console.log(quotas);

        setReceiptDetails({
          appZPL: response.receipt.app_zpl?.toString(),
        });

        setIsLoading(false);
        setReceiptVisibility(true);

        ////console.log(response.transactions;
      },
    },
    {
      name: "Reimprimir",
      action: () => {
        //console.log("hola");
      },
    },
  ];

  return (
    <View style={{ paddingTop: 10 }}>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        {payments?.map((payment, index) => (
          <CardTemplate
            screen="Recibo"
            key={index}
            actionParam={payment}
            searchKey={payment?.payment_id}
            mainTitle="No. Recibo"
            mainText={payment?.receipt?.receipt_number}
            secondaryTitle="Fecha"
            secondaryText={payment?.created_date}
            menuOptions={options}
            loding={isLoading}
          />
          // <View key={index}>
          //   <Text>{payment.receipt.receipt_number}</Text>
          // </View>
        ))}
      </ScrollView>

      {isLoading ? (
        <Loading />
      ) : (
        <Receipt
          setReceiptVisibility={setReceiptVisibility}
          receiptVisibility={receiptVisibility}
          receiptDetails={receiptDetails}
          quotas={quotas}
          navigation={navigation}
          customHtml={customHtml}
          origin={"receipt"}
        />
      )}
    </View>
  );
}
