import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Lock, Mail, User } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth-store';

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    try {
      await signup(name, email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join thousands of investors building wealth through real estate
          </Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <User size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Mail size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          
          <Text style={styles.termsText}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>
          
          <Button
            title="Create Account"
            onPress={handleSignup}
            isLoading={isLoading}
            style={styles.signupButton}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary.blue,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary.gray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.secondary.white,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  termsText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.blue,
  },
});