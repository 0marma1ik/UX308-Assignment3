import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import { handleInput } from '../Order';

export default function ChatView({ onOrder }) {
  const [messages, setMessages] = useState([
    { direction: 'left', text: 'Hi! What would you like to order today? 🍕' }
  ]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => { scrollViewRef.current?.scrollToEnd({ animated }); }, 100);
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = () => {
    if (inputBarText.trim().length === 0) return;
    let newMessages = [{ direction: 'right', text: inputBarText }];
    const aResponse = handleInput(inputBarText);
    for (const message of aResponse) {
      newMessages.push({ direction: "left", text: message });
    }
    if (inputBarText.toLowerCase().match(/order|want|would like|get|give me|burger|pizza|pasta|salad|drink|fries|sandwich|chicken|soda|water|coffee|tea/)) {
      onOrder?.();
    }
    setMessages([...messages, ...newMessages]);
    setInputBarText('');
  };

  return (
    <View style={styles.outer}>
      <ScrollView ref={scrollViewRef} style={styles.messages} onContentSizeChange={() => scrollToBottom()}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} direction={msg.direction} text={msg.text} />
        ))}
      </ScrollView>
      <InputBar onSendPressed={sendMessage} onSizeChange={() => scrollToBottom(false)} onChangeText={setInputBarText} text={inputBarText} />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: 'white' },
  messages: { flex: 1 },
});