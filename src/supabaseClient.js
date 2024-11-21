import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgucbcmcvzypyrhjkzaw.supabase.co'; // Replace with your Supabase API URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndWNiY21jdnp5cHlyaGpremF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5OTY3MDYsImV4cCI6MjA0NzU3MjcwNn0.RGmdeEcbi0vLLS-CUX85xkJRkfFAKQiRV7N6NGX5SVc'; // Replace with your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
