import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { formatDateToBrazilian } from "../../utils/formatData";
import { router } from "expo-router";

export default function List() {
    const [data, setData] = useState([]);
    const { getPayments } = usePaymentsDatabase();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    async function fetchData() {
        if (hasMore === false) return;

        setPage(page + 1);

        const payments = await getPayments(page);

        if (payments.length < 5) setHasMore(false);

        setData([...data, ...payments]);
        setLoading(false);
    }

    useEffect(() => {
        setPage(0);
        fetchData();
    }, []);

    renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
                router.push({
                    pathname: "details",
                    params: { id: item.id },
                })
            }
        >
            <View style={styles.contentItem}>
                <Text style={styles.name}>{item.nome}</Text>
                <View style={styles.contentDate}>
                    <Text style={{ fontFamily: "monospace", color: "green" }}>
                        {formatDateToBrazilian(item.data_pagamento || new Date())}
                    </Text>
                    <Text style={{ fontFamily: "monospace", color: "green" }}>{item.numero_recibo}</Text>
                </View>
            </View>
            <View style={styles.valueContent}>
                <Text style={styles.value}>{formatCurrencyBRL(item.valor_pago || 0)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#e0f2f1" }}>
            <View style={{ flex: 1 }}>
                <FlashList
                    data={data}
                    renderItem={renderItem}
                    estimatedItemSize={50}
                    onEndReached={fetchData}
                    onEndReachedThreshold={0.8}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: "#e0f2f1",
    },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        height: 75,
    },
    contentItem: {
        flex: 1,
        gap: 5,
    },
    contentDate: {
        flexDirection: "row",
        gap: 10,
    },
    name: {
        fontFamily: "monospace",
        fontSize: 18,
        textTransform: "uppercase",
        color: "green",
    },
    valueContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        fontFamily: "monospace",
        fontSize: 18,
        color: "green",
    },
});
