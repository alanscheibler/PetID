import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qdggltrceamidbosnpdj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZ2dsdHJjZWFtaWRib3NucGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMTk1NzUsImV4cCI6MjA0NjU5NTU3NX0.T4uZPkZjVIqQ8Fwp3Ad7mejrEeMEFg9ctpgWh3vPkHI";

export const supabase = createClient(supabaseUrl, supabaseKey);