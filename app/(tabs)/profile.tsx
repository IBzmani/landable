import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  UserRound, 
  Settings, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Share2
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth-store';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuthStore();
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/login');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleVerifyKYC = () => {
    Alert.alert(
      'KYC Verification',
      'This will start the KYC verification process. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            // Simulate KYC verification
            setTimeout(() => {
              updateUser({ kycVerified: true });
              Alert.alert('Success', 'Your identity has been verified!');
            }, 1000);
          },
        },
      ]
    );
  };
  
  const handleShareReferral = () => {
    Alert.alert(
      'Share Referral Code',
      `Your referral code is ${user?.referralCode}. Share it with friends to earn rewards!`,
      [
        {
          text: 'Copy Code',
          onPress: () => {
            Alert.alert('Copied', 'Referral code copied to clipboard!');
          },
        },
        {
          text: 'Share',
          onPress: () => {
            Alert.alert('Shared', 'Sharing options opened!');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
              <View style={styles.kycStatus}>
                {user?.kycVerified ? (
                  <Badge label="KYC Verified" variant="success" />
                ) : (
                  <Badge label="KYC Pending" variant="warning" />
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        {!user?.kycVerified && (
          <Card style={styles.kycCard}>
            <View style={styles.kycCardContent}>
              <Shield size={24} color={colors.status.warning} />
              <View style={styles.kycCardText}>
                <Text style={styles.kycCardTitle}>Complete KYC Verification</Text>
                <Text style={styles.kycCardDescription}>
                  Verify your identity to unlock all platform features
                </Text>
              </View>
            </View>
            <Button 
              title="Verify Now" 
              size="small"
              onPress={handleVerifyKYC}
            />
          </Card>
        )}
        
        <Card style={styles.referralCard}>
          <Text style={styles.referralTitle}>Referral Program</Text>
          <View style={styles.referralInfo}>
            <View style={styles.referralCode}>
              <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
              <Text style={styles.referralCodeValue}>{user?.referralCode || 'JOHN123'}</Text>
            </View>
            <View style={styles.referralEarnings}>
              <Text style={styles.referralEarningsLabel}>Earnings</Text>
              <Text style={styles.referralEarningsValue}>${user?.referralEarnings || 0}</Text>
            </View>
          </View>
          <Button 
            title="Share Referral Code" 
            variant="outline"
            size="small"
            leftIcon={<Share2 size={16} color={colors.primary.blue} />}
            onPress={handleShareReferral}
            style={styles.shareReferralButton}
          />
        </Card>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <UserRound size={20} color={colors.primary.blue} />
              </View>
              <Text style={styles.settingsItemText}>Personal Information</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <CreditCard size={20} color={colors.primary.blue} />
              </View>
              <Text style={styles.settingsItemText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <Bell size={20} color={colors.primary.blue} />
              </View>
              <Text style={styles.settingsItemText}>Notifications</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: colors.secondary.gray, true: `${colors.primary.green}80` }}
                thumbColor={true ? colors.primary.green : '#f4f3f4'}
                ios_backgroundColor={colors.secondary.gray}
                value={true}
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <Shield size={20} color={colors.primary.blue} />
              </View>
              <Text style={styles.settingsItemText}>Security</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <HelpCircle size={20} color={colors.primary.blue} />
              </View>
              <Text style={styles.settingsItemText}>Help Center</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <Settings size={20} color={colors.primary.blue} />
              </View>
              <Text style={styles.settingsItemText}>Terms & Privacy</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.status.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userInfo: {
    gap: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  kycStatus: {
    marginTop: 4,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: `${colors.primary.blue}10`,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.blue,
  },
  kycCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: `${colors.status.warning}10`,
  },
  kycCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  kycCardText: {
    marginLeft: 12,
    flex: 1,
  },
  kycCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  kycCardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  referralCard: {
    marginBottom: 24,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  referralInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  referralCode: {},
  referralCodeLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  referralCodeValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.blue,
  },
  referralEarnings: {},
  referralEarningsLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  referralEarningsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.green,
  },
  shareReferralButton: {
    alignSelf: 'flex-start',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.gray,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.blue}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsItemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  switchContainer: {},
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.status.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});