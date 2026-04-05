import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FAB, Portal, Dialog, Button } from 'react-native-paper';
import ChatView from "./ChatView";
import { orderCount } from '../Order';

export default function Loyalty() {
    const [visible, setVisible] = useState(false);
    const [orders, setOrders] = useState(0);
    const ordersUntilFree = 10 - (orders % 10);
    const isFreeOrder = orders > 0 && orders % 10 === 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>🍽️ Loyalty Rewards</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Your Orders</Text>
                <Text style={styles.pointsNumber}>{orders}</Text>
                <Text style={styles.cardSubtitle}>
                    {isFreeOrder ? '🎉 Your next order is FREE!' : `${ordersUntilFree} order${ordersUntilFree === 1 ? '' : 's'} until your free meal`}
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${((10 - ordersUntilFree) / 10) * 100}%` }]} />
                </View>
                <Text style={styles.progressLabel}>{10 - ordersUntilFree}/10 orders</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Total orders placed: {orders}</Text>
                <Text style={styles.infoText}>Every 10th order is on us! 🎁</Text>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={() => { setOrders(orderCount); setVisible(false); }} style={styles.dialog}>
                    <Dialog.Title>Order Bot</Dialog.Title>
                    <Dialog.Content style={styles.dialogContent}>
                        <ChatView />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { setOrders(orderCount); setVisible(false); }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <FAB icon="plus" style={styles.fab} onPress={() => setVisible(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#ff6b35', padding: 20, alignItems: 'center' },
    headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    card: { margin: 20, backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 },
    cardTitle: { fontSize: 16, color: '#888', marginBottom: 8 },
    pointsNumber: { fontSize: 64, fontWeight: 'bold', color: '#ff6b35' },
    cardSubtitle: { fontSize: 14, color: '#555', marginTop: 8, textAlign: 'center' },
    progressBar: { width: '100%', height: 10, backgroundColor: '#eee', borderRadius: 5, marginTop: 16, overflow: 'hidden' },
    progressFill: { height: 10, backgroundColor: '#ff6b35', borderRadius: 5 },
    progressLabel: { fontSize: 12, color: '#aaa', marginTop: 6 },
    infoBox: { marginHorizontal: 20, backgroundColor: '#fff3ee', borderRadius: 12, padding: 16 },
    infoText: { color: '#ff6b35', fontSize: 14, marginBottom: 4 },
    fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#ff6b35' },
    dialog: { height: '70%' },
    dialogContent: { flex: 1 },
});