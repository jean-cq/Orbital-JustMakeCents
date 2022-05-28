import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xlmxiwbuyvnpmipnzzfy.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbXhpd2J1eXZucG1pcG56emZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM2Njk2NjYsImV4cCI6MTk2OTI0NTY2Nn0.akN24H-PHKDugZKGV0eDVPMagL8AIGFGcVG3YCBdFrE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});