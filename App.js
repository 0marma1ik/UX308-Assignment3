import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  Modal, ScrollView, TextInput, KeyboardAvoidingView,
  Platform, SafeAreaView
} from 'react-native';

export default function App() {
  const [orderCount, setOrderCount] = useState(0);
  const [showBot, setShowBot] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! What would you like to order today? 🍕' }
  ]);
  const [input, setInput] = useState('');

  const ordersUntilFree = 10 - (orderCount % 10);
  const isFreeOrder = orderCount > 0 && orderCount % 10 === 0;

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const lower = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let reply = "I can help you order food! Try saying something like 'I'd like a burger' or type 'menu' to see options.";

      const isOrdering = lower.match(
        /order|want|would like|have|get|give me|burger|pizza|pasta|salad|drink|fries|sandwich|chicken|soda|water|coffee|tea/
      );

      if (isOrdering) {
        const next = orderCount + 1;
        setOrderCount(next);
        if (next % 10 === 0) {
          reply = `🎉 Congratulations! This is your ${next}th order — it's FREE! Enjoy your meal!`;
        } else {
          reply = `Got it! Order placed. You now have ${next} order${next === 1 ? '' : 's'}. ${10 - (next % 10)} more until a free meal! 🍕`;
        }
      } else if (lower.match(/menu|options|food|what.*have/)) {
        reply = "We have pizza, burgers, pasta, salads, and drinks! What would you like?";
      } else if (lower.match(/hi|hello|hey|sup|good/)) {
        reply = "Hey there! 👋 What would you like to order today?";
      } else if (lower.match(/points|loyalty|reward|free|how many/)) {
        reply = `You've placed ${orderCount} orders so far. Every 10th order is free! 🎁`;
      } else if (lower.match(/thank|thanks/)) {
        reply = "You're welcome! Enjoy your meal! 😊";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.headerText}>🍽️ Loyalty Rewards</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Points</Text>
        <Text style={styles.pointsNumber}>{orderCount}</Text>
        <Text style={styles.cardSubtitle}>
          {isFreeOrder
            ? '🎉 Your next order is FREE!'
            : `${ordersUntilFree} order${ordersUntilFree === 1 ? '' : 's'} until your free meal`}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((10 - ordersUntilFree) / 10) * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{10 - ordersUntilFree}/10 orders</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Total orders placed: {orderCount}</Text>
        <Text style={styles.infoText}>Every 10th order is on us! 🎁</Text>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => setShowBot(true)}>
        <Text style={styles.fabText}>🤖</Text>
      </TouchableOpacity>

      <Modal visible={showBot} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Order Bot</Text>
              <TouchableOpacity onPress={() => setShowBot(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 12 }}>
              {messages.map((m, i) => (
                <View key={i} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.botBubble]}>
                  <Text style={styles.bubbleText}>{m.content}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                placeholder="Type your order..."
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
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
  fab: { position: 'absolute', bottom: 32, right: 24, width: 60, height: 60, borderRadius: 30, backgroundColor: '#ff6b35', alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6 },
  fabText: { fontSize: 28 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  drawer: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '70%' },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  drawerTitle: { fontSize: 18, fontWeight: 'bold' },
  closeBtn: { fontSize: 18, color: '#888' },
  chatArea: { flex: 1 },
  bubble: { maxWidth: '80%', padding: 10, borderRadius: 12, marginBottom: 8 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#ff6b35' },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  bubbleText: { color: '#333', fontSize: 14 },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  textInput: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8 },
  sendBtn: { backgroundColor: '#ff6b35', borderRadius: 20, paddingHorizontal: 16, justifyContent: 'center' },
  sendText: { color: '#fff', fontWeight: 'bold' },
});