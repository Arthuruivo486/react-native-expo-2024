import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";

export default function List() {
  const [data, setData] = useState([]);
  const { getPayments } = usePaymentsDatabase();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function fetchData() {

    if (hasMore === false) return;

    setPage(page+1)

  const payments = await getPayments(page);

  if (payments.length< 5) setHasMore(false)

  setData([...data, ...payments])
  setLoading(false)

  }
  useEffect(() => {
    setPage(0)
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", margin: 5, padding: 3, backgroundColor: "#fff", height: 100 }}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontFamily: "bold", fontSize: 18 ,textTransform:"uppercase"}}>{item.nome}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontFamily: "regular" }}>
            {formatDateToBrazilian(item.data_pagamento || new Date())}
          </Text>
          <Text>{item.numero_recibo}</Text>
        </View>
      </View>
      <View>
        <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {formatCurrencyBRL(item.valor_pago || 0)}
        </Text>
      </View>
    </View>
  );

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      
      <View style={{ flex: 1 }}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={50}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color="#000" /> : null}
          kayExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
