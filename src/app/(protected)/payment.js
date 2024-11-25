import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { Button, StyleSheet, TextInput, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from "zod";
import { useUsersDatabase } from '../../database/useUsersDatabase';
import { useAuth } from "../../hooks/Auth/index";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { Alert } from "react-native";




//user_id INTEGER NOT NULL,
//user_cadastro INTEGER NOT NULL,
// valor_pago REAL NOT NULL,
//  data_pagamento DATE NOT NULL,
// observacao TEXT,


const paymentScheema = z.object({
  valor_pago: z.number().gt(0),
  user_id: z.number().int().positive(),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.date(),
  numero_recibo: z.string(),
  observacao: z.string().optional(),
});


export default function Payment() {

  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
    { "id": 1, "nome": "Adim" },
    { "id": 2, "nome": "Super" },
    { "id": 3, "nome": "User" },
  ]);

  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false)
  const [observacao, setObservacao] = useState("")
  const [numeroRecibo, setNumeroRecibo] = useState("")
  const valueRef = useRef();
  const { user } = useAuth()
  const { createPayment } = usePaymentsDatabase();
  const { getAllUsers } = useUsersDatabase();


  const handleCalendar = (event, selectedDate) => {
    setData(selectedDate);
    setViewCalendar(false);
  };

  useEffect(() => {
    (async() => {
      valueRef?.current?.focus();
      try {
        const users = await getAllUsers();
        setSugestoes(users);
        setId(users[0].id);

      } catch (error) {
        console.log(error);
      };


    })();
}, []);

const handleChargeValor = (value) => {
  const valorLimpo = value.replace(",", "").replace(".", "");
  console.log("Valor Limpo: ", valorLimpo);
  const valorConvertido = Number(valorLimpo) / 100;
  if (valorConvertido === 0 || isNaN(valorConvertido)) {
    setValor("0,00");
    return;
  }
  let valorPTBR = Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2
  }).format(valorConvertido);
  setValor(valorPTBR);


};


const convertValue = (value) => {
  try {
    let valorLimpo = value.replace(",", "").replace(".", "");
    let valorConvertido = Number(valorLimpo) / 100;
    if (valorConvertido === 0 || isNaN(valorConvertido)) {
      return 0;
    }
    return valorConvertido;
  } catch (error) {
    console.error("Erro ao converter valor:", error);
    return 0;
  }
};

const handleSubmit = async () => {
  const payment = {
    user_id: id,
    user_cadastro: Number(user.user.id),
    valor_pago: convertValue(valor), // Certifique-se de que este retorna um número
    data_pagamento: data, // Certifique-se de que seja uma instância de Date
    numero_recibo: numeroRecibo,
    observacao,
  };

  console.log("Dados enviados para validação:", payment); // Adicione este log

  try {
    const result = await paymentScheema.parseAsync(payment);
    console.log("Dados validados com sucesso:", result); // Log para dados validados
    const { insertedID } = await createPayment(payment);
    console.log("ID inserido:", insertedID);
    setNumeroRecibo("");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Erros de validação:", error.errors); // Log dos erros de validação
      Alert.alert("Erro", `Erro de validação: ${error.errors.map(e => e.message).join(", ")}`);
    } else {
      console.log("Erro inesperado:", error); // Log de outros erros
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  }
};


return (


  <KeyboardAvoidingView
    style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
  >

     <View style={styles.content}>
      <Text>Incerir Pagamentos</Text>
      <View style={styles.inputView}>
        <Ionicons name="wallet-outline" size={24} color="black" />
        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          style={styles.inputValor}
          value={valor}
          onChangeText={(newValue) => handleChargeValor(newValue)}
          ref={valueRef}
        />
      </View>

      
      <Text>Recibo</Text>
      <View style={styles.inputView}>
        <Ionicons name="cash-outline" size={24} color="black" />
        <TextInput
          placeholder="Numero do recibo"
          keyboardType="numeric"
          style={styles.inputValor}
          value={numeroRecibo}
          onChangeText={setNumeroRecibo}
        />
      </View>
      <View style={styles.inputView}>
        <Picker
          selectedValue={id}
          onValueChange={(itemValue) => setId(itemValue)}
          style={{ width: "100%" }}
        >
          {
            sugestoes.map((item) => {
              return <Picker.Item key={item.id} label={item.nome} value={item.id} />
            })
          }
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
          {data.toISOString().split("T")[0]}
        </Text>

        {viewCalendar && (
          <DateTimePicker
            value={data}
            onChange={handleCalendar}
            mode="date"
            tDFestID="dateTime"

          />
        )}
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Observação"
          style={styles.inputObservacao}
          values={observacao}
          onChangeText={setObservacao}
          multiline={true}

        />
      </View>
      <View style={styles.contentButton}>
        <Button title="Salvar" onPress={handleSubmit} />
        <Button title="Continuar" />
        <Button title="Cancelar" onPress={() => router.back()} />
      </View>
    </View>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  contentButton: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 20,
    padding: 10,
  },
  inputObservacao: {
    fontFamily: "regular",
    fontSize: 16,
    fex: 1,
    lineHeight: 20,
  },
});