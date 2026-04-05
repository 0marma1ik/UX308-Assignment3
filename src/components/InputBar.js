import React, { useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function InputBar({ text, onChangeText, onSizeChange, onSendPressed }) {
    const inputRef = useRef(null);
    return (
        <View style={styles.inputBar}>
            <TextInput
                style={styles.textBox}
                ref={inputRef}
                onChangeText={(text) => onChangeText(text)}
                onContentSizeChange={onSizeChange}
                value={text}
                placeholder="Type your order..."
                returnKeyType="send"
                onSubmitEditing={onSendPressed}
            />
            <TouchableOpacity style={styles.sendButton} onPress={onSendPressed}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputBar: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
    textBox: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, fontSize: 16, marginRight: 8 },
    sendButton: { backgroundColor: '#ff6b35', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' },
});