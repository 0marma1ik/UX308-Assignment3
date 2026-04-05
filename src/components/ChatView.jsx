import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import { handleInput } from '../Order';
export default function ChatView(){
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);
  const scrollToBottom = (animated = true) => {
    setTimeout(() => { scrollViewRef.current?.scrollToEnd({ animated }); }, 100);
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());
    scrollToBottom(false);
    return () => { showSubscription.remove(); hideSubscription.remove(); };
  }, []);
  useEffect(() => { scrollToBottom(); }, [messages]);
  const sendMessage = () => {
    if (inputBarText.trim().length === 0) return;
    let newMessages = [{ direction: 'right', text: inputBarText }];
    const aResponse = handleInput(inputBarText);
    for(const message of aResponse){
      newMessages.push({direction: "left", text: message});
    }
    setMessages([...messages, ...newMessages]);
    setInputBarText('');
  };
  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView ref={scrollViewRef} style={styles.messages} onContentSizeChange={() => scrollToBottom()}>
          {messages.map((msg, index) => (
            <MessageBubble key={index} direction={msg.direction} text={msg.text} />
          ))}
        </ScrollView>
        <InputBar onSendPressed={sendMessage} onSizeChange={() => scrollToBottom(false)} onChangeText={setInputBarText} text={inputBarText} />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  outer: { flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white' },
  messages: { flex: 1 },
});