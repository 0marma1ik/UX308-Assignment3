import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FAB } from 'react-native-paper';
import ChatView from "./ChatView";

export default function Loyalty() {
    const [visible, setVisible] = useState(false);
    const [orders, setOrders] = useState(0);
    const ordersUntilFree = 10 - (orders % 10);
    const isFreeOrder = orders > 0 && orders % 10 === 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>🍔 Omar's Burger Hut</Text>
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

            <Modal visible={visible} animationType="slide" transparent>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.drawer}>
                        <View style={styles.drawerHeader}>
                            <Text style={styles.drawerTitle}>Order Bot</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={styles.closeBtn}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <ChatView onOrder={() => setOrders(prev => prev + 1)} />
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <FAB icon="robot" style={styles.fab} onPress={() => setVisible(true)} />
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
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
    drawer: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '75%' },
    drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    drawerTitle: { fontSize: 18, fontWeight: 'bold' },
    closeBtn: { fontSize: 18, color: '#888' },
});