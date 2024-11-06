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
  observacao: z.string(),

})


export default function Payment() {

  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
    { "id": 1, "nome": "Lance Astlett" },
    { "id": 2, "nome": "Toby Pandie" },
    { "id": 3, "nome": "Mariam Ormes" },
    { "id": 4, "nome": "Lenci Emanulsson" },
    { "id": 5, "nome": "Jdavie Levick" },
    { "id": 6, "nome": "Lyn Coulman" },
    { "id": 7, "nome": "Culver Binding" },
    { "id": 8, "nome": "Marla Hardes" },
    { "id": 9, "nome": "Jodi Mourbey" },
    { "id": 10, "nome": "Lenore Noriega" },
    { "id": 11, "nome": "Gian Waudby" },
    { "id": 12, "nome": "Pammy Douce" },
    { "id": 13, "nome": "Rourke Rathjen" },
    { "id": 14, "nome": "Griselda Muckley" },
    { "id": 15, "nome": "Mary Rillatt" },
    { "id": 16, "nome": "Bambie Mardle" },
    { "id": 17, "nome": "Jamison Noton" },
    { "id": 18, "nome": "Lyn Brimson" },
    { "id": 19, "nome": "Barnaby Moberley" },
    { "id": 20, "nome": "Georgetta Brodley" },
    { "id": 21, "nome": "Murielle Figiovanni" },
    { "id": 22, "nome": "Hurlee Frizzell" },
    { "id": 23, "nome": "Dory Denk" },
    { "id": 24, "nome": "Ricard Gaskell" },
    { "id": 25, "nome": "Fanchette Audritt" },
    { "id": 26, "nome": "Benoite Cranny" },
    { "id": 27, "nome": "Niki Gutans" },
    { "id": 28, "nome": "Gill Jaram" },
    { "id": 29, "nome": "Martica Cardiff" },
    { "id": 30, "nome": "Sheilakathryn Cudbird" },
    { "id": 31, "nome": "Susy Andryushchenko" },
    { "id": 32, "nome": "Haily Samett" },
    { "id": 33, "nome": "Celestine Blackden" },
    { "id": 34, "nome": "Ibrahim Perrott" },
    { "id": 35, "nome": "Rosita Grint" }
  ]);

  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false)
  const [observacao, setObservacao] = useState("")
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
    valor_pago: convertValue(valor),
    data_pagamento: data,
    observacao,
  };

  try {
    const result = await paymentScheema.parseAsync(payment);
    const { insertedID } = await createPayment(payment);
    console.log("Dados validados com sucesso:", result);
    console.log(insertedID)
  } catch (error) {
    console.error("Erro de validação:", error.errors || error.message);
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